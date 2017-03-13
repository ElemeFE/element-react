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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.enableScroll();
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      if (this.props.fullscreen) {
        this.disableScroll();

        return {
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 99999
        };
      } else {
        this.enableScroll();

        return {
          position: 'relative'
        };
      }
    }
  }, {
    key: 'documentBody',
    value: function documentBody() {
      return document.body;
    }
  }, {
    key: 'disableScroll',
    value: function disableScroll() {
      this.documentBody().style.setProperty('overflow', 'hidden');
    }
  }, {
    key: 'enableScroll',
    value: function enableScroll() {
      this.documentBody().style.removeProperty('overflow');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          loading = _props.loading,
          fullscreen = _props.fullscreen,
          text = _props.text;


      return _react2.default.createElement(
        'div',
        { style: this.style(this.getStyle()), className: this.className() },
        loading && _react2.default.createElement(
          'div',
          {
            style: {
              display: 'block',
              position: 'absolute',
              zIndex: 657,
              backgroundColor: 'rgba(255, 255, 255, 0.901961)',
              margin: 0,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            } },
          _react2.default.createElement(
            'div',
            { className: this.classNames('el-loading-spinner', {
                'is-full-screen': fullscreen
              }), style: {
                position: 'absolute',
                display: 'inline-block'
              } },
            _react2.default.createElement(
              'svg',
              { className: 'circular', viewBox: '25 25 50 50' },
              _react2.default.createElement('circle', { className: 'path', cx: '50', cy: '50', r: '20', fill: 'none' })
            ),
            text && _react2.default.createElement(
              'p',
              { className: 'el-loading-text' },
              text
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
  loading: _libs.PropTypes.bool,
  fullscreen: _libs.PropTypes.bool,
  text: _libs.PropTypes.string
};

Loading.defaultProps = {
  loading: true
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