## Loading 加载

加载数据时显示动效。

### 区域加载

在表格等容器中加载数据时显示。

:::demo 在 Loading 组件中，Element 准备了自定义命令`v-loading`，只需要绑定`Boolean`即可。默认状况下，Loading 遮罩会插入到绑定元素的子节点，通过添加`body`修饰符，可以使遮罩插入至 DOM 中的 body 上。

```js
let columns = [
  {
    label: "日期",
    prop: "date",
    width: 180
  },
  {
    label: "姓名",
    prop: "name",
    width: 180
  },
  {
    label: "地址",
    prop: "address"
  }
];

let data = [{
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄'
}];

<div className="el-loading-demo">
  <Loading>
    <Table
      style={{width: '100%'}}
      columns={columns}
      data={data}
    />
  </Loading>
</div>
```
:::

### 加载文案

可自定义加载文案。

:::demo 在绑定了`v-loading`指令的元素上添加`element-loading-text`属性，其值会被渲染为加载文案，并显示在加载图标的下方。

```js
let columns = [
  {
    label: "日期",
    prop: "date",
    width: 180
  },
  {
    label: "姓名",
    prop: "name",
    width: 180
  },
  {
    label: "地址",
    prop: "address"
  }
];

let data = [{
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄'
}];

<div className="el-loading-demo">
  <Loading text="拼命加载中">
    <Table
      style={{width: '100%'}}
      columns={columns}
      data={data}
    />
  </Loading>
</div>
```
:::

### 整页加载

页面数据加载时显示。

:::demo 当需要全屏遮罩时，可使用`fullscreen`修饰符（此时遮罩会插入至 body 上）。此时若需要锁定屏幕的滚动，可以使用`lock`修饰符。

```html
<div>
  <Button type="primary" onClick={this.onClick.bind(this)}>显示整页加载，3 秒后消失</Button>
  {
    this.state.fullscreen && <Loading fullscreen={true} />
  }
</div>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| fullscreen | 是否全屏显示 | bool | - | false |
| text | 自定义加载文案 | string | - | - |
| loading | 控制加载页显示 | bool | - | true |
