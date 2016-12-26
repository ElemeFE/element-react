import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Card extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/alert.md');
    }
  }
}

Card.defaultProps = {
  imgSrc: require('./hamburger.png')
}
