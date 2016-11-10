import React from 'react';
import { Component, PropTypes, Transition } from '../../libs';

export default class Tag extends Component {

  render() {
    return(
      <Transition name={'md-fade-center'} duration="200">
        <span>
          <i className="el-tag__close el-icon-close" click="handleClose"></i>
        </span>
      </Transition>
    )
  }
}

Tag.propTypes = {
  text: PropTypes.string,
  closable: PropTypes.bool,
  type: PropTypes.string,
  hit: PropTypes.bool,
  closeTransition: PropTypes.bool,
}

Tag.defaultProps = {

}
