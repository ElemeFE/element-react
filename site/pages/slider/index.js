import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/slider.md';

export default class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value1: 0,
      value2: 50,
      value3: 42,
      value4: 0,
      value5: 0,
      value6: 0
    }
  }

  render() {
    return <Markdown context={this} component="Slider">{template}</Markdown>
  }
}
