import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Layout extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/layout.md');
    }
  }
}
