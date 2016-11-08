import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/dialog.md';

import './style.scss';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false
    };
  }

  render() {
    return <Markdown context={this} component="Dialog">{template}</Markdown>
  }
}
