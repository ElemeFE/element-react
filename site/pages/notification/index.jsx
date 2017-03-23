import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Notification extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/notification.md`);
  }
}
