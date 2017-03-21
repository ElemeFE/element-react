import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Form extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/form.md');
      default:
        return require('../../docs/zh-CN/form.md');
    }
  }
}
