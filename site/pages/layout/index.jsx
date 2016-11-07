import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/layout.md';

import './style.scss';

export default class Playground extends React.Component {
  render() {
    return <Markdown context={this} component="Layout">{template}</Markdown>
  }
}
