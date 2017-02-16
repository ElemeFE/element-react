import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Message extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/message.md');
    }
  }
}
