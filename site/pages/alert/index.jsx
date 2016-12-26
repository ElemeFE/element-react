import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Alert extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/alert.md');
      default:
        return require('../../docs/zh-CN/alert.md');
    }
  }
}
