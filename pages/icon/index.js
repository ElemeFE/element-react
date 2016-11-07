import './style.scss';

import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/icon.md';

import iconList from './iconList'

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: iconList
    }
  }

  render() {
    return <Markdown context={this} component="Icon">{template}</Markdown>
  }
}
