'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step = function (_Component) {
  _inherits(Step, _Component);

  function Step(props) {
    _classCallCheck(this, Step);

    return _possibleConstructorReturn(this, (Step.__proto__ || Object.getPrototypeOf(Step)).call(this, props));
  }

  _createClass(Step, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          icon = _props.icon,
          description = _props.description,
          status = _props.status,
          direction = _props.direction,
          style = _props.style,
          lineStyle = _props.lineStyle,
          stepNumber = _props.stepNumber;

      var directionClass = 'is-' + direction;
      var statusClass = 'is-' + status;
      var iconNode = icon ? _react2.default.createElement('i', { className: 'el-icon-' + icon }) : _react2.default.createElement(
        'div',
        null,
        stepNumber
      );

      return _react2.default.createElement(
        'div',
        {
          style: this.style(style),
          className: this.className('el-step', directionClass) },
        _react2.default.createElement(
          'div',
          {
            className: this.classNames('el-step__head', statusClass, {
              'is-text': !icon
            }) },
          _react2.default.createElement(
            'div',
            {
              className: this.classNames('el-step__line', directionClass, {
                'is-icon': icon
              }) },
            _react2.default.createElement('i', { className: 'el-step__line-inner', style: lineStyle })
          ),
          _react2.default.createElement(
            'span',
            { className: 'el-step__icon' },
            status !== 'success' && status !== 'error' ? iconNode : _react2.default.createElement('i', { className: 'el-icon-' + (status === 'success' ? 'check' : 'close') })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'el-step__main' },
          _react2.default.createElement(
            'div',
            {
              ref: 'title',
              className: this.classNames('el-step__title', statusClass) },
            title
          ),
          _react2.default.createElement(
            'div',
            {
              className: this.classNames('el-step__description', statusClass) },
            description
          )
        )
      );
    }
  }]);

  return Step;
}(_libs.Component);

Step.defaultProps = {
  status: 'wait'
};
var _default = Step;
exports.default = _default;


Step.propTypes = {
  title: _libs.PropTypes.string,
  icon: _libs.PropTypes.string,
  description: _libs.PropTypes.string,
  status: _libs.PropTypes.string,
  direction: _libs.PropTypes.string,
  style: _libs.PropTypes.object,
  lineStyle: _libs.PropTypes.object,
  stepNumber: _libs.PropTypes.number
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Step, 'Step', 'src/steps/Step.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/steps/Step.jsx');
}();

;