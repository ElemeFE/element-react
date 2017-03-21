import Markdown from '../../../libs/markdown';

export default class Breadcrumb extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/breadcrumb.md');
      default:
        return require('../../docs/zh-CN/breadcrumb.md');
    }
  }
}
