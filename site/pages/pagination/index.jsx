import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Pagination extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/pagination.md`);
  }
}
