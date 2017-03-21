import Markdown from '../../../libs/markdown';

import './style.scss';

export default class ColorPicker extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/color-picker.md');
      default:
        return require('../../docs/zh-CN/color-picker.md');
    }
  }
}
