import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/menu.md';

import './style.scss';

export default class Playground extends React.Component {
  onSelect() {

  }

  onOpen() {

  }

  onClose() {

  }

  render() {
    return <Markdown context={this} component="Menu">{template}</Markdown>
  }
}
