import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Select extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/select.md`);
  }
}
