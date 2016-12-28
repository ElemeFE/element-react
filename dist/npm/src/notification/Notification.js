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

var typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

var Notification = function (_Component) {
  _inherits(Notification, _Component);

  function Notification(props) {
    _classCallCheck(this, Notification);

    var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(Notification, [{
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

      if (this.props.duration) {
        this.timeout = setTimeout(function () {
          _this3.onClose();
        }, this.props.duration);
      }
    }
  }, {
    key: 'stopTimer',
    value: function stopTimer() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'typeClass',
    value: function typeClass() {
      return this.props.type && typeMap[this.props.type] ? 'el-icon-' + typeMap[this.props.type] : '';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _libs.Transition,
        { name: 'el-notification-fade', duration: '300' },
        _react2.default.createElement(
          _libs.View,
          { key: this.state.visible, show: this.state.visible },
          _react2.default.createElement(
            'div',
            { className: 'el-notification', style: {
                top: this.props.top,
                zIndex: 9999
              }, onMouseEnter: this.stopTimer.bind(this), onMouseLeave: this.startTimer.bind(this) },
            this.props.type && _react2.default.createElement('i', { className: this.classNames('el-notification__icon', this.typeClass()) }),
            _react2.default.createElement(
              'div',
              { className: 'el-notification__group', style: {
                  marginLeft: this.typeClass() ? '55px' : '0'
                } },
              _react2.default.createElement(
                'span',
                null,
                this.props.title
              ),
              _react2.default.createElement(
                'p',
                null,
                this.props.message
              ),
              _react2.default.createElement('div', { className: 'el-notification__closeBtn el-icon-close', onClick: this.onClose.bind(this) })
            )
          )
        )
      );
    }
  }]);

  return Notification;
}(_libs.Component);

var _default = Notification;
exports.default = _default;


Notification.propTypes = {
  type: _libs.PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: _libs.PropTypes.string,
  message: _libs.PropTypes.string,
  duration: _libs.PropTypes.number,
  top: _libs.PropTypes.number
};

Notification.defaultProps = {
  duration: 4500,
  top: 16
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(typeMap, 'typeMap', 'src/notification/Notification.jsx');

  __REACT_HOT_LOADER__.register(Notification, 'Notification', 'src/notification/Notification.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/notification/Notification.jsx');
}();

;