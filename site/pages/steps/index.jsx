import Markdown from '../../../libs/markdown';

export default class Steps extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/steps.md`);
  }
}
