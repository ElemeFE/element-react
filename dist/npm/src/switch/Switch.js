'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = function (_Component) {
  _inherits(Switch, _Component);

  function Switch(props) {
    _classCallCheck(this, Switch);

    var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

    _this.state = {
      value: Boolean(props.value),
      disabled: Boolean(props.disabled),
      width: props.width === 0 ? _this.hasText() ? 58 : 46 : props.width
    };
    return _this;
  }

  _createClass(Switch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateSwitch();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateSwitch();
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
  }, {
    key: 'updateSwitch',
    value: function updateSwitch() {
      if (!this.state.disabled) {
        if (this.props.onColor || this.props.offColor) {
          this.handleCoreColor();
        }
      }
      this.handleButtonTransform();
    }
  }, {
    key: 'hasText',
    value: function hasText() {
      return this.props.onText || this.props.offText;
    }
  }, {
    key: 'handleMiscClick',
    value: function handleMiscClick() {
      if (!this.state.disabled) {
        this.setState({
          value: !this.state.value
        });
      }
    }
  }, {
    key: 'handleCoreColor',
    value: function handleCoreColor() {
      this.refs.core.style.borderColor = this.state.value ? this.props.onColor : this.props.offColor;
      this.refs.core.style.backgroundColor = this.state.value ? this.props.onColor : this.props.offColor;
    }
  }, {
    key: 'handleButtonTransform',
    value: function handleButtonTransform() {
      this.refs.button.style.transform = this.state.value ? 'translate3d(' + (this.state.width - 20) + 'px, 2px, 0)' : 'translate3d(2px, 2px, 0)';
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          onText = _props.onText,
          offText = _props.offText,
          onIconClass = _props.onIconClass,
          offIconClass = _props.offIconClass;
      var _state = this.state,
          value = _state.value,
          disabled = _state.disabled,
          width = _state.width;

      return _react2.default.createElement(
        'div',
        {
          style: this.style(),
          className: this.className('el-switch', {
            'is-disabled': disabled,
            'el-switch--wide': this.hasText()
          }) },
        _react2.default.createElement(
          _libs.View,
          { show: disabled },
          _react2.default.createElement('div', { className: 'el-switch__mask' })
        ),
        _react2.default.createElement('input', { className: 'el-switch__input', type: 'checkbox', checked: value, name: name,
          disabled: disabled, style: { display: 'none' }, onChange: function onChange() {} }),
        _react2.default.createElement(
          'span',
          { className: 'el-switch__core', ref: 'core', onClick: this.handleMiscClick.bind(this), style: { 'width': width + 'px' } },
          _react2.default.createElement('span', { className: 'el-switch__button', ref: 'button' })
        ),
        _react2.default.createElement(
          _libs.Transition,
          { name: 'label-fade' },
          _react2.default.createElement(
            _libs.View,
            { show: value },
            _react2.default.createElement(
              'div',
              { className: 'el-switch__label el-switch__label--left', onClick: this.handleMiscClick.bind(this),
                style: { 'width': width + 'px' } },
              onIconClass && _react2.default.createElement('i', { className: 'onIconClass' }),
              !onIconClass && onText && _react2.default.createElement(
                'span',
                null,
                onText
              )
            )
          )
        ),
        _react2.default.createElement(
          _libs.Transition,
          { name: 'label-fade' },
          _react2.default.createElement(
            _libs.View,
            { show: !this.state.value },
            _react2.default.createElement(
              'div',
              { className: 'el-switch__label el-switch__label--right', onClick: this.handleMiscClick.bind(this),
                style: { 'width': this.state.width + 'px' } },
              offIconClass && _react2.default.createElement('i', { className: 'offIconClass' }),
              !offIconClass && offText && _react2.default.createElement(
                'span',
                null,
                offText
              )
            )
          )
        )
      );
    }
  }]);

  return Switch;
}(_libs.Component);

var _default = Switch;
exports.default = _default;


Switch.propTypes = {
  value: _libs.PropTypes.bool,
  disabled: _libs.PropTypes.bool,
  width: _libs.PropTypes.number,
  onIconClass: _libs.PropTypes.string,
  offIconClass: _libs.PropTypes.string,
  onText: _libs.PropTypes.string,
  offText: _libs.PropTypes.string,
  onColor: _libs.PropTypes.string,
  offColor: _libs.PropTypes.string,
  name: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func
};

Switch.defaultProps = {
  value: true,
  disabled: false,
  width: 0,
  onIconClass: '',
  offIconClass: '',
  onText: 'ON',
  offText: 'OFF',
  onColor: '',
  offColor: '',
  name: '',
  onChange: undefined
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Switch, 'Switch', 'src/switch/Switch.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/switch/Switch.jsx');
}();

;