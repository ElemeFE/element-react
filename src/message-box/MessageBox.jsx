/* @flow */

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

type State = {
  visible: boolean,
  inputValue?: string,
  editorErrorMessage?: string
};

export default class MessageBox extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      visible: false,
      inputValue: props.inputValue
    };
  }

  componentDidMount() {
    this.setState({
      visible: true
    })
    document.activeElement && document.activeElement.blur()
  }

  confirmButtonText(): string {
    return this.props.confirmButtonText || i18n.t('el.messagebox.confirm');
  }

  cancelButtonText(): string {
    return this.props.cancelButtonText || i18n.t('el.messagebox.cancel');
  }

  onChange(value: string): void {
    this.setState({
      inputValue: value
    });
    this.validate(value);
  }

  typeClass(): string {
    return this.props.type && typeMap[this.props.type] && `el-icon-${typeMap[this.props.type]}`;
  }

  validate(value: string): boolean {
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

    this.setState({ editorErrorMessage });

    return !editorErrorMessage;
  }

  handleAction(action: string): void {
    const { modal, promise, showInput } = this.props;

    if (modal) {
      switch (action) {
        case 'cancel':
          promise.reject();
          break;
        case 'confirm':
          if (modal === 'prompt') {
            if (this.validate(this.state.inputValue || '')) {
              if (showInput) {
                promise.resolve({ value: this.state.inputValue, action });
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

  close(): void {
    this.setState({
      visible: false
    });
  }

  render(): React.Element<any> {
    const { willUnmount, title, showClose, message, showInput, inputPlaceholder, showCancelButton, cancelButtonClass, showConfirmButton, confirmButtonClass, customClass, inputType } = this.props;
    const { visible, editorErrorMessage } = this.state;

    return (
      <div>
        <div style={{ position: 'absolute', zIndex: 2001 }}>
          <Transition
            name="msgbox-fade"
            onAfterLeave={() => { willUnmount && willUnmount() }}
          >
            <View show={visible}>
              <div className={this.classNames('el-message-box__wrapper', customClass)}>
                <div className="el-message-box">
                  {
                    title && (
                      <div className="el-message-box__header">
                        <div className="el-message-box__title">{title}</div>
                        {
                          showClose && (
                            <button type="button" className="el-message-box__headerbtn" aria-label="Close" onClick={this.handleAction.bind(this, 'cancel')}>
                              <i className="el-message-box__close el-icon-close" />
                            </button>
                          )
                        }
                      </div>
                    )
                  }
                  {
                    message && (
                      <div className="el-message-box__content">
                        <div className={this.classNames('el-message-box__status', this.typeClass())} />
                        <div className="el-message-box__message" style={{ marginLeft: this.typeClass() ? '50px' : '0' }}>
                          <div>{message}</div>
                        </div>
                        <View show={showInput}>
                          <div className="el-message-box__input">
                            <Input
                              className={this.classNames({
                                'invalid': editorErrorMessage
                              })}
                              type={inputType}
                              value={this.state.inputValue}
                              placeholder={inputPlaceholder}
                              onChange={this.onChange.bind(this)}
                            />
                            <div className="el-message-box__errormsg" style={{
                              visibility: editorErrorMessage ? 'visible' : 'hidden'
                            }}>{editorErrorMessage}</div>
                          </div>
                        </View>
                      </div>
                    )
                  }
                  <div className="el-message-box__btns">
                    <View show={showCancelButton}>
                      <Button className={cancelButtonClass} onClick={this.handleAction.bind(this, 'cancel')}>{this.cancelButtonText()}</Button>
                    </View>
                    <View show={showConfirmButton}>
                      <Button className={this.classNames('el-button--primary', confirmButtonClass)} onClick={this.handleAction.bind(this, 'confirm')}>{this.confirmButtonText()}</Button>
                    </View>
                  </div>
                </div>
              </div>
            </View>
          </Transition>
        </div>
        <Transition name="v-modal">
          <View show={visible}>
            <div className="v-modal" style={{ zIndex: 1006 }} />
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
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  showInput: PropTypes.bool,
  showClose: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  cancelButtonClass: PropTypes.string,
  confirmButtonClass: PropTypes.string,
  customClass: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputPattern: PropTypes.regex,
  inputValidator: PropTypes.func,
  inputErrorMessage: PropTypes.string,
  inputValue: PropTypes.any,
  inputType: PropTypes.string,
  promise: PropTypes.object,
  onClose: PropTypes.func
}

MessageBox.defaultProps = {
  title: '提示',
  showInput: false,
  showClose: true,
  showCancelButton: false,
  showConfirmButton: true
}
