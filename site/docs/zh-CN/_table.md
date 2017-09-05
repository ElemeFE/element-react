### 固定列

横向内容过多时，可选择固定列。

:::demo 固定列需要使用`fixed`属性，它接受 Boolean 值或者`left` `right`，表示左边固定还是右边固定。
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "日期",
        prop: "date",
        width: 150,
        fixed: 'left'
      },
      {
        label: "姓名",
        prop: "name",
        width: 160
      },
      {
        label: "省份",
        prop: "province",
        width: 160
      },
      {
        label: "地址",
        prop: "address",
        width: 400
      },
      {
        label: "邮编",
        prop: "zip",
        width: 120
      },
      {
        label: "操作",
        prop: "zip",
        fixed: 'right',
        width: 100,
        render: ()=>{
          return <span><Button type="text" size="small">查看</Button><Button type="text" size="small">编辑</Button></span>
        }
      }
    ],
    data: [{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }]
  }
}

render() {
  return (
    <Table
      style={{width: '100%'}}
      columns={this.state.columns}
      data={this.state.data}
      border={true}
    />
  )
}
```
:::
