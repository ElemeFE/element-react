import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/tooltip.md';

export default class Playground extends Component {
  constructor(props){
    super(props);

    this.state = {
      disabled: false
    }
  }

  render() {
    return <Markdown context={this} component="Tooltip">{template}</Markdown>
  }
}
