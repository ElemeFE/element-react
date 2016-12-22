import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Input extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/input.md');
    }
  }
}

Input.defaultProps = {
  customItem: require('./custom-item')
}
