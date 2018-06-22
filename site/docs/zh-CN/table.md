## Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基础表格

基础的表格展示用法。

:::demo 当`Table`元素中注入`data`和`columns` 对象数组后，在`column`中用`prop`属性来对应对象中的键名即可填入数据，用`label`属性来定义表格的列名。可以使用`width`属性来定义列宽。
```js
constructor(props) {
  super(props);

  this.state = {
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
    },{
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
    <Table
      style={{width: '100%'}}
      columns={this.state.columns}
      maxHeight={200}
      data={this.state.data}
    />
  )
}
```
:::

### 带斑马纹表格

使用带斑马纹的表格，可以更容易区分出不同行的数据。

:::demo `stripe`属性可以创建带斑马纹的表格。它接受一个`Boolean`，默认为`false`，设置为`true`即为启用。
```js
constructor(props) {
  super(props);

  this.state = {
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
    <Table
      style={{width: '100%'}}
      columns={this.state.columns}
      data={this.state.data}
      stripe={true}
    />
  )
}
```
:::

### 带边框表格

:::demo 默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用`border`属性，它接受一个`Boolean`，设置为`true`即可启用。
```js
constructor(props) {
  super(props);

  this.state = {
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

### 带状态表格

可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

:::demo 可以通过指定 Table 组件的 `rowClassName` 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。
```js
constructor(props) {
  super(props);

  this.state = {
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
    <Table
      style={{width: '100%'}}
      columns={this.state.columns}
      data={this.state.data}
      stripe={true}
    />
  )
}

rowClassName(row, index) {
  if (index === 1) {
    return 'info-row';
  } else if (index === 3) {
    return 'positive-row';
  }

  return '';
}

render() {
  return (
    <Table
      style={{width: '100%'}}
      rowClassName={this.rowClassName.bind(this)}
      columns={this.state.columns}
      data={this.state.data}
    />
  )
}
```
:::

### 固定表头

纵向内容过多时，可选择固定表头。

:::demo 只要在`Table`元素中定义了`height`属性，即可实现固定表头的表格，而不需要额外的代码。
```js
constructor(props) {
  super(props);

  this.state = {
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
    },{
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
    <Table
      style={{width: '100%'}}
      columns={this.state.columns}
      data={this.state.data}
      border={true}
      height={250}
    />
 )
}
```
:::

### 固定列

横向内容过多时，可选择固定列。

:::demo 固定列需要使用`fixed`属性，它接受 `Boolean` 值或者`left` `right`，表示左边固定还是右边固定。
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

### 固定列和表头

横纵内容过多时，可选择固定列和表头。

:::demo 固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "日期",
        prop: "date",
        width: 150,
        fixed: 'left',
        align: 'center'
      },
      {
        label: "姓名",
        prop: "name",
        width: 160,
        align: 'right'
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
      }
    ],
    data: [{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
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
      height={250}
    />
  )
}
```
:::

### 流体高度

当数据量动态变化时，可以为 Table 设置一个最大高度。

:::demo 当数据量动态变化时，可以为 `Table` 设置一个最大高度 `maxHeight`。
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "日期",
        prop: "date",
        width: 150,
        fixed: 'left',
        align: 'center'
      },
      {
        label: "姓名",
        prop: "name",
        width: 160,
        align: 'right'
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
        width: 120,
        fixed: 'right',
        render: (row, column, index)=>{
          return <span><Button type="text" size="small" onClick={this.deleteRow.bind(this, index)}>移除</Button></span>
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
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }]
  }
}

deleteRow(index) {
  const { data } = this.state;
  data.splice(index, 1);
  this.setState({
    data: [...data]
  })
}

render() {
  return (
    <Table
      style={{width: '100%'}}
      columns={this.state.columns}
      data={this.state.data}
      border={true}
      maxHeight={250}
    />
  )
}
```
:::

### 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

:::demo 数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "日期",
        prop: "date",
        width: 150
      },
      {
        label: "配送信息",
        subColumns: [
          {
            label: "姓名",
            prop: "name",
            width: 160
          },
          {
            label: "地址",
            subColumns: [
              {
                label: "省份",
                prop: "province",
                width: 160
              },
              {
                label: "城市",
                prop: "address",
                width: 400
              },
              {
                label: "邮编",
                prop: "zip",
                width: 120
              }
            ]
          }
        ]
      }
    ],
    data: [{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
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

### 自定义列模板

自定义列的显示内容，可组合其他组件使用

:::demo 通过设置列的`render`属性，可以自定义渲染内容
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        type: 'index'
      },
      {
        label: "日期",
        prop: "date",
        width: 150,
        render: function(data){
          return (
          <span>
            <Icon name="time"/>
            <span style={{marginLeft: '10px'}}>{data.date}</span>
          </span>)
        }
      },
      {
        label: "姓名",
        prop: "name",
        width: 160,
        render: function(data){
          return <Tag>{data.name}</Tag>
        }
      },
      {
        label: "操作",
        prop: "address",
        render: function(){
          return (
            <span>
             <Button plain={true} type="info" size="small">编辑</Button>
             <Button type="danger" size="small">删除</Button>
            </span>
          )
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
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
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
      height={250}
      highlightCurrentRow={true}
      onCurrentChange={item=>{console.log(item)}}
    />
  )
}
```
:::

### 展开行

当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。

:::demo 通过设置 type="expand" 和 `expandPannel` 可以开启展开行功能, `expandPannel` 的返回值会被渲染为展开行的内容
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        type: 'expand',
        expandPannel: function(data){
          return (
            <Form labelPosition="left" inline={true} className="demo-table-expand">
              <Form.Item label="商品名称"><span>好滋好味鸡蛋仔</span></Form.Item>
              <Form.Item label="所属店铺"><span>王小虎夫妻店</span></Form.Item>
              <Form.Item label="商品 ID"><span>12987122</span></Form.Item>
              <Form.Item label="店铺 ID"><span>10333</span></Form.Item>
              <Form.Item label="商品分类"><span>江浙小吃、小吃零食</span></Form.Item>
              <Form.Item label="店铺地址"><span>上海市普陀区真北路</span></Form.Item>
              <Form.Item label="商品描述"><span>荷兰优质淡奶，奶香浓而不腻</span></Form.Item>
            </Form>
          )
        }
      },
      {
        label: "商品 ID",
        prop: "id",
        width: 150
      },
      {
        label: "商品名称",
        prop: "name",
        width: 160
      },
      {
        label: "描述",
        prop: "desc"
      }
    ],
    data: [{
      id: '12987122',
      name: '好滋好味鸡蛋仔',
      category: '江浙小吃、小吃零食',
      desc: '荷兰优质淡奶，奶香浓而不腻',
      address: '上海市普陀区真北路',
      shop: '王小虎夫妻店',
      shopId: '10333'
    }, {
      id: '12987123',
      name: '好滋好味鸡蛋仔',
      category: '江浙小吃、小吃零食',
      desc: '荷兰优质淡奶，奶香浓而不腻',
      address: '上海市普陀区真北路',
      shop: '王小虎夫妻店',
      shopId: '10333'
    }, {
      id: '12987125',
      name: '好滋好味鸡蛋仔',
      category: '江浙小吃、小吃零食',
      desc: '荷兰优质淡奶，奶香浓而不腻',
      address: '上海市普陀区真北路',
      shop: '王小虎夫妻店',
      shopId: '10333'
    }, {
      id: '12987126',
      name: '好滋好味鸡蛋仔',
      category: '江浙小吃、小吃零食',
      desc: '荷兰优质淡奶，奶香浓而不腻',
      address: '上海市普陀区真北路',
      shop: '王小虎夫妻店',
      shopId: '10333'
    }]
  }
}

render() {
  return (
    <Table
      style={{width: '100%'}}
      columns={this.state.columns}
      data={this.state.data}
      border={false}
      onCurrentChange={item=>{console.log(item)}}
    />
  )
}
```
:::


### 单选

选择单行数据时使用色块表示

:::demo Table 组件提供了单选的支持，只需要配置`highlightCurrentRow`属性即可实现单选。之后由`currentChange`事件来管理选中时触发的事件，它会传入`currentRow`，`oldCurrentRow`。如果需要显示索引，可以增加一列`column`，设置`type`属性为`index`即可显示从 1 开始的索引号。
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        type: 'index'
      },
      {
        label: "日期",
        prop: "date",
        width: 150
      },
      {
        label: "姓名",
        prop: "name",
        width: 160
      },
      {
        label: "地址",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
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
      height={250}
      highlightCurrentRow={true}
      onCurrentChange={item=>{console.log(item)}}
    />
  )
}
```
:::

### 多选

选择多行数据时使用 Checkbox。

:::demo 实现多选非常简单: 手动添加一个`column`，设`type`属性为`selection`即可。
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        type: 'selection'
      },
      {
        label: "日期",
        prop: "date",
        width: 150
      },
      {
        label: "姓名",
        prop: "name",
        width: 160
      },
      {
        label: "地址",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
     }, {
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
      height={250}
      onSelectChange={(selection) => { console.log(selection) }}
      onSelectAll={(selection) => { console.log(selection) }}
    />
  )
}
```
:::

### 排序

对表格进行排序，可快速查找或对比数据。

:::demo 在列中设置`sortable`属性即可实现以该列为基准的排序，接受一个`Boolean`，默认为`false`。
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "日期",
        prop: "date",
        width: 180,
        sortable: true
      },
      {
        label: "姓名",
        prop: "name",
        width: 180,
        sortable: true
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

### 筛选

对表格进行筛选，可快速查找到自己想看的数据。

:::demo 在列中设置`filters` `filterMethod`属性即可开启该列的筛选，filters 是一个数组，`filterMethod`是一个方法，它用于决定某些数据是否显示，会传入两个参数：`value`和`row`。
```js
constructor(props) {
  super(props);

  this.state = {
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
      },
      {
        label: '标签',
        prop: 'tag',
        width: 100,
        filters: [{text: '家', value: '家'}, {text: '公司', value: '公司'}],
        filterMethod(value, row) {
                  return row.tag === value;
                },
        render: (data, column)=>{
          if(data['tag'] == '家'){
            return <Tag type="primary">{data['tag']}</Tag>
          }else if(data['tag'] == '公司'){
            return <Tag type="success">{data['tag']}</Tag>
          }
        }
      }
    ],
    data: [{
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      tag: '家'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
      tag: '公司'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
      tag: '公司'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄',
      tag: '家'
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

### 表尾合计行

若表格展示的是各类数字，可以在表尾显示各列的合计。

:::demo 将`showSummary`设置为`true`就会在表格尾部展示合计行。默认情况下，对于合计行，第一列不进行数据求合操作，而是显示「合计」二字（可通过`sumText`配置），其余列会将本列所有数值进行求合操作，并显示出来。当然，你也可以定义自己的合计逻辑。使用`summaryMethod`并传入一个方法，返回一个数组，这个数组中的各项就会显示在合计行的各列中，具体可以参考本例中的第二个表格。

```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "ID",
        prop: "id",
        width: 180
      },
      {
        label: "姓名",
        prop: "name",
        width: 180
      },
      {
        label: "数值 1",
        prop: "amount1"
      },
      {
        label: "数值 2",
        prop: "amount2"
      },
      {
        label: "数值 3",
        prop: "amount3"
      }
    ],
    data: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
  }
}

render() {
  return (
    <div>
      <Table
        style={{width: '100%'}}
        showSummary={true}
        columns={this.state.columns}
        data={this.state.data}
        border={true}
      />
      <Table
        style={{width: '100%', marginTop: 20}}
        height={200}
        showSummary={true}
        columns={this.state.columns}
        data={this.state.data}
        sumText='总价'
        summaryMethod={(columns, data)=>{
          const dataList = [];
          for(var i=0; i < columns.length; i++){
            let total = 0;
            for(let j=0; j < data.length; j++){
              let value = data[j][columns[i]['property']];

              if(isNaN(value)){
                total = 'N/A'
                break;
              }else{
                total += parseFloat(value);
              }
            }
            dataList[i] = isNaN(total) ? total : total +'元';
          }
          return dataList;
        }}
        border={true}
      />
    </div>
  )
}
```
:::

### Table Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | 显示的数据 | array | — | — |
| height | table 的高度，默认高度为空，即自动高度，单位 px | string, number | — | — |
| maxHeight | Table 的最大高度 | string/number | — | — |
| stripe | 是否为斑马纹 table | boolean | — | false |
| border | 是否带有纵向边框 | boolean | — | false |
| fit | 列的宽度是否自撑开 | boolean | — | true |
| showHeader | 是否显示表头 | boolean | — | true |
| highlightCurrentRow | 是否要高亮当前行 | boolean | — | false |
| currentRowKey | 当前选中行的 key，传入数组时可以控制多选 | string, number, string[], number[] | — | — |
| rowClassName | 行的 className 的回调。 | Function(row, index) | - | - |
| rowStyle | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。 | Function(row, index)/Object | — | — |
| rowKey | 行数据的 Key，用来优化 Table 的渲染；在使用 reserveSelection 功能的情况下，该属性是必填的。类型为 string 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | Function(row)/string | — | — |
| emptyText | 空数据时显示的文本内容 | string | - | - |
| defaultExpandAll | 是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效 | boolean | — | false |
| expandRowKeys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。| array | — | |
| defaultSort | 默认的排序列的prop和顺序。它的`prop`属性指定默认的排序的列，`order`指定默认排序的顺序| Object | `order`: ascending, descending | 如果只指定了`prop`, 没有指定`order`, 则默认顺序是ascending |
| showSummary | 是否在表尾显示合计行 | boolean | - | false |
| sumText | 合计行第一列的文本 | string | - | 合计 |
| summeryMethod | 自定义的合计计算方法 | Function({ columns, data }) | - | - |



### Table Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| onSelect | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| onSelectAll | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| onSelectChange | 当选择项发生变化时会触发该事件 | selection |
| onCellMouseEnter | 当单元格 hover 进入时会触发该事件 | row, column, cell, event |
| onCellMouseLeave | 当单元格 hover 退出时会触发该事件 | row, column, cell, event |
| onCellClick | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| onCellDbClick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event |
| onRowClick | 当某一行被点击时会触发该事件 | row, event, column |
| onRowContextMenu | 当某一行被鼠标右键点击时会触发该事件 | row, event |
| onRowDbClick | 当某一行被双击时会触发该事件 | row, event |
| onHeaderClick | 当某一列的表头被点击时会触发该事件 | column, event |
| onSortChange | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order } |
| onFilterChange | 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。 | filters |
| onCurrentChange | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |
| onHeaderDragEnd | 当拖动表头改变了列的宽度的时候会触发该事件 | newWidth, oldWidth, column, event |
| onExpand | 当用户对某一行展开或者关闭的上会触发该事件 | row, expanded |

### Table Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| clearSelection | 清空用户的选择，当使用 reserve-selection 功能的时候，可能会需要使用此方法 | selection |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） | row, selected |
| setCurrentRow | 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。 | row |

### Table-column Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 对应列的类型。如果设置了 `selection` 则显示多选框；如果设置了 `index` 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮 | string | selection/index/expand | — |
| columnKey | column 的 key，如果需要使用 onFilterChange 事件，则需要此属性标识是哪个 column 的筛选条件 | string | — | — |
| label | 显示的标题 | string | — | — |
| prop | 对应列内容的字段名，也可以使用 property 属性 | string | — | — |
| width | 对应列的宽度 | string | — | — |
| minWidth | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | string | — | — |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean | true, left, right | - |
| render | 自定义渲染使用的 Function | Function(row, column, index) | — | — |
| renderHeader | 列标题 Label 区域渲染使用的 Function | Function(column) | — | — |
| sortable | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | boolean, string | true, false, 'custom' | false |
| sortMethod | 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效 | Function(a, b) | - | - |
| resizable | 对应列是否可以通过拖动改变宽度（如果需要在 el-table 上设置 border 属性为真） | boolean | — | true |
| align | 对齐方式 | string | left, center, right | left |
| headerAlign | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | string | left/center/right | — |
| className | 列的 className | string | — | — |
| labelClassName | 当前列标题的自定义类名 | string | — | — |
| selectable | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | Function(row, index) | — | — |
| reserveSelection | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则代表会保留之前数据的选项，需要配合 Table 的 clearSelection 方法使用。 | Boolean | — | false |
| filters | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。 | Array[{ text, value }] | — | — |
| filterPlacement | 过滤弹出框的定位 | string | 与 Tooltip 的 `placement` 属性相同 | — |
| filterMultiple | 数据过滤的选项是否多选 | Boolean | — | true |
| filterMethod | 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。 | Function(value, row) | — | — |
| filteredValue | 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。 | Array | — | — |
