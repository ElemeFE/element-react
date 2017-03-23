import Markdown from '../../../libs/markdown';

export default class QuickStart extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/quick-start.md`);
  }
}
