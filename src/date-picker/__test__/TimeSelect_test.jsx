/* eslint react/prop-types: ["off"] */

import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon'

import TimeSelect from '../TimeSelect'
import { mockRAf } from './utils'

// https://facebook.github.io/jest/docs/expect.html
// http://airbnb.io/enzyme/docs/api/ShallowWrapper/exists.html
// http://sinonjs.org/releases/v2.3.4/spies/

// render , mount , shallow :
//    https://github.com/airbnb/enzyme/issues/465
describe('TimePicker test', function () {
  let minProps = {
    start: '08:30',
    step: '00:15',
    end: '18:30',
    maxTime: '12:30',
    onChange() { },
    value: null,
    placeholder: 'Select time'
  }

  const nativeEvent = { nativeEvent: { stopImmediatePropagation: () => { } } }

  function mountDefault(props={}){
    return mount(
      <TimeSelect
        {...minProps}
        {...props}
      />
    )
  }
  it('should render without exploding', () => {
    let w = shallow(
      <TimeSelect
        {...minProps}
      />
    )
    expect(w.exists()).toBeTruthy();
  })


  it('should have valid state', () => {
    mockRAf()
    let onChange = sinon.spy();
    let w = mount(
      <TimeSelect
        {...minProps}
        onChange={onChange}
      />
    )


    // test pop up
    w.find('input[type="text"]').simulate('focus');
    expect(w.find('.time-select-item').length > 1).toBe(true);
    // min
    expect(w.find('.time-select-item').at(0).text().trim()).toBe('08:30');
    // max
    expect(w.find('.time-select-item.disabled').at(0).text().trim()).toBe('12:30')
    //test clear icon

    // https://github.com/Semantic-Org/Semantic-UI-React/issues/1319
    w.find('.time-select-item').at(0).simulate('click', nativeEvent)
    expect(onChange.args[0].toLocaleString()).toBe('1/1/2017, 8:30:00 AM')
    w.find('i.el-input__icon').simulate('click', nativeEvent)
    expect(onChange.calledWith(null)).toBeTruthy()
  })

  it('isShowTrigger should work', () => {
    let w = mount(
      <TimeSelect
        {...minProps}
        isShowTrigger={false}
      />
    )
    expect(w.find('i.el-input__icon').exists()).toBe(false)
  })

  it('isDisabled should work', ()=>{
    let w = mount(
      <TimeSelect
        {...minProps}
        isDisabled={true}
      />
    )
    expect(w.find('input').props().disabled).toBe(true)
  })

  it('onFocus & onBlur should work', ()=>{
    let onFocus = sinon.spy();
    let onBlur = sinon.spy()
    let w = mountDefault({
      onFocus,
      onBlur,
    })

    w.find('input').simulate('focus')
    expect(onFocus.called).toBeTruthy()
    w.find('input').simulate('blur')
    expect(onBlur.called).toBeTruthy()
  })


  describe('TimePicker:fixed range test', () => {

    it('start date change should trigger end date selectable dates', () => {
      let startDate = new Date(2017, 1, 10, 14, 30)
      let endDate = new Date(2017, 1, 10, 15, 30)

      let Ts = ({ startDate, onChange }) => (
        <div>
          <TimeSelect
            start="08:30"
            step="00:15"
            end="18:30"
            onChange={onChange}
            value={startDate}
            placeholder="选择时间"
          />

          <TimeSelect
            start="08:30"
            step="00:15"
            end="18:30"
            onChange={() => { }}
            value={endDate}
            minTime={startDate}
            placeholder="选择时间"
          />
        </div>
      )

      let w = mount(
        <Ts startDate={startDate} onChange={(d) => { startDate = d }} />
      )

      w.find('input[type="text"]').at(0).simulate('focus');
      w.find('.time-select-item').at(3).simulate('click', nativeEvent)
      w.setProps({ startDate })
      // w.mount() // !notice, `update` would not work here, it seems `update` method wouldnt update deep child nodes

      w.find('input[type="text"]').at(1).simulate('focus');
      expect(w.find('.time-select-item').at(3).is('.disabled')).toBe(true)
      expect(w.find('.time-select-item').at(4).is('.disabled')).toBe(false)
      // console.log('xx', w.find('.time-select-item').at(4).debug(), startDate.toLocaleString())
    })

  })
});
