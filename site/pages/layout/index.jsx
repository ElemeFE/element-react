import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Layout extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/layout.md`);
  }
}
