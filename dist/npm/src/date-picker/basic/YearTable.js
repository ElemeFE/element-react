'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../../libs');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearTable = function (_Component) {
  _inherits(YearTable, _Component);

  function YearTable() {
    _classCallCheck(this, YearTable);

    return _possibleConstructorReturn(this, (YearTable.__proto__ || Object.getPrototypeOf(YearTable)).apply(this, arguments));
  }

  _createClass(YearTable, [{
    key: 'getCellStyle',
    value: function getCellStyle(year) {
      var _props = this.props,
          disabledDate = _props.disabledDate,
          value = _props.value,
          date = _props.date;

      var style = {};
      var ndate = new Date(date);

      ndate.setFullYear(year);
      style.disabled = typeof disabledDate === 'function' && disabledDate(ndate);
      style.current = (0, _utils.deconstructDate)(value).year === year;

      return style;
    }
  }, {
    key: 'handleYearTableClick',
    value: function handleYearTableClick(event) {
      var target = event.target;
      if (target.tagName === 'A') {
        if ((0, _utils.hasClass)(target.parentNode, 'disabled')) return;
        var year = target.textContent || target.innerText;
        this.props.onPick(parseInt(year, 10));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var date = this.props.date;

      var startYear = Math.floor((0, _utils.deconstructDate)(date).year / 10) * 10;

      return _react2.default.createElement(
        'table',
        { onClick: this.handleYearTableClick.bind(this), className: 'el-year-table' },
        _react2.default.createElement(
          'tbody',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 0)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 1)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 1
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 2)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 2
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 3)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 3
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 4)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 4
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 5)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 5
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 6)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 6
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 7)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 7
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 8)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 8
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 9)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 9
              )
            ),
            _react2.default.createElement('td', null),
            _react2.default.createElement('td', null)
          )
        )
      );
    }
  }]);

  return YearTable;
}(_libs.Component);

var _default = YearTable;
exports.default = _default;


YearTable.propTypes = {
  value: _libs.PropTypes.instanceOf(Date).isRequired,
  date: _libs.PropTypes.instanceOf(Date).isRequired,
  // (year: number)=>
  onPick: _libs.PropTypes.func.isRequired,
  // (Date)=>boolean
  disabledDate: _libs.PropTypes.func
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(YearTable, 'YearTable', 'src/date-picker/basic/YearTable.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/basic/YearTable.jsx');
}();

;