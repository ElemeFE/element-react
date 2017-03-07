'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _libs = require('../../libs');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initEvent();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props, state) {
      if (state.visible != this.state.visible) {
        this.refs.dropdown.onVisibleChange(state.visible);
      }
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      if (this.state.visible) {
        this.setState({ visible: false });
      }
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this2.setState({ visible: true });
      }, 250);
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this3.setState({ visible: false });
      }, 150);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.setState({ visible: !this.state.visible });
    }
  }, {
    key: 'initEvent',
    value: function initEvent() {
      var _props = this.props,
          trigger = _props.trigger,
          splitButton = _props.splitButton;

      var triggerElm = _reactDom2.default.findDOMNode(splitButton ? this.refs.trigger : this.refs.default);

      if (trigger === 'hover') {
        triggerElm.addEventListener('mouseenter', this.show.bind(this));
        triggerElm.addEventListener('mouseleave', this.hide.bind(this));

        var dropdownElm = _reactDom2.default.findDOMNode(this.refs.dropdown);

        dropdownElm.addEventListener('mouseenter', this.show.bind(this));
        dropdownElm.addEventListener('mouseleave', this.hide.bind(this));
      } else if (trigger === 'click') {
        triggerElm.addEventListener('click', this.handleClick.bind(this));
      }
    }
  }, {
    key: 'handleMenuItemClick',
    value: function handleMenuItemClick(command, instance) {
      this.setState({
        visible: false
      });

      if (this.props.onCommand) {
        this.props.onCommand(command, instance);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          splitButton = _props2.splitButton,
          type = _props2.type,
          size = _props2.size,
          menu = _props2.menu;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-dropdown') },
        splitButton ? _react2.default.createElement(
          _button2.default.Group,
          null,
          _react2.default.createElement(
            _button2.default,
            { type: type, size: size, onClick: this.props.onClick.bind(this) },
            this.props.children
          ),
          _react2.default.createElement(
            _button2.default,
            { ref: 'trigger', type: type, size: size, className: 'el-dropdown__caret-button' },
            _react2.default.createElement('i', { className: 'el-dropdown__icon el-icon-caret-bottom' })
          )
        ) : _react2.default.cloneElement(this.props.children, { ref: 'default' }),
        _react2.default.cloneElement(menu, {
          ref: 'dropdown'
        })
      );
    }
  }]);

  return Dropdown;
}(_libs.Component);

Dropdown.childContextTypes = {
  component: _libs.PropTypes.any
};

Dropdown.propTypes = {
  menu: _libs.PropTypes.node.isRequired,
  type: _libs.PropTypes.string,
  size: _libs.PropTypes.string,
  trigger: _libs.PropTypes.oneOf(['hover', 'click']),
  menuAlign: _libs.PropTypes.oneOf(['start', 'end']),
  splitButton: _libs.PropTypes.bool,
  onClick: _libs.PropTypes.func,
  onCommand: _libs.PropTypes.func
};

Dropdown.defaultProps = {
  trigger: 'hover',
  menuAlign: 'end'
};

var _default = (0, _reactClickOutside2.default)(Dropdown);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Dropdown, 'Dropdown', 'src/dropdown/Dropdown.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/dropdown/Dropdown.jsx');
}();

;