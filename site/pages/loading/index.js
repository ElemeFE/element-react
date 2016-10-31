import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/loading.md';

export default class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullscreen: false
    }
  }

  render() {
    return <Markdown context={this} component="Loading">{template}</Markdown>
  }

  onClick() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.setState({
        fullscreen: false
      });
    }, 3000);

    this.setState({
      fullscreen: true
    });
  }
}
