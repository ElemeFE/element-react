'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _libs = require('../../libs');

var _MixinComponent2 = require('./MixinComponent');

var _MixinComponent3 = _interopRequireDefault(_MixinComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubMenu = function (_MixinComponent) {
  _inherits(SubMenu, _MixinComponent);

  function SubMenu(props) {
    _classCallCheck(this, SubMenu);

    var _this = _possibleConstructorReturn(this, (SubMenu.__proto__ || Object.getPrototypeOf(SubMenu)).call(this, props));

    _this.instanceType = 'SubMenu';

    _this.state = {
      active: false
    };
    return _this;
  }

  _createClass(SubMenu, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.rootMenu().state.submenus[this.props.index] = this;
      this.initEvents();
    }
  }, {
    key: 'onItemSelect',
    value: function onItemSelect(index, indexPath) {
      this.setState({
        active: indexPath.indexOf(this.props.index) !== -1
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.rootMenu().handleSubmenuClick(this.props.index, this.indexPath());
    }
  }, {
    key: 'handleMouseenter',
    value: function handleMouseenter() {
      var _this2 = this;

      clearTimeout(this.timeout);

      this.timeout = setTimeout(function () {
        _this2.rootMenu().openMenu(_this2.props.index, _this2.indexPath());
      }, 300);
    }
  }, {
    key: 'handleMouseleave',
    value: function handleMouseleave() {
      var _this3 = this;

      clearTimeout(this.timeout);

      this.timeout = setTimeout(function () {
        _this3.rootMenu().closeMenu(_this3.props.index, _this3.indexPath());
      }, 300);
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      if (this.rootMenu().props.mode === 'horizontal' && this.rootMenu().props.menuTrigger === 'hover') {
        var triggerElm = _reactDom2.default.findDOMNode(this);

        triggerElm.addEventListener('mouseenter', this.handleMouseenter.bind(this));
        triggerElm.addEventListener('mouseleave', this.handleMouseleave.bind(this));
      } else {
        var _triggerElm = this.refs['submenu-title'];

        _triggerElm.addEventListener('click', this.handleClick.bind(this));
      }
    }
  }, {
    key: 'opened',
    value: function opened() {
      return this.rootMenu().state.openedMenus.indexOf(this.props.index) !== -1;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'li',
        { style: this.style(), className: this.className('el-submenu', {
            'is-active': this.state.active,
            'is-opened': this.opened()
          }) },
        _react2.default.createElement(
          'div',
          { ref: 'submenu-title', className: 'el-submenu__title' },
          this.props.title,
          _react2.default.createElement('i', { className: this.classNames('el-submenu__icon-arrow', {
              'el-icon-arrow-down': this.rootMenu().props.mode === 'vertical',
              'el-icon-caret-bottom': this.rootMenu().props.mode === 'horizontal'
            }) })
        ),
        _react2.default.createElement(
          _libs.View,
          { show: this.opened() },
          _react2.default.createElement(
            'ul',
            { className: 'el-menu' },
            this.props.children
          )
        )
      );
    }
  }]);

  return SubMenu;
}(_MixinComponent3.default);

var _default = SubMenu;
exports.default = _default;


SubMenu.childContextTypes = {
  component: _libs.PropTypes.any
};

SubMenu.propTypes = {
  index: _libs.PropTypes.string.isRequired
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(SubMenu, 'SubMenu', 'src/menu/SubMenu.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/menu/SubMenu.jsx');
}();

;