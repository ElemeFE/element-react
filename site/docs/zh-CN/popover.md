## Popover 弹出框

### 基础用法
Popover 的属性与 Tooltip 很类似，它们都是基于`Popper.js`开发的，因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。

:::demo `trigger`属性用于设置何时触发 Popover ，提供三种触发方式：`hover`, `click` 和 `focus`。
```js
render() {
  return (
    <div>
      <Popover placement="top-start" title="标题" width="200" trigger="hover" content="这是一段容,这是一段容,这是一段容,这是一段容。">
        <Button>hover 激活</Button>
      </Popover>
      <Popover placement="bottom" title="标题" width="200" trigger="click" content="这是一段容,这是一段容,这是一段容,这是一段容。">
        <Button>click 激活</Button>
      </Popover>
      <Popover placement="right" title="标题" width="200" trigger="focus" content="这是一段容,这是一段容,这是一段容,这是一段容。">
        <Button>focus 激活</Button>
      </Popover>
    </div>
  )
}
```
:::

### 嵌套信息

可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。

:::demo 利用分发取代`content`属性
```js
constructor(props){
  super(props);

  this.table = {
    columns: [
      {
        label: "日期",
        prop: "date",
        width: 150
      },
      {
        label: "姓名",
        prop: "name",
        width: 100
      },
      {
        label: "地址",
        prop: "address",
        width: 300
      }
    ],
    data: [{
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
    }]
  }
}

render() {
  return (
    <Popover placement="right" title="标题" width="400" trigger="click" content={(
      <Table
       style={{width: '100%'}}
       stripe={true}
       columns={this.table.columns}
       data={this.table.data} />
    )}>
      <Button>click 激活</Button>
    </Popover>
  )
}
```
:::

### 嵌套操作

当然，你还可以嵌套操作，这相比 Dialog 更为轻量：

:::demo
```js
constructor(props){
  super(props);

  this.state = {};
}

onDismiss() {
  this.setState({
    visible: false
  });
}

render() {
  return (
    <Popover placement="top" width="160" trigger="click" visible={this.state.visible} content={(
      <div>
        <p>这是一段内容这是一段内容确定删除吗？</p>
        <div style={{textAlign: 'right', margin: 0}}>
          <Button size="mini" type="text" onClick={this.onDismiss.bind(this)}>取消</Button>
          <Button type="primary" size="mini" onClick={this.onDismiss.bind(this)}>确定</Button>
        </div>
      </div>
    )}>
      <Button>删除</Button>
    </Popover>
  )
}
```
:::

### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| trigger | 触发方式 | String  | click/focus/hover |    click    |
|  title              | 标题 | String | — | — |
|  content        |  显示的内容，也可以通过 `slot` 传入 DOM   | String            | — | — |
|  width        |  宽度  | String, Number            | — | 最小宽度 150px |
|  placement        |  出现位置  | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  visible        |  状态是否可见  | Boolean           | — |  false |
|  transition     |  定义渐变动画      | String             | — | fade-in-linear |
|  visibleArrow   |  是否显示 Tooltip 箭头 | Boolean | — | true |
| popperClass | 为 popper 添加类名 | String | - | -|
