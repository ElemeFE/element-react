import './style.scss';
import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/checkbox.md';

export default class Playground extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Markdown context={this} component="CheckBox">{template}</Markdown>
  }
}