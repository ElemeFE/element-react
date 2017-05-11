'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scrollbar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _scrollbarWidth = require('./scrollbar-width');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scrollbar = exports.Scrollbar = function (_Component) {
  _inherits(Scrollbar, _Component);

  _createClass(Scrollbar, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        wrapStyle: _libs.PropTypes.object,
        viewClass: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.object]),
        wrapClass: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.object]),
        className: _libs.PropTypes.string,
        viewComponent: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.element]),
        noresize: _libs.PropTypes.bool
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return { viewComponent: 'div' };
    }
  }]);

  function Scrollbar(props) {
    _classCallCheck(this, Scrollbar);

    return _possibleConstructorReturn(this, (Scrollbar.__proto__ || Object.getPrototypeOf(Scrollbar)).call(this, props));
  }

  _createClass(Scrollbar, [{
    key: 'render',
    value: function render() {

      /* eslint-disable */
      var _props = this.props,
          wrapStyle = _props.wrapStyle,
          viewClass = _props.viewClass,
          children = _props.children,
          viewComponent = _props.viewComponent,
          wrapClass = _props.wrapClass,
          noresize = _props.noresize,
          others = _objectWithoutProperties(_props, ['wrapStyle', 'viewClass', 'children', 'viewComponent', 'wrapClass', 'noresize']);
      /* eslint-enable */

      var gutter = (0, _scrollbarWidth.getScrollBarWidth)();
      if (gutter) {
        var gutterWith = '-' + gutter + 'px';
        wrapStyle = Object.assign({}, wrapStyle, {
          marginRight: gutterWith,
          marginBottom: gutterWith
        });
      }

      viewClass = this.classNames('el-scrollbar__view', viewClass);

      var wrapView = _react2.default.createElement(viewComponent, {
        className: viewClass,
        ref: 'resize'
      }, children);

      return _react2.default.createElement(
        'div',
        { className: this.classNames('el-scrollbar', this.props.className) },
        _react2.default.createElement(
          'div',
          _extends({}, others, {
            ref: 'wrap',
            style: wrapStyle,
            className: this.classNames(this.props.wrapClass, 'el-scrollbar__wrap el-scrollbar__wrap--hidden-default') }),
          wrapView
        )
      );
    }
  }]);

  return Scrollbar;
}(_libs.Component);

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Scrollbar, 'Scrollbar', 'src/scrollbar/Scrollbar.jsx');
}();

;