import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Tag extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/tag.md`);
  }
}
