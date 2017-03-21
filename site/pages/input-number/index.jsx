import Markdown from '../../../libs/markdown';

import './style.scss';

export default class InputNumber extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/input-number.md');
      default:
        return require('../../docs/zh-CN/input-number.md');
    }
  }
}
