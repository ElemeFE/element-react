import Markdown from '../../../libs/markdown';

import './style.scss';

export default class ColorPicker extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/color-picker.md`);
  }
}
