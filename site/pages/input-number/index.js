import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/input-number.md';

import { MessageBox, Message } from '../../../src';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1
    }
  }
  render() {
    return <Markdown context={this} component="InputNumber">{template}</Markdown>
  }

  onChange() {

  }
}
