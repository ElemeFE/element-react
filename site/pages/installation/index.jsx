import Markdown from '../../../libs/markdown';

export default class Installation extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/installation.md');
      default:
        return require('../../docs/zh-CN/installation.md');
    }
  }
}
