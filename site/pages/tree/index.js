import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/tree.md';

export default class Playground extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return <Markdown context={this} component="Tree">{template}</Markdown>
  }
}
