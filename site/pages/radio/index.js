import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/radio.md';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alpha: 1,
      charlie: 3,
      delta: '北京'
    }
  }

  render() {
    return <Markdown context={this} component="Radio">{template}</Markdown>
  }

  onChange(type, event, value) {
    switch (type) {
      case 'alpha':
        this.setState({ alpha: event.target.checked && value }); break;
      case 'charlie':
        this.setState({ charlie: event.target.value }); break;
      case 'delta':
        this.setState({ delta: event.target.value }); break;
      default:
        break;
    }
  }
}
