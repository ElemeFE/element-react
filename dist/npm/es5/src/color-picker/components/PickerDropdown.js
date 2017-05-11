'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvPanel = require('./SvPanel');

var _SvPanel2 = _interopRequireDefault(_SvPanel);

var _HueSlider = require('./HueSlider');

var _HueSlider2 = _interopRequireDefault(_HueSlider);

var _AlphaSlider = require('./AlphaSlider');

var _AlphaSlider2 = _interopRequireDefault(_AlphaSlider);

var _libs = require('../../../libs');

var _locale = require('../../locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerDropdown = function (_Component) {
  _inherits(PickerDropdown, _Component);

  function PickerDropdown(props) {
    _classCallCheck(this, PickerDropdown);

    return _possibleConstructorReturn(this, (PickerDropdown.__proto__ || Object.getPrototypeOf(PickerDropdown)).call(this, props));
  }

  _createClass(PickerDropdown, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          color = _props.color,
          showAlpha = _props.showAlpha,
          onPick = _props.onPick,
          onClear = _props.onClear,
          showPicker = _props.showPicker;

      var currentColor = color.value;
      return _react2.default.createElement(
        _libs.Transition,
        { name: 'el-zoom-in-top' },
        showPicker && _react2.default.createElement(
          'div',
          { className: 'el-color-dropdown el-color-picker__panel' },
          _react2.default.createElement(
            'div',
            { className: 'el-color-dropdown__main-wrapper' },
            _react2.default.createElement(_HueSlider2.default, {
              ref: 'hue',
              color: color,
              vertical: true,
              onChange: function onChange(color) {
                return _this2.props.onChange(color);
              }
            }),
            _react2.default.createElement(_SvPanel2.default, {
              ref: 'sl',
              color: color,
              onChange: function onChange(color) {
                return _this2.props.onChange(color);
              }
            })
          ),
          showAlpha && _react2.default.createElement(_AlphaSlider2.default, { ref: 'alpha', color: color }),
          _react2.default.createElement(
            'div',
            { className: 'el-color-dropdown__btns' },
            _react2.default.createElement(
              'span',
              { className: 'el-color-dropdown__value' },
              currentColor
            ),
            _react2.default.createElement(
              'a',
              {
                href: 'JavaScript:',
                className: 'el-color-dropdown__link-btn',
                onClick: function onClick() {
                  return onClear();
                }
              },
              _locale2.default.t('el.colorpicker.clear')
            ),
            _react2.default.createElement(
              'button',
              {
                className: 'el-color-dropdown__btn',
                onClick: function onClick() {
                  return onPick();
                }
              },
              _locale2.default.t('el.colorpicker.confirm')
            )
          )
        )
      );
    }
  }]);

  return PickerDropdown;
}(_libs.Component);

var _default = PickerDropdown;
exports.default = _default;


PickerDropdown.propTypes = {
  color: _libs.PropTypes.object.isRequired,
  showPicker: _libs.PropTypes.bool,
  showAlpha: _libs.PropTypes.bool,
  onPick: _libs.PropTypes.func,
  onClear: _libs.PropTypes.func,
  onChange: _libs.PropTypes.func
};

PickerDropdown.defaultProps = {
  onPick: function onPick() {},
  onClear: function onClear() {},
  onChange: function onChange() {}
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(PickerDropdown, 'PickerDropdown', 'src/color-picker/components/PickerDropdown.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/color-picker/components/PickerDropdown.jsx');
}();

;