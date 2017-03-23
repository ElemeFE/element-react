import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Message extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/message.md`);
  }
}
