import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/tabs.md';

export default class Playground extends React.Component {
  render() {
    return <Markdown context={this} component="Tabs">{template}</Markdown>
  }
}
