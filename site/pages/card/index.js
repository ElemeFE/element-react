import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from '../../docs/zh-CN/card.md';

import { Card } from '../../../src';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgSrc: require('./hamburger.png')
    }
  }

  render() {
    return <Markdown context={this} component="Card">{template}</Markdown>
  }
}
