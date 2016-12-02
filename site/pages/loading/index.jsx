import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/loading.md';

import './style.scss';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullscreen: false
    }
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

  render() {
    return <Markdown context={this} component="Loading">{template}</Markdown>
  }
}
