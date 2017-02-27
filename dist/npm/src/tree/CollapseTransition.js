'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ANIMATION_DURATION = 300;

var CollapseTransition = function (_React$Component) {
  _inherits(CollapseTransition, _React$Component);

  function CollapseTransition() {
    _classCallCheck(this, CollapseTransition);

    return _possibleConstructorReturn(this, (CollapseTransition.__proto__ || Object.getPrototypeOf(CollapseTransition)).apply(this, arguments));
  }

  _createClass(CollapseTransition, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.beforeEnter();
      if (this.props.isShow) {
        this.enter();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.beforeLeave();
      this.leave();
    }
  }, {
    key: 'triggerChange',
    value: function triggerChange() {
      clearTimeout(this.enterTimer);
      clearTimeout(this.leaveTimer);
      if (this.props.isShow) {
        this.beforeEnter();
        this.enter();
      } else {
        this.beforeLeave();
        this.leave();
      }
    }
  }, {
    key: 'beforeEnter',
    value: function beforeEnter() {
      var el = this.selfRef;
      //prepare
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;
      el.style.height = '0';
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  }, {
    key: 'enter',
    value: function enter() {
      var _this2 = this;

      var el = this.selfRef;
      //start
      el.style.display = 'block';
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      } else {
        el.style.height = '';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }

      el.style.overflow = 'hidden';

      this.enterTimer = setTimeout(function () {
        return _this2.afterEnter();
      }, ANIMATION_DURATION);
    }
  }, {
    key: 'afterEnter',
    value: function afterEnter() {
      var el = this.selfRef;
      el.style.display = 'block';
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
    }
  }, {
    key: 'beforeLeave',
    value: function beforeLeave() {
      var el = this.selfRef;
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      el.style.display = 'block';
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
      }
      el.style.overflow = 'hidden';
    }
  }, {
    key: 'leave',
    value: function leave() {
      var _this3 = this;

      var el = this.selfRef;
      if (el.scrollHeight !== 0) {
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }
      this.leaveTimer = setTimeout(function () {
        return _this3.afterLeave();
      }, ANIMATION_DURATION);
    }
  }, {
    key: 'afterLeave',
    value: function afterLeave() {
      var el = this.selfRef;

      el.style.display = 'none';
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'el-tree-node__children collapse-transition',
          ref: function ref(e) {
            return _this4.selfRef = e;
          }
        },
        this.props.children
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        isShow: _react2.default.PropTypes.bool
      };
    }
  }]);

  return CollapseTransition;
}(_react2.default.Component);

var _default = CollapseTransition;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ANIMATION_DURATION, 'ANIMATION_DURATION', 'src/tree/CollapseTransition.jsx');

  __REACT_HOT_LOADER__.register(CollapseTransition, 'CollapseTransition', 'src/tree/CollapseTransition.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/tree/CollapseTransition.jsx');
}();

;