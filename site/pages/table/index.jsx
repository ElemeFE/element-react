import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/table.md';

import './style.scss';

export default class Playground extends Component {
  ender() {
    return <Markdown context={this} component="Table">{template}</Markdown>
  }
}
