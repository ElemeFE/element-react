import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Icon extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/icon.md`);
  }
}

Icon.defaultProps = {
  iconList: require('./iconList')
};
