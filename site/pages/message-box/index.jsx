import Markdown from '../../../libs/markdown';

import './style.scss';

export default class MessageBox extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/message-box.md`);
  }
}
