/* @flow */

import React from 'react';
import { Component, View, Transition, PropTypes } from '../../libs';

type State = {
  bodyOverflow: string,
}

export default class Dialog extends Component {
  state: State;

  static defaultProps = {
    visible: false,
    title: '',
    size: 'small',
    top: '15%',
    modal: true,
    lockScroll: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    showClose: true
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      bodyOverflow: ''
    }
  }

  componentWillReceiveProps(nextProps: Object): void {

      if (this.willOpen(this.props, nextProps)){
        if (this.props.lockScroll && document.body && document.body.style) {
          if (!this.state.bodyOverflow) {
            this.setState({
              bodyOverflow: document.body.style.overflow
            });
          }
          document.body.style.overflow = 'hidden';
        }
      }

      if (this.willClose(this.props, nextProps) && this.props.lockScroll) {
        if (this.props.modal && this.state.bodyOverflow !== 'hidden' && document.body && document.body.style) {
          document.body.style.overflow = this.state.bodyOverflow;
        }
      }

  }

  componentDidUpdate(prevProps: Object): void {
    if (this.willOpen(prevProps, this.props)){
      this.refs.wrap.focus();
    }
  }

  componentWillUnmount(): void {
    if (this.props.lockScroll && document.body && document.body.style) {
      document.body.style.removeProperty('overflow');
    }
  }

  onKeyDown(e: SyntheticKeyboardEvent): void {
    if (this.props.closeOnPressEscape && e.keyCode === 27) {
      this.close(e);
    }
  }

  handleWrapperClick(e: SyntheticEvent): void {
    if (e.target instanceof HTMLDivElement) {
      if (this.props.closeOnClickModal && e.target === e.currentTarget) {
        this.close(e);
      }
    }
  }

  close(e: SyntheticEvent | SyntheticKeyboardEvent): void {
    this.props.onCancel(e);
  }

  willOpen(prevProps: Object, nextProps: Object): boolean {
    return (!prevProps.visible && nextProps.visible);
  }

  willClose(prevProps: Object, nextProps: Object): boolean {
    return (prevProps.visible && !nextProps.visible);
  }

  render(): React.Element<any> {
    const { visible, title, size, top, modal, customClass, showClose } = this.props;

    return (
      <div>
        <Transition name="dialog-fade">
          <View show={ visible }>
            <div
              ref="wrap"
              style={{ zIndex: 1013 }}
              className={this.classNames('el-dialog__wrapper')}
              onClick={ e => this.handleWrapperClick(e) }
              onKeyDown={ e => this.onKeyDown(e) }
            >
              <div
                ref="dialog"
                style={this.style(size === 'full' ?  {} : { 'top': top })}
                className={ this.className("el-dialog", `el-dialog--${ size }`, customClass) }
              >
                <div className="el-dialog__header">
                  <span className="el-dialog__title">{ title }</span>
                  {
                    showClose && (
                      <button type="button" className="el-dialog__headerbtn" onClick={ e => this.close(e)} >
                        <i className="el-dialog__close el-icon el-icon-close"></i>
                      </button>
                    )
                  }
                </div>
                { this.props.children }
              </div>
            </div>
          </View>
        </Transition>
        {
          modal && (
              <View show={ visible }>
                <div className="v-modal" style={{ zIndex: 1012 }}></div>
              </View>
          )
        }
      </div>
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
  onCancel: PropTypes.func.isRequired,
  showClose: PropTypes.bool
};
