import Markdown from '../../../libs/markdown';

export default class Breadcrumb extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/breadcrumb.md`);
  }
}
