import Markdown from '../../../libs/markdown';

import './style.scss';

export default class MessageBox extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/message-box.md');
      default:
        return require('../../docs/zh-CN/message-box.md');
    }
  }
}
