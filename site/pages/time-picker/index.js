import './style.scss';

import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/time-picker.md';

export default class Playground extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Markdown context={this} component="time-picker">{template}</Markdown>
  }
}
