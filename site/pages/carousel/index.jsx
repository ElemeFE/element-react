import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Carousel extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/carousel.md');
      default:
        return require('../../docs/zh-CN/carousel.md');
    }
  }
}
