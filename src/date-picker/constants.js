import { formatDate, parseDate, getWeekNumber } from './utils';

export const RANGE_SEPARATOR = ' - ';
export const DEFAULT_FORMATS = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  time: 'HH:mm:ss',
  timerange: 'HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
};
export const HAVE_TRIGGER_TYPES = [
  'date',
  'datetime',
  'time',
  'time-select',
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
  text = text.split(':');
  if (text.length > 1) text = text.map(item => item.slice(-2));
  text = text.join(':');

  return parseDate(text, format);
};
export const RANGE_FORMATTER = function (value, format) {
  if (Array.isArray(value) && value.length === 2) {
    const start = value[0];
    const end = value[1];

    if (start && end) {
      return formatDate(start, format) + RANGE_SEPARATOR + formatDate(end, format);
    }
  }
  return '';
};
export const RANGE_PARSER = function (text, format) {
  const array = text.split(RANGE_SEPARATOR);
  if (array.length === 2) {
    const range1 = array[0].split(':').map(item => item.slice(-2)).join(':');
    const range2 = array[1].split(':').map(item => item.slice(-2)).join(':');
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
    formatter(value) {
      if (value instanceof Date) {
        const weekNumber = getWeekNumber(value);
        return value.getFullYear() + 'w' + (weekNumber > 9 ? weekNumber : '0' + weekNumber);
      }
      return value;
    },
    parser(text) {
      const array = (text || '').split('w');
      if (array.length === 2) {
        const year = Number(array[0]);
        const month = Number(array[1]);

        if (!isNaN(year) && !isNaN(month) && month < 54) {
          return text;
        }
      }
      return null;
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
  month: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  year: {
    formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser(text) {
      const year = Number(text);
      if (!isNaN(year)) return year;

      return null;
    }
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
  center: 'bottom-center',
  right: 'bottom-end'
};