import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Slider extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/slider.md`);
  }
}
