import './style.scss';

import React from 'react';
import { MessageBox, Message, Button } from '../../../src';

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Message box 信息提示</h2>
            <p>模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、成功提示、错误提示、询问信息。</p>
            <h3>消息提示</h3>
            <p>当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。</p>
          </div>
          <div className="demo-content demo-message-box">
            <Button type="text" onClick={this.onClick.bind(this, 'alpha')}>点击打开 Message Box</Button>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>确认消息</h3>
            <p>提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。</p>
          </div>
          <div className="demo-content demo-message-box">
            <Button type="text" onClick={this.onClick.bind(this, 'beta')}>点击打开 Message Box</Button>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>提交内容</h3>
            <p>当用户进行操作时会被触发，中断用户操作，提示用户进行输入的对话框。</p>
          </div>
          <div className="demo-content demo-message-box">
            <Button type="text">点击打开 Message Box</Button>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>自定义</h3>
            <p>可自定义配置不同内容。</p>
          </div>
          <div className="demo-content demo-message-box">
            <Button type="text" onClick={this.onClick.bind(this, 'delta')}>点击打开 Message Box</Button>
          </div>
        </section>
      </div>
    )
  }

  onClick(type) {
    switch (type) {
      case 'alpha':
        MessageBox.alert('这是一段内容', '标题名称');
        break;
      case 'beta':
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          Message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });
        });
        break;
      case 'delta':
        MessageBox.msgbox({
          title: '消息',
          message: '这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容',
          showCancelButton: true
        }).then(action => {
          Message({
            type: 'info',
            message: 'action: ' + action
          });
        })
        break;
      default:
        break;
    }
  }
}
