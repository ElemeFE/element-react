import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/pagination.md';

import './style.scss';

export default class Playground extends React.Component {
  render() {
    return <Markdown context={this} component="Pagination">{template}</Markdown>
  }
}
