import './style.scss';

import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/typography.md';

export default class Playground extends React.Component {
  render() {
    return <Markdown component="Typography">{template}</Markdown>
  }
}
