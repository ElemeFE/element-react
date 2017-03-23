import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Progress extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/progress.md`);
  }
}
