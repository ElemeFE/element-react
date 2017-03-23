import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Upload extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/upload.md`);
  }
}
