import Markdown from '../../../libs/markdown';

export default class Radio extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/radio.md');
    }
  }
}
