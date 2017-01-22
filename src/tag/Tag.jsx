import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

export default class Tag extends Component {
  constructor(props) {
    super(props);

    this.duration = 200;

    this.state = {
      visible: true
    };
  }

  handleClose() {
    this.setState({
      visible: false
    }, () => {
      setTimeout(() => {
        if (this.props.onClose) {
          this.props.onClose();
        }
      }, this.duration);
    });
  }

  render() {
    const { type, hit, closable, closeTransition } = this.props;

    return(
      <Transition name={closeTransition ? '' : 'el-zoom-in-center'} duration={this.duration}>
        <View key={this.state.visible} show={this.state.visible}>
          <span style={this.style()} className={this.className('el-tag', type && `el-tag--${type}`, {
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
