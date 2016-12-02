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
      return _react2.default.createElement(
        'div',
        { className: this.className('el-col', 'el-col-' + this.props.span, this.props.offset && 'el-col-offset-' + this.props.offset, this.props.pull && 'el-col-pull-' + this.props.pull, this.props.push && 'el-col-push-' + this.props.push), style: this.style(this.getStyle()) },
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
  span: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]).isRequired,
  offset: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  pull: _libs.PropTypes.number,
  push: _libs.PropTypes.number
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