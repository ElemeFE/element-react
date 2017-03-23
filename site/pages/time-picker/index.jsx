import Markdown from '../../../libs/markdown';

import './style.scss';

export default class TimePicker extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/time-picker.md`);
  }
}
