import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Alert extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/alert.md`);
  }
}
