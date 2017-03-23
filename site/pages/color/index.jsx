import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Color extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/color.md`);
  }
}
