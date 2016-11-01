import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/typography.md';

export default class Playground extends Component {
  render() {
    return <Markdown component="Typography">{template}</Markdown>
  }
}
