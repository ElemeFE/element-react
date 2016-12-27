'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _Radio2 = require('./Radio');

var _Radio3 = _interopRequireDefault(_Radio2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioButton = function (_Radio) {
  _inherits(RadioButton, _Radio);

  function RadioButton() {
    _classCallCheck(this, RadioButton);

    return _possibleConstructorReturn(this, (RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).apply(this, arguments));
  }

  _createClass(RadioButton, [{
    key: 'activeStyle',
    value: function activeStyle() {
      return {
        backgroundColor: this.props.fill,
        borderColor: this.props.fill,
        color: this.props.textColor
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'label',
        { style: this.style(), className: this.className('el-radio-button', this.props.size && 'el-radio-button--' + this.props.size, {
            'is-active': this.state.checked
          }) },
        _react2.default.createElement('input', {
          type: 'radio',
          className: 'el-radio-button__orig-radio',
          checked: this.state.checked,
          disabled: this.props.disabled,
          onChange: this.onChange.bind(this)
        }),
        _react2.default.createElement(
          'span',
          { className: 'el-radio-button__inner', style: this.state.checked ? this.activeStyle() : {} },
          this.props.children || this.props.value
        )
      );
    }
  }]);

  return RadioButton;
}(_Radio3.default);

var _default = RadioButton;
exports.default = _default;


RadioButton.propTypes = {
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]).isRequired,
  disabled: _libs.PropTypes.bool,
  textColor: _libs.PropTypes.string,
  fill: _libs.PropTypes.string
};

RadioButton.defaultProps = {
  textColor: '#ffffff',
  fill: '#20a0ff'
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(RadioButton, 'RadioButton', 'src/radio/RadioButton.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/radio/RadioButton.jsx');
}();

;