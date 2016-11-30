import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/color.md';

import './style.scss';

export default class Playground extends React.Component {
  render() {
    return <Markdown component="Color">{template}</Markdown>
  }
}
