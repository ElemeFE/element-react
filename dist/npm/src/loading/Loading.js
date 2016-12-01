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

var Loading = function (_Component) {
  _inherits(Loading, _Component);

  function Loading() {
    _classCallCheck(this, Loading);

    return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
  }

  _createClass(Loading, [{
    key: 'getStyle',
    value: function getStyle() {
      if (this.props.fullscreen) {
        document.body.style.setProperty('overflow', 'hidden');

        return {
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 10002
        };
      } else {
        document.body.style.removeProperty('overflow');

        return {
          position: 'relative'
        };
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.style(this.getStyle()), className: this.className() },
        _react2.default.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              zIndex: 10001,
              backgroundColor: 'rgba(255, 255, 255, 0.901961)',
              margin: 0,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: 'block'
            } },
          _react2.default.createElement(
            'div',
            { className: this.classNames('el-loading-spinner', {
                'is-full-screen': this.props.fullscreen
              }), style: {
                position: 'absolute',
                display: 'inline-block'
              } },
            _react2.default.createElement(
              'svg',
              { className: 'circular', viewBox: '25 25 50 50' },
              _react2.default.createElement('circle', { className: 'path', cx: '50', cy: '50', r: '20', fill: 'none' })
            ),
            this.props.text && _react2.default.createElement(
              'p',
              { className: 'el-loading-text' },
              this.props.text
            )
          )
        ),
        this.props.children
      );
    }
  }]);

  return Loading;
}(_libs.Component);

var _default = Loading;
exports.default = _default;


Loading.propTypes = {
  fullscreen: _libs.PropTypes.bool,
  text: _libs.PropTypes.string
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Loading, 'Loading', 'src/loading/Loading.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/loading/Loading.jsx');
}();

;