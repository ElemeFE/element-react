import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Input extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/input.md`);
  }
}

Input.defaultProps = {
  customItem: require('./custom-item')
}
