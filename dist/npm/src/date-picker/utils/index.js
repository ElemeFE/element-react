'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SELECTION_MODES = exports.limitRange = exports.getRangeHours = exports.nextMonth = exports.prevMonth = exports.getWeekNumber = exports.getStartDateOfMonth = exports.DAY_DURATION = exports.getFirstDayOfMonth = exports.getDayCountOfMonth = exports.parseDate = exports.formatDate = exports.toDate = undefined;
exports.getDateOfISOWeek = getDateOfISOWeek;
exports.hasClass = hasClass;
exports.deconstructDate = deconstructDate;

var _utils = require('../../../libs/utils');

var newArray = function newArray(start, end) {
  var result = [];
  for (var i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

var toDate = exports.toDate = function toDate(date) {
  date = new Date(date);
  if (isNaN(date.getTime())) return null;
  return date;
};

var formatDate = exports.formatDate = function formatDate(date, format) {
  date = toDate(date);
  if (!date) return '';
  return _utils.DateUtils.format(date, format || 'yyyy-MM-dd');
};

var parseDate = exports.parseDate = function parseDate(string, format) {
  return _utils.DateUtils.parse(string, format || 'yyyy-MM-dd');
};

var getDayCountOfMonth = exports.getDayCountOfMonth = function getDayCountOfMonth(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};

var getFirstDayOfMonth = exports.getFirstDayOfMonth = function getFirstDayOfMonth(date) {
  var temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

var DAY_DURATION = exports.DAY_DURATION = 86400000;

var getStartDateOfMonth = exports.getStartDateOfMonth = function getStartDateOfMonth(year, month) {
  var result = new Date(year, month, 1);
  var day = result.getDay();

  if (day === 0) {
    result.setTime(result.getTime() - DAY_DURATION * 7);
  } else {
    result.setTime(result.getTime() - DAY_DURATION * day);
  }

  return result;
};

var getWeekNumber = exports.getWeekNumber = function getWeekNumber(src) {
  var date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

// http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
function getDateOfISOWeek(w, y) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

var prevMonth = exports.prevMonth = function prevMonth(src) {
  var year = src.getFullYear();
  var month = src.getMonth();
  var date = src.getDate();

  var newYear = month === 0 ? year - 1 : year;
  var newMonth = month === 0 ? 11 : month - 1;

  var newMonthDayCount = getDayCountOfMonth(newYear, newMonth);
  if (newMonthDayCount < date) {
    src.setDate(newMonthDayCount);
  }

  src.setMonth(newMonth);
  src.setFullYear(newYear);

  return new Date(src.getTime());
};

var nextMonth = exports.nextMonth = function nextMonth(src) {
  var year = src.getFullYear();
  var month = src.getMonth();
  var date = src.getDate();

  var newYear = month === 11 ? year + 1 : year;
  var newMonth = month === 11 ? 0 : month + 1;

  var newMonthDayCount = getDayCountOfMonth(newYear, newMonth);
  if (newMonthDayCount < date) {
    src.setDate(newMonthDayCount);
  }

  src.setMonth(newMonth);
  src.setFullYear(newYear);

  return new Date(src.getTime());
};

var getRangeHours = exports.getRangeHours = function getRangeHours(ranges) {
  var hours = [];
  var disabledHours = [];

  (ranges || []).forEach(function (range) {
    var value = range.map(function (date) {
      return date.getHours();
    });

    disabledHours = disabledHours.concat(newArray(value[0], value[1]));
  });

  if (disabledHours.length) {
    for (var i = 0; i < 24; i++) {
      hours[i] = disabledHours.indexOf(i) === -1;
    }
  } else {
    for (var _i = 0; _i < 24; _i++) {
      hours[_i] = false;
    }
  }

  return hours;
};

var limitRange = exports.limitRange = function limitRange(date, ranges) {
  if (!ranges || !ranges.length) return date;

  var len = ranges.length;
  var format = 'HH:mm:ss';

  date = _utils.DateUtils.parse(_utils.DateUtils.format(date, format), format);
  for (var i = 0; i < len; i++) {
    var range = ranges[i];
    if (date >= range[0] && date <= range[1]) {
      return date;
    }
  }

  var maxDate = ranges[0][0];
  var minDate = ranges[0][0];

  ranges.forEach(function (range) {
    minDate = new Date(Math.min(range[0], minDate));
    maxDate = new Date(Math.max(range[1], maxDate));
  });

  return date < minDate ? minDate : maxDate;
};

function hasClass(target, classname) {
  return target.classList.contains(classname);
}

var SELECTION_MODES = exports.SELECTION_MODES = {
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
  RANGE: 'range'
};

function deconstructDate(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    week: getWeekNumber(date)
  };
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(newArray, 'newArray', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(toDate, 'toDate', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(formatDate, 'formatDate', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(parseDate, 'parseDate', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(getDayCountOfMonth, 'getDayCountOfMonth', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(getFirstDayOfMonth, 'getFirstDayOfMonth', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(DAY_DURATION, 'DAY_DURATION', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(getStartDateOfMonth, 'getStartDateOfMonth', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(getWeekNumber, 'getWeekNumber', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(getDateOfISOWeek, 'getDateOfISOWeek', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(prevMonth, 'prevMonth', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(nextMonth, 'nextMonth', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(getRangeHours, 'getRangeHours', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(limitRange, 'limitRange', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(hasClass, 'hasClass', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(SELECTION_MODES, 'SELECTION_MODES', 'src/date-picker/utils/index.js');

  __REACT_HOT_LOADER__.register(deconstructDate, 'deconstructDate', 'src/date-picker/utils/index.js');
}();

;