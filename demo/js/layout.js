import React from 'react';
import { Layout } from '../../src';

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Layout 布局</h2>
            <p>通过基础的 24 分栏，迅速简便地创建布局。</p>
            <h3>基础布局</h3>
            <p>使用单一分栏创建基础的栅格布局。</p>
          </div>
          <div className="demo-content demo-layout">
            <Layout.Row>
              <Layout.Col span={24}><div className="grid-content bg-purple-dark"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row>
              <Layout.Col span={12}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={12}><div className="grid-content bg-purple-light"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row>
              <Layout.Col span={8}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={8}><div className="grid-content bg-purple-light"></div></Layout.Col>
              <Layout.Col span={8}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple-light"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple-light"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row>
              <Layout.Col span={4}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={4}><div className="grid-content bg-purple-light"></div></Layout.Col>
              <Layout.Col span={4}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={4}><div className="grid-content bg-purple-light"></div></Layout.Col>
              <Layout.Col span={4}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={4}><div className="grid-content bg-purple-light"></div></Layout.Col>
            </Layout.Row>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>分栏间隔</h3>
            <p>分栏之间存在间隔。</p>
          </div>
          <div className="demo-content demo-layout">
            <Layout.Row gutter={20}>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>混合布局</h3>
            <p>通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。</p>
          </div>
          <div className="demo-content demo-layout">
            <Layout.Row gutter={20}>
              <Layout.Col span={16}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={8}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row gutter={20}>
              <Layout.Col span={8}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={8}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={4}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={4}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row gutter={20}>
              <Layout.Col span={4}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={16}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={4}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>分栏偏移</h3>
            <p>支持偏移指定的栏数。</p>
          </div>
          <div className="demo-content demo-layout">
            <Layout.Row gutter={20}>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6} offset={6}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row gutter={20}>
              <Layout.Col span={6} offset={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6} offset={6}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row gutter={20}>
              <Layout.Col span={12} offset={6}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>对齐方式</h3>
            <p>对分栏进行灵活的对齐。</p>
          </div>
          <div className="demo-content demo-layout">
            <Layout.Row type="flex" className="row-bg">
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple-light"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row type="flex" className="row-bg" justify="center">
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple-light"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row type="flex" className="row-bg" justify="end">
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple-light"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row type="flex" className="row-bg" justify="space-between">
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple-light"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
            <Layout.Row type="flex" className="row-bg" justify="space-around">
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple-light"></div></Layout.Col>
              <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
            </Layout.Row>
          </div>
        </section>
      </div>
    )
  }
}
