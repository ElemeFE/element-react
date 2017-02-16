import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';
import Button from '../button';
import Input from '../input';
import i18n from '../locale';

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

  onChange(event) {
    this.validate(event.target.value);
  }

  typeClass() {
    return this.props.type && typeMap[this.props.type] && `el-icon-${ typeMap[this.props.type] }`;
  }

  validate(value) {
    const { inputPattern, inputValidator, inputErrorMessage } = this.props;
    let editorErrorMessage;

    if (inputPattern && !inputPattern.test(value)) {
      editorErrorMessage = inputErrorMessage || i18n.t('el.messagebox.error');
    }

    if (typeof inputValidator === 'function') {
      const validateResult = inputValidator(value);

      if (validateResult === false) {
        editorErrorMessage = inputErrorMessage || i18n.t('el.messagebox.error');
      }

      if (typeof validateResult === 'string') {
        editorErrorMessage = validateResult;
      }
    }

    this.inputValue = value;
    this.setState({ editorErrorMessage });

    return !editorErrorMessage;
  }

  handleAction(action) {
    const { modal, promise, showInput } = this.props;

    if (modal) {
      switch (action) {
        case 'cancel':
          promise.reject();
          break;
        case 'confirm':
          if (modal === 'prompt') {
            if (this.validate(this.inputValue)) {
              if (showInput) {
                promise.resolve({ value: this.inputValue, action });
              } else {
                promise.resolve(action);
              }
            } else {
              return;
            }
          } else {
            promise.resolve();
          }
          break;
        default:
          break;
      }
    } else {
      promise.resolve(action);
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
        <div style={{ position: 'absolute', zIndex: 2001 }}>
          <Transition name="msgbox-fade" duration="300">
            <View key={this.state.visible} show={this.state.visible}>
              <div className="el-message-box__wrapper">
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
                            <Input
                              className={this.classNames({
                                'invalid': this.state.editorErrorMessage
                              })}
                              placeholder={this.props.inputPlaceholder}
                              onChange={this.onChange.bind(this)}
                            />
                            <div className="el-message-box__errormsg" style={{
                              visibility: this.state.editorErrorMessage ? 'visible' : 'hidden'
                            }}>{this.state.editorErrorMessage}</div>
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
                      <Button className={this.classNames('el-button--primary', this.props.confirmButtonClass)} onClick={this.handleAction.bind(this, 'confirm')}>{this.props.confirmButtonText}</Button>
                    </View>
                  </div>
                </div>
              </div>
            </View>
          </Transition>
        </div>
        <Transition name="v-modal" duration="200">
          <View key={this.state.visible} show={this.state.visible}>
            <div className="v-modal" style={{ zIndex: 1006 }}></div>
          </View>
        </Transition>
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
  inputPlaceholder: PropTypes.string,
  inputPattern: PropTypes.regex,
  inputValidator: PropTypes.func,
  inputErrorMessage: PropTypes.string,
  promise: PropTypes.object,
  onClose: PropTypes.func
}

MessageBox.defaultProps = {
  title: '提示',
  showClose: true,
  showConfirmButton: true,
  confirmButtonText: i18n.t('el.messagebox.confirm'),
  cancelButtonText: i18n.t('el.messagebox.cancel')
}
