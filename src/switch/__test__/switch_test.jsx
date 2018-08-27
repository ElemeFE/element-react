import React from 'react';
import { mount, render } from 'enzyme';
import { Switch, Tooltip } from '../../../src';

test('Basic usage', () => {
  const switch1 = mount(
    <Switch
      value={true}
      onText=""
      offText="">
    </Switch>
  );

  expect(switch1.find('label.el-switch .el-switch__label').at(0).text()).toEqual('');
  expect(switch1.find('label.el-switch .el-switch__label').at(1).text()).toEqual('');
  expect(switch1.find('label.el-switch').hasClass('is-checked')).toEqual(true);

  // switch off
  switch1.find('input').simulate('change', {target: {value: false}});

  expect(switch1.find('label.el-switch .el-switch__label').at(0).text()).toEqual('');
  expect(switch1.find('label.el-switch .el-switch__label').at(1).text()).toEqual('');
  expect(switch1.find('label.el-switch').at(0).hasClass('is-checked')).toEqual(false);

  const switch2 = mount(
    <Switch
      value={true}
      onColor="#13ce66"
      offColor="#ff4949">
    </Switch>
  );

  expect(switch2.find('label.el-switch').at(0).hasClass('is-checked')).toEqual(true);
  expect(switch2.find('label.el-switch .el-switch__label').at(0).text()).toEqual('ON');
  expect(switch2.find('label.el-switch .el-switch__label').at(1).text()).toEqual('OFF');
  expect(switch2.find('label.el-switch .el-switch__label').at(0).prop('style').display).toEqual(undefined);
  expect(switch2.find('label.el-switch .el-switch__label').at(1).prop('style').display).toEqual('none');

  // switch off
  switch2.find('input[type="checkbox"]').simulate('change', {target: {value: false}});

  expect(switch2.find('label.el-switch').at(0).hasClass('is-checked')).toEqual(false);
  expect(switch2.find('label.el-switch .el-switch__label').at(0).text()).toEqual('ON');
  expect(switch2.find('label.el-switch .el-switch__label').at(1).text()).toEqual('OFF');
  expect(switch2.find('label.el-switch .el-switch__label').at(0).prop('style').display).toEqual('none');
  expect(switch2.find('label.el-switch .el-switch__label').at(1).prop('style').display).toEqual(undefined);

});

test('Extended value types', () => {
  const state = {
    value: 100
  };

  let testCallBack = (value)=> {
    state.value = value;
  };

  const component = mount(
    <div>
      <Tooltip
        placement="top"
        content={
          <div>Switch value: {state.value}</div>
        }>
        <Switch
          value={state.value}
          onColor="#13ce66"
          offColor="#ff4949"
          onValue={100}
          offValue={0}
          onChange={testCallBack}>
        </Switch>
      </Tooltip>
    </div>);

  expect(component.find('label.el-switch.el-switch--wide').at(0).hasClass('is-checked')).toEqual(true);
  expect(component.find('div .el-switch__label').at(0).text()).toEqual('ON');
  expect(component.find('div .el-switch__label').at(1).text()).toEqual('OFF');
  expect(component.find('div .el-switch__label').at(0).prop('style').display).toEqual(undefined);
  expect(component.find('div .el-switch__label').at(1).prop('style').display).toEqual('none');
  expect(state.value).toBe(100);

  // switch off
  component.find('input[type="checkbox"]').simulate('change', {target: {value: false}});

  expect(component.find('label.el-switch.el-switch--wide').at(0).hasClass('is-checked')).toEqual(false);
  expect(component.find('div .el-switch__label').at(0).text()).toEqual('ON');
  expect(component.find('div .el-switch__label').at(1).text()).toEqual('OFF');
  expect(component.find('div .el-switch__label').at(0).prop('style').display).toEqual('none');
  expect(component.find('div .el-switch__label').at(1).prop('style').display).toEqual(undefined);
  expect(state.value).toBe(0);
});

test('Disabled', () => {
  const switch1 = mount(
    <Switch
      value={true}
      onText=""
      offText=""
      disabled>
    </Switch>
  );

  expect(switch1.find('label.el-switch').at(0).hasClass('is-disabled')).toEqual(true);
  expect(switch1.find('input[type="checkbox"]').at(0).prop('disabled')).toEqual(true);

  const switch2 = mount(
    <Switch
      value={true}
      disabled>
    </Switch>);

  expect(switch2.find('label.el-switch').at(0).hasClass('is-disabled')).toEqual(true);
  expect(switch2.find('input[type="checkbox"]').at(0).prop('disabled')).toEqual(true);

});

test('Focus', () => {
  const focusFn = jest.fn();
  const blurFn = jest.fn();
  const switch1 = mount(
    <Switch
      allowFocus={true}
      onFocus={focusFn}
      onBlur={blurFn}
    >
    </Switch>
  );

  expect(focusFn.mock.calls.length).toBe(0);
  expect(blurFn.mock.calls.length).toBe(0);

  switch1.find('input').simulate('focus');
  expect(focusFn.mock.calls.length).toBe(1);
  switch1.find('input').simulate('blur');
  expect(blurFn.mock.calls.length).toBe(1);

});
