import './style.scss';

import React from 'react';
import { Message, Button } from '../../../src';

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Message 消息提示</h2>
            <p>常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。</p>
            <h3>基础用法</h3>
            <p>从顶部出现，3 秒后自动消失。</p>
          </div>
          <div className="demo-content demo-message">
            <Button plain={true} onClick={this.onClick.bind(this, 'alpha', 'info')}>打开消息提示</Button>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>不同状态</h3>
            <p>用来显示「成功、警告、消息、错误」类的操作反馈。</p>
          </div>
          <div className="demo-content demo-message">
            <Button plain={true} onClick={this.onClick.bind(this, 'beta', 'success')}>成功</Button>
            <Button plain={true} onClick={this.onClick.bind(this, 'beta', 'warning')}>警告</Button>
            <Button plain={true} onClick={this.onClick.bind(this, 'beta', 'info')}>消息</Button>
            <Button plain={true} onClick={this.onClick.bind(this, 'beta', 'error')}>错误</Button>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>可关闭</h3>
            <p>可以添加关闭按钮。</p>
          </div>
          <div className="demo-content demo-message">
            <Button plain={true} onClick={this.onClick.bind(this, 'charlie', 'success', true)}>成功</Button>
            <Button plain={true} onClick={this.onClick.bind(this, 'charlie', 'warning', true)}>警告</Button>
            <Button plain={true} onClick={this.onClick.bind(this, 'charlie', 'info', true)}>消息</Button>
            <Button plain={true} onClick={this.onClick.bind(this, 'charlie', 'error', true)}>错误</Button>
          </div>
        </section>
      </div>
    )
  }

  onClick(id, type, showClose) {
    const message = {
      info: '这是一条消息提示',
      success: '恭喜你，这是一条成功消息',
      warning: '警告哦，这是一条警告消息',
      error: '错了哦，这是一条错误消息'
    }[type];

    switch (id) {
      case 'alpha':
        Message(message);
        break;
      case 'beta':
        Message({ message, type })
        break;
      case 'charlie':
        Message({ message, type, showClose })
        break;
      default:
        break;
    }
  }
}
