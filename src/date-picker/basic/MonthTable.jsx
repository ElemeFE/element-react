import React from 'react'

import { PropTypes, Component } from '../../../libs';
import { hasClass, deconstructDate } from '../utils'
import Locale from '../../locale'


export default class MonthTable extends Component {
  getCellStyle(month) {
    const {date, disabledDate, value} = this.props
    const style = {};
    const ndate = new Date(date)
    ndate.setMonth(month);
    style.disabled = typeof disabledDatne === 'function' && disabledDate(ndate);
    style.current = deconstructDate(value).month === month;
    return style;
  }

  handleMonthTableClick(event) {
    const target = event.target;
    if (target.tagName !== 'A') return;
    if (hasClass(target.parentNode, 'disabled')) return;
    const column = target.parentNode.cellIndex;
    const row = target.parentNode.parentNode.rowIndex;
    const month = row * 4 + column;

    this.props.onPick(month)
  }

  render() {
    const $t = Locale.t
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

    return (
      <table onClick={this.handleMonthTableClick.bind(this)} className="el-month-table">
        <tbody>
          {
            months.map((key, idx) => {
              return (
                <td className={this.classNames(this.getCellStyle(idx))} key={idx}>
                  <a className="cell">{$t(`el.datepicker.months.${key}`)}</a>
                </td>
              )
            }).reduce((col, item) => {
              let tararr
              if (!(Array.isArray(col[0]) && col[0].length !== 4)) {
                col.unshift([])
              }
              tararr = col[0]
              tararr.push(item)
              return col
            }, []).reverse().map((e, idx) => <tr key={idx}>{e}</tr>)
          }
        </tbody>
      </table>
    );
  }
}

MonthTable.propTypes = {
  // current date, specific to view
  date: PropTypes.instanceOf(Date).isRequired,
  // user picked value
  value: PropTypes.instanceOf(Date).isRequired,
  onPick: PropTypes.func.isRequired,
  // (Date)=>boolean
  disabledDate: PropTypes.func
}