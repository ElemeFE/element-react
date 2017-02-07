import Markdown from '../../../libs/markdown';

export default class Breadcrumb extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/breadcrumb.md');
    }
  }
}
