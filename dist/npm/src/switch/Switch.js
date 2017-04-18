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
      value: props.value,
      coreWidth: props.width,
      buttonStyle: {
        transform: ''
      }
    };
    return _this;
  }

  _createClass(Switch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.width === 0) {
        this.state.coreWidth = this.hasText() ? 58 : 46;
      }

      this.updateSwitch();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      this.setState({ value: props.value }, function () {
        _this2.updateSwitch();
      });

      if (props.width) {
        this.setState({ coreWidth: props.width });
      }
    }
  }, {
    key: 'updateSwitch',
    value: function updateSwitch() {
      this.handleButtonTransform();

      if (this.props.onColor || this.props.offColor) {
        this.setBackgroundColor();
      }
    }
  }, {
    key: 'hasText',
    value: function hasText() {
      return this.props.onText || this.props.offText;
    }
  }, {
    key: 'setBackgroundColor',
    value: function setBackgroundColor() {
      var newColor = this.state.value ? this.props.onColor : this.props.offColor;

      this.refs.core.style.borderColor = newColor;
      this.refs.core.style.backgroundColor = newColor;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var _this3 = this;

      this.setState({
        value: e.target.checked
      }, function () {
        _this3.updateSwitch();

        if (_this3.props.onChange) {
          _this3.props.onChange(_this3.state.value);
        }
      });
    }
  }, {
    key: 'handleButtonTransform',
    value: function handleButtonTransform() {
      var _state = this.state,
          value = _state.value,
          coreWidth = _state.coreWidth,
          buttonStyle = _state.buttonStyle;


      buttonStyle.transform = value ? 'translate(' + (coreWidth - 20) + 'px, 2px)' : 'translate(2px, 2px)';

      this.setState({ buttonStyle: buttonStyle });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          disabled = _props.disabled,
          onText = _props.onText,
          offText = _props.offText,
          onIconClass = _props.onIconClass,
          offIconClass = _props.offIconClass;
      var _state2 = this.state,
          value = _state2.value,
          coreWidth = _state2.coreWidth,
          buttonStyle = _state2.buttonStyle;


      return _react2.default.createElement(
        'label',
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
        _react2.default.createElement('input', {
          className: 'el-switch__input',
          type: 'checkbox',
          checked: value,
          name: name,
          disabled: disabled,
          onChange: this.handleChange.bind(this)
        }),
        _react2.default.createElement(
          'span',
          { className: 'el-switch__core', ref: 'core', style: { 'width': coreWidth + 'px' } },
          _react2.default.createElement('span', { className: 'el-switch__button', style: Object.assign({}, buttonStyle) })
        ),
        _react2.default.createElement(
          _libs.Transition,
          { name: 'label-fade' },
          _react2.default.createElement(
            _libs.View,
            { show: value },
            _react2.default.createElement(
              'div',
              {
                className: 'el-switch__label el-switch__label--left',
                style: { 'width': coreWidth + 'px' }
              },
              onIconClass && _react2.default.createElement('i', { className: onIconClass }),
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
            { show: !value },
            _react2.default.createElement(
              'div',
              {
                className: 'el-switch__label el-switch__label--right',
                style: { 'width': coreWidth + 'px' }
              },
              offIconClass && _react2.default.createElement('i', { className: offIconClass }),
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
  name: ''
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