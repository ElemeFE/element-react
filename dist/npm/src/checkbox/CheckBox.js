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

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

    _this.state = {
      checked: Boolean(props.checked || props.defaultChecked),
      focus: Boolean(props.focus),
      label: _this.getLabel(props)
    };
    return _this;
  }

  _createClass(Checkbox, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        checked: nextProps.checked, focus: nextProps.focus, label: this.getLabel(nextProps)
      });
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
    key: 'onChange',
    value: function onChange(e) {
      var label = this.state.label;
      var _props = this.props,
          trueLabel = _props.trueLabel,
          falseLabel = _props.falseLabel,
          value = _props.value;

      var checked = e.target.checked;
      var newLabel = label;

      if (this.props.trueLabel || this.props.falseLabel) {
        newLabel = checked ? trueLabel : falseLabel;
      }

      if (this.props.onChange) {
        if (this.context.isWrap) {
          this.props.onChange(e, label, value);
        } else {
          this.props.onChange(e, label, value);
        }
      }

      this.setState({
        checked: checked,
        label: newLabel
      });
    }
  }, {
    key: 'getLabel',
    value: function getLabel(props) {
      if (props.trueLabel || props.falseLabel) {
        return props.checked ? props.trueLabel : props.falseLabel;
      } else {
        return props.label;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'label',
        { style: this.style(), className: this.className('el-checkbox') },
        _react2.default.createElement(
          'span',
          { className: this.classNames('el-checkbox__input', {
              'is-disabled': this.props.disabled,
              'is-checked': this.state.checked,
              'is-indeterminate': this.props.indeterminate,
              'is-focus': this.state.focus
            }) },
          _react2.default.createElement('span', { className: 'el-checkbox__inner' }),
          _react2.default.createElement('input', {
            className: 'el-checkbox__original',
            type: 'checkbox',
            checked: this.state.checked,
            disabled: this.props.disabled,
            onFocus: this.onFocus.bind(this),
            onBlur: this.onBlur.bind(this),
            onChange: this.onChange.bind(this)
          })
        ),
        _react2.default.createElement(
          'span',
          { className: 'el-checkbox__label' },
          this.state.label || this.props.children
        )
      );
    }
  }]);

  return Checkbox;
}(_libs.Component);

var _default = Checkbox;
exports.default = _default;


Checkbox.defaultProps = {
  checked: false,
  focus: false,
  trueLabel: '',
  falseLabel: ''
};

Checkbox.propTypes = {
  label: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  checked: _libs.PropTypes.bool,
  indeterminate: _libs.PropTypes.bool,
  focus: _libs.PropTypes.bool,
  trueLabel: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  falseLabel: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  onChange: _libs.PropTypes.func
};

Checkbox.contextTypes = {
  isWrap: _libs.PropTypes.bool
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Checkbox, 'Checkbox', 'src/checkbox/CheckBox.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/checkbox/CheckBox.jsx');
}();

;