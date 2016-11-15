import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/popover.md';

import './style.scss';

export default class Playground extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  onDismiss() {
    this.setState({
      visible: false
    });
  }

  render() {
    return <Markdown context={this} component="Popover">{template}</Markdown>
  }
}
