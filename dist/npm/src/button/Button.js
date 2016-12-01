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

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'onClick',
    value: function onClick(e) {
      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        { style: this.style(), className: this.className('el-button', this.props.type && 'el-button--' + this.props.type, this.props.size && 'el-button--' + this.props.size, {
            'is-disabled': this.props.disabled,
            'is-loading': this.props.loading,
            'is-plain': this.props.plain
          }), disabled: this.props.disabled, type: this.props.nativeType, onClick: this.onClick.bind(this) },
        this.props.loading && _react2.default.createElement('i', { className: 'el-icon-loading' }),
        this.props.icon && !this.props.loading && _react2.default.createElement('i', { className: 'el-icon-' + this.props.icon }),
        this.props.children
      );
    }
  }]);

  return Button;
}(_libs.Component);

var _default = Button;
exports.default = _default;


Button.propTypes = {
  onClick: _libs.PropTypes.func,
  type: _libs.PropTypes.string,
  size: _libs.PropTypes.string,
  icon: _libs.PropTypes.string,
  nativeType: _libs.PropTypes.string,
  loading: _libs.PropTypes.bool,
  disabled: _libs.PropTypes.bool,
  plain: _libs.PropTypes.bool
};

Button.defaultProps = {
  type: 'default',
  nativeType: 'button',
  loading: false,
  disabled: false,
  plain: false
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Button, 'Button', 'src/button/Button.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/button/Button.jsx');
}();

;