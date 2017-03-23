import Markdown from '../../../libs/markdown';
import './style.scss';

export default class DatePicker extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/date-picker.md`);
  }
}
