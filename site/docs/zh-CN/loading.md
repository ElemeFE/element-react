## Loading 加载

加载数据时显示动效。

### 区域加载

在表格等容器中加载数据时显示。

:::demo

```js
constructor(props) {
  super(props);

  this.table = {
    columns: [
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
    <div className="el-loading-demo">
      <Loading>
        <Table
          style={{width: '100%'}}
          columns={this.table.columns}
          data={this.table.data}
        />
      </Loading>
    </div>
  )
}
```
:::

### 加载文案

可自定义加载文案。

:::demo 添加`text`属性，其值会被渲染为加载文案，并显示在加载图标的下方。

```js
constructor(props) {
  super(props);

  this.table = {
    columns: [
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
    <div className="el-loading-demo">
      <Loading text="拼命加载中">
        <Table
          style={{width: '100%'}}
          columns={this.table.columns}
          data={this.table.data}
        />
      </Loading>
    </div>
  )
}
```
:::

### 整页加载

页面数据加载时显示。

:::demo 当需要全屏遮罩时，可使用`fullscreen`修饰符（此时遮罩会插入至 body 上）。

```js
constructor(props) {
  super(props);

  this.state = {
    fullscreen: false
  }
}

onClick() {
  clearTimeout(this.timeout);

  this.timeout = setTimeout(() => {
    this.setState({
      fullscreen: false
    });
  }, 3000);

  this.setState({
    fullscreen: true
  });
}

render() {
  return (
    <div>
      <Button type="primary" onClick={this.onClick.bind(this)}>显示整页加载，3 秒后消失</Button>
      {
        this.state.fullscreen && <Loading fullscreen={true} />
      }
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| fullscreen | 是否全屏显示 | bool | - | false |
| text | 自定义加载文案 | string | - | - |
| loading | 控制加载页显示 | bool | - | true |
