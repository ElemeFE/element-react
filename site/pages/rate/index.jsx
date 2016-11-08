import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/rate.md';

import './style.scss';

export default class Playground extends React.Component {
  render() {
    return <Markdown context={this} component="Rate">{template}</Markdown>
  }
}
