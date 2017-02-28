import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Carousel extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/carousel.md');
    }
  }
}
