import React from 'react';
import { Component, PropTypes, View } from '../../libs';
import Button from '../button';

const typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

export default class MessageBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.setState({
      visible: true
    })
  }

  typeClass() {
    return this.props.type && typeMap[this.props.type] && `el-icon-${ typeMap[this.props.type] }`;
  }

  handleAction(type) {
    if (this.props.modal) {
      switch (type) {
        case 'cancel':
          this.props.promise.reject();
          break;
        case 'confirm':
          this.props.promise.resolve();
          break;
        case 'prompt':
          break;
        default:
          break;
      }
    } else {
      this.props.promise.resolve(type);
    }

    this.close();
  }

  close() {
    this.setState({
      visible: false
    });

    setTimeout(() => {
      this.props.onClose();
    }, 200);
  }

  render() {
    return (
      <div>
        <div style={{ position: 'absolute', zIndex: 1007 }}>
          <View show={this.state.visible} transition="msgbox-bounce">
            <div className="el-message-box">
              {
                this.props.title && (
                  <div className="el-message-box__header">
                    <div className="el-message-box__title">{this.props.title}</div>
                    { this.props.showClose && <i className="el-message-box__close el-icon-close" onClick={this.handleAction.bind(this, 'cancel')} /> }
                  </div>
                )
              }
              {
                this.props.message && (
                  <div className="el-message-box__content">
                    <div className={this.classNames('el-message-box__status', this.typeClass())}></div>
                    <div className="el-message-box__message" style={{ marginLeft: this.typeClass() ? '50px' : '0' }}>
                      <p>{this.props.message}</p>
                    </div>
                    <View show={this.props.showInput}>
                      <div className="el-message-box__input">
                        <div className="el-message-box__errormsg" style={{ visibility: this.state.editorErrorMessage ? 'visible' : 'hidden' }}>{this.state.editorErrorMessage}</div>
                      </div>
                    </View>
                  </div>
                )
              }
              <div className="el-message-box__btns">
                <View show={this.props.showCancelButton}>
                  <Button className={this.props.cancelButtonClass} onClick={this.handleAction.bind(this, 'cancel')}>{this.props.cancelButtonText}</Button>
                </View>
                <View show={this.props.showConfirmButton}>
                  <Button className={this.classNames('el-button-primary', this.props.confirmButtonClass)} onClick={this.handleAction.bind(this, 'confirm')}>{this.props.confirmButtonText}</Button>
                </View>
              </div>
            </div>
          </View>
        </div>
        <View show={this.state.visible} transition="v-modal">
          <div className="v-modal" style={{ zIndex: 1006 }}></div>
        </View>
      </div>
    )
  }
}

MessageBox.propTypes = {
  modal: PropTypes.oneOf(['alert', 'confirm', 'prompt']),
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: PropTypes.string,
  message: PropTypes.string,
  showInput: PropTypes.bool,
  showClose: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  cancelButtonClass: PropTypes.string,
  confirmButtonClass: PropTypes.string,
  promise: PropTypes.object,
  onClose: PropTypes.func
}

MessageBox.defaultProps = {
  title: '提示',
  showClose: true,
  showConfirmButton: true,
  confirmButtonText: '确定',
  cancelButtonText: '取消'
}
