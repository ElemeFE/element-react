import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Message extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/message.md');
      default:
        return require('../../docs/zh-CN/message.md');
    }
  }
}
