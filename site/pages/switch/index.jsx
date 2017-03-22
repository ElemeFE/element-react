import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Switch extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/switch.md`);
  }
}
