import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Menu extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/menu.md');
      default:
        return require('../../docs/zh-CN/menu.md');
    }
  }
}
