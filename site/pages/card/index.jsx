import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Card extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/card.md`);
  }
}

Card.defaultProps = {
  imgSrc: require('./hamburger.png')
}
