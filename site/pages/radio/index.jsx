import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Radio extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/radio.md`);
  }
}
