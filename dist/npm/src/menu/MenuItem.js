'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _MixinComponent2 = require('./MixinComponent');

var _MixinComponent3 = _interopRequireDefault(_MixinComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = function (_MixinComponent) {
  _inherits(MenuItem, _MixinComponent);

  function MenuItem(props) {
    _classCallCheck(this, MenuItem);

    var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));

    _this.instanceType = 'MenuItem';
    return _this;
  }

  _createClass(MenuItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.rootMenu().state.menuItems[this.props.index] = this;
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.rootMenu().handleSelect(this.props.index, this.indexPath(), this);
    }
  }, {
    key: 'active',
    value: function active() {
      return this.props.index === this.rootMenu().state.activeIndex;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'li',
        {
          style: this.style(),
          className: this.className("el-menu-item", {
            'is-active': this.active(),
            'is-disabled': this.props.disabled
          }),
          onClick: this.handleClick.bind(this)
        },
        this.props.children
      );
    }
  }]);

  return MenuItem;
}(_MixinComponent3.default);

var _default = MenuItem;
exports.default = _default;


MenuItem.propTypes = {
  index: _libs.PropTypes.string.isRequired,
  disabled: _libs.PropTypes.bool
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MenuItem, 'MenuItem', 'src/menu/MenuItem.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/menu/MenuItem.jsx');
}();

;