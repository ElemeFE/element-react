import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Layout extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/layout.md');
      default:
        return require('../../docs/zh-CN/layout.md');
    }
  }
}
