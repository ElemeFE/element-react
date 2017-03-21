import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Badge extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/badge.md');
      default:
        return require('../../docs/zh-CN/badge.md');
    }
  }
}
