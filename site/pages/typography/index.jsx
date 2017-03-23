import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Typography extends Markdown {
  documentShouldTransform() {
    return false;
  }

  document(locale) {
    return require(`../../docs/${locale}/typography.md`);
  }
}
