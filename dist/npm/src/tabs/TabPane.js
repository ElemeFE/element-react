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

var TabPane = function (_Component) {
  _inherits(TabPane, _Component);

  function TabPane(props) {
    _classCallCheck(this, TabPane);

    var _this = _possibleConstructorReturn(this, (TabPane.__proto__ || Object.getPrototypeOf(TabPane)).call(this, props));

    var content = [];

    if (_typeof(_this.props.children) === 'object') {
      _this.props.children.forEach(function (item) {
        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item.props['data-solt'] === 'label') {
          return false;
        }

        content.push(item);
      });
    } else {
      content = _this.props.children;
    }

    _this.state = {
      content: content
    };
    return _this;
  }

  _createClass(TabPane, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-tab-pane') },
        this.state.content
      );
    }
  }]);

  return TabPane;
}(_libs.Component);

var _default = TabPane;
exports.default = _default;


TabPane.propTypes = {
  label: _libs.PropTypes.string,
  name: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  closable: _libs.PropTypes.bool
};

TabPane.defaultProps = {
  disabled: false,
  closable: false
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TabPane, 'TabPane', 'src/tabs/TabPane.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/tabs/TabPane.jsx');
}();

;