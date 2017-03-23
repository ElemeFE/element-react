import Markdown from '../../../libs/markdown';

export default class Installation extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/installation.md`);
  }
}
