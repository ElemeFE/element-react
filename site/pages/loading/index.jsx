import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Loading extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/loading.md`);
  }
}
