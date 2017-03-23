import Markdown from '../../../libs/markdown';

import './style.scss';

export default class InputNumber extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/input-number.md`);
  }
}
