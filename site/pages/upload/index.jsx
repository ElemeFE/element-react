import Markdown from '../../../libs/markdown';

export default class Upload extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/upload.md');
    }
  }
}
