import React from 'react';
import { mount, shallow } from 'enzyme';
import { Button, Tooltip } from '../../../src';

test('Basic Usage', () => {
  const tooltip = shallow(
    <Tooltip effect="dark" content="Top Left prompts info" placement="top-start">
      <Button>top-start</Button>
    </Tooltip>
  );

  expect(tooltip.find('.el-tooltip__rel').exists()).toEqual(true);
  expect(tooltip.find('.el-tooltip__rel').contains(<Button>top-start</Button>)).toEqual(true);

  expect(tooltip.find('.el-tooltip__popper').exists()).toEqual(true);
  expect(tooltip.find('.el-tooltip__popper').at(0).hasClass('is-dark')).toEqual(true);
  expect(tooltip.find('.el-tooltip__popper').text()).toEqual('Top Left prompts info');
});

test('Theme', () => {
  const tooltip1 = shallow(
    <Tooltip content="Top center" placement="top">
      <Button>Dark</Button>
    </Tooltip>
  );

  expect(tooltip1.find('div .el-tooltip__popper').at(0).hasClass('is-dark')).toEqual(true);

  const tooltip2 = mount(
    <div>
      <Tooltip content="Bottom center" placement="bottom" effect="light">
        <Button>Light</Button>
      </Tooltip>
    </div>
  );

  expect(tooltip2.find('div .el-tooltip__popper').at(0).hasClass('is-light')).toEqual(true);

});

test('More Content', () => {
  const tooltip = mount(
    <Tooltip placement="top" content={<div>multiple lines<br />second line</div>}>
      <Button>Top center</Button>
    </Tooltip>
  );

  expect(tooltip.contains(<div>multiple lines<br />second line</div>)).toBe(true);
});

test('Advanced usage', () => {
  const state = {
    disabled: false
  };

  const tooltip = mount(
    <Tooltip disabled={ state.disabled } content="click to close tooltip function" placement="bottom" effect="light">
      <Button onClick={ () => {state.disabled = true}}>{`click to ${state.disabled ? 'active' : 'close' } tooltip function`}</Button>
    </Tooltip>
  );

  expect(state.disabled).toBe(false);

  tooltip.find('Button').simulate('click');

  expect(state.disabled).toBe(true);
});
