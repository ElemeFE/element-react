## Time Picker

Use Time Picker for time input.

### Fixed time picker

Provide a list of fixed time for users to choose.

:::demo Use `TimeSelect` label, then assign start time, end time and time step with `start`, `end` and `step`.
```js
constructor(props) {
  super(props)

  this.state = {
    value: new Date(2016, 9, 10, 8, 30),
  }
}

handleUpdate(value) {
  console.debug('time-select update: ', value)
}

render() {
  return (
    <TimeSelect
      start="08:30"
      step="00:15"
      end="18:30"
      maxTime="12:30"
      onChange={this.handleUpdate.bind(this)}
      value={this.state.value}
      placeholder="Select time"
      />
  )
}
```
:::

### Arbitrary time picker

Can pick an arbitrary time.

:::demo Use `TimePicker` label, and you can limit the time range by using `selectableRange`.

```js
constructor(props) {
  super(props)
  this.state = {
    value: new Date(2016, 9, 10, 18, 40)
  }
}

handleUpdate(value) {
  console.debug('time-picker update: ', value)
}

render() {
  return (
    <TimePicker
      onChange={this.handleUpdate.bind(this)}
      selectableRange="18:30:00 - 20:30:00"
      placeholder="Arbitrary time"
      value={this.state.value}
      />
  )
}
```
:::



### Fixed time range

If start time is picked at first, then the end time will change accordingly.

:::demo
```js
constructor(props) {
  super(props)
  this.state = {
    startDate: new Date(2016, 9, 10, 14, 30),
    endDate: new Date(2016, 9, 10, 15, 30)
  }
}

handleStartUpdate(startDate) {
  console.debug('time-select startDate update: ', startDate)
  this.setState({startDate})
}

handleEndUpdate(endDate){
  console.debug('time-select endDate update: ', endDate)
  this.setState({endDate})
}

render() {
  return (
    <div>
      <TimeSelect
        start="08:30"
        step="00:15"
        end="18:30"
        onChange={this.handleStartUpdate.bind(this)}
        value={this.state.startDate}
        placeholder="Start time"
        />

      <TimeSelect
        start="08:30"
        step="00:15"
        end="18:30"
        onChange={this.handleEndUpdate.bind(this)}
        value={this.state.endDate}
        minTime={this.state.startDate}
        placeholder="End time"
        />
    </div>

  )
}
```
:::


### Arbitrary time range

Can pick an arbitrary time range.

:::demo We can pick a time range by adding an `isRange` attribute.

```js
constructor(props) {
  super(props)
  this.state = {
    value: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
  }
}

handleUpdate(value) {
  console.debug('time-picker update: ', value)
}

render() {
  return (
    <TimeRangePicker
      pickerWidth={300}
      onChange={this.handleUpdate.bind(this)}
      placeholder="Pick a time range"
      value={this.state.value}
      />
  )
}
```
:::


### Attributes
| Attribute      | Description          | Type      | Accepted Values                           | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| align | alignment | string | left, center, right | left |
| placeholder | placeholder | string | — | — |
| isShowTrigger | whether DatePicker show trigger | bool | - | - |
| isReadOnly | whether DatePicker is read only | boolean | — | false |
| isDisabled | whether DatePicker is disabled | boolean | — | false |
| onFocus | onFocus | func:(TimeSelectReactComponent)=>() | — | - |
| onBlur | onBlur | func:(TimeSelectReactComponent)=>() | — | - |
| onChange | onChange | func:(value)=>{} | — | - |

### TimeSelect
| Attribute      | Description          | Type      | Accepted Values                           | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | value of the picker | date/null | — | - |
| start | start time | string | — | 09:00 |
| end | end time | string | — | 18:00 |
| step | time step | string | — | 00:30 |
| minTime |  minimum time, any time before this time will be disabled | date | — | - |
| maxTime | maximum time, any time after this time will be disabled | date | — | - |

### TimePicker
| Attribute      | Description          | Type      | Accepted Values                           | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | value of the picker | date/null | — | - |
| selectableRange | available time range, e.g.`'18:30:00 - 20:30:00'`or`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']` | string/string[] | — | — |


### TimeRangePicker
| Attribute      | Description          | Type      | Accepted Values                           | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | value of the picker | date[]/null | — | - |
| selectableRange | available time range, e.g.`'18:30:00 - 20:30:00'`or`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']` | string/string[] | — | — |
| rangeSeparator | range separator | string | - | ' - ' |
