'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _libs = require('../../libs');

var _PickerDropdown = require('./components/PickerDropdown');

var _PickerDropdown2 = _interopRequireDefault(_PickerDropdown);

var _color = require('./color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = function (_Component) {
  _inherits(ColorPicker, _Component);

  function ColorPicker(props) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

    var color = new _color2.default({
      enableAlpha: _this.props.showAlpha,
      format: _this.props.colorFormat
    });

    _this.state = {
      value: _this.props.value,
      color: color,
      showPicker: false,
      showPanelColor: false
    };
    return _this;
  }

  _createClass(ColorPicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _state = this.state,
          value = _state.value,
          color = _state.color;

      if (value) {
        color.fromString(value);
        this.setState({ color: color });
      }
      this.popperElm = this.refs.dropdown;
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        onChange: this.handleChange.bind(this)
      };
    }
  }, {
    key: 'handleChange',
    value: function handleChange(color) {
      this.setState({ value: color.value, color: color });
    }
  }, {
    key: 'confirmValue',
    value: function confirmValue() {
      var value = this.state.value;
      var onChange = this.props.onChange;

      this.setState({ showPicker: false }, function () {
        return onChange(value);
      });
    }
  }, {
    key: 'clearValue',
    value: function clearValue() {
      var _this2 = this;

      this.setState({
        showPicker: false,
        showPanelColor: false,
        value: null
      }, function () {
        _this2.props.onChange(null);
        _this2.resetColor();
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      this.setState({
        showPicker: false
      }, function () {
        return _this3.resetColor();
      });
    }
  }, {
    key: 'resetColor',
    value: function resetColor() {
      var _state2 = this.state,
          value = _state2.value,
          color = _state2.color;

      if (value) {
        color.fromString(value);
        this.setState({ color: color });
      }
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      this.setState({ showPicker: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var showAlpha = this.props.showAlpha;
      var _state3 = this.state,
          value = _state3.value,
          color = _state3.color,
          showPicker = _state3.showPicker,
          showPanelColor = _state3.showPanelColor;


      var displayedColor = void 0;
      if (!value && !showPanelColor) {
        displayedColor = 'transparent';
      } else {
        var _color$toRgb = color.toRgb(),
            r = _color$toRgb.r,
            g = _color$toRgb.g,
            b = _color$toRgb.b;

        var alpha = color.get('alpha');
        if (typeof alpha === 'number') {
          displayedColor = showAlpha ? 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha / 100 + ')' : 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
      }
      return _react2.default.createElement(
        'div',
        { className: 'el-color-picker' },
        _react2.default.createElement(
          'div',
          { className: 'el-color-picker__trigger', onClick: function onClick() {
              return _this4.setState({ showPicker: !showPicker });
            } },
          _react2.default.createElement(
            'span',
            { className: this.classNames({ 'el-color-picker__color': true, 'is-alpha': showAlpha }) },
            _react2.default.createElement('span', {
              className: 'el-color-picker__color-inner',
              style: { backgroundColor: displayedColor }
            }),
            !value && !showPanelColor && _react2.default.createElement('span', { className: 'el-color-picker__empty el-icon-close' })
          ),
          _react2.default.createElement('span', { className: 'el-color-picker__icon el-icon-caret-bottom' })
        ),
        _react2.default.createElement(_PickerDropdown2.default, {
          ref: 'dropdown',
          showPicker: showPicker,
          color: color,
          onPick: function onPick() {
            return _this4.confirmValue();
          },
          onClear: function onClear() {
            return _this4.clearValue();
          },
          showAlpha: showAlpha
        })
      );
    }
  }]);

  return ColorPicker;
}(_libs.Component);

ColorPicker.childContextTypes = {
  onChange: _libs.PropTypes.func
};

ColorPicker.propTypes = {
  value: _libs.PropTypes.string,
  showAlpha: _libs.PropTypes.bool,
  colorFormat: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func
};

var _default = (0, _reactClickOutside2.default)(ColorPicker);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ColorPicker, 'ColorPicker', 'src/color-picker/ColorPicker.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/color-picker/ColorPicker.jsx');
}();

;