import React from 'react';
import { Markdown } from '../../../libs';
// import template from '../../docs/zh-CN/alert.md';

import './style.scss';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    require(['../../docs/zh-CN/alert.md', '../../docs/en-US/alert.md'], this.setTemplate.bind(this))
  }

  setTemplate(zh_CN, en_US) {
    const template = {
      'zh-CN': zh_CN,
      'en-US': en_US
    }[navigator.language] || zh_CN;

    this.setState({ template });
  }

  getTemplate() {

  }

  render() {
    return <Markdown context={this} component="Alert">{this.state.template}</Markdown>
  }
}
