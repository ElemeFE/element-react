import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Dialog extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/dialog.md');
      default:
        return require('../../docs/zh-CN/dialog.md');
    }
  }
}
