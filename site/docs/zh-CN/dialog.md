## Dialog 对话框
在保留当前页面状态的情况下，告知用户并承载相关操作。

### 基本用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

:::demo 需要设置`visible`属性，它接收`Boolean`，当为`true`时显示 Dialog。Dialog 分为两个部分：`Dialog.Body`和`Dialog.Footer`。`title`属性用于定义标题，它是可选的，默认值为空。

```js
constructor(props) {
  super(props);

  this.state = {
    dialogVisible: false
  };
}

render() {
  return (
    <div>
      <Button type="text" onClick={ () => this.setState({ dialogVisible: true }) }>点击打开 Dialog</Button>
      <Dialog
        title="提示"
        size="tiny"
        visible={ this.state.dialogVisible }
        onCancel={ () => this.setState({ dialogVisible: false }) }
        lockScroll={ false }
      >
        <Dialog.Body>
          <span>这是一段信息</span>
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
          <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>确定</Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  )
}
```
:::

### 自定义内容

Dialog 组件的内容可以是任意的，甚至可以是表格或表单，下面是应用了 Element Table 和 Form 组件的两个样例。

:::demo
```js
constructor(props) {
  super(props);

  this.state = {
    dialogVisible2: false,
    dialogVisible3: false,
    form: {
      name: '',
      region: ''
    }
  };

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
  };
}

render() {
  return (
    <div>
      <Button type="text" onClick={ () => this.setState({ dialogVisible2: true }) } type="text">打开嵌套表格的 Dialog</Button>
      <Dialog
        title="收货地址"
        visible={ this.state.dialogVisible2 }
        onCancel={ () => this.setState({ dialogVisible2: false }) }
      >
        <Dialog.Body>
          {this.state.dialogVisible2 && (
            <Table
             style={{width: '100%'}}
             stripe={true}
             columns={this.table.columns}
             data={this.table.data} />
          )}
        </Dialog.Body>
      </Dialog>
      <Button type="text" onClick={ () => this.setState({ dialogVisible3: true }) } type="text">打开嵌套表单的 Dialog</Button>
      <Dialog
        title="收货地址"
        visible={ this.state.dialogVisible3 }
        onCancel={ () => this.setState({ dialogVisible3: false }) }
      >
        <Dialog.Body>
          <Form model={this.state.form}>
            <Form.Item label="活动名称" labelWidth="120">
              <Input value={this.state.form.name}></Input>
            </Form.Item>
            <Form.Item label="活动区域" labelWidth="120">
              <Select value={this.state.form.region} placeholder="请选择活动区域">
                <Select.Option label="区域一" value="shanghai"></Select.Option>
                <Select.Option label="区域二" value="beijing"></Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Dialog.Body>

        <Dialog.Footer className="dialog-footer">
          <Button onClick={ () => this.setState({ dialogVisible3: false }) }>取 消</Button>
          <Button type="primary" onClick={ () => this.setState({ dialogVisible3: false }) }>确 定</Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | Dialog 的标题 | string    | —                               | —      |
| size      | Dialog 的大小 | string    | tiny/small/large/full | small |
| top       | Dialog CSS 中的 top 值（仅在 size 不为 full 时有效） | string    | —                       | 15%     |
| modal     | 是否需要遮罩层   | boolean   | — | true |
| lockScroll | 是否在 Dialog 出现时将 body 滚动锁定 | boolean | — | true |
| customClass      | Dialog 的自定义类名 | string    | — | — |
| closeOnClickModal | 是否可以通过点击 modal 关闭 Dialog | boolean    | — | true |
| closeOnPressEscape | 是否可以通过按下 ESC 关闭 Dialog | boolean    | — | true |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onClose  | Dialog 关闭的回调 | — |
| onOpen  | Dialog 打开的回调 | — |
