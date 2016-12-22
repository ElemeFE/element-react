import Markdown from '../../../libs/markdown';

export default class Tabs extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/tabs.md');
    }
  }
}
