import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/table.md';

export default class Playground extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return <Markdown context={this} component="Table">{template}</Markdown>
  }
}