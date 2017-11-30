import React from 'react';
import { mount, render } from 'enzyme';

import Layout from '../';

describe('Layout test', () => {
  it('Basic layout', () => {
    const w1 = mount(
      <Layout.Row>
        <Layout.Col span="24"><div className="grid-content bg-purple-dark"></div></Layout.Col>
      </Layout.Row>
    );
    const w2 = mount(
      <Layout.Row>
        <Layout.Col span="12"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="12"><div className="grid-content bg-purple-light"></div></Layout.Col>
      </Layout.Row>
    );
    const w3 = mount(
      <Layout.Row>
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="8"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    const w4 = mount(
      <Layout.Row>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
      </Layout.Row>
    );
    const w5 = mount(
      <Layout.Row>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple-light"></div></Layout.Col>
      </Layout.Row>
    );
    const w6 = mount(
      <Layout.Row>
        <Layout.Col span="0"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    expect(w1.find('.el-row .el-col-24 .grid-content').exists()).toBeTruthy();
    expect(w1.find('.el-row .el-col-24').length).toBe(1);
    expect(w2.find('.el-row .el-col-12').length).toBe(2);
    expect(w3.find('.el-row .el-col-8').length).toBe(3);
    expect(w4.find('.el-row .el-col-6').length).toBe(4);
    expect(w5.find('.el-row .el-col-4').length).toBe(6);
    expect(w6.find('.el-row .el-col-0').length).toBe(1);
  });

  it('Column spacing', () => {
    const w = mount(
      <Layout.Row gutter="20">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    expect(w.find('.el-row .el-col-6').length).toBe(4);
    expect(w.find('.el-row .el-col-6').at(0).prop('style').paddingLeft).toBe('10px');
    expect(w.find('.el-row .el-col-6').at(0).prop('style').paddingRight).toBe('10px');
  })

  it('Hybrid layout', () => {
    const w1 = mount(
      <Layout.Row gutter="20">
        <Layout.Col span="16"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    const w2 = mount(
      <Layout.Row gutter="20">
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    const w3 = mount(
      <Layout.Row gutter="20">
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="16"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    expect(w1.find('.el-row .el-col-16').length).toBe(1);
    expect(w1.find('.el-row .el-col-8').length).toBe(1);

    expect(w2.find('.el-row .el-col-8').length).toBe(2);
    expect(w2.find('.el-row .el-col-4').length).toBe(2);

    expect(w3.find('.el-row .el-col-16').length).toBe(1);
    expect(w3.find('.el-row .el-col-4').length).toBe(2);
  })

  it('Column offset', () => {
    const w1 = mount(
      <Layout.Row gutter="20">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6" offset="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    const w2 = mount(
      <Layout.Row gutter="20">
        <Layout.Col span="6" offset="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6" offset="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    const w3 = mount(
      <Layout.Row gutter="20">
        <Layout.Col span="12" offset="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    expect(w1.find('.el-row .el-col-6').length).toBe(2);
    expect(w1.find('.el-row .el-col-6.el-col-offset-6').length).toBe(1);
    expect(w2.find('.el-row .el-col-6.el-col-offset-6').length).toBe(2);
    expect(w3.find('.el-row .el-col-12.el-col-offset-6').length).toBe(1);
  });

  it('Alignment', () => {
    const w1 = render(
      <Layout.Row type="flex" className="row-bg">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    const w2 = render(
      <Layout.Row type="flex" className="row-bg" justify="center">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    const w3 = render(
      <Layout.Row type="flex" className="row-bg" justify="end">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    const w4 = render(
      <Layout.Row type="flex" className="row-bg" justify="space-between">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    const w5 = render(
      <Layout.Row type="flex" className="row-bg" justify="space-around">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    expect(w1.hasClass('el-row--flex')).toBeTruthy();
    expect(w2.hasClass('is-justify-center')).toBeTruthy();
    expect(w3.hasClass('is-justify-end')).toBeTruthy();
    expect(w4.hasClass('is-justify-space-between')).toBeTruthy();
    expect(w5.hasClass('is-justify-space-around')).toBeTruthy();
  });

  it('Responsive Layout', () => {
    const w = mount(
      <Layout.Row gutter="10">
        <Layout.Col xs="8" sm="6" md="4" lg="3"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col xs="4" sm="6" md="8" lg="9"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col xs="4" sm="6" md="8" lg="9"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col xs="8" sm="6" md="4" lg="3"><div className="grid-content bg-purple-light"></div></Layout.Col>
      </Layout.Row>
    );
    const w1 = mount(
      <Layout.Row gutter="10">
        <Layout.Col xs="0" sm="6" md="4" lg="3"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    expect(w.find('.el-col-24.el-col-xs-8.el-col-sm-6.el-col-md-4.el-col-lg-3').length).toBe(2);
    expect(w.find('.el-col-24.el-col-xs-4.el-col-sm-6.el-col-md-8.el-col-lg-9').length).toBe(2);
    expect(w1.find('.el-col-24.el-col-xs-0.el-col-sm-6.el-col-md-4.el-col-lg-3').length).toBe(1);
  });

  it('Row custom tag', () => {
    const w = mount(
      <Layout.Row tag="section">
        <Layout.Col span="24"><div className="grid-content bg-purple-dark"></div></Layout.Col>
      </Layout.Row>
    );
    expect(w.find('section').length).toBe(1);
  });

  it('Column custom tag', () => {
    const w = mount(
      <Layout.Row>
        <Layout.Col tag="section" span="24"><div className="grid-content bg-purple-dark"></div></Layout.Col>
      </Layout.Row>
    );
    expect(w.find('.el-row section.el-col-24').length).toBe(1);
  });

  it('Row with align', () => {
    const w1 = render(
      <Layout.Row type="flex" align="middle" className="row-bg">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    const w2 = render(
      <Layout.Row type="flex" align="bottom" className="row-bg">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    expect(w1.hasClass('is-align-middle')).toBeTruthy();
    expect(w2.hasClass('is-align-bottom')).toBeTruthy();
  });

  it('Column with push', () => {
    const w = mount(
      <Layout.Row gutter="20">
        <Layout.Col span="12" push="12"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    expect(w.find('.el-col-12').hasClass('el-col-push-12')).toBeTruthy();
  });

  it('Column with pull', () => {
    const w = mount(
      <Layout.Row gutter="20">
        <Layout.Col span="12" pull={12}><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    );
    expect(w.find('.el-col-12').hasClass('el-col-pull-12')).toBeTruthy();
  });
});
