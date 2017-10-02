import React from 'react';
import { shallow, mount } from 'enzyme';

import Breadcrumb from '../';

describe('Breadcrumb test', () => {
  it('basic usage', () => {
    const w = shallow(
      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>活动管理</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(w.is('.el-breadcrumb')).toBe(true);
  });

  it('test children', () => {
    const w = mount(
      <Breadcrumb separator="">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>活动管理</Breadcrumb.Item>
        <Breadcrumb.Item>活动列表</Breadcrumb.Item>
        <Breadcrumb.Item>活动详情</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(w.find('.el-breadcrumb__item').length).toBe(4);
  });

  it('test separator', () => {
    const w = mount(
      <Breadcrumb separator="/">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>活动管理</Breadcrumb.Item>
        <Breadcrumb.Item>活动列表</Breadcrumb.Item>
        <Breadcrumb.Item>活动详情</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(w.find('.el-breadcrumb__separator').at(0).text()).toBe('/');
  });
});
