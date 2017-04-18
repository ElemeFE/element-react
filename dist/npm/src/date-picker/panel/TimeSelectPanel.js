'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../../libs');

var _utils = require('../../../libs/utils');

var _scrollbar = require('../../scrollbar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeSelectPanel = function (_Component) {
  _inherits(TimeSelectPanel, _Component);

  function TimeSelectPanel(props) {
    _classCallCheck(this, TimeSelectPanel);

    var _this = _possibleConstructorReturn(this, (TimeSelectPanel.__proto__ || Object.getPrototypeOf(TimeSelectPanel)).call(this, props));

    _utils.PopperReactMixin.call(_this, function () {
      return _this.refs.root;
    }, _this.props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
    return _this;
  }

  _createClass(TimeSelectPanel, [{
    key: 'handleClick',
    value: function handleClick(item) {
      var _props = this.props,
          onPicked = _props.onPicked,
          dateParser = _props.dateParser;

      if (!item.disabled) {
        onPicked(dateParser(item.value));
      }
    }
  }, {
    key: 'items',
    value: function items() {
      return TimeSelectPanel.items(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var value = this.props.value;


      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: 'el-picker-panel time-select' },
        _react2.default.createElement(
          _scrollbar.Scrollbar,
          { wrapClass: 'el-picker-panel__content', noresize: true },
          this.items().map(function (item, idx) {
            return _react2.default.createElement(
              'div',
              { key: idx,
                className: _this2.classNames('time-select-item', { selected: value === item.value, disabled: item.disabled }),
                disabled: item.disabled,
                onClick: function onClick() {
                  return _this2.handleClick(item);
                } },
              item.value
            );
          })
        )
      );
    }
  }]);

  return TimeSelectPanel;
}(_libs.Component);

var _default = TimeSelectPanel;
exports.default = _default;


TimeSelectPanel.isValid = function (value, _ref) {
  var start = _ref.start,
      end = _ref.end,
      step = _ref.step,
      minTime = _ref.minTime,
      maxTime = _ref.maxTime;

  var items = TimeSelectPanel.items({ start: start, end: end, step: step, minTime: minTime, maxTime: maxTime });
  return !!items.filter(function (e) {
    return !e.disabled;
  }).find(function (e) {
    return e.value === value;
  });
};

TimeSelectPanel.items = function (_ref2) {
  var start = _ref2.start,
      end = _ref2.end,
      step = _ref2.step,
      minTime = _ref2.minTime,
      maxTime = _ref2.maxTime;

  var result = [];

  if (start && end && step) {
    var current = start;
    while (compareTime(current, end) <= 0) {
      result.push({
        value: current,
        disabled: compareTime(current, minTime || '00:00') <= 0 || compareTime(current, maxTime || '100:100') >= 0

      });
      current = nextTime(current, step);
    }
  }
  return result;
};

TimeSelectPanel.propTypes = {
  start: _libs.PropTypes.string,
  end: _libs.PropTypes.string,
  step: _libs.PropTypes.string,
  minTime: _libs.PropTypes.string,
  maxTime: _libs.PropTypes.string,
  value: _libs.PropTypes.string,
  onPicked: _libs.PropTypes.func,
  //(string)=>date
  dateParser: _libs.PropTypes.func.isRequired,
  //()=>HtmlElement
  getPopperRefElement: _libs.PropTypes.func,
  popperMixinOption: _libs.PropTypes.object
};

TimeSelectPanel.defaultProps = {
  start: '09:00',
  end: '18:00',
  step: '00:30',
  minTime: '',
  onPicked: function onPicked() {},

  popperMixinOption: {}
};

var parseTime = function parseTime(time) {
  var values = ('' || time).split(':');
  if (values.length >= 2) {
    var hours = parseInt(values[0], 10);
    var minutes = parseInt(values[1], 10);

    return {
      hours: hours,
      minutes: minutes
    };
  }
  /* istanbul ignore next */
  return null;
};

var compareTime = function compareTime(time1, time2) {
  var value1 = parseTime(time1);
  var value2 = parseTime(time2);

  var minutes1 = value1.minutes + value1.hours * 60;
  var minutes2 = value2.minutes + value2.hours * 60;

  if (minutes1 === minutes2) {
    return 0;
  }

  return minutes1 > minutes2 ? 1 : -1;
};

var formatTime = function formatTime(time) {
  return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes);
};

var nextTime = function nextTime(time, step) {
  var timeValue = parseTime(time);
  var stepValue = parseTime(step);

  var next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };

  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;

  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;

  return formatTime(next);
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TimeSelectPanel, 'TimeSelectPanel', 'src/date-picker/panel/TimeSelectPanel.jsx');

  __REACT_HOT_LOADER__.register(parseTime, 'parseTime', 'src/date-picker/panel/TimeSelectPanel.jsx');

  __REACT_HOT_LOADER__.register(compareTime, 'compareTime', 'src/date-picker/panel/TimeSelectPanel.jsx');

  __REACT_HOT_LOADER__.register(formatTime, 'formatTime', 'src/date-picker/panel/TimeSelectPanel.jsx');

  __REACT_HOT_LOADER__.register(nextTime, 'nextTime', 'src/date-picker/panel/TimeSelectPanel.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/panel/TimeSelectPanel.jsx');
}();

;