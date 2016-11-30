import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/tooltip.md';

import './style.scss';

export default class Playground extends React.Component {
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
