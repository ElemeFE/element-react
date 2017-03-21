import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Card extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/card.md');
      default:
        return require('../../docs/zh-CN/card.md');
    }
  }
}

Card.defaultProps = {
  imgSrc: require('./hamburger.png')
}
