import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Table extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/table.md`);
  }
}
