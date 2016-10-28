import './style.scss';

import React, { Component } from 'react';

import { Markdown } from '../../../libs';
import { Alert } from '../../../src';

import template from './README.md';

export default class Playground extends Component {
  render() {
    return <Markdown scope={this} component="Alert">{template}</Markdown>
  }
}
