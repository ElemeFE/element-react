import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/typography.md';

import './style.scss';

export default class Playground extends React.Component {
  render() {
    return <Markdown component="Typography">{template}</Markdown>
  }
}
