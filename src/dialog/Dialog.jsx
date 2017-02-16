import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bodyOverflow: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.willOpen(this.props, nextProps)){
      if (this.props.lockScroll) {
        if (!this.state.bodyOverflow) {
          this.setState({
            bodyOverflow: document.body.style.overflow
          });
        }
        document.body.style.overflow = 'hidden';
      }
    }

    if (this.willClose(this.props, nextProps) && this.props.lockScroll) {
      if (this.props.modal && this.state.bodyOverflow !== 'hidden') {
        document.body.style.overflow = this.state.bodyOverflow;
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.willOpen(prevProps, this.props)){
      this.refs.wrap.focus();
    }
  }

  componentWillUnmount() {
    document.body.style.removeProperty('overflow');
  }

  onKeyDown(e) {
    if (this.props.closeOnPressEscape && e.keyCode === 27) {
      this.close(e);
    }
  }

  handleWrapperClick(e) {
    if (this.props.closeOnClickModal && e.target === e.currentTarget) {
      this.close(e);
    }
  }

  close(e) {
    this.props.onCancel(e);
  }

  willOpen(prevProps, nextProps) {
    return (!prevProps.visible && nextProps.visible);
  }

  willClose(prevProps, nextProps) {
    return (prevProps.visible && !nextProps.visible);
  }

  render() {
    const { visible, title, size, top, modal, customClass } = this.props;

    return (
      <View show={ visible }>
        <div
          style={this.style({ zIndex: 1013 })}
          className={this.className('el-dialog__wrapper')}
          onClick={ e => this.handleWrapperClick(e) }
          ref="wrap"
          tabIndex={ -1 }
          onKeyDown={ e => this.onKeyDown(e) }
        >
          <div
            ref="dialog"
            className={ this.classNames("el-dialog", `el-dialog--${ size }`, customClass) }
            style={ size === 'full' ?  {} : { 'marginBottom': '50px', 'top': top }}
          >
            <div className="el-dialog__header">
              <span className="el-dialog__title">{ title }</span>
              <div className="el-dialog__headerbtn">
                <i className="el-dialog__close el-icon el-icon-close" onClick={ e => this.close(e) }></i>
              </div>
            </div>
            { this.props.children }
          </div>
        </div>
        <View show={ modal } transition="v-modal" transitionKey="dialog-v-modal">
          <div className="v-modal" style={{ zIndex: 1012 }}></div>
        </View>
      </View>
    );
  }
}

Dialog.propTypes = {
  // 控制对话框是否可见
  visible: PropTypes.bool.isRequired,
  // 标题
  title: PropTypes.string,
  // 大小 (tiny/small/large/full)
  size: PropTypes.string,
  // top 值（仅在 size 不为 full 时有效）
  top: PropTypes.string,
  // 控制遮罩层展示
  modal: PropTypes.bool,
  // Dialog 的自定义类名
  customClass: PropTypes.string,
  // 是否在 Dialog 出现时将 body 滚动锁定
  lockScroll: PropTypes.bool,
  // 是否可以通过点击 modal 关闭 Dialog
  closeOnClickModal: PropTypes.bool,
  // 是否可以通过按下 ESC 关闭 Dialog
  closeOnPressEscape: PropTypes.bool,
  // 点击遮罩层或右上角叉或取消按钮的回调
  onCancel: PropTypes.func.isRequired
};

Dialog.defaultProps = {
  visible: false,
  title: '',
  size: 'small',
  top: '15%',
  modal: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true
};
