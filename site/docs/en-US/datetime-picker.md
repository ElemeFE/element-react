## DateTimePicker

Select date and time in one picker.

###  Date and time

:::demo You can select date and time in one picker at the same time by setting `isShowTime` to `true`. The way to use shortcuts is the same as Date Picker.

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
          isShowTime={true}
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
          isShowTime={true}
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



### Date and time range

:::demo You can select date and time range by setting `isShowTime` to `true`.

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
          isShowTime={true}
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
          isShowTime={true}
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

See DatePicker