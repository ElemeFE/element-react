import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Cascader from '../';

const options = [{
  value: 'zhinan',
  label: '指南',
  children: [{
    value: 'shejiyuanze',
    label: '设计原则',
    children: [{
      value: 'yizhi',
      label: '一致'
    }]
  }]
}];

function clickShowPopper(wrap) {
  wrap.children().children().childAt(0).simulate('click');
}

test('basic usage', () => {
  const component = mount(
    <Cascader
      options={options}
      popperClass="popper-class"
      placeholder="enter"
      size="large"
    />
  ); // unwrap clickOutSide HOC

  // placeholder
  expect(component.find('.el-input__inner').first().prop('placeholder')).toBe('enter');
  // size为large
  expect(component.find('.el-cascader--large')).toHaveLength(1);
  expect(component.find('.el-input').first().hasClass('el-input--large')).toBeTruthy();

  // 点击时展开菜单
  expect(component.find('.el-cascader-menus').prop('style').display).toBe('none');
  clickShowPopper(component);
  expect(component.find('.el-cascader-menus').prop('style').display).toBeUndefined();
  expect(component.find('.el-cascader-menus').first().hasClass('popper-class')).toBeTruthy();

  // 菜单元素数量及内容
  expect(component.find('.el-cascader-menu')).toHaveLength(1);
  expect(component.find('.el-cascader-menu').childAt(0).text()).toBe('指南');

  // 点击选项时展开子菜单，该选项被选中
  component.find('.el-cascader-menu').childAt(0).simulate('click');
  expect(component.find('.el-cascader-menu').at(1).exists()).toBeTruthy();
  expect(component.find('.el-cascader-menu').first().childAt(0).hasClass('is-active')).toBeTruthy();

});

test('hover expand', () => {
  const component = mount(
    <Cascader options={options} expandTrigger="hover" />
  );

  clickShowPopper(component);
  component.find('.el-cascader-menu').childAt(0).simulate('mouseEnter');

  expect(component.find('.el-cascader-menu').at(1).exists()).toBeTruthy();
  expect(component.find('.el-cascader-menu').first().childAt(0).hasClass('is-active')).toBeTruthy();
});

test('disabled', () => {
  const options = [{
    value: 'zhinan',
    label: '指南',
    disabled: true,
    children: [{
      value: 'shejiyuanze',
      label: '设计原则',
      children: [{
        value: 'yizhi',
        label: '一致'
      }]
    }]
  }];
  const component = mount(
    <Cascader options={options}  />
  );

  clickShowPopper(component);
  expect(component.find('.el-cascader-menu').first().childAt(0).hasClass('is-disabled')).toBeTruthy();
  component.find('.el-cascader-menu').first().childAt(0).simulate('click');
  expect(component.find('.el-cascader-menu').at(1).exists()).toBeFalsy();
});

test('value', () => {
  const component = mount(
    <Cascader options={options} value={['zhinan', 'shejiyuanze', 'yizhi']} />
  );

  clickShowPopper(component);
  expect(component.find('.el-cascader-menu').at(0).childAt(0).hasClass('is-active')).toBeTruthy();
  expect(component.find('.el-cascader-menu').at(1).childAt(0).hasClass('is-active')).toBeTruthy();
  expect(component.find('.el-cascader-menu').at(2).childAt(0).hasClass('is-active')).toBeTruthy();
  expect(component.find('.el-cascader__label').first().children()).toHaveLength(3);
});

test('not show all levels', () => {
  const component = mount(
    <Cascader options={options} value={['zhinan', 'shejiyuanze', 'yizhi']} showAllLevels={false} />
  );

  clickShowPopper(component);
  component.find('.el-cascader-menu').at(0).childAt(0).simulate('click');
  component.find('.el-cascader-menu').at(1).childAt(0).simulate('click');
  component.find('.el-cascader-menu').at(2).childAt(0).simulate('click');
  expect(component.find('.el-cascader__label').first().text()).toBe('一致');
});

test('clearable', () => {
  const cb = sinon.spy();
  const component = mount(
    <Cascader options={options} value={['zhinan', 'shejiyuanze', 'yizhi']} clearable onChange={cb} />
  );

  component.children().children().childAt(0).simulate('mouseEnter');
  component.find('.el-cascader__clearIcon').first().simulate('click');
  expect(component.find('.el-cascader__label').first().prop('style').display).toBe('none');
  expect(cb.callCount).toBe(1);
});

test('change', () => {
  const cb = sinon.spy();
  const component = mount(
    <Cascader options={options} onChange={cb} />
  );

  clickShowPopper(component);
  component.find('.el-cascader-menu').at(0).childAt(0).simulate('click');
  component.find('.el-cascader-menu').at(1).childAt(0).simulate('click');
  component.find('.el-cascader-menu').at(2).childAt(0).simulate('click');

  expect(cb.callCount).toBe(1);
});

test('change on select', () => {
  const cb = sinon.spy();
  const component = mount(
    <Cascader options={options} onChange={cb} changeOnSelect />
  );

  clickShowPopper(component);
  component.find('.el-cascader-menu').at(0).childAt(0).simulate('click');
  component.find('.el-cascader-menu').at(1).childAt(0).simulate('click');
  component.find('.el-cascader-menu').at(2).childAt(0).simulate('click');

  expect(cb.callCount).toBe(3);
});

test('active item change', () => {
  const cb = sinon.spy();
  const component = mount(
    <Cascader options={options} activeItemChange={cb} />
  );

  clickShowPopper(component);
  component.find('.el-cascader-menu').at(0).childAt(0).simulate('click');

  expect(cb.callCount).toBe(1);
});
