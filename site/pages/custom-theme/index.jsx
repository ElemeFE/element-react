import Markdown from '../../../libs/markdown';

export default class CustomTheme extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/custom-theme.md');
    }
  }
}
