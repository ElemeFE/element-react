import React from 'react';
import { Markdown } from '../../../libs';
import template from '../../docs/zh-CN/upload.md';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePreview() {
    console.log('preview');
  }

  handleRemove() {
    console.log('remove');
  }

  handleSuccess() {
    console.log('success');
  }

  handleError() {
    console.log('error');
  }

  render() {
    return <Markdown context={this} component="Upload">{template}</Markdown>
  }
}
