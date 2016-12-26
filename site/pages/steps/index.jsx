import Markdown from '../../../libs/markdown';

export default class Steps extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/steps.md');
    }
  }
}
