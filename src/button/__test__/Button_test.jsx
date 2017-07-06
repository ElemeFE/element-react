import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Button from '../';

describe('Button test', () => {
  it('create', () => {
    const w = shallow(
      <Button type="primary">TEST</Button>
    );
    expect(w.hasClass('el-button--primary')).toBeTruthy();
    expect(w.childAt(0).text()).toBe('TEST');
  });
  it('icon', () => {
    const w = shallow(
      <Button icon="search">TEST</Button>
    );
    expect(w.childAt(0).hasClass('el-icon-search')).toBeTruthy();
  });
  it('nativeType', () => {
    const w = shallow(
      <Button nativeType="submit">TEST</Button>
    );
    expect(w.prop('type')).toBe('submit');
  });
  it('loading', () => {
    const w = shallow(
      <Button loading={true}>TEST</Button>
    );
    expect(w.hasClass('is-loading')).toBeTruthy();
    expect(w.childAt(0).hasClass('el-icon-loading')).toBeTruthy();
  });
  it('disabled', () => {
    const w = shallow(
      <Button disabled={true}>TEST</Button>
    );
    expect(w.hasClass('is-disabled')).toBeTruthy();
  });
  it('size', () => {
    const w = shallow(
      <Button size="large">TEST</Button>
    );
    expect(w.hasClass('el-button--large')).toBeTruthy();
  });
  it('plain', () => {
    const w = shallow(
      <Button plain={true}>TEST</Button>
    );
    expect(w.hasClass('is-plain')).toBeTruthy();
  });
  it('click', () => {
    const fn = sinon.spy();
    const w = shallow(
      <Button onClick={fn}>TEST</Button>
    );
    w.simulate('click');
    expect(fn.callCount).toBe(1);
  });
});