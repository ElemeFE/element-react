import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Cascader extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/cascader.md`);
  }
}
