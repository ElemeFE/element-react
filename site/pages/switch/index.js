import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/switch.md';

export default class Playground extends Component {
  render() {
    return <Markdown context={this} component="Switch">{template}</Markdown>
  }
}