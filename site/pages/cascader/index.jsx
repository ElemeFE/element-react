import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Cascader extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/cascader.md');
      default:
        return require('../../docs/zh-CN/cascader.md');
    }
  }
}
