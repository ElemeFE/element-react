import React from 'react';
import { Tabs } from '../../../src';

import './style.scss';

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Tabs 标签页</h2>
            <p>分隔内容上有关联但属于不同类别的数据集合。</p>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>基础用法</h3>
            <p>基础的、简洁的标签页。</p>
          </div>
          <div className="demo-content">
            <Tabs activeName="1">
              <Tabs.Pane label="用户管理" name="1">用户管理</Tabs.Pane>
              <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
              <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
              <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
            </Tabs>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>选项卡样式</h3>
            <p>选项卡样式的标签页。</p>
          </div>
          <div className="demo-content">
            <Tabs type="card" activeName="1">
              <Tabs.Pane label="用户管理" name="1">用户管理</Tabs.Pane>
              <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
              <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
              <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
            </Tabs>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>可关闭</h3>
            <p>可以关闭标签页。</p>
          </div>
          <div className="demo-content">
            
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>卡片化</h3>
            <p>卡片化的标签页。</p>
          </div>
          <div className="demo-content">
            <Tabs type="border-card" activeName="1">
              <Tabs.Pane label="用户管理" name="1">用户管理</Tabs.Pane>
              <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
              <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
              <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
            </Tabs>
          </div>
        </section>
      </div>
    )
  }
}
