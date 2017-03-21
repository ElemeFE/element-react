import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Checkbox extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/checkbox.md');
      default:
        return require('../../docs/zh-CN/checkbox.md');
    }
  }
}
