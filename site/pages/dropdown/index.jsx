import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/dropdown.md';

import './style.scss';

export default class Playground extends React.Component {
  handleClick() {
    alert('button click');
  }

  render() {
    return <Markdown context={this} component="Dropdown">{template}</Markdown>
  }
}
