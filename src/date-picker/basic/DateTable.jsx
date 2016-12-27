import React from 'react'

import { PropTypes, Component } from '../../../libs';
import { 
  getFirstDayOfMonth, 
  getDayCountOfMonth, 
  getWeekNumber, 
  getStartDateOfMonth, 
  DAY_DURATION, 
  SELECTION_MODES,
  deconstructDate,
  hasClass} from '../utils'
import Locale from '../../locale'

/*
  todo:
    clear ?
*/

function isFunction(func) {
  return typeof func === 'function'
}

//todo:rename:  reset midnight
const clearHours = function (time) {
  const cloneDate = new Date(time);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate.getTime();
};

export default class DateTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tableRows: [[], [], [], [], [], []],
      rangeState: {},
    }
  }


  componentWillReceiveProps(nextProps) {
    const minDate = (newVal, oldVal) => {
      const {rangeState} = this.state
      if (newVal && !oldVal) {
        rangeState.selecting = true;
      } else if (!newVal) {
        rangeState.selecting = false;
      }
    }

    const maxDate = (newVal, oldVal) => {
      if (newVal && !oldVal) {
        this.state.rangeState.selecting = false;
      }
    }

    minDate(nextProps.minDate, this.props.minDate)
    maxDate(nextProps.maxDate, this.props.maxDate)

    this.setState({})
  }

  getStartDate() {
    const ds = deconstructDate(this.props.date)
    return getStartDateOfMonth(ds.year, ds.month);
  }

  getRows() {
    const {date, disabledDate, showWeekNumber, minDate, maxDate, selectionMode} = this.props
    const {tableRows} = this.state

    const ndate = new Date(date.getTime());
    let day = getFirstDayOfMonth(ndate); // day of first day
    const dateCountOfMonth = getDayCountOfMonth(ndate.getFullYear(), ndate.getMonth());
    // dates count in december is always 31, so offset year is not neccessary
    const dateCountOfLastMonth = getDayCountOfMonth(ndate.getFullYear(), (ndate.getMonth() === 0 ? 11 : ndate.getMonth() - 1));

    day = (day === 0 ? 7 : day);
    //tableRows: [ [], [], [], [], [], [] ]
    const rows = tableRows;
    let count = 1;
    let firstDayPosition;

    const startDate = this.getStartDate();
    const now = clearHours(new Date());

    for (var i = 0; i < 6; i++) {
      const row = rows[i];
      /*
      cell: {
        type: string, one of 'week' | 'normal'
        text: String,
        row: number,  row index,
        column: number, column index; 
        inRange: boolean,
        start: boolean,
        end: boolean,
        disabled: boolean
      }
      */
      if (showWeekNumber) {//prepend week info to the head of each row array
        if (!row[0]) {
          row[0] = { type: 'week', text: getWeekNumber(new Date(startDate.getTime() + DAY_DURATION * (i * 7 + 1))) };
        }
      }

      for (var j = 0; j < 7; j++) {
        let cell = row[showWeekNumber ? j + 1 : j];
        if (!cell) {
          row[showWeekNumber ? j + 1 : j] = cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
        }

        cell.type = 'normal';

        const index = i * 7 + j;//current date offset
        const time = startDate.getTime() + DAY_DURATION * index;
        cell.inRange = time >= clearHours(minDate) && time <= clearHours(maxDate);
        cell.start = minDate && time === clearHours(minDate);
        cell.end = maxDate && time === clearHours(maxDate);
        const isToday = time === now;

        if (isToday) {
          cell.type = 'today';
        }

        if (i === 0) {//handle first row of date, this row only contains all or some pre-month dates
          if (j >= day) {
            cell.text = count++;
            if (count === 2) {
              firstDayPosition = i * 7 + j;
            }
          } else {
            cell.text = dateCountOfLastMonth - (day - j % 7) + 1;
            cell.type = 'prev-month';
          }
        } else {
          if (count <= dateCountOfMonth) {//in current dates
            cell.text = count++;
            if (count === 2) {
              firstDayPosition = i * 7 + j;
            }
          } else {// next month
            cell.text = count++ - dateCountOfMonth;
            cell.type = 'next-month';
          }
        }

        cell.disabled = isFunction(disabledDate) && disabledDate(new Date(time));
      }

      if (selectionMode === SELECTION_MODES.WEEK) {
        const start = showWeekNumber ? 1 : 0;
        const end = showWeekNumber ? 7 : 6;
        const isWeekActive = this.isWeekActive(row[start + 1]);

        row[start].inRange = isWeekActive;
        row[start].start = isWeekActive;
        row[end].inRange = isWeekActive;
        row[end].end = isWeekActive;
        row.isWeekActive = isWeekActive
      }
    }

    rows.firstDayPosition = firstDayPosition;

    return rows;
  }

  // calc classnames for cell
  getCellClasses(cell) {
    const {selectionMode, value, date} = this.props

    let classes = [];
    if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
      classes.push('available');
      if (cell.type === 'today') {
        classes.push('today');
      }
    } else {
      classes.push(cell.type);
    }

    if (selectionMode === 'day' 
        && (cell.type === 'normal' || cell.type === 'today') 
        && value.getFullYear() === date.getFullYear() 
        && value.getMonth() === date.getMonth() 
        && value.getDate() === Number(cell.text)) {
      classes.push('current');
    }

    if (cell.inRange && ((cell.type === 'normal' || cell.type === 'today') || selectionMode === 'week')) {
      classes.push('in-range');

      if (cell.start) {
        classes.push('start-date');
      }

      if (cell.end) {
        classes.push('end-date');
      }
    }

    if (cell.disabled) {
      classes.push('disabled');
    }

    return classes.join(' ');
  }

  isWeekActive(cell) {
    if (this.props.selectionMode !== SELECTION_MODES.WEEK) return false;

    const newDate = new Date(this.props.date.getTime())// date view
    const year = newDate.getFullYear();
    const month = newDate.getMonth();

    if (cell.type === 'prev-month') {
      newDate.setMonth(month === 0 ? 11 : month - 1);
      newDate.setFullYear(month === 0 ? year - 1 : year);
    }

    if (cell.type === 'next-month') {
      newDate.setMonth(month === 11 ? 0 : month + 1);
      newDate.setFullYear(month === 11 ? year + 1 : year);
    }
    newDate.setDate(parseInt(cell.text, 10));

    return getWeekNumber(newDate) === deconstructDate(this.props.value).week // current date value
  }

  //end: watch props change:
  //end: -todo

  //todo: change view here
  markRange(maxDate) {

    if (!maxDate) {
      maxDate = this.props.maxDate
    }

    const rows = this.getRows();
    const minDate = this.props.minDate;
    for (var i = 0, k = rows.length; i < k; i++) {
      const row = rows[i];
      for (var j = 0, l = row.length; j < l; j++) {
        if (this.showWeekNumber && j === 0) continue;

        const cell = row[j];
        const index = i * 7 + j + (this.showWeekNumber ? -1 : 0);
        const time = this.getStartDate().getTime() + DAY_DURATION * index;

        cell.inRange = minDate && time >= clearHours(minDate) && time <= clearHours(maxDate);
        cell.start = minDate && time === clearHours(minDate.getTime());
        cell.end = maxDate && time === clearHours(maxDate.getTime());
      }
    }
  }

  handleMouseMove(event) {
    const {onChangeRange, showWeekNumber, minDate, maxDate} = this.props
    const {rangeState} = this.state
    const getDateOfCell = (row, column, showWeekNumber) => {
      const startDate = this.getStartDate();

      return new Date(startDate.getTime() + (row * 7 + (column - (showWeekNumber ? 1 : 0))) * DAY_DURATION);
    }

    if (!rangeState.selecting) return;

    // todo: - is this cb useful?
    onChangeRange({ minDate, maxDate, rangeState });

    const target = event.target;
    if (target.tagName !== 'TD') return;

    const column = target.cellIndex;
    const row = target.parentNode.rowIndex - 1;
    const { row: oldRow, column: oldColumn } = rangeState;

    if (oldRow !== row || oldColumn !== column) {
      rangeState.row = row;
      rangeState.column = column;

      rangeState.endDate = getDateOfCell(row, column, showWeekNumber);

      this.setState({ rangeState })
    }
  }

  handleClick(event) {
    let target = event.target;

    if (target.tagName !== 'TD') return;
    if (hasClass(target, 'disabled') || hasClass(target, 'week')) return;

    const {selectionMode, date, onPick, minDate, maxDate} = this.props
    const {year, month} = deconstructDate(date)

    const {rangeState} = this.state
    if (selectionMode === 'week') {
      target = target.parentNode.cells[1];
    }

    const cellIndex = target.cellIndex;
    const rowIndex = target.parentNode.rowIndex - 1;

    const cell = this.getRows()[rowIndex][cellIndex];
    const text = cell.text;
    const className = target.className;

    const newDate = new Date(year, month, 1);

    const clickNormalCell = className.indexOf('prev') === -1 && className.indexOf('next') === -1;

    if (className.indexOf('prev') !== -1) {
      if (month === 0) {
        newDate.setFullYear(year - 1)
        newDate.setMonth(11)
      } else {
        newDate.setMonth(month - 1)
      }
    } else if (className.indexOf('next') !== -1) {
      if (month === 11) {
        newDate.setFullYear(year + 1)
        newDate.setMonth(0)
      } else {
        newDate.setMonth(month + 1)
      }
    }

    newDate.setDate(parseInt(text, 10));

    if (clickNormalCell && selectionMode === 'range') {
      if (minDate && maxDate) { //reset range
        onPick({ minDate: new Date(newDate.getTime()), maxDate: null }, false)
        rangeState.selecting = true;//range is in selection
      } else if (minDate && !maxDate) {
        if (newDate >= minDate) {
          rangeState.selecting = false;
          onPick({ minDate, maxDate: new Date(newDate.getTime()) })
        } else {
          onPick({ minDate: new Date(newDate.getTime()), maxDate }, false)
        }
      } else if (!minDate) {
        onPick({ minDate: new Date(newDate.getTime()), maxDate }, false)
        rangeState.selecting = true;
      }
      this.setState({})
    }

    //todo: merge this
    if (selectionMode === 'day') {
      onPick({date: newDate})
    } else if (selectionMode === 'week') {
      onPick({date: newDate})
    }
  }

  render() {
    const $t = Locale.t
    const {selectionMode, showWeekNumber} = this.props
    const {value} = this.state

    return (
      <table
        cellSpacing="0"
        cellPadding="0"
        onClick={this.handleClick.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        className={this.classNames('el-date-table', { 'is-week-mode': selectionMode === 'week' })}>
        <tbody>
          <tr>
            {showWeekNumber && <th>{$t('el.datepicker.week')}</th>}
            <th>{$t('el.datepicker.weeks.sun')}</th>
            <th>{$t('el.datepicker.weeks.mon')}</th>
            <th>{$t('el.datepicker.weeks.tue')}</th>
            <th>{$t('el.datepicker.weeks.wed')}</th>
            <th>{$t('el.datepicker.weeks.thu')}</th>
            <th>{$t('el.datepicker.weeks.fri')}</th>
            <th>{$t('el.datepicker.weeks.sat')}</th>
          </tr>

          {
            this.getRows().map((row, idx) => {
              return (
                <tr
                  key={idx}
                  className={this.classNames('el-date-table__row', { current: value && row.isWeekActive })}>
                  {
                    row.map((cell, idx) => (
                      <td className={this.getCellClasses(cell)} key={idx}>
                        {cell.type === 'today' ? $t('el.datepicker.today') : cell.text}
                      </td>
                    ))
                  }

                </tr>
              )
            })
          }

        </tbody>
      </table>
    );
  }
}

//todo: add requirements
DateTable.propTypes = {
  disabledDate: PropTypes.func,
  showWeekNumber: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  selectionMode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(e=>SELECTION_MODES[e])),
  // date view model, all visual view derive from this info
  date: PropTypes.instanceOf(Date).isRequired,
  // current date value, use picked.
  value: PropTypes.instanceOf(Date).isRequired,
  onChangeRange: PropTypes.func,
  /*
  (data, closePannel: boolean)=>()

    data: 
      if selectionMode = range:
        minDate: Date|null, 
        maxDate: Date|null

      if selectionMode = date
        date: Date

      if selectionMode = week:
        year: number
        week: number,
        value: string, 
        date: Date
  */
  onPick: PropTypes.func.isRequired,
}

//todo: remove redundant
DateTable.defaultProps = {
  selectionMode: "day",
  showWeekNumber: false,
  //todo: state or props, cur state
  rangeState: {
    endDate: null,
    selecting: false,
    row: null,
    column: null
  },
  value: {}
}