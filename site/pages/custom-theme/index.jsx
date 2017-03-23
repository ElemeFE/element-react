import Markdown from '../../../libs/markdown';

export default class CustomTheme extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/custom-theme.md');
      default:
        return require('../../docs/zh-CN/custom-theme.md');
    }
  }
}
