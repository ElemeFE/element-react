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

var icons = {
  error: require('./assets/error.svg'),
  info: require('./assets/info.svg'),
  success: require('./assets/success.svg'),
  warning: require('./assets/warning.svg')
};

var Toast = function (_Component) {
  _inherits(Toast, _Component);

  function Toast(props) {
    _classCallCheck(this, Toast);

    var _this = _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(Toast, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        visible: true
      });

      this.startTimer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopTimer();
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      var _this2 = this;

      this.stopTimer();

      this.setState({
        visible: false
      }, function () {
        _this2.props.willUnmount();
      });
    }
  }, {
    key: 'startTimer',
    value: function startTimer() {
      var _this3 = this;

      this.timeout = setTimeout(function () {
        _this3.onClose();
      }, this.props.duration);
    }
  }, {
    key: 'stopTimer',
    value: function stopTimer() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          iconClass = _props.iconClass,
          customClass = _props.customClass;


      return _react2.default.createElement(
        _libs.Transition,
        { name: 'el-message-fade', duration: '300' },
        _react2.default.createElement(
          _libs.View,
          { key: this.state.visible, show: this.state.visible },
          _react2.default.createElement(
            'div',
            { className: this.classNames('el-message', customClass), onMouseEnter: this.stopTimer.bind(this), onMouseLeave: this.startTimer.bind(this) },
            !iconClass && _react2.default.createElement('img', { className: 'el-message__img', src: icons[this.props.type] }),
            _react2.default.createElement(
              'div',
              { className: this.classNames('el-message__group', { 'is-with-icon': iconClass }) },
              iconClass && _react2.default.createElement('i', { className: this.classNames('el-message__icon', iconClass) }),
              _react2.default.createElement(
                'p',
                null,
                this.props.message
              ),
              this.props.showClose && _react2.default.createElement('div', { className: 'el-message__closeBtn el-icon-close', onClick: this.onClose.bind(this) })
            )
          )
        )
      );
    }
  }]);

  return Toast;
}(_libs.Component);

var _default = Toast;
exports.default = _default;


Toast.propTypes = {
  type: _libs.PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  message: _libs.PropTypes.string.isRequired,
  duration: _libs.PropTypes.number,
  showClose: _libs.PropTypes.bool,
  customClass: _libs.PropTypes.string,
  iconClass: _libs.PropTypes.string
};

Toast.defaultProps = {
  type: 'info',
  duration: 3000,
  showClose: false
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(icons, 'icons', 'src/message/Toast.jsx');

  __REACT_HOT_LOADER__.register(Toast, 'Toast', 'src/message/Toast.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/message/Toast.jsx');
}();

;