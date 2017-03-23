import Markdown from '../../../libs/markdown';

export default class CustomTheme extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/custom-theme.md`);
  }
}
