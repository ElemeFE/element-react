'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _popper = require('popper.js');

var _popper2 = _interopRequireDefault(_popper);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownMenu = function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    var _this = _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call(this, props));

    _this.state = {
      showPopper: false
    };
    return _this;
  }

  _createClass(DropdownMenu, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.popperJS = new _popper2.default(_reactDom2.default.findDOMNode(this.parent()), this.refs.popper, {
        placement: this.placement()
      });
    }
  }, {
    key: 'onVisibleChange',
    value: function onVisibleChange(visible) {
      this.setState({
        showPopper: visible
      });
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'placement',
    value: function placement() {
      return 'bottom-' + this.parent().props.menuAlign;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _libs.Transition,
        { name: 'md-fade-bottom' },
        _react2.default.createElement(
          _libs.View,
          { show: this.state.showPopper },
          _react2.default.createElement(
            'ul',
            { ref: 'popper', style: this.style(), className: this.className('el-dropdown-menu') },
            this.props.children
          )
        )
      );
    }
  }]);

  return DropdownMenu;
}(_libs.Component);

var _default = DropdownMenu;
exports.default = _default;


DropdownMenu.contextTypes = {
  component: _libs.PropTypes.any
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DropdownMenu, 'DropdownMenu', 'src/dropdown/DropdownMenu.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/dropdown/DropdownMenu.jsx');
}();

;