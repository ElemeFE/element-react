import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Pagination extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/pagination.md');
    }
  }
}
