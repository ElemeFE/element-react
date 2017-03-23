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

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| readonly | whether DatePicker is read only | boolean | — | false |
| disabled | whether DatePicker is disabled | boolean | — | false |
|size | size of Input | string | large/small/mini | — |
| editable | whether the input is editable | boolean | — | true |
| clearable | Whether to show clear button | boolean | — | true |
| placeholder | placeholder | string | — | — |
| type | type of the picker | string | year/month/date/datetime/ week/datetimerange/daterange | date |
| format | format of the picker | string | year `yyyy` month `MM` day `dd`, hour `HH`, minute `mm`, second `ss` | yyyy-MM-dd |
| align | alignment | left/center/right | left |
| popperClass | custom class name for DatePicker's dropdown | string | — | — |
| pickerOptions | additional options, check the table below | object | — | {} |
| rangeSeparator | range separator | string | - | ' - ' |

### Picker Options
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| shortcuts | a { text, onClick } object array to set shortcut options, check the table below | object[] | — | — |
| disabledDate | a function determining if a date is disabled with that date as its parameter. Should return a Boolean | function | — | — |
| firstDayOfWeek | first day of week | Number | 1 to 7 | 7 |

### shortcuts
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| text | title of the shortcut | string | — | — |
| onClick | callback function, triggers when the shortcut is clicked, with the `vm` as its parameter. You can change the picker value by emitting the `pick` event. Example: `vm.$emit('pick', new Date())`| function | — | — |


### Events
| Event Name | Description | Parameters |
|---------|--------|---------|
| onChange | triggers when input value changes | formatted value |
