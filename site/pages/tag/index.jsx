import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/tag.md';

import './style.scss';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [
        { key: 1, name: '标签一', type: '' },
        { key: 2, name: '标签二', type: 'gray' },
        { key: 5, name: '标签三', type: 'primary' },
        { key: 3, name: '标签四', type: 'success' },
        { key: 4, name: '标签五', type: 'warning' },
        { key: 6, name: '标签六', type: 'danger' }
      ]
    }
  }

  handleClose(tag) {
    const { tags } = this.state;

    tags.splice(tags.map(el => el.key).indexOf(tag.key), 1);

    this.setState({ tag });
  }

  render() {
    return <Markdown context={this} component="Tag">{template}</Markdown>
  }
}
