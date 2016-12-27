'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _popper = require('popper.js');

var _popper2 = _interopRequireDefault(_popper);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.state = {
      showPopper: false
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initialPopper();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.visible != this.props.visible) {
        this.setState({
          showPopper: props.visible
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.initialPopper();
    }
  }, {
    key: 'initialPopper',
    value: function initialPopper() {
      var _refs = this.refs,
          popper = _refs.popper,
          reference = _refs.reference,
          arrow = _refs.arrow;
      var placement = this.props.placement;


      if (arrow) {
        arrow.setAttribute('x-arrow', '');
      }

      this.popper = new _popper2.default(reference, popper, { placement: placement });
    }
  }, {
    key: 'showPopper',
    value: function showPopper() {
      var _this2 = this;

      if (this.props.manual) return;

      this.timeout = setTimeout(function () {
        _this2.setState({ showPopper: true });
      }, this.props.openDelay);
    }
  }, {
    key: 'hidePopper',
    value: function hidePopper() {
      if (this.props.manual) return;

      clearTimeout(this.timeout);
      this.setState({ showPopper: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          effect = _props.effect,
          content = _props.content,
          disabled = _props.disabled,
          transition = _props.transition,
          visibleArrow = _props.visibleArrow;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-tooltip'), onMouseEnter: this.showPopper.bind(this), onMouseLeave: this.hidePopper.bind(this) },
        _react2.default.createElement(
          'div',
          { ref: 'reference', className: 'el-tooltip__rel' },
          _react2.default.createElement(
            'div',
            null,
            this.props.children
          )
        ),
        _react2.default.createElement(
          _libs.Transition,
          { name: transition },
          _react2.default.createElement(
            _libs.View,
            { show: !disabled && this.state.showPopper },
            _react2.default.createElement(
              'div',
              { ref: 'popper', className: this.classNames("el-tooltip__popper", 'is-' + effect) },
              _react2.default.createElement(
                'div',
                null,
                content
              ),
              visibleArrow && _react2.default.createElement('div', { ref: 'arrow', className: 'popper__arrow' })
            )
          )
        )
      );
    }
  }]);

  return Tooltip;
}(_libs.Component);

var _default = Tooltip;
exports.default = _default;


Tooltip.propTypes = {
  // 默认提供的主题: dark, light
  effect: _libs.PropTypes.string,
  // 显示的内容，也可以通过 slot#content 传入 DOM
  content: _libs.PropTypes.oneOfType([_libs.PropTypes.node, _libs.PropTypes.string]),
  // Tooltip 的出现位置 [top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end]
  placement: _libs.PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  // 状态是否可用
  disabled: _libs.PropTypes.bool,
  // 渐变动画定义
  transition: _libs.PropTypes.string,
  // 是否显示 Tooltip 箭头
  visibleArrow: _libs.PropTypes.bool,
  // 延迟出现(单位: 毫秒)
  openDelay: _libs.PropTypes.number,
  // 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效
  manual: _libs.PropTypes.bool,
  // 手动控制状态的展示
  visible: _libs.PropTypes.bool
};

Tooltip.defaultProps = {
  effect: "dark",
  placement: "bottom",
  disabled: false,
  transition: "fade-in-linear",
  visibleArrow: true,
  openDelay: 0,
  manual: false
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Tooltip, 'Tooltip', 'src/tooltip/Tooltip.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/tooltip/Tooltip.jsx');
}();

;