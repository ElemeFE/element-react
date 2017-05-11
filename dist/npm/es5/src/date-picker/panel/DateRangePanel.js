'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../../libs');

var _locale = require('../../locale');

var _locale2 = _interopRequireDefault(_locale);

var _utils = require('../utils');

var _basic = require('../basic');

var _utils2 = require('../../../libs/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prevYear = function _prevYear(date) {
  var d = (0, _utils.toDate)(date);
  d.setFullYear(date.getFullYear() - 1);
  return d;
};

var _nextYear = function _nextYear(date) {
  var d = (0, _utils.toDate)(date);
  d.setFullYear(date.getFullYear() + 1);
  return d;
};

var mapPropsToState = function mapPropsToState(props) {
  var value = props.value;

  var state = {
    rangeState: {
      endDate: null,
      selecting: false
    }
  };
  if (!value) {
    state = {
      minDate: null,
      maxDate: null,
      date: new Date()
    };
  } else {
    if (value[0] && value[1]) {
      state.minDate = (0, _utils.toDate)(value[0]);
      state.maxDate = (0, _utils.toDate)(value[1]);
    }
    if (value[0]) {
      state.date = (0, _utils.toDate)(value[0]);
    } else {
      state.date = new Date();
    }
  }

  return state;
};

var DateRangePanel = function (_Component) {
  _inherits(DateRangePanel, _Component);

  function DateRangePanel(props) {
    _classCallCheck(this, DateRangePanel);

    var _this = _possibleConstructorReturn(this, (DateRangePanel.__proto__ || Object.getPrototypeOf(DateRangePanel)).call(this, props));

    _this.state = {};
    _this.state = Object.assign(_this.state, mapPropsToState(props));
    _utils2.PopperReactMixin.call(_this, function () {
      return _this.refs.root;
    }, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
    return _this;
  }

  _createClass(DateRangePanel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(mapPropsToState(nextProps));
    }
  }, {
    key: 'handleRangePick',
    value: function handleRangePick(_ref, isClose) {
      var minDate = _ref.minDate,
          maxDate = _ref.maxDate;
      var _props = this.props,
          showTime = _props.showTime,
          onPick = _props.onPick;

      this.setState({ minDate: minDate, maxDate: maxDate });
      if (!isClose) return;
      if (!showTime) {
        onPick([minDate, maxDate], false);
      }
    }
  }, {
    key: 'prevYear',
    value: function prevYear() {
      var date = this.state.date;

      this.setState({
        date: _prevYear(date)
      });
    }
  }, {
    key: 'nextYear',
    value: function nextYear() {
      var date = this.state.date;

      this.setState({
        date: _nextYear(date)
      });
    }
  }, {
    key: 'prevMonth',
    value: function prevMonth() {
      this.setState({
        date: (0, _utils.prevMonth)(this.state.date)
      });
    }
  }, {
    key: 'nextMonth',
    value: function nextMonth() {
      this.setState({
        date: (0, _utils.nextMonth)(this.state.date)
      });
    }
  }, {
    key: 'handleChangeRange',


    //todo: wired way to do sth like this? try to come up with a better option
    value: function handleChangeRange(_ref2) {
      var endDate = _ref2.endDate;
      var _state = this.state,
          rangeState = _state.rangeState,
          minDate = _state.minDate;

      if (endDate <= minDate) endDate = null;

      rangeState.endDate = endDate;
      this.setState({
        maxDate: endDate
      });
    }
  }, {
    key: 'handleShortcutClick',
    value: function handleShortcutClick(shortcut) {
      shortcut.onClick();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          shortcuts = _props2.shortcuts,
          showTime = _props2.showTime,
          disabledDate = _props2.disabledDate;
      var _state2 = this.state,
          date = _state2.date,
          rangeState = _state2.rangeState,
          minDate = _state2.minDate,
          maxDate = _state2.maxDate;

      var rightDate = this.rightDate;

      var t = _locale2.default.t;
      var leftLabel = date.getFullYear() + ' ' + t('el.datepicker.year') + ' ' + t('el.datepicker.month' + (date.getMonth() + 1));
      var rightLabel = date.getFullYear() + ' ' + t('el.datepicker.year') + ' ' + t('el.datepicker.month' + (rightDate.getMonth() + 1));

      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: this.classNames('el-picker-panel el-date-range-picker', {
            'has-sidebar': shortcuts,
            'has-time': showTime
          })
        },
        _react2.default.createElement(
          'div',
          { className: 'el-picker-panel__body-wrapper' },
          Array.isArray(shortcuts) && _react2.default.createElement(
            'div',
            { className: 'el-picker-panel__sidebar' },
            shortcuts.map(function (e, idx) {
              return _react2.default.createElement(
                'button',
                {
                  key: idx,
                  type: 'button',
                  className: 'el-picker-panel__shortcut',
                  onClick: function onClick() {
                    return _this2.handleShortcutClick(e);
                  } },
                e.text
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'el-picker-panel__body' },
            _react2.default.createElement(
              'div',
              { className: 'el-picker-panel__content el-date-range-picker__content is-left' },
              _react2.default.createElement(
                'div',
                { className: 'el-date-range-picker__header' },
                _react2.default.createElement('button', {
                  type: 'button',
                  onClick: this.prevYear.bind(this),
                  className: 'el-picker-panel__icon-btn el-icon-d-arrow-left' }),
                _react2.default.createElement('button', {
                  type: 'button',
                  onClick: this.prevMonth.bind(this),
                  className: 'el-picker-panel__icon-btn el-icon-arrow-left' }),
                _react2.default.createElement(
                  'div',
                  null,
                  leftLabel
                )
              ),
              _react2.default.createElement(_basic.DateTable, {
                selectionMode: _utils.SELECTION_MODES.RANGE,
                date: date,
                value: minDate,
                minDate: minDate,
                maxDate: maxDate,
                rangeState: rangeState,
                disabledDate: disabledDate,
                onChangeRange: this.handleChangeRange.bind(this),
                onPick: this.handleRangePick.bind(this)
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'el-picker-panel__content el-date-range-picker__content is-right' },
              _react2.default.createElement(
                'div',
                { className: 'el-date-range-picker__header' },
                _react2.default.createElement('button', {
                  type: 'button',
                  onClick: this.nextYear.bind(this),
                  className: 'el-picker-panel__icon-btn el-icon-d-arrow-right' }),
                _react2.default.createElement('button', {
                  type: 'button',
                  onClick: this.nextMonth.bind(this),
                  className: 'el-picker-panel__icon-btn el-icon-arrow-right' }),
                _react2.default.createElement(
                  'div',
                  null,
                  rightLabel
                )
              ),
              _react2.default.createElement(_basic.DateTable, {
                selectionMode: _utils.SELECTION_MODES.RANGE,
                date: rightDate,
                value: maxDate,
                minDate: minDate,
                maxDate: maxDate,
                rangeState: rangeState,
                disabledDate: disabledDate,
                onChangeRange: this.handleChangeRange.bind(this),
                onPick: this.handleRangePick.bind(this)
              })
            )
          )
        )
      );
    }
  }, {
    key: 'rightDate',
    get: function get() {
      var newDate = new Date(this.state.date);
      var month = newDate.getMonth();
      newDate.setDate(1);

      if (month === 11) {
        newDate.setFullYear(newDate.getFullYear() + 1);
        newDate.setMonth(0);
      } else {
        newDate.setMonth(month + 1);
      }
      return newDate;
    }
  }]);

  return DateRangePanel;
}(_libs.Component);

var _default = DateRangePanel;
exports.default = _default;


DateRangePanel.propTypes = {
  // user picked date value
  value: _libs.PropTypes.arrayOf(_libs.PropTypes.instanceOf(Date)),
  // ([value1, value2]|null, isKeepPanel)=>()
  onPick: _libs.PropTypes.func.isRequired,
  showTime: _libs.PropTypes.bool,
  // Array[{text: String, onClick: (picker)=>()}]
  shortcuts: _libs.PropTypes.arrayOf(_libs.PropTypes.shape({
    text: _libs.PropTypes.string.isRequired,
    // ()=>()
    onClick: _libs.PropTypes.func.isRequired
  })),
  // (Date)=>bool, if true, disabled
  disabledDate: _libs.PropTypes.func,
  //()=>HtmlElement
  getPopperRefElement: _libs.PropTypes.func,
  popperMixinOption: _libs.PropTypes.object
};

DateRangePanel.defaultProps = {};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_prevYear, 'prevYear', 'src/date-picker/panel/DateRangePanel.jsx');

  __REACT_HOT_LOADER__.register(_nextYear, 'nextYear', 'src/date-picker/panel/DateRangePanel.jsx');

  __REACT_HOT_LOADER__.register(mapPropsToState, 'mapPropsToState', 'src/date-picker/panel/DateRangePanel.jsx');

  __REACT_HOT_LOADER__.register(DateRangePanel, 'DateRangePanel', 'src/date-picker/panel/DateRangePanel.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/panel/DateRangePanel.jsx');
}();

;