import Markdown from '../../../libs/markdown';

export default class QuickStart extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/quick-start.md');
    }
  }
}
