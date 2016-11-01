import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/color.md';

export default class Playground extends Component {
  render() {
    return <Markdown component="Color">{template}</Markdown>
  }
}
