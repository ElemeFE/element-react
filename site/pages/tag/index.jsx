import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Tag extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/tag.md');
    }
  }
}
