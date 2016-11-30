import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/steps.md';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  next() {
    let active = this.state.active + 1;
    if (active > 3) {
      active = 0;
    }
    this.setState({ active });
  }

  render() {
    return <Markdown context={this} component="Steps">{template}</Markdown>
  }
}
