/* @flow */

import { Component, PropTypes } from '../../libs';

export default class MixinComponent extends Component {
  parent(): Component {
    return this.context.component;
  }

  indexPath(): Array<number> {
    let path = [this.props.index];
    let parent = this.parent();

    while (parent.instanceType !== 'Menu') {
      if (parent.props.index) {
        path.unshift(parent.props.index);
      }

      parent = parent.parent();
    }

    return path;
  }

  rootMenu(): Component {
    let parent = this.parent();

    while (parent.instanceType !== 'Menu') {
      parent = parent.parent();
    }

    return parent;
  }
}

MixinComponent.contextTypes = {
  component: PropTypes.any
};
