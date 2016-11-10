import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

export default class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };
  }

  handleClose() {
    this.setState({
      visible: false
    }, () => {
      if (this.props.onClose) {
        this.props.onClose();
      }
    });
  }

  render() {
    const { type, hit, closable, closeTransition } = this.props;

    return(
      <Transition name={closeTransition ? '' : 'md-fade-center'} duration="200">
        <View key={Math.random()} show={this.state.visible}>
          <span className={this.classNames('el-tag', type && `el-tag--${type}`, {
            'is-hit': hit
          })}>
            {this.props.children}
            { closable && <i className="el-tag__close el-icon-close" onClick={this.handleClose.bind(this)}></i> }
          </span>
        </View>
      </Transition>
    )
  }
}

Tag.propTypes = {
  closable: PropTypes.bool,
  type: PropTypes.string,
  hit: PropTypes.bool,
  closeTransition: PropTypes.bool,
  onClose: PropTypes.func
}
