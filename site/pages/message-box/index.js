import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/message-box.md';

import { MessageBox, Message } from '../../../src';

export default class Playground extends React.Component {
  render() {
    return <Markdown context={this} component="MessageBox">{template}</Markdown>
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
      case 'charlie':
        MessageBox.prompt('请输入邮箱', '提示', {
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          Message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          Message({
            type: 'info',
            message: '取消输入'
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
