import './style.scss';

import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/notification.md';

import { Notification } from '../../../src';

export default class Playground extends React.Component {
  render() {
    return <Markdown context={this} component="Notification">{template}</Markdown>
  }

  onOpen(type) {
    switch (type) {
      case '1':
        Notification({
          title: '标题名称',
          message: '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'
        });
        break;
      case '2':
        Notification({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          duration: 0
        });
        break;
      case '3':
        Notification({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
        break;
      case '4':
        Notification({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
        break;
      case '5':
        Notification.info({
          title: '消息',
          message: '这是一条消息的提示消息'
        });
        break;
      case '6':
        Notification.error({
          title: '错误',
          message: '这是一条错误的提示消息'
        });
        break;
      default:
        break;
    }
  }
}
