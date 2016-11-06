import './style.scss';

import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/menu.md';

export default class Playground extends React.Component {
  render() {
    return <Markdown context={this} component="Menu">{template}</Markdown>
  }

  onSelect() {

  }

  onOpen() {

  }

  onClose() {

  }
}
