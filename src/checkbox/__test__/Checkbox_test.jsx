import React from 'react';
import { mount } from 'enzyme';

import Checkbox from '../';

test('isChecked should work', () => {
  const wrapper = mount(
    <Checkbox checked>备选项</Checkbox>
  )
  expect(wrapper.find('input').props().checked).toBe(true)
})

test('Turning an unchecked item to checked', () => {
  const wrapper = mount(
    <Checkbox>备选项</Checkbox>
  )

  // 模拟change事件
  const Input = document.createElement('input');
  Input.checked = true;
  wrapper.find('input[type="checkbox"]').simulate('change', { target: Input });

  expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(true)
})

test('isDisabled should work', () => {
  const wrapper = mount(
    <Checkbox disabled>备选项</Checkbox>
  )
  expect(wrapper.find('input').props().disabled).toBe(true)
})

test('should render checked checkbox if checkboxGroup value contains the same label', () => {
  let checkList = ['复选框 A', '选中且禁用']
  const wrapper = mount(
    <Checkbox.Group value={checkList}>
      <Checkbox label="复选框 A"></Checkbox>
      <Checkbox label="复选框 B"></Checkbox>
      <Checkbox label="复选框 C"></Checkbox>
      <Checkbox label="禁用" disabled></Checkbox>
      <Checkbox label="选中且禁用" disabled></Checkbox>
    </Checkbox.Group>
  )

  wrapper.find('.el-checkbox').forEach(e => {
    if (checkList.includes(e.find('.el-checkbox__label').props().children)) {
      expect(e.find('.el-checkbox__input').hasClass('is-checked')).toEqual(true)
    }
  })

})

test('should display indeterminate mark when checkbox is an indeterminate state', () => {
  const wrapper = mount(
    <Checkbox
      indeterminate={true}/>
  )
  expect(wrapper.find('.el-checkbox__input').hasClass('is-indeterminate')).toEqual(true)
})

test('should limited to max and min value', () => {
  let cities = ['上海', '北京', '广州', '深圳']
  let checkedCity = ['上海', '北京']
  const wrapper = mount(
    <Checkbox.Group
      min="1"
      max="2"
      value={checkedCity}>
      {
        cities.map((city, index) => {
          return (
            <Checkbox key={index} label={city}></Checkbox>
          )
        })
      }
    </Checkbox.Group>
  )

  //test checked length
  expect(wrapper.find('.el-checkbox__input .is-checked').length).toBe(2)


  const Input = document.createElement('input');

  //test max
  Input.checked= true;
  wrapper.find('input[type="checkbox"]').forEach(e => {
    if (!e.prop('checked')) {
      e.simulate('change', { target: Input });
      expect(wrapper.find('.el-checkbox__input .is-checked').length).toBe(2)
    }
  })

  //test min
  Input.checked = false;
  wrapper.find('input[type="checkbox"]').forEach(e => {
    if (e.prop('checked')) {
      e.simulate('change', { target: Input })
      expect(wrapper.find('.el-checkbox__input .is-checked').length).toBe(1)
    }
  })
})