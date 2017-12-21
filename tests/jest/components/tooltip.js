import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button, Tooltip } from '../../../src';
import renderer from 'react-test-renderer';

test('Basic Usage', () => {
  const tooltip = renderer.create(
    <div className="box">
      <div className="top">
        <Tooltip className="item" effect="dark" content="Top Left prompts info" placement="top-start">
          <Button>top-start</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Top Center prompts info" placement="top">
          <Button>top</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Top Right prompts info" placement="top-end">
          <Button>top-end</Button>
        </Tooltip>
      </div>
      <div className="left">
        <Tooltip className="item" effect="dark" content="Left Top prompts info" placement="left-start">
          <Button>left-start</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Left Center prompts info" placement="left">
          <Button>left</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Left Bottom prompts info" placement="left-end">
          <Button>left-end</Button>
        </Tooltip>
      </div>
      <div className="right">
        <Tooltip className="item" effect="dark" content="Right Top prompts info" placement="right-start">
          <Button>right-start</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Right Center prompts info" placement="right">
          <Button>right</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Right Bottom prompts info" placement="right-end">
          <Button>right-end</Button>
        </Tooltip>
      </div>
      <div className="bottom">
        <Tooltip className="item" effect="dark" content="Bottom Left prompts info" placement="bottom-start">
          <Button>bottom-start</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Bottom Center prompts info" placement="bottom">
          <Button>bottom</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Bottom Right prompts info" placement="bottom-end">
          <Button>bottom-end</Button>
        </Tooltip>
      </div>
    </div>
  );

  expect(tooltip.toJSON()).toMatchSnapshot();
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
    <Tooltip placement="top" content={<div>multiple lines<br/>second line</div>}>
      <Button>Top center</Button>
    </Tooltip>
  );

  expect(tooltip.contains(<div>multiple lines<br/>second line</div>)).toBe(true);
});

test('Advanced usage', () => {
  const state = {
    disabled: false
  };

  const tooltip = mount(
    <Tooltip disabled={ state.disabled } content="click to close tooltip function" placement="bottom" effect="light">
      <Button onClick={ e => {state.disabled = true}}>{`click to ${state.disabled ? 'active' : 'close' } tooltip function`}</Button>
    </Tooltip>
  );

  expect(state.disabled).toBe(false);
  expect(tooltip.toString()).toMatchSnapshot();

  tooltip.find('Button').simulate('click');

  expect(state.disabled).toBe(true);
  expect(tooltip.toString()).toMatchSnapshot();
});