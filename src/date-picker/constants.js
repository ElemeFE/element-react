import { formatDate, parseDate, getWeekNumber, getDateOfISOWeek, deconstructDate } from './utils';

export const RANGE_SEPARATOR = ' - ';
export const DEFAULT_FORMATS = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  week: 'yyyywWW',
  time: 'HH:mm:ss',
  timerange: 'HH:mm:ss',
  timeselect: 'HH:mm',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
};
export const HAVE_TRIGGER_TYPES = [
  'date',
  'datetime',
  'time',
  'timeselect',
  'week',
  'month',
  'year',
  'daterange',
  'timerange',
  'datetimerange'
];

export const DATE_FORMATTER = function (value, format) {
  return formatDate(value, format);
};
export const DATE_PARSER = function (text, format) {
  return parseDate(text, format);
};
export const RANGE_FORMATTER = function (value, format, separator = RANGE_SEPARATOR) {
  if (Array.isArray(value) && value.length === 2) {
    const start = value[0];
    const end = value[1];

    if (start && end) {
      return formatDate(start, format) + separator + formatDate(end, format);
    }
  }
  return '';
};
export const RANGE_PARSER = function (text, format, separator = RANGE_SEPARATOR) {
  const array = text.split(separator);
  if (array.length === 2) {
    const range1 = array[0];
    const range2 = array[1];
    return [parseDate(range1, format), parseDate(range2, format)];
  }
  return [];
};

export const TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser(text) {
      if (text === undefined || text === '') return null;
      return text;
    }
  },
  week: {
    formatter(value, format) {
      if (value instanceof Date) {
        if (!format) {
          const weekNumber = getWeekNumber(value);
          return value.getFullYear() + 'w' + (weekNumber > 9 ? weekNumber : '0' + weekNumber);
        } else {
          let str = DATE_FORMATTER(value, format)
          if (str != '') {
            let weekno = deconstructDate(value).week
            str = /WW/.test(str) ? str.replace(/WW/, weekno < 10 ? `0${weekno}` : weekno) : str.replace(/W/, weekno)
          }
          return str
        }
      }

      return ''
    },
    parser(text, format) {
      const weekno = (matcher, src) => {
        let str = src.substr(matcher.index, matcher.length);
        if (/\d\d?/.test(str)) {
          return { week: Number(str), isValid: true }
        } else {
          return { week: -1, isValid: false }
        }
      }

      let date = DATE_PARSER(text, format)
      let matcher = format.match(/(WW?)/)
      let wn = null

      if (!matcher) return date
      else {
        if (text.length > format.length) return ''

        switch (matcher.length) {
          case 1:
            wn = weekno(matcher, text)
            if (!wn.isValid) return ''
            break;
          case 2:
            wn = weekno(matcher, text)
            if (!wn.isValid) return ''
            break;
          default: throw new Error('never reach here')
        }
        return getDateOfISOWeek(wn.week, date.getFullYear())
      }
    }
  },
  date: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  datetime: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  time: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  timeselect: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  month: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  year: {
    formatter: DATE_FORMATTER,
    parser: DATE_FORMATTER
  },
  number: {
    formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser(text) {
      let result = Number(text);

      if (!isNaN(text)) {
        return result;
      } else {
        return null;
      }
    }
  }
};

export const PLACEMENT_MAP = {
  left: 'bottom-start',
  // in git version 8de9d2ce, this been changed to 
  // center: 'bottom',
  // due to it's close relation to popper, I dont have enought confidence to update it right now
  center: 'bottom-center',
  right: 'bottom-end'
};