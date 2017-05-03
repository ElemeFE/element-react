'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CheckBox2 = require('./CheckBox');

var _CheckBox3 = _interopRequireDefault(_CheckBox2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxButton = function (_CheckBox) {
  _inherits(CheckboxButton, _CheckBox);

  function CheckboxButton() {
    _classCallCheck(this, CheckboxButton);

    return _possibleConstructorReturn(this, (CheckboxButton.__proto__ || Object.getPrototypeOf(CheckboxButton)).apply(this, arguments));
  }

  _createClass(CheckboxButton, [{
    key: 'render',
    value: function render() {
      var group = this.context.ElCheckboxGroup;

      return _react2.default.createElement(
        'label',
        { style: this.style(), className: this.className('el-checkbox-button', group.props.size ? 'el-checkbox-button--' + group.props.size : '', {
            'is-disabled': this.props.disabled,
            'is-checked': this.state.checked,
            'is-focus': this.state.focus
          }) },
        _react2.default.createElement('input', {
          className: 'el-checkbox-button__original',
          type: 'checkbox',
          checked: this.state.checked,
          disabled: this.props.disabled,
          onFocus: this.onFocus.bind(this),
          onBlur: this.onBlur.bind(this),
          onChange: this.onChange.bind(this)
        }),
        _react2.default.createElement(
          'span',
          { className: 'el-checkbox-button__inner', style: this.state.checked ? {
              boxShadow: '-1px 0 0 0 ' + group.props.fill,
              backgroundColor: group.props.fill || '',
              borderColor: group.props.fill || '',
              color: group.props.textColor || ''
            } : {} },
          this.state.label || this.props.children
        )
      );
    }
  }]);

  return CheckboxButton;
}(_CheckBox3.default);

var _default = CheckboxButton;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CheckboxButton, 'CheckboxButton', 'src/checkbox/CheckBoxButton.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/checkbox/CheckBoxButton.jsx');
}();

;