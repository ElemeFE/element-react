import Markdown from '../../../libs/markdown';

export default class Install extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/install.md');
    }
  }
}
