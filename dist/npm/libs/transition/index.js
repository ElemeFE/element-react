'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transition = function (_Component) {
  _inherits(Transition, _Component);

  function Transition() {
    _classCallCheck(this, Transition);

    return _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).apply(this, arguments));
  }

  _createClass(Transition, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactAddonsCssTransitionGroup2.default, {
        transitionName: this.props.name,
        transitionEnterTimeout: Number(this.props.duration),
        transitionLeaveTimeout: Number(this.props.duration),
        component: this.props.component,
        className: this.props.className,
        style: this.props.style
      }, this.props.children);
    }
  }]);

  return Transition;
}(_react.Component);

var _default = Transition;
exports.default = _default;


Transition.propTypes = {
  name: _react.PropTypes.string.isRequired,
  duration: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  component: _react.PropTypes.string,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object
};

Transition.defaultProps = {
  duration: 300
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Transition, 'Transition', 'libs/transition/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'libs/transition/index.js');
}();

;