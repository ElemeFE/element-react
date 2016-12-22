import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Badge extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/badge.md');
    }
  }
}
