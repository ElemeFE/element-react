import * as React from 'react'
import { TimeSelect, TimePicker, TimeRangePicker } from 'element-react'

class Component extends React.Component<{}, {}> {
  state = {
    value: new Date()
  }
  onChange = () => { }
  render() {
    return (
      <div>
        <TimeSelect
          start="08:30"
          step="00:15"
          end="18:30"
          maxTime="12:30"
          onChange={this.onChange}
          value={this.state.value}
          placeholder="选择时间"
        />

        <TimePicker
          onChange={this.onChange}
          selectableRange="18:30:00 - 20:30:00"
          placeholder="选择时间"
          value={this.state.value}
        />

        <TimeRangePicker
          onChange={this.onChange}
          rangeSeparator="@"
          placeholder="选择时间"
          value={[this.state.value, this.state.value]}
        />
      </div>
    )
  }
}

// TODO: 这里的测试没写完整
