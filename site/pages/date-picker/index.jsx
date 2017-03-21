import Markdown from '../../../libs/markdown';
import './style.scss';

export default class DatePicker extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/date-picker.md');
      default:
        return require('../../docs/zh-CN/date-picker.md');
    }
  }
}
