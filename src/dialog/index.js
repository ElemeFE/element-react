/**
 * Created by elemelyn on 16/10/24.
 */

import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

export default class Dialog extends Component {
  close() {
    return this.props.handleDialogClose();
  }

  handleWrapperClick() {
    return this.close();
  }

  render() {
    // 判断 size 是 tiny/small/large/full 中的一个

    const { visible, title, size, top, modal, customClass, lockScroll, closeOnClickModal, closeOnPressEscape } = this.props;

    const sizeClass = `el-dialog--${ size }`;
    const style = (size === 'full') ? {} : { 'marginBottom': '50px', 'top': top };

    return (
      <View show={ visible }>
        <div className="el-dialog__wrapper" onClick={ () => this.handleWrapperClick() }>
          <div className={ this.classNames("el-dialog", sizeClass, customClass) } ref="dialog" style={ style }>
            <div className="el-dialog__header">
              <span className="el-dialog__title">{ title }</span>
              <div className="el-dialog__headerbtn">
                <i className="el-dialog__close el-icon el-icon-close" onClick={ () => this.close() }></i>
              </div>
            </div>

            <div className="el-dialog__body" if="rendered"></div>

            <div className="el-dialog__footer" if="$slots.footer"></div>
          </div>
        </div>
      </View>
    );

    // return (
    //   <View className="el-dialog__wrapper" show={ this.props.visible } onClick="handleWrapperClick">
    //     <div className={ this.classNames("el-dialog", sizeClass, customClass) } ref="dialog" style={ style }>
    //       <div className="el-dialog__header">
    //         <span className="el-dialog__title">{ this.props.title }</span>
    //         <div className="el-dialog__headerbtn">
    //           <i className="el-dialog__close el-icon el-icon-close" onClick='close()'></i>
    //         </div>
    //       </div>
    //
    //       <div className="el-dialog__body" v-if="rendered"><slot></slot></div>
    //
    //       <div className="el-dialog__footer" v-if="$slots.footer">
    //         <slot name="footer"></slot>
    //       </div>
    //     </div>
    //   </View>
    // )
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
  modal: PropTypes.bool,// => TODO: 改成 showModal ?
  // Dialog 的自定义类名
  customClass: PropTypes.string,// TODO: 应该添加数组的支持
  // 是否在 Dialog 出现时将 body 滚动锁定
  lockScroll: PropTypes.bool,
  // 是否可以通过点击 modal 关闭 Dialog
  closeOnClickModal: PropTypes.bool,
  // 是否可以通过按下 ESC 关闭 Dialog
  closeOnPressEscape: PropTypes.bool,

  // TODO: Events
  // 控制对话框关闭
  handleDialogClose: PropTypes.func.isRequired
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
