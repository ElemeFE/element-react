import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Button extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/button.md');
      default:
        return require('../../docs/zh-CN/button.md');
    }
  }
}
