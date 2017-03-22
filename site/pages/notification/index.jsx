import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Notification extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/notification.md');
      default:
        return require('../../docs/zh-CN/notification.md');
    }
  }
}
