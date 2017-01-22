import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Table extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/table.md');
    }
  }
}
