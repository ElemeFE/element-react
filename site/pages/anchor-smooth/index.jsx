import Markdown from '../../../libs/markdown';

import './style.scss';

export default class AnchorSmooth extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/anchor-smooth.md`);
  }
}
