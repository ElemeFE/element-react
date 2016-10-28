import './style.scss';

import React from 'react';
import { Component, Markdown } from '../../../libs';
import template from './README.md';

export default class Playground extends Component {
  render() {
    return <Markdown context={this} component="Button">{template}</Markdown>
  }
}
