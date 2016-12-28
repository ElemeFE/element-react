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

var PICKER_VIEWS = {
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date'
};

/*
handle todos:
  handle timepicker inside this picker
*/

var DatePanel = function (_Component) {
  _inherits(DatePanel, _Component);

  function DatePanel(props) {
    _classCallCheck(this, DatePanel);

    var _this = _possibleConstructorReturn(this, (DatePanel.__proto__ || Object.getPrototypeOf(DatePanel)).call(this, props));

    var currentView = PICKER_VIEWS.DATE;
    switch (props.selectionMode) {
      case _utils.SELECTION_MODES.MONTH:
        currentView = PICKER_VIEWS.MONTH;break;
      case _utils.SELECTION_MODES.YEAR:
        currentView = PICKER_VIEWS.YEAR;break;
    }

    _this.state = {
      currentView: currentView,
      date: new Date() // current view's date
    };

    if (props.value) {
      _this.state.date = new Date(props.value);
    }

    _utils2.PopperReactMixin.call(_this, function () {
      return _this.refs.root;
    }, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
    return _this;
  }

  _createClass(DatePanel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ date: nextProps.value });
    }

    /*
    selectionMode(newVal) {
      if (newVal === 'month') {
        if (this.currentView !== 'year' || this.currentView !== 'month') {
          this.currentView = 'month';
        }
      }
    },
    */
    // start: ------ public methods

    // handleClear() {
    //   this.setState({ date: new Date() })
    //   this.props.onPick(null)//todo: Panel onPick doesnt accept null
    // }

  }, {
    key: 'resetDate',
    value: function resetDate() {
      this.date = new Date(this.date);
    }
  }, {
    key: 'showMonthPicker',
    value: function showMonthPicker() {
      this.setState({ currentView: PICKER_VIEWS.MONTH });
    }
  }, {
    key: 'showYearPicker',
    value: function showYearPicker() {
      this.setState({ currentView: PICKER_VIEWS.YEAR });
    }
  }, {
    key: 'prevMonth',
    value: function prevMonth() {
      var _this2 = this;

      this.updateState(function () {
        var date = _this2.state.date;

        var _deconstructDate = (0, _utils.deconstructDate)(date),
            month = _deconstructDate.month,
            year = _deconstructDate.year;

        if (month == 0) {
          date.setFullYear(year - 1);
          date.setMonth(11);
        } else {
          date.setMonth(month - 1);
        }
      });
    }
  }, {
    key: 'nextMonth',
    value: function nextMonth() {
      var _this3 = this;

      this.updateState(function () {
        var date = _this3.state.date;

        var _deconstructDate2 = (0, _utils.deconstructDate)(date),
            month = _deconstructDate2.month,
            year = _deconstructDate2.year;

        if (month == 11) {
          date.setFullYear(year + 1);
          date.setMonth(0);
        } else {
          date.setMonth(month + 1);
        }
      });
    }
  }, {
    key: 'nextYear',
    value: function nextYear() {
      var _this4 = this;

      this.updateState(function () {
        var _state = _this4.state,
            date = _state.date,
            currentView = _state.currentView;

        var _deconstructDate3 = (0, _utils.deconstructDate)(date),
            year = _deconstructDate3.year;

        if (currentView === 'year') {
          date.setFullYear(year + 10);
        } else {
          date.setFullYear(year + 1);
        }
      });
    }
  }, {
    key: 'updateState',
    value: function updateState(cb) {
      cb(this.state);
      this.setState({});
    }
  }, {
    key: 'prevYear',
    value: function prevYear() {
      var _this5 = this;

      this.updateState(function () {
        var _state2 = _this5.state,
            date = _state2.date,
            currentView = _state2.currentView;

        var _deconstructDate4 = (0, _utils.deconstructDate)(date),
            year = _deconstructDate4.year;

        if (currentView === 'year') {
          date.setFullYear(year - 10);
        } else {
          date.setFullYear(year - 1);
        }
      });
    }
  }, {
    key: 'handleShortcutClick',
    value: function handleShortcutClick(shortcut) {
      shortcut.onClick();
    }

    //todo:

  }, {
    key: 'handleTimePick',
    value: function handleTimePick(picker, visible, first) {
      // if (picker) {
      //   let oldDate = new Date(this.date.getTime());
      //   let hour = picker.getHours();
      //   let minute = picker.getMinutes();
      //   let second = picker.getSeconds();
      //   oldDate.setHours(hour);
      //   oldDate.setMinutes(minute);
      //   oldDate.setSeconds(second);
      //   this.date = new Date(oldDate.getTime());
      // }

      // if (!first) {
      //   this.timePickerVisible = visible;
      // }
    }
  }, {
    key: 'handleMonthPick',
    value: function handleMonthPick(month) {
      var _this6 = this;

      this.updateState(function (state) {
        var date = state.date;
        var selectionMode = _this6.props.selectionMode;

        var _deconstructDate5 = (0, _utils.deconstructDate)(date),
            year = _deconstructDate5.year;

        if (selectionMode !== _utils.SELECTION_MODES.MONTH) {
          date.setMonth(month);
          state.currentView = PICKER_VIEWS.DATE;
        } else {
          date.setMonth(month);
          date.setFullYear(year);
          _this6.props.onPick(new Date(year, month, 1));
        }
      });
    }
  }, {
    key: 'handleDatePick',
    value: function handleDatePick(value) {
      var _this7 = this;

      this.updateState(function (state) {
        var date = state.date;
        var _props = _this7.props,
            selectionMode = _props.selectionMode,
            showTime = _props.showTime,
            onPick = _props.onPick;

        var pdate = value.date;
        if (selectionMode === _utils.SELECTION_MODES.DAY) {
          if (!showTime) {
            onPick(new Date(pdate.getTime()));
          }
          date.setTime(pdate.getTime());
        } else if (selectionMode === _utils.SELECTION_MODES.WEEK) {
          onPick(pdate);
        }
      });
    }
  }, {
    key: 'handleYearPick',
    value: function handleYearPick(year) {
      var _this8 = this;

      var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this.updateState(function (state) {
        var _props2 = _this8.props,
            onPick = _props2.onPick,
            selectionMode = _props2.selectionMode;
        var date = state.date;


        if (!close) {
          date.setFullYear(year);
        } else {
          date.setFullYear(year);
          if (selectionMode === _utils.SELECTION_MODES.YEAR) {
            onPick(new Date(year, 0));
          } else {
            state.currentView = PICKER_VIEWS.MONTH;
          }
        }
      });
    }
  }, {
    key: 'changeToNow',
    value: function changeToNow() {
      var now = new Date();
      this.props.onPick(now);
      this.setState({ date: now });
    }
  }, {
    key: 'confirm',
    value: function confirm() {
      this.props.onPick(new Date(this.state.date));
    }
  }, {
    key: 'yearLabel',
    value: function yearLabel() {
      var _state3 = this.state,
          currentView = _state3.currentView,
          date = _state3.date;

      var _deconstructDate6 = (0, _utils.deconstructDate)(date),
          year = _deconstructDate6.year;

      var yearTranslation = _locale2.default.t('el.datepicker.year');
      if (currentView === 'year') {
        var startYear = Math.floor(year / 10) * 10;
        return startYear + ' ' + yearTranslation + '-' + (startYear + 9) + ' ' + yearTranslation;
      }
      return year + ' ' + yearTranslation;
    }

    // end: ------ public methods

  }, {
    key: '_pickerContent',
    value: function _pickerContent() {
      var _props3 = this.props,
          value = _props3.value,
          selectionMode = _props3.selectionMode,
          disabledDate = _props3.disabledDate,
          showWeekNumber = _props3.showWeekNumber;
      var date = this.state.date;
      var currentView = this.state.currentView;

      var result = null;

      switch (currentView) {
        case PICKER_VIEWS.DATE:
          result = _react2.default.createElement(_basic.DateTable, {
            onPick: this.handleDatePick.bind(this),
            date: date,
            value: value,
            selectionMode: selectionMode,
            disabledDate: disabledDate,
            showWeekNumber: showWeekNumber
          });

          break;
        case PICKER_VIEWS.YEAR:
          result = _react2.default.createElement(_basic.YearTable, {
            ref: 'yearTable',
            value: value,
            date: date,
            onPick: this.handleYearPick.bind(this),
            disabledDate: disabledDate
          });
          break;
        case PICKER_VIEWS.MONTH:
          result = _react2.default.createElement(_basic.MonthTable, {
            value: value,
            date: date,
            onPick: this.handleMonthPick.bind(this),
            disabledDate: disabledDate
          });
          break;
        default:
          throw new Error('invalid currentView value');
      }

      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      var _props4 = this.props,
          showTime = _props4.showTime,
          shortcuts = _props4.shortcuts,
          sidebar = _props4.sidebar;
      var _state4 = this.state,
          currentView = _state4.currentView,
          date = _state4.date;

      var _deconstructDate7 = (0, _utils.deconstructDate)(date),
          month = _deconstructDate7.month;

      var t = _locale2.default.t;

      //todo: handle v-*
      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: this.classNames('el-picker-panel el-date-picker', {
            'has-sidebar': !!sidebar || shortcuts,
            'has-time': showTime
          }) },
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
                    return _this9.handleShortcutClick(e);
                  } },
                e.text
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'el-picker-panel__body' },
            showTime && _react2.default.createElement(
              'div',
              { className: 'el-date-picker__time-header' },
              _react2.default.createElement(
                'span',
                { className: 'el-date-picker__editor-wrap' },
                _react2.default.createElement('input', {
                  placehoder: t('el.datepicker.selectDate'),
                  type: 'text',
                  className: 'el-date-picker__editor' })
              ),
              _react2.default.createElement(
                'span',
                { className: 'el-date-picker__editor-wrap' },
                _react2.default.createElement('input', {
                  ref: 'input',
                  onFocus: function onFocus() {
                    //todo:
                    // timePickerVisible = !timePickerVisible
                  },
                  placeholder: t('el.datepicker.selectTime'),
                  type: 'text',
                  className: 'el-date-picker__editor' })
              )
            ),
            currentView !== 'time' && _react2.default.createElement(
              'div',
              { className: 'el-date-picker__header' },
              _react2.default.createElement('button', {
                type: 'button',
                onClick: this.prevYear.bind(this),
                className: 'el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left' }),
              currentView === PICKER_VIEWS.DATE && _react2.default.createElement('button', {
                type: 'button',
                onClick: this.prevMonth.bind(this),
                className: 'el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left' }),
              _react2.default.createElement(
                'span',
                {
                  onClick: this.showYearPicker.bind(this),
                  className: 'el-date-picker__header-label' },
                this.yearLabel()
              ),
              currentView === PICKER_VIEWS.DATE && _react2.default.createElement(
                'span',
                {
                  onClick: this.showMonthPicker.bind(this),
                  className: this.classNames('el-date-picker__header-label', {
                    active: currentView === 'month'
                  })
                },
                t('el.datepicker.month' + (month + 1))
              ),
              _react2.default.createElement('button', {
                type: 'button',
                onClick: this.nextYear.bind(this),
                className: 'el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right' }),
              currentView === PICKER_VIEWS.DATE && _react2.default.createElement('button', {
                type: 'button',
                onClick: this.nextMonth.bind(this),
                className: 'el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'el-picker-panel__content' },
              this._pickerContent()
            )
          )
        ),
        showTime && currentView === PICKER_VIEWS.DATE && _react2.default.createElement(
          'div',
          {
            className: 'el-picker-panel__footer' },
          _react2.default.createElement(
            'a',
            {
              href: 'JavaScript:',
              className: 'el-picker-panel__link-btn',
              onClick: this.changeToNow.bind(this) },
            t('el.datepicker.now')
          ),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'el-picker-panel__btn',
              onClick: function onClick() {
                return _this9.confirm();
              } },
            t('el.datepicker.confirm')
          )
        )
      );
    }
  }]);

  return DatePanel;
}(_libs.Component);

var _default = DatePanel;
exports.default = _default;


DatePanel.propTypes = {
  // user picked date value
  value: _libs.PropTypes.instanceOf(Date),
  // todo:
  onPick: _libs.PropTypes.func.isRequired,
  showTime: _libs.PropTypes.bool,
  showWeekNumber: _libs.PropTypes.bool,
  format: _libs.PropTypes.string,
  // todo: constrait onClick method ? change to type: ()=>() ?
  // Array[{text: String, onClick: (picker)=>()}]
  shortcuts: _libs.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    text: _libs.PropTypes.string.isRequired,
    // ()=>()
    onClick: _libs.PropTypes.func.isRequired
  })),
  selectionMode: _libs.PropTypes.oneOf(Object.keys(_utils.SELECTION_MODES).map(function (e) {
    return _utils.SELECTION_MODES[e];
  })),
  // (Date)=>bool, if true, disabled
  disabledDate: _libs.PropTypes.func,

  //()=>HtmlElement
  getPopperRefElement: _libs.PropTypes.func,
  popperMixinOption: _libs.PropTypes.object
};

DatePanel.defaultProps = {
  showTime: false,
  timePickerVisible: false,
  selectionMode: _utils.SELECTION_MODES.DAY
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(PICKER_VIEWS, 'PICKER_VIEWS', 'src/date-picker/panel/DatePanel.jsx');

  __REACT_HOT_LOADER__.register(DatePanel, 'DatePanel', 'src/date-picker/panel/DatePanel.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/panel/DatePanel.jsx');
}();

;