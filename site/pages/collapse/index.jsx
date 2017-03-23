import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Collapse extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/collapse.md`);
  }
}
