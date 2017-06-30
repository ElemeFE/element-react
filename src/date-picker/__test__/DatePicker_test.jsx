/* eslint react/prop-types: ["off"] */

import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon'

import { DatePicker, DateRangePicker } from '../'
import { mockRAf, nativeEvent } from './utils'


describe('DatePicker tests', function () {

  describe('DatePicker test', function () {
    let minProps = {
      value: null,
      placeholder: '',
      onChange: () => { },
    }

    function mountDefault(props = {}) {
      return mount(
        <DatePicker
          {...minProps}
          {...props}
        />
      )
    }

    function shallowDefault(props = {}) {
      return shallow(
        <DatePicker
          {...minProps}
          {...props}
        />
      )
    }

    it('should render without exploding', () => {
      let w = shallow(
        <DatePicker
          {...minProps}
        />
      )
      expect(w.exists()).toBeTruthy();
    })

    it('disabledDate should work', () => {
      mockRAf()
      let date = new Date(2017, 1, 2)
      let w = mountDefault({
        value: date,
        disabledDate: (d) => d.getTime() < new Date(2017, 1, 2)
      })

      w.find('input').simulate('focus');
      expect(w.find('.el-date-table').find('td.normal.disabled').map(node => node.text()).some(t => t == 1)).toBeTruthy()
    })

    it('onChange should work', () => {
      mockRAf()
      let date = new Date(2017, 1, 2)
      let onChange = sinon.spy()
      let w = mountDefault({
        value: date,
        onChange
      })
      w.find('input').simulate('focus');
      w.find('.el-date-table td.available').at(0).simulate('click', nativeEvent)
      expect(onChange.called).toBeTruthy()
      expect(onChange.args[0][0] instanceof Date).toBeTruthy()
    })

    it('isShowTrigger should work', () => {
      let w = shallowDefault({
        isShowTrigger: false
      })
      expect(w.find('i.el-input__icon').exists()).toBe(false)
    })

    it('format should work', () => {
      let w = shallowDefault({
        value: new Date(2017, 0, 1),
        format: 'yy-MM-dd'
      })
      expect(w.find('Input').props().value).toBe('17-01-01')//shallow, cant use find('input'), 
    })

    it('onFocus & onBlur should work', () => {
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
  })

  describe('DateRangePicker test', function () {
    let minProps = {
      value: [],
      onChange() { },
    }
    function mountDefault(props = {}) {
      return mount(
        <DateRangePicker
          {...minProps}
          {...props}
        />
      )
    }

    it('should render without exploding', () => {
      let w = mountDefault()
      expect(w.exists()).toBeTruthy()
    })
  })
})