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

var Popover = function (_Component) {
  _inherits(Popover, _Component);

  function Popover(props) {
    _classCallCheck(this, Popover);

    var _this = _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Popover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var trigger = this.props.trigger,
          popper = this.refs.popper;

      this.element = _reactDom2.default.findDOMNode(this);
      this.reference = _reactDom2.default.findDOMNode(this.refs.reference);

      if (trigger === 'click') {
        this.reference.addEventListener('click', function () {
          _this2.setState({
            showPopper: !_this2.state.showPopper
          });
        });

        document.addEventListener('click', function (e) {
          if (!_this2.element || _this2.element.contains(e.target) || !_this2.reference || _this2.reference.contains(e.target) || !popper || popper.contains(e.target)) return;

          _this2.setState({
            showPopper: false
          });
        });
      } else if (trigger === 'hover') {
        this.reference.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.reference.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

        popper.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        popper.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      } else {
        if (this.reference.nodeName === 'INPUT' || this.reference.nodeName === 'TEXTAREA') {
          this.reference.addEventListener('focus', function () {
            _this2.setState({ showPopper: true });
          });
          this.reference.addEventListener('blur', function () {
            _this2.setState({ showPopper: false });
          });
        } else {
          this.reference.addEventListener('mousedown', function () {
            _this2.setState({ showPopper: true });
          });
          this.reference.addEventListener('mouseup', function () {
            _this2.setState({ showPopper: false });
          });
        }
      }

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
    key: 'componentWillUnMount',
    value: function componentWillUnMount() {
      this.reference.parentNode.replaceChild(this.reference.cloneNode(true), this.reference);
    }
  }, {
    key: 'initialPopper',
    value: function initialPopper() {
      if (this.refs.arrow) {
        this.refs.arrow.setAttribute('x-arrow', '');
      }

      this.popperJS = new _popper2.default(this.reference, this.refs.popper, {
        placement: this.props.placement
      });
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      clearTimeout(this.timer);

      this.setState({
        showPopper: true
      });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      var _this3 = this;

      this.timer = setTimeout(function () {
        _this3.setState({
          showPopper: false
        });
      }, 200);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          transition = _props.transition,
          popperClass = _props.popperClass,
          width = _props.width,
          title = _props.title,
          content = _props.content,
          visibleArrow = _props.visibleArrow;


      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          _libs.Transition,
          { name: transition, duration: 200 },
          _react2.default.createElement(
            _libs.View,
            { show: this.state.showPopper },
            _react2.default.createElement(
              'div',
              { ref: 'popper', className: this.className('el-popover', popperClass), style: this.style({ width: Number(width) }) },
              title && _react2.default.createElement(
                'div',
                { className: 'el-popover__title' },
                title
              ),
              content,
              visibleArrow && _react2.default.createElement('div', { ref: 'arrow', className: 'popper__arrow' })
            )
          )
        ),
        _react2.default.cloneElement(_react2.default.Children.only(this.props.children), { ref: 'reference' })
      );
    }
  }]);

  return Popover;
}(_libs.Component);

var _default = Popover;
exports.default = _default;


Popover.propTypes = {
  width: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  placement: _libs.PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  trigger: _libs.PropTypes.oneOf(['click', 'focus', 'hover']),
  title: _libs.PropTypes.string,
  content: _libs.PropTypes.oneOfType([_libs.PropTypes.node, _libs.PropTypes.string]),
  popperClass: _libs.PropTypes.string,
  transition: _libs.PropTypes.string,
  visible: _libs.PropTypes.bool,
  visibleArrow: _libs.PropTypes.bool
};

Popover.defaultProps = {
  visibleArrow: true,
  transition: 'fade-in-linear',
  trigger: 'click',
  placement: 'bottom',
  width: 150
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Popover, 'Popover', 'src/popover/Popover.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/popover/Popover.jsx');
}();

;