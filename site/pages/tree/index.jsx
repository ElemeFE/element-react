import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Tree extends Markdown {
  document() {
    return require(`../../docs/${locale}/tree.md`);
  }
}
