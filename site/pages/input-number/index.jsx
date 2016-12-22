import Markdown from '../../../libs/markdown';

import './style.scss';

export default class InputNumber extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/input-number.md');
    }
  }
}
