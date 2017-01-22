import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Dialog extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/dialog.md');
    }
  }
}
