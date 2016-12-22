import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Loading extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/loading.md');
    }
  }
}
