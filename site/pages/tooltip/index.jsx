import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Tooltip extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/tooltip.md`);
  }
}
