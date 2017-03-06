import Markdown from '../../../libs/markdown';

import './style.scss';

export default class ColorPicker extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/color-picker.md');
    }
  }
}
