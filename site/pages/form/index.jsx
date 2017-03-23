import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Form extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/form.md`);
  }
}
