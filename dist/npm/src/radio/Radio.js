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

var Radio = function (_Component) {
  _inherits(Radio, _Component);

  function Radio(props) {
    _classCallCheck(this, Radio);

    var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, props));

    _this.state = {
      checked: _this.getChecked(props)
    };
    return _this;
  }

  _createClass(Radio, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var checked = this.getChecked(props);

      if (this.state.checked != checked) {
        this.setState({ checked: checked });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var checked = e.target.checked;

      if (checked) {
        if (this.props.onChange) {
          if (this.props.hasOwnProperty('model')) {
            this.props.onChange(this.props.value);
          } else {
            this.props.onChange(e);
          }
        }
      }

      this.setState({ checked: checked });
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.setState({
        focus: true
      });
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      this.setState({
        focus: false
      });
    }
  }, {
    key: 'getChecked',
    value: function getChecked(props) {
      return props.model == props.value || Boolean(props.checked);
    }
  }, {
    key: 'render',
    value: function render() {
      var checked = this.state.checked;
      var _props = this.props,
          disabled = _props.disabled,
          focus = _props.focus,
          value = _props.value,
          children = _props.children;

      return _react2.default.createElement(
        'label',
        { style: this.style(), className: this.className('el-radio') },
        _react2.default.createElement(
          'span',
          { className: this.classNames({
              'el-radio__input': true,
              'is-checked': checked,
              'is-disabled': disabled,
              'is-focus': focus
            }) },
          _react2.default.createElement('span', { className: 'el-radio__inner' }),
          _react2.default.createElement('input', {
            type: 'radio',
            className: 'el-radio__original',
            checked: checked,
            disabled: disabled,
            onChange: this.onChange.bind(this),
            onFocus: this.onFocus.bind(this),
            onBlur: this.onBlur.bind(this)
          })
        ),
        _react2.default.createElement(
          'span',
          { className: 'el-radio__label' },
          children || value
        )
      );
    }
  }]);

  return Radio;
}(_libs.Component);

var _default = Radio;
exports.default = _default;


Radio.propTypes = {
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]).isRequired,
  onChange: _libs.PropTypes.func,
  disabled: _libs.PropTypes.bool,
  focus: _libs.PropTypes.bool,
  /* eslint-disable */
  checked: _libs.PropTypes.bool
  /* eslint-enable */
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Radio, 'Radio', 'src/radio/Radio.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/radio/Radio.jsx');
}();

;