import './style.scss';

import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/card.md';

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
