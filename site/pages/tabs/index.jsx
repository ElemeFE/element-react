import Markdown from '../../../libs/markdown';

export default class Tabs extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/tabs.md`);
  }
}
