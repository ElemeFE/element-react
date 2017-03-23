## DatePicker 日期选择器

用于选择或输入日期

###  选择日

以「日」为基本单位，基础的日期选择控件

:::demo 基本单位由`type`属性指定。快捷选项需配置`picker-options`对象中的`shortcuts`，禁用日期通过 `disabledDate` 设置，传入函数

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
        <span className="demonstration">默认</span>
        <DatePicker
          value={value1}
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
          />
      </div>
      <div className="block">
        <span className="demonstration">带快捷选项</span>
        <DatePicker
          ref={e=>this.datepicker2 = e}
          value={value2}
          align="right"
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker2 changed: ', date)
            this.setState({value2: date})

          }}
          shortcuts={[{
            text: '今天',
            onClick: (picker)=> {
              this.setState({value2: new Date()})
              this.datepicker2.togglePickerVisible()
            }
          }, {
            text: '昨天',
            onClick: (picker)=> {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              this.setState({value2: date})
              this.datepicker2.togglePickerVisible()
            }
          }, {
            text: '一周前',
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



###  其他日期单位

通过扩展基础的日期选择，可以选择周、月、年

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
        <span className="demonstration">周</span>
        <DatePicker
          value={value1}
          placeholder="选择周"
          onChange={date=>{
            console.debug('week DatePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          format="yyyy 第 WW 周"
          selectionMode="week"
          />
      </div>
      <div className="block">
        <span className="demonstration">月</span>
        <DatePicker
          value={value2}
          placeholder="选择月"
          onChange={date=>{
            console.debug('month DatePicker changed: ', date)
            this.setState({value2: date})
          }}
          selectionMode="month"
          />
      </div>
      <div className="block">
        <span className="demonstration">年</span>
        <DatePicker
          value={value3}
          placeholder="选择年"
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


###  选择日期范围

可在一个选择器中便捷地选择一个时间范围

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
        <span className="demonstration">默认</span>
        <DateRangePicker
          value={value1}
          placeholder="选择日期范围"
          onChange={date=>{
            console.debug('DateRangePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          />
      </div>
      <div className="block">
        <span className="demonstration">带快捷选项</span>
        <DateRangePicker
          value={value2}
          placeholder="选择日期范围"
          align="right"
          ref={e=>this.daterangepicker2 = e}
          onChange={date=>{
            console.debug('DateRangePicker2 changed: ', date)
            this.setState({value2: date})
          }}
          shortcuts={[{
            text: '最近一周',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

              this.setState({value2: [start, end]})
              this.daterangepicker2.togglePickerVisible()
            }
          }, {
            text: '最近一个月',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

              this.setState({value2: [start, end]})
              this.daterangepicker2.togglePickerVisible()
            }
          }, {
            text: '最近三个月',
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


### DateRangePanel
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | - | Date[]/null | — | false |
| shortcuts | 快捷选项 | {text: string, onClick: ()=>() } | - | false |
| showWeekNumber | 是否展示周数 | boolean | - | false |


### DatePicker
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | - | Date/null | — | false |
| shortcuts | 快捷选项 | {text: string, onClick: ()=>() } | - | false |
| selectionMode | 日期类型 | string, one of ['year', 'month', 'week', 'day'] | - | 'day' |
| disabledDate | 是否禁用日期 | (Date)=>boolean | - | - |
| showWeekNumber | 是否展示周数 | boolean | - | false |
