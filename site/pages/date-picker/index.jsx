import Markdown from '../../../libs/markdown';
import './style.scss';

export default class DatePicker extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/date-picker.md');
    }
  }
}
