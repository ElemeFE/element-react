import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Slider extends Markdown {
  document(locale) {
    switch (locale) {
      default:
        return require('../../docs/zh-CN/slider.md');
    }
  }
}
