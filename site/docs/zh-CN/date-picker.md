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



### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| readonly | 完全只读 | boolean | — | false |
| disabled | 禁用 | boolean | - | false |
| editable | 文本框可输入 | boolean | - | true |
| placeholder | 占位内容 | string | — | — |
| type | 显示类型 | string | year/month/date/week/<br>datetime/datetimerange/daterange | date |
| format | 时间日期格式化 | string | 年 `yyyy`，月 `MM`，日 `dd`，<br>小时 `HH`，分 `mm`，秒 `ss` | yyyy-MM-dd |
| align | 对齐方式 | string | left, center, right | left |
|picker-options | 当前时间日期选择器特有的选项<br>参考下表 | object |  — | {} |

### Picker Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| shortcuts | 设置快捷选项，需要传入 { text, onClick } 对象<br>用法参考 demo 或下表 | Object[] | - | - |
| disabledDate | 设置禁用状态，参数为当前日期，要求返回 Boolean | Function | - | - |

### Shortcuts
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| text | 标题文本 | string | — | — |
| onClick | 选中后的回调函数，参数是 vm，可通过触发 'pick' 事件设置<br>选择器的值。例如 vm.$emit('pick', new Date()) | function | — | — |
