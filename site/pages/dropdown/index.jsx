import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/dropdown.md';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Markdown context={this} component="Dropdown">{template}</Markdown>
  }
}
