import './style.scss';

import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/alert.md';

export default class Playground extends React.Component {
  render() {
    return <Markdown context={this} component="Alert">{template}</Markdown>
  }
}
