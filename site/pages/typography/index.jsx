import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Typography extends Markdown {
  documentShouldTransform() {
    return false;
  }
  
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/typography.md');
    }
  }
}
