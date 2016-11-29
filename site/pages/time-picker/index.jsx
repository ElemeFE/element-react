import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/time-picker.md';

import './style.scss';

export default class Playground extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Markdown context={this} component="time-picker">{template}</Markdown>
  }
}
