import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Icon extends Markdown {
  document(locale) {
    switch (locale) {
      case 'en-US':
        return require('../../docs/en-US/icon.md');
      default:
        return require('../../docs/zh-CN/icon.md');
    }
  }
}

Icon.defaultProps = {
  iconList: require('./iconList')
};
