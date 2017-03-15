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

var Steps = function (_Component) {
  _inherits(Steps, _Component);

  function Steps() {
    _classCallCheck(this, Steps);

    return _possibleConstructorReturn(this, (Steps.__proto__ || Object.getPrototypeOf(Steps)).apply(this, arguments));
  }

  _createClass(Steps, [{
    key: 'calcProgress',
    value: function calcProgress(status, index) {
      var step = 100;
      var style = {};
      style.transitionDelay = 150 * index + 'ms';

      var nextStatus = this.calStatus(index + 1);
      // 前后状态不一致时，并且当前status为完成，statusLine的长度才为50%
      if (nextStatus !== status) {
        if (status === this.props.finishStatus) {
          step = 50;
        } else if (status === 'wait') {
          step = 0;
          style.transitionDelay = -150 * index + 'ms';
        }
      }

      this.props.direction === 'vertical' ? style.height = step + '%' : style.width = step + '%';
      return style;
    }
  }, {
    key: 'calStatus',
    value: function calStatus(index) {
      var _props = this.props,
          active = _props.active,
          finishStatus = _props.finishStatus,
          processStatus = _props.processStatus;

      var status = 'wait';

      if (active > index) {
        status = finishStatus;
      } else if (active === index) {
        status = processStatus;
      }

      return status;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          children = _props2.children,
          space = _props2.space,
          direction = _props2.direction;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-steps') },
        _react2.default.Children.map(children, function (child, index) {
          var computedSpace = space ? space + 'px' : 100 / children.length + '%';
          var style = direction === 'horizontal' ? { width: computedSpace } : { height: index === children.length - 1 ? 'auto' : computedSpace };
          var status = _this2.calStatus(index);
          var lineStyle = _this2.calcProgress(status, index);
          return _react2.default.cloneElement(child, {
            style: style,
            lineStyle: lineStyle,
            direction: direction,
            status: status,
            stepNumber: index + 1
          });
        })
      );
    }
  }]);

  return Steps;
}(_libs.Component);

Steps.defaultProps = {
  direction: 'horizontal',
  finishStatus: 'finish',
  processStatus: 'process',
  active: 0
};
var _default = Steps;
exports.default = _default;


var statusMap = ['wait', 'process', 'finish', 'error', 'success'];

Steps.propTypes = {
  space: _libs.PropTypes.number,
  active: _libs.PropTypes.number,
  direction: _libs.PropTypes.oneOf(['vertical', 'horizontal']),
  finishStatus: _libs.PropTypes.oneOf(statusMap),
  processStatus: _libs.PropTypes.oneOf(statusMap)
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Steps, 'Steps', 'src/steps/Steps.jsx');

  __REACT_HOT_LOADER__.register(statusMap, 'statusMap', 'src/steps/Steps.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/steps/Steps.jsx');
}();

;