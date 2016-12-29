import Markdown from '../../../libs/markdown';

import './style.scss';

export default class i18n extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/i18n.md');
    }
  }
}
