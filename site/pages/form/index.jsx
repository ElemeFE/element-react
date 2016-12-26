import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Form extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/form.md');
    }
  }
}
