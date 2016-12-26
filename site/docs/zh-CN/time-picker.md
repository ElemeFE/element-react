## Time Picker 时间选择器

 用于选择或输入日期

### 固定时间点

提供几个固定的时间点供用户选择

:::demo 使用 el-time-select 标签，分别通过`star`、`end`和`step`指定可选的起始时间、结束时间和步长
```js
constructor(props) {
  super(props)

  this.state = {
    value: new Date(2016, 9, 10, 14, 30),
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
      onChange={this.handleUpdate.bind(this)}
      value={this.state.value}
      placeholder="选择时间"
      />
  )
}
```
:::

### 任意时间点

可以选择任意时间
:::demo 使用 el-time-select 标签，分别通过`star`、`end`和`step`指定可选的起始时间、结束时间和步长
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
      placeholder="选择时间"
      value={this.state.value}
      />
  )
}
```
:::



### 固定时间范围

若先选择开始时间，则结束时间内备选项的状态会随之改变

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
        placeholder="选择时间"
        />

      <TimeSelect
        start="08:30"
        step="00:15"
        end="18:30"
        onChange={this.handleEndUpdate.bind(this)}
        value={this.state.endDate}
        minTime={this.state.startDate}
        placeholder="选择时间"
        />
    </div>

  )
}
```
:::


### 任意时间范围

可选择任意的时间范围

:::demo blah
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
      placeholder="选择时间"
      value={this.state.value}
      />
  )
}
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| readonly | 只读 | boolean | — | false |
| placeholder | 占位内容 | string | — | — |
| format | 时间格式化(TimePicker) | string | 小时：`HH`，分：`mm`，秒：`ss` | 'HH:mm:ss' |
| value | 绑定值 | TimePicker: Date<br>TimeSelect: String | - | - |
| align | 对齐方式 | string | left, center, right | left |
| picker-options | 当前时间日期选择器特有的选项<br>参考下表 | object | — | {} |

### Time Select Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| align | 对齐方式 | string | left, center, right | left |
| isShowTrigger | 是否显示图标 | bool | - | - |
| placeholder | placeholder | string | - | - |
| isReadOnly | readonly | bool | - | - |
| start | 开始时间 | string | — | 09:00 |
| end | 结束时间 | string | — | 18:00 |
| step | 间隔时间 | string | — | 00:30 |
| minTime | 最小时间，小于该时间的时间段将被禁用 | string | — | 00:00 |
| value | 值 | string | — | - |
| onFocus | onFocus | func:(TimeSelectReactComponent)=>{} | — | - |
| onBlur | onBlur | func:(TimeSelectReactComponent)=>{} | — | - |
| onChange | onChange | func:(value)=>{} | — | - |


### Time Picker Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| selectableRange | 可选时间段，例如<br>`'18:30:00 - 20:30:00'`<br>或者传入数组<br>`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']` | string/array | — | — |
