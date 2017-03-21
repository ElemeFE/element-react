import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Loading extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/loading.md');
      default:
        return require('../../docs/zh-CN/loading.md');
    }
  }
}
