import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class MixinComponent extends Component {
  indexPath() {
    let path = [this.props.index];
    let parent = this.parent();

    while (parent.constructor.name !== 'Menu') {
      if (parent.props.index) {
        path.unshift(parent.props.index);
      }

      parent = parent.parent();
    }

    return path;
  }

  rootMenu() {
    let parent = this.parent();

    while (parent.constructor.name !== 'Menu') {
      parent = parent.parent();
    }

    return parent;
  }
}

MixinComponent.propTypes = {
  index: PropTypes.string.isRequired
};
