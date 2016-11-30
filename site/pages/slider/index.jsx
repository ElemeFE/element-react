import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/slider.md';

import './style.scss';

export default class Playground extends React.Component {
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
