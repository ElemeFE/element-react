'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Col = function (_Component) {
  _inherits(Col, _Component);

  function Col() {
    _classCallCheck(this, Col);

    return _possibleConstructorReturn(this, (Col.__proto__ || Object.getPrototypeOf(Col)).apply(this, arguments));
  }

  _createClass(Col, [{
    key: 'getStyle',
    value: function getStyle() {
      var style = {};

      if (this.context.gutter) {
        style.paddingLeft = this.context.gutter / 2 + 'px';
        style.paddingRight = style.paddingLeft;
      }

      return style;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classList = [];

      ['span', 'offset', 'pull', 'push'].forEach(function (prop) {
        if (_this2.props[prop]) {
          classList.push(prop !== 'span' ? 'el-col-' + prop + '-' + _this2.props[prop] : 'el-col-' + _this2.props[prop]);
        }
      });

      ['xs', 'sm', 'md', 'lg'].forEach(function (size) {
        if (_typeof(_this2.props[size]) === 'object') {
          var props = _this2.props[size];
          Object.keys(props).forEach(function (prop) {
            classList.push(prop !== 'span' ? 'el-col-' + size + '-' + prop + '-' + props[prop] : 'el-col-' + size + '-' + props[prop]);
          });
        } else {
          if (_this2.props[size]) {
            classList.push('el-col-' + size + '-' + Number(_this2.props[size]));
          }
        }
      });

      return _react2.default.createElement(
        'div',
        {
          className: this.className('el-col', classList),
          style: this.style(this.getStyle()) },
        this.props.children
      );
    }
  }]);

  return Col;
}(_libs.Component);

var _default = Col;
exports.default = _default;


Col.contextTypes = {
  gutter: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string])
};

Col.propTypes = {
  span: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  offset: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  pull: _libs.PropTypes.number,
  push: _libs.PropTypes.number,
  xs: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object]),
  sm: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object]),
  md: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object]),
  lg: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object])
};

Col.defaultProps = {
  span: 24
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Col, 'Col', 'src/layout/Col.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/layout/Col.jsx');
}();

;