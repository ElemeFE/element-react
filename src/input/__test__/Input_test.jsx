import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Input from '../';

// const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('Input test', () => {
  it('create', () => {
    const w = shallow(
      <Input placeholder="请输入内容" />
    );
    // to be tested: focus/placeholder/minlength/maxlength
    expect(w.hasClass('el-input')).toBeTruthy();
  });

  it('disabled', () => {
    const w = shallow(
      <Input disabled />
    );
    expect(w.find('.el-input input').prop('disabled')).toBe(true);
  });

  it('icon', () => {
    const cb = sinon.spy();
    const w = shallow(
      <Input
        icon="time"
        placeholder="请选择日期"
        onIconClick={cb}
      />
    );
    expect(w.find('.el-icon-time').exists()).toBeTruthy();

    w.find('.el-icon-time').simulate('click');
    expect(cb.callCount).toBe(1);
  });

  it('size', () => {
    const w = shallow(
      <Input size="large" />
    );
    expect(w.hasClass('el-input--large')).toBeTruthy();
  });

  it('type', () => {
    const w = shallow(
      <Input type="textarea" />
    );
    expect(w.hasClass('el-textarea')).toBeTruthy();
  });

  it('rows', () => {
    const w = shallow(
      <Input type="textarea" rows={3} />
    );
    expect(w.find('.el-textarea__inner').prop('rows')).toBe(3);
  });

  it('resize', () => {
    const w = shallow(
      <Input type="textarea" resize="both" />
    );
    expect(w.find('.el-textarea__inner').first().prop('style').resize).toBe('both');
  });

});
