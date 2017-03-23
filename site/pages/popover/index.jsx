import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Popover extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/popover.md`);
  }
}
