import Markdown from '../../../libs/markdown';

import './style.scss';

export default class GoTop extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/go-top.md`);
  }
}
