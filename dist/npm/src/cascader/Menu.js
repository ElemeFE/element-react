'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CascaderMenu = function (_Component) {
  _inherits(CascaderMenu, _Component);

  function CascaderMenu(props) {
    _classCallCheck(this, CascaderMenu);

    var _this = _possibleConstructorReturn(this, (CascaderMenu.__proto__ || Object.getPrototypeOf(CascaderMenu)).call(this, props));

    _this.state = {
      inputWidth: 0,
      options: [],
      props: {},
      visible: false,
      activeValue: [],
      value: [],
      expandTrigger: 'click',
      changeOnSelect: false,
      popperClass: ''
    };
    return _this;
  }

  _createClass(CascaderMenu, [{
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.parent().initMenu(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      if (state.value != this.state.value || state.visible != this.state.visible) {
        this.setState({ activeValue: this.state.value });
      }
    }
  }, {
    key: 'select',
    value: function select(item, menuIndex) {
      if (item.__IS__FLAT__OPTIONS) {
        this.state.activeValue = item.value;
      } else {
        this.state.activeValue.splice(menuIndex, this.state.activeValue.length - 1, item.value);
      }

      this.forceUpdate();
      this.parent().handlePick(this.state.activeValue);
    }
  }, {
    key: 'handleMenuLeave',
    value: function handleMenuLeave() {
      // this.$emit('menuLeave');
    }
  }, {
    key: 'activeItem',
    value: function activeItem(item, menuIndex) {
      var activeOptions = this.activeOptions();

      this.state.activeValue.splice(menuIndex, activeOptions.length, item.value);
      // this.activeOptions.splice(menuIndex + 1, len, item.children);

      this.forceUpdate();

      if (this.parent().props.changeOnSelect) {
        this.parent().handlePick(this.state.activeValue, false);
      } else {
        this.parent().handleActiveItemChange(this.state.activeValue);
      }
    }

    /* Computed Methods */

  }, {
    key: 'activeOptions',
    value: function activeOptions() {
      var _this2 = this;

      var activeValue = this.state.activeValue;
      var configurableProps = ['label', 'value', 'children', 'disabled'];
      var formatOptions = function formatOptions(options) {
        options.forEach(function (option) {
          if (option.__IS__FLAT__OPTIONS) return;
          configurableProps.forEach(function (prop) {
            var value = option[_this2.parent().props.props[prop] || prop];
            if (value) option[prop] = value;
          });
          if (Array.isArray(option.children)) {
            formatOptions(option.children);
          }
        });
      };
      var loadActiveOptions = function loadActiveOptions(options) {
        var activeOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var level = activeOptions.length;
        activeOptions[level] = options;
        var active = activeValue[level];
        if (active) {
          options = options.filter(function (option) {
            return option.value === active;
          })[0];
          if (options && options.children) {
            loadActiveOptions(options.children, activeOptions);
          }
        }
        return activeOptions;
      };

      formatOptions(this.state.options);

      return loadActiveOptions(this.state.options);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _parent$props = this.parent().props,
          expandTrigger = _parent$props.expandTrigger,
          popperClass = _parent$props.popperClass;
      var _state = this.state,
          activeValue = _state.activeValue,
          visible = _state.visible;

      var activeOptions = this.activeOptions();

      var menus = activeOptions.map(function (menu, menuIndex) {
        var isFlat = false;

        var items = menu.map(function (item, index) {
          var events = {};

          if (item.__IS__FLAT__OPTIONS) isFlat = true;

          if (!item.disabled) {
            if (item.children) {
              var triggerEvent = {
                click: 'onClick',
                hover: 'onMouseEnter'
              }[expandTrigger];
              events[triggerEvent] = function () {
                _this3.activeItem(item, menuIndex);
              };
            } else {
              events.onClick = function () {
                _this3.select(item, menuIndex);
              };
            }
          }

          return _react2.default.createElement(
            'li',
            _extends({ key: index, className: _this3.classNames({
                'el-cascader-menu__item': true,
                'el-cascader-menu__item--extensible': item.children,
                'is-active': item.value === activeValue[menuIndex],
                'is-disabled': item.disabled
              })
            }, events),
            item.label
          );
        });

        var menuStyle = {};

        if (isFlat) {
          menuStyle.minWidth = _this3.inputWidth + 'px';
        }

        return _react2.default.createElement(
          'ul',
          { key: menuIndex, className: _this3.classNames({
              'el-cascader-menu': true,
              'el-cascader-menu--flexible': isFlat
            }), style: menuStyle },
          items
        );
      });

      return _react2.default.createElement(
        _libs.Transition,
        { name: 'el-zoom-in-top' },
        _react2.default.createElement(
          _libs.View,
          { show: visible },
          _react2.default.createElement(
            'div',
            { className: this.classNames('el-cascader-menus', popperClass) },
            menus
          )
        )
      );
    }
  }]);

  return CascaderMenu;
}(_libs.Component);

var _default = CascaderMenu;
exports.default = _default;


CascaderMenu.contextTypes = {
  component: _libs.PropTypes.any
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CascaderMenu, 'CascaderMenu', 'src/cascader/Menu.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/cascader/Menu.jsx');
}();

;