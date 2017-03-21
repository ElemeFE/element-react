import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Dropdown extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/dropdown.md');
      default:
        return require('../../docs/zh-CN/dropdown.md');
    }
  }
}
