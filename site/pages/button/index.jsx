import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Button extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/button.md');
    }
  }
}
