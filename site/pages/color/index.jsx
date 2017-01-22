import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Color extends Markdown {
  documentShouldTransform() {
    return false;
  }
  
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/color.md');
    }
  }
}
