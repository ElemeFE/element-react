import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Carousel extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/carousel.md`);
  }
}
