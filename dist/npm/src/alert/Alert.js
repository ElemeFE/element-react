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

var TYPE_CLASSES_MAP = {
  'success': 'el-icon-circle-check',
  'warning': 'el-icon-warning',
  'error': 'el-icon-circle-cross'
};

var Alert = function (_Component) {
  _inherits(Alert, _Component);

  function Alert(props) {
    _classCallCheck(this, Alert);

    var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

    _this.state = {
      visible: true
    };
    return _this;
  }

  _createClass(Alert, [{
    key: 'close',
    value: function close() {
      var _this2 = this;

      this.setState({
        visible: false
      }, function () {
        if (_this2.props.onClose) {
          _this2.props.onClose();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _libs.Transition,
        { name: 'el-alert-fade', duration: '200' },
        _react2.default.createElement(
          _libs.View,
          { key: this.state.visible, show: this.state.visible },
          _react2.default.createElement(
            'div',
            { style: this.style(), className: this.className('el-alert', 'el-alert--' + this.props.type) },
            this.props.showIcon && _react2.default.createElement('i', { className: this.classNames('el-alert__icon', TYPE_CLASSES_MAP[this.props.type] || 'el-icon-information', {
                'is-big': this.props.description
              }) }),
            _react2.default.createElement(
              'div',
              { className: 'el-alert__content' },
              this.props.title && _react2.default.createElement(
                'span',
                { className: this.classNames('el-alert__title', {
                    'is-bold': this.props.description
                  }) },
                this.props.title
              ),
              this.props.description && _react2.default.createElement(
                'p',
                { className: 'el-alert__description' },
                this.props.description
              ),
              _react2.default.createElement(
                _libs.View,
                { show: this.props.closable },
                _react2.default.createElement(
                  'i',
                  { className: this.classNames('el-alert__closebtn', this.props.closeText ? 'is-customed' : 'el-icon-close'), onClick: this.close.bind(this) },
                  this.props.closeText
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Alert;
}(_libs.Component);

var _default = Alert;
exports.default = _default;


Alert.propTypes = {
  onClose: _libs.PropTypes.func,
  title: _libs.PropTypes.string.isRequired,
  description: _libs.PropTypes.string,
  type: _libs.PropTypes.string,
  closable: _libs.PropTypes.bool,
  closeText: _libs.PropTypes.string,
  showIcon: _libs.PropTypes.bool
};

Alert.defaultProps = {
  type: 'info',
  closable: true
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TYPE_CLASSES_MAP, 'TYPE_CLASSES_MAP', 'src/alert/Alert.jsx');

  __REACT_HOT_LOADER__.register(Alert, 'Alert', 'src/alert/Alert.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/alert/Alert.jsx');
}();

;