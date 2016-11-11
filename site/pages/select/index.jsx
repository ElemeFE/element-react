import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/select.md';

import './style.scss';

export default class Playground extends React.Component {
  render() {
    return <Markdown context={this} component="Select">{template}</Markdown>
  }
}
