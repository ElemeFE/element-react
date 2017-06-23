## DatePicker

Use Date Picker for date input.

###  Enter Date

Basic date picker measured by 'day'.

:::demo The measurement is determined by the `type` attribute. You can enable quick options by creating a `picker-options` object with `shortcuts` property. The disabled date is set by `disabledDate`, which is a function.

```js

constructor(props) {
  super(props)
  this.state = {}
}

render() {
  const {value1, value2} = this.state

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">Default</span>
        <DatePicker
          value={value1}
          placeholder="Pick a day"
          onChange={date=>{
            console.debug('DatePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
          />
      </div>
      <div className="block">
        <span className="demonstration">Picker with quick options</span>
        <DatePicker
          ref={e=>this.datepicker2 = e}
          value={value2}
          align="right"
          placeholder="Pick a day"
          onChange={date=>{
            console.debug('DatePicker2 changed: ', date)
            this.setState({value2: date})

          }}
          shortcuts={[{
            text: 'Today',
            onClick: (picker)=> {
              this.setState({value2: new Date()})
              this.datepicker2.togglePickerVisible()
            }
          }, {
            text: 'Yesterday',
            onClick: (picker)=> {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              this.setState({value2: date})
              this.datepicker2.togglePickerVisible()
            }
          }, {
            text: 'A week ago',
            onClick: (picker)=> {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              this.setState({value2: date})
              this.datepicker2.togglePickerVisible()
            }
          }]}
          />
      </div>
    </div>
  )
}

```
:::

### Other measurements

You can choose week, month or year by extending the standard date picker component.

:::demo

```js

constructor(props) {
  super(props)
  this.state = {}
}

render() {
  const {value1, value2, value3} = this.state

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">Week</span>
        <DatePicker
          value={value1}
          placeholder="Pick a week"
          onChange={date=>{
            console.debug('week DatePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          format="yyyywWW"
          selectionMode="week"
          />
      </div>
      <div className="block">
        <span className="demonstration">Month</span>
        <DatePicker
          value={value2}
          placeholder="Pick a month"
          onChange={date=>{
            console.debug('month DatePicker changed: ', date)
            this.setState({value2: date})
          }}
          selectionMode="month"
          />
      </div>
      <div className="block">
        <span className="demonstration">Year</span>
        <DatePicker
          value={value3}
          placeholder="Pick a year"
          onChange={date=>{
            console.debug('year DatePicker changed: ', date)
            this.setState({value3: date})
          }}
          selectionMode="year"
          align="right"
          />
      </div>
    </div>
  )
}
```

:::

###  Date Range

Picking a date range is supported.

:::demo

```js
constructor(props) {
  super(props)
  this.state = {value1: null, value2: null}
}

render() {
  const {value1, value2} = this.state

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">Default</span>
        <DateRangePicker
          value={value1}
          placeholder="Pick a range"
          onChange={date=>{
            console.debug('DateRangePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          />
      </div>
      <div className="block">
        <span className="demonstration">With quick options</span>
        <DateRangePicker
          value={value2}
          placeholder="Pick a range"
          align="right"
          ref={e=>this.daterangepicker2 = e}
          onChange={date=>{
            console.debug('DateRangePicker2 changed: ', date)
            this.setState({value2: date})
          }}
          shortcuts={[{
            text: 'Last week',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

              this.setState({value2: [start, end]})
              this.daterangepicker2.togglePickerVisible()
            }
          }, {
            text: 'Last month',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

              this.setState({value2: [start, end]})
              this.daterangepicker2.togglePickerVisible()
            }
          }, {
            text: 'Last 3 months',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              this.setState({value2: [start, end]})
              this.daterangepicker2.togglePickerVisible()
            }
          }]}
          />
      </div>
    </div>
  )
}

```

:::

### Common Props
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| placeholder | - | string | — | — |
| format | - | string | 年 `yyyy`，月 `MM`，日 `dd`，小时 `HH`，分 `mm`，秒 `ss` | yyyy-MM-dd |
| align | - | string | left, center, right | left |
| isShowTrigger | whether to show trigger icon | boolean | - | true |
| isReadOnly | - | boolean | - | false |
| isDisabled | - | boolean | - | false |
| onFocus | - | (SyntheticEvent)=>() | - | - |
| onBlur | - | (SyntheticEvent)=>() | - | - |


### DatePicker
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | - | Date/null | — | - |
| shortcuts | - | {text: string, onClick: ()=>() }[] | - | - |
| selectionMode | calendar type  | string, one of ['year', 'month', 'week', 'day'] | - | 'day' |
| disabledDate | whether to disabled date selection | (Date)=>boolean | - | - |
| showWeekNumber | whether to show week number | boolean | - | false |


### DateRangePanel
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | - | Date[]/null | — | - |
| shortcuts | - | {text: string, onClick: ()=>() }[] | - | - |
| showWeekNumber | whether to show week number | boolean | - | false |
