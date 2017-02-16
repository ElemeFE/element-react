'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _calcTextareaHeight = require('./calcTextareaHeight');

var _calcTextareaHeight2 = _interopRequireDefault(_calcTextareaHeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.state = {
      textareaStyle: null
    };
    return _this;
  }

  _createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resizeTextarea();
    }
  }, {
    key: 'fixControlledValue',
    value: function fixControlledValue(value) {
      if (typeof value === 'undefined' || value === null) {
        return '';
      }
      return value;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var onChange = this.props.onChange;


      if (onChange) {
        onChange(e);
      }

      this.resizeTextarea();
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      var onFocus = this.props.onFocus;

      if (onFocus) onFocus(e);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      var onBlur = this.props.onBlur;

      if (onBlur) onBlur(e);
    }
  }, {
    key: 'handleIconClick',
    value: function handleIconClick(e) {
      var onIconClick = this.props.onIconClick;

      if (onIconClick) onIconClick(e);
    }
  }, {
    key: 'resizeTextarea',
    value: function resizeTextarea() {
      var _props = this.props,
          autosize = _props.autosize,
          type = _props.type;


      if (!autosize || type !== 'textarea') {
        return;
      }

      var minRows = autosize.minRows;
      var maxRows = autosize.maxRows;

      this.setState({
        textareaStyle: (0, _calcTextareaHeight2.default)(this.refs.textarea, minRows, maxRows)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          type = _props2.type,
          size = _props2.size,
          prepend = _props2.prepend,
          append = _props2.append,
          icon = _props2.icon,
          autoComplete = _props2.autoComplete,
          validating = _props2.validating,
          rows = _props2.rows,
          onMouseEnter = _props2.onMouseEnter,
          onMouseLeave = _props2.onMouseLeave,
          otherProps = _objectWithoutProperties(_props2, ['type', 'size', 'prepend', 'append', 'icon', 'autoComplete', 'validating', 'rows', 'onMouseEnter', 'onMouseLeave']);

      var classname = this.classNames(type === 'textarea' ? 'el-textarea' : 'el-input', size && 'el-input--' + size, {
        'is-disabled': this.props.disabled,
        'el-input-group': prepend || append,
        'el-input-group--append': !!append,
        'el-input-group--prepend': !!prepend
      });

      if ('value' in this.props) {
        otherProps.value = this.fixControlledValue(this.props.value);

        delete otherProps.defaultValue;
      }

      delete otherProps.style;
      delete otherProps.autosize;
      delete otherProps.onIconClick;

      if (type === 'textarea') {
        return _react2.default.createElement(
          'div',
          { style: this.style(), className: this.className(classname) },
          _react2.default.createElement('textarea', _extends({}, otherProps, {
            ref: 'textarea',
            className: 'el-textarea__inner',
            style: this.state.textareaStyle,
            rows: rows,
            onChange: this.handleChange.bind(this),
            onFocus: this.handleFocus.bind(this),
            onBlur: this.handleBlur.bind(this)
          }))
        );
      } else {
        return _react2.default.createElement(
          'div',
          { style: this.style(), className: this.className(classname), onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
          prepend && _react2.default.createElement(
            'div',
            { className: 'el-input-group__prepend' },
            prepend
          ),
          typeof icon != 'string' ? icon : _react2.default.createElement(
            'i',
            { className: 'el-input__icon el-icon-' + icon, onClick: this.handleIconClick.bind(this) },
            prepend
          ),
          _react2.default.createElement('input', _extends({}, otherProps, {
            ref: 'input',
            className: 'el-input__inner',
            autoComplete: autoComplete,
            onChange: this.handleChange.bind(this),
            onFocus: this.handleFocus.bind(this),
            onBlur: this.handleBlur.bind(this)
          })),
          validating && _react2.default.createElement('i', { className: 'el-input__icon el-icon-loading' }),
          append && _react2.default.createElement(
            'div',
            { className: 'el-input-group__append' },
            append
          )
        );
      }
    }
  }]);

  return Input;
}(_libs.Component);

var _default = Input;
exports.default = _default;


Input.propTypes = {
  // base
  type: _libs.PropTypes.string,
  icon: _libs.PropTypes.oneOfType([_libs.PropTypes.element, _libs.PropTypes.string]),
  disabled: _libs.PropTypes.bool,
  name: _libs.PropTypes.string,
  placeholder: _libs.PropTypes.string,
  readOnly: _libs.PropTypes.bool,
  autoFocus: _libs.PropTypes.bool,
  maxLength: _libs.PropTypes.number,
  minLength: _libs.PropTypes.number,
  defaultValue: _libs.PropTypes.any,
  value: _libs.PropTypes.any,

  // type !== 'textarea'
  size: _libs.PropTypes.oneOf(['large', 'small', 'mini']),
  prepend: _libs.PropTypes.node,
  append: _libs.PropTypes.node,

  // type === 'textarea'
  autosize: _libs.PropTypes.oneOfType([_libs.PropTypes.bool, _libs.PropTypes.object]),
  rows: _libs.PropTypes.number,

  // event
  onFocus: _libs.PropTypes.func,
  onBlur: _libs.PropTypes.func,
  onChange: _libs.PropTypes.func,
  onIconClick: _libs.PropTypes.func,
  onMouseEnter: _libs.PropTypes.func,
  onMouseLeave: _libs.PropTypes.func,

  // autoComplete
  autoComplete: _libs.PropTypes.string,
  inputSelect: _libs.PropTypes.func,

  // form related
  form: _libs.PropTypes.string,
  validating: _libs.PropTypes.bool
};

Input.defaultProps = {
  type: 'text',
  autosize: false,
  rows: 2,
  autoComplete: 'off'
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Input, 'Input', 'src/input/Input.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/input/Input.jsx');
}();

;