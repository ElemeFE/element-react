import Markdown from '../../../libs/markdown';

import './style.scss';

export default class MessageBox extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/message-box.md');
    }
  }
}
