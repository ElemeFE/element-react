import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/input-number.md';

import './style.scss';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alpha: 1,
      beta: 1,
      charlie: 5
    }
  }

  onChange(type, event) {
    this.setState({
      [type]: event.target.value
    })
  }

  render() {
    return <Markdown context={this} component="InputNumber">{template}</Markdown>
  }
}
