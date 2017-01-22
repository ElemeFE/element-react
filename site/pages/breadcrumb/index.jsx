import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Breadcrumb extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/breadcrumb.md');
    }
  }
}
