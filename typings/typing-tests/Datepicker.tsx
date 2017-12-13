import * as React from 'react'
import { DatePicker, DateRangePicker } from 'element-react'

class Component extends React.Component<{}, {}> {
  state = {
    value1: new Date(),
    value2: null
  }
  daterangepicker2 = null
  onChange = () => { }
  render() {
    const { value1, value2 } = this.state
    return (
      <div>
        <DatePicker
          value={value1}
          placeholder="选择日期"
          firstDayOfWeek={2}
          isShowTime={true}
          onChange={date => {
            console.debug('DatePicker1 changed: ', date)
            this.setState({ value1: date })
          }}
          disabledDate={(time) => time.getTime() < Date.now() - 8.64e7}
        />
        <DateRangePicker
          value={value2}
          placeholder="选择日期范围"
          align="right"
          ref={e => this.daterangepicker2 = e}
          rangeSeparator="-"
          disabledDate={(time, type) => time.getTime() < Date.now() - 8.64e7}
          firstDayOfWeek={2}
          onChange={date => {
            console.debug('DateRangePicker2 changed: ', date)
            this.setState({ value2: date })
          }}
          shortcuts={[{
            text: '最近一周',
            onClick: () => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

              this.setState({ value2: [start, end] })
              this.daterangepicker2.togglePickerVisible()
            }
          }, {
            text: '最近一个月',
            onClick: () => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

              this.setState({ value2: [start, end] })
              this.daterangepicker2.togglePickerVisible()
            }
          }, {
            text: '最近三个月',
            onClick: () => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              this.setState({ value2: [start, end] })
              this.daterangepicker2.togglePickerVisible()
            }
          }]}
        />
      </div>
    )
  }
}

// TODO: 这里的测试没写完整
