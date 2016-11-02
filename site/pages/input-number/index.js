import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/input-number.md';

import { MessageBox, Message } from '../../../src';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alpha: 1,
      beta: 1,
      charlie: 5
    }
  }
  render() {
    return <Markdown context={this} component="InputNumber">{template}</Markdown>
  }

  onChange(type, event) {
    this.setState({
      [type]: event.target.value
    })
  }
}
