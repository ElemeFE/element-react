'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../../libs');

var _utils = require('../../../libs/utils');

var _utils2 = require('../utils');

var _scrollbar = require('../../scrollbar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withIndex(arr) {
  return arr.map(function (e, i) {
    return e, i;
  });
}

function range(end) {
  var r = [];
  for (var i = 0; i < end; i++) {
    r.push(i);
  }
  return r;
}

var isNumber = function isNumber(value) {
  return typeof value === 'number';
};
var validateHour = function validateHour(value) {
  return isNumber(value) && value >= 0 && value <= 23;
};
var validateMinOrSec = function validateMinOrSec(value) {
  return isNumber(value) && value >= 0 && value <= 59;
};

function propsToState(props) {
  var hours = props.hours,
      minutes = props.minutes,
      seconds = props.seconds,
      selectableRange = props.selectableRange;

  var state = {};
  var setOnValid = function setOnValid(isValid, cb) {
    return isValid && cb(state);
  };
  setOnValid(validateHour(hours), function (state) {
    return state.hours = hours;
  });
  setOnValid(validateMinOrSec(minutes), function (state) {
    return state.minutes = minutes;
  });
  setOnValid(validateMinOrSec(seconds), function (state) {
    return state.seconds = seconds;
  });
  state.hoursList = (0, _utils2.getRangeHours)(selectableRange);
  state.minutesLisit = withIndex(range(60));
  state.secondsList = withIndex(range(60));
  return state;
}

var SCROLL_AJUST_VALUE = 85;

var TimeSpinner = function (_Component) {
  _inherits(TimeSpinner, _Component);

  _createClass(TimeSpinner, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        hours: _libs.PropTypes.number,
        minutes: _libs.PropTypes.number,
        seconds: _libs.PropTypes.number,
        isShowSeconds: _libs.PropTypes.bool,
        //[[datefrom, dateend]...]
        selectableRange: _libs.PropTypes.arrayOf(_libs.PropTypes.arrayOf(_react2.default.PropTypes.instanceOf(Date))).isRequired,
        /*
        type: one of [hours, minutes, seconds]
             onChange: ({type})=>()
        */
        onChange: _libs.PropTypes.func.isRequired,
        onSelectRangeChange: _libs.PropTypes.func.isRequired
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        isShowSeconds: true
      };
    }
  }]);

  function TimeSpinner(props) {
    _classCallCheck(this, TimeSpinner);

    var _this = _possibleConstructorReturn(this, (TimeSpinner.__proto__ || Object.getPrototypeOf(TimeSpinner)).call(this, props));

    _this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    Object.assign(_this.state, propsToState(props));
    _this.ajustScrollTop = _this._ajustScrollTop.bind(_this);
    _this.handleScroll = (0, _utils.debounce)(_this._handleScroll.bind(_this), 20);
    return _this;
  }

  _createClass(TimeSpinner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.ajustScrollTop(this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.setState(propsToState(nextProps), function () {
        _this2.ajustScrollTop(_this2.state);
      });
    }
  }, {
    key: 'emitSelectRange',
    value: function emitSelectRange(type) {
      var onSelectRangeChange = this.props.onSelectRangeChange;

      if (type === 'hours') {
        onSelectRangeChange(0, 3);
      } else if (type === 'minutes') {
        onSelectRangeChange(3, 5);
      } else if (type === 'seconds') {
        onSelectRangeChange(6, 9);
      }
    }
  }, {
    key: '_handleScroll',
    value: function _handleScroll(type) {
      var value = Math.min(Math.floor((this.refs[type].refs.wrap.scrollTop - SCROLL_AJUST_VALUE) / 32 + 3), 59);
      this.handleChange(type, value);
    }

    // type: hours, minutes, seconds

  }, {
    key: 'handleChange',
    value: function handleChange(type, value, disabled) {
      var _this3 = this;

      if (disabled) return;
      this.state[type] = value;
      var changed = {};
      changed[type] = value;
      this.setState({}, function () {
        _this3.ajustScrollTop(_this3.state);
      });
      this.props.onChange(changed);
    }
  }, {
    key: '_ajustScrollTop',
    value: function _ajustScrollTop(_ref) {
      var hours = _ref.hours,
          minutes = _ref.minutes,
          seconds = _ref.seconds;

      if (hours != null) {
        this.refs.hours.refs.wrap.scrollTop = Math.max(0, (hours - 2.5) * 32 + SCROLL_AJUST_VALUE);
      }
      if (minutes != null) {
        this.refs.minutes.refs.wrap.scrollTop = Math.max(0, (minutes - 2.5) * 32 + SCROLL_AJUST_VALUE);
      }
      if (seconds != null) {
        this.refs.seconds.refs.wrap.scrollTop = Math.max(0, (seconds - 2.5) * 32 + SCROLL_AJUST_VALUE);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          hoursList = _state.hoursList,
          minutesLisit = _state.minutesLisit,
          secondsList = _state.secondsList,
          hours = _state.hours,
          minutes = _state.minutes,
          seconds = _state.seconds;
      var isShowSeconds = this.props.isShowSeconds;


      return _react2.default.createElement(
        'div',
        { className: this.classNames('el-time-spinner', { 'has-seconds': isShowSeconds }) },
        _react2.default.createElement(
          _scrollbar.Scrollbar,
          {
            onMouseEnter: function onMouseEnter() {
              return _this4.emitSelectRange('hours');
            },
            onWheel: function onWheel() {
              _this4.handleScroll('hours');
            },
            ref: 'hours',
            className: 'el-time-spinner__wrapper',
            wrapStyle: { maxHeight: 'inherit' },
            viewClass: 'el-time-spinner__list',
            viewComponent: 'ul'
          },
          hoursList.map(function (disabled, idx) {

            return _react2.default.createElement(
              'li',
              {
                key: idx,
                onClick: function onClick() {
                  return _this4.handleChange('hours', idx, disabled);
                },
                className: _this4.classNames('el-time-spinner__item', {
                  'active': idx === hours,
                  'disabled': disabled
                })
              },
              idx
            );
          })
        ),
        _react2.default.createElement(
          _scrollbar.Scrollbar,
          {
            onMouseEnter: function onMouseEnter() {
              return _this4.emitSelectRange('minutes');
            },
            onWheel: function onWheel() {
              return _this4.handleScroll('minutes');
            },
            ref: 'minutes',
            className: 'el-time-spinner__wrapper',
            wrapStyle: { maxHeight: 'inherit' },
            viewClass: 'el-time-spinner__list',
            viewComponent: 'ul'
          },
          minutesLisit.map(function (disabled, idx) {
            return _react2.default.createElement(
              'li',
              {
                key: idx,
                onClick: function onClick() {
                  return _this4.handleChange('minutes', idx);
                },
                className: _this4.classNames('el-time-spinner__item', {
                  'active': idx === minutes
                })
              },
              idx
            );
          })
        ),
        isShowSeconds && _react2.default.createElement(
          _scrollbar.Scrollbar,
          {
            onMouseEnter: function onMouseEnter() {
              return _this4.emitSelectRange('seconds');
            },
            onWheel: function onWheel() {
              return _this4.handleScroll('seconds');
            },
            ref: 'seconds',
            className: 'el-time-spinner__wrapper',
            wrapStyle: { maxHeight: 'inherit' },
            viewClass: 'el-time-spinner__list',
            viewComponent: 'ul'
          },
          _react2.default.createElement(
            'ul',
            { className: 'el-time-spinner__list' },
            secondsList.map(function (disabled, idx) {
              return _react2.default.createElement(
                'li',
                {
                  key: idx,
                  onClick: function onClick() {
                    return _this4.handleChange('seconds', idx);
                  },
                  className: _this4.classNames('el-time-spinner__item', {
                    'active': idx === seconds
                  })
                },
                idx
              );
            })
          )
        )
      );
    }
  }]);

  return TimeSpinner;
}(_libs.Component);

var _default = TimeSpinner;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(withIndex, 'withIndex', 'src/date-picker/basic/TimeSpinner.jsx');

  __REACT_HOT_LOADER__.register(range, 'range', 'src/date-picker/basic/TimeSpinner.jsx');

  __REACT_HOT_LOADER__.register(isNumber, 'isNumber', 'src/date-picker/basic/TimeSpinner.jsx');

  __REACT_HOT_LOADER__.register(validateHour, 'validateHour', 'src/date-picker/basic/TimeSpinner.jsx');

  __REACT_HOT_LOADER__.register(validateMinOrSec, 'validateMinOrSec', 'src/date-picker/basic/TimeSpinner.jsx');

  __REACT_HOT_LOADER__.register(propsToState, 'propsToState', 'src/date-picker/basic/TimeSpinner.jsx');

  __REACT_HOT_LOADER__.register(SCROLL_AJUST_VALUE, 'SCROLL_AJUST_VALUE', 'src/date-picker/basic/TimeSpinner.jsx');

  __REACT_HOT_LOADER__.register(TimeSpinner, 'TimeSpinner', 'src/date-picker/basic/TimeSpinner.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/basic/TimeSpinner.jsx');
}();

;