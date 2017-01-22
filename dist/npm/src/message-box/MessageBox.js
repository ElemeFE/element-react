'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

var MessageBox = function (_Component) {
  _inherits(MessageBox, _Component);

  function MessageBox(props) {
    _classCallCheck(this, MessageBox);

    var _this = _possibleConstructorReturn(this, (MessageBox.__proto__ || Object.getPrototypeOf(MessageBox)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(MessageBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        visible: true
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.validate(event.target.value);
    }
  }, {
    key: 'typeClass',
    value: function typeClass() {
      return this.props.type && typeMap[this.props.type] && 'el-icon-' + typeMap[this.props.type];
    }
  }, {
    key: 'validate',
    value: function validate(value) {
      var _props = this.props,
          inputPattern = _props.inputPattern,
          inputValidator = _props.inputValidator,
          inputErrorMessage = _props.inputErrorMessage;

      var editorErrorMessage = void 0;

      if (inputPattern && !inputPattern.test(value)) {
        editorErrorMessage = inputErrorMessage || _locale2.default.t('el.messagebox.error');
      }

      if (typeof inputValidator === 'function') {
        var validateResult = inputValidator(value);

        if (validateResult === false) {
          editorErrorMessage = inputErrorMessage || _locale2.default.t('el.messagebox.error');
        }

        if (typeof validateResult === 'string') {
          editorErrorMessage = validateResult;
        }
      }

      this.inputValue = value;
      this.setState({ editorErrorMessage: editorErrorMessage });

      return !editorErrorMessage;
    }
  }, {
    key: 'handleAction',
    value: function handleAction(action) {
      var _props2 = this.props,
          modal = _props2.modal,
          promise = _props2.promise,
          showInput = _props2.showInput;


      if (modal) {
        switch (action) {
          case 'cancel':
            promise.reject();
            break;
          case 'confirm':
            if (modal === 'prompt') {
              if (this.validate(this.inputValue)) {
                if (showInput) {
                  promise.resolve({ value: this.inputValue, action: action });
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
  }, {
    key: 'close',
    value: function close() {
      var _this2 = this;

      this.setState({
        visible: false
      });

      setTimeout(function () {
        _this2.props.onClose();
      }, 200);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: { position: 'absolute', zIndex: 2001 } },
          _react2.default.createElement(
            _libs.Transition,
            { name: 'msgbox-fade', duration: '300' },
            _react2.default.createElement(
              _libs.View,
              { key: this.state.visible, show: this.state.visible },
              _react2.default.createElement(
                'div',
                { className: 'el-message-box__wrapper' },
                _react2.default.createElement(
                  'div',
                  { className: 'el-message-box' },
                  this.props.title && _react2.default.createElement(
                    'div',
                    { className: 'el-message-box__header' },
                    _react2.default.createElement(
                      'div',
                      { className: 'el-message-box__title' },
                      this.props.title
                    ),
                    this.props.showClose && _react2.default.createElement('i', { className: 'el-message-box__close el-icon-close', onClick: this.handleAction.bind(this, 'cancel') })
                  ),
                  this.props.message && _react2.default.createElement(
                    'div',
                    { className: 'el-message-box__content' },
                    _react2.default.createElement('div', { className: this.classNames('el-message-box__status', this.typeClass()) }),
                    _react2.default.createElement(
                      'div',
                      { className: 'el-message-box__message', style: { marginLeft: this.typeClass() ? '50px' : '0' } },
                      _react2.default.createElement(
                        'p',
                        null,
                        this.props.message
                      )
                    ),
                    _react2.default.createElement(
                      _libs.View,
                      { show: this.props.showInput },
                      _react2.default.createElement(
                        'div',
                        { className: 'el-message-box__input' },
                        _react2.default.createElement(_input2.default, {
                          className: this.classNames({
                            'invalid': this.state.editorErrorMessage
                          }),
                          placeholder: this.props.inputPlaceholder,
                          onChange: this.onChange.bind(this)
                        }),
                        _react2.default.createElement(
                          'div',
                          { className: 'el-message-box__errormsg', style: {
                              visibility: this.state.editorErrorMessage ? 'visible' : 'hidden'
                            } },
                          this.state.editorErrorMessage
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'el-message-box__btns' },
                    _react2.default.createElement(
                      _libs.View,
                      { show: this.props.showCancelButton },
                      _react2.default.createElement(
                        _button2.default,
                        { className: this.props.cancelButtonClass, onClick: this.handleAction.bind(this, 'cancel') },
                        this.props.cancelButtonText
                      )
                    ),
                    _react2.default.createElement(
                      _libs.View,
                      { show: this.props.showConfirmButton },
                      _react2.default.createElement(
                        _button2.default,
                        { className: this.classNames('el-button--primary', this.props.confirmButtonClass), onClick: this.handleAction.bind(this, 'confirm') },
                        this.props.confirmButtonText
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          _libs.Transition,
          { name: 'v-modal', duration: '200' },
          _react2.default.createElement(
            _libs.View,
            { key: this.state.visible, show: this.state.visible },
            _react2.default.createElement('div', { className: 'v-modal', style: { zIndex: 1006 } })
          )
        )
      );
    }
  }]);

  return MessageBox;
}(_libs.Component);

var _default = MessageBox;
exports.default = _default;


MessageBox.propTypes = {
  modal: _libs.PropTypes.oneOf(['alert', 'confirm', 'prompt']),
  type: _libs.PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: _libs.PropTypes.string,
  message: _libs.PropTypes.string,
  showInput: _libs.PropTypes.bool,
  showClose: _libs.PropTypes.bool,
  showCancelButton: _libs.PropTypes.bool,
  showConfirmButton: _libs.PropTypes.bool,
  confirmButtonText: _libs.PropTypes.string,
  cancelButtonText: _libs.PropTypes.string,
  cancelButtonClass: _libs.PropTypes.string,
  confirmButtonClass: _libs.PropTypes.string,
  inputPlaceholder: _libs.PropTypes.string,
  inputPattern: _libs.PropTypes.regex,
  inputValidator: _libs.PropTypes.func,
  inputErrorMessage: _libs.PropTypes.string,
  promise: _libs.PropTypes.object,
  onClose: _libs.PropTypes.func
};

MessageBox.defaultProps = {
  title: '提示',
  showClose: true,
  showConfirmButton: true,
  confirmButtonText: _locale2.default.t('el.messagebox.confirm'),
  cancelButtonText: _locale2.default.t('el.messagebox.cancel')
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(typeMap, 'typeMap', 'src/message-box/MessageBox.jsx');

  __REACT_HOT_LOADER__.register(MessageBox, 'MessageBox', 'src/message-box/MessageBox.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/message-box/MessageBox.jsx');
}();

;