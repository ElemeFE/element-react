import Markdown from '../../../libs/markdown';

import './style.scss';

export default class TimePicker extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/time-picker.md');
    }
  }
}
