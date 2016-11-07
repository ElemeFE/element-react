import './style.scss';

import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/message.md';

import { Message } from '../../../src';

export default class Playground extends React.Component {
  render() {
    return <Markdown context={this} component="Message">{template}</Markdown>
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
