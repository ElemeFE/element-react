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

:::demo 可以通过指定 Table 组件的 rowClassName 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。
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

:::demo 只要在`el-table`元素中定义了`height`属性，即可实现固定表头的表格，而不需要额外的代码。
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

:::demo 当数据量动态变化时，可以为 Table 设置一个最大高度。
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
        render: ()=>{
          return <span><Button type="text" size="small">移除</Button></span>
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
                label: "地址",
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

:::demo 实现多选非常简单: 手动添加一个`el-table-column`，设`type`属性为`selection`
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

:::demo 实现多选非常简单: 手动添加一个`el-table-column`，设`type`属性为`selection`
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

:::demo 实现多选非常简单: 手动添加一个`el-table-column`，设`type`属性为`selection`即可。在本例中，为了方便说明其他属性，我们还使用了`inline-template`和`show-tooltip-when-overflow`：设置了`inline-template`属性后，可以通过调用`row`对象中的值取代`prop`属性的设置；默认情况下若内容过多会折行显示，若需要单行显示可以使用`show-tooltip-when-overflow`属性，它接受一个`Boolean`，为`true`时多余的内容会在 hover 时以 tooltip 的形式显示出来。
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

:::demo 实现多选非常简单: 手动添加一个`el-table-column`，设`type`属性为`selection`即可。在本例中，为了方便说明其他属性，我们还使用了`inline-template`和`show-tooltip-when-overflow`：设置了`inline-template`属性后，可以通过调用`row`对象中的值取代`prop`属性的设置；默认情况下若内容过多会折行显示，若需要单行显示可以使用`show-tooltip-when-overflow`属性，它接受一个`Boolean`，为`true`时多余的内容会在 hover 时以 tooltip 的形式显示出来。
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
      onSelectChange={(dataItem, checked)=>{console.log(dataItem, checked)}}
      onSelectAll={(dataList, checked)=>{console.log(dataList, checked);}}
    />
  )
}
```
:::

### 排序

对表格进行排序，可快速查找或对比数据。

:::demo 在列中设置`sortable`属性即可实现以该列为基准的排序，接受一个`Boolean`，默认为`false`。在本例中，我们还使用了`formatter`属性，它用于格式化指定列的值，接受一个`Function`，会传入两个参数：`row`和`column`，可以根据自己的需求进行处理。
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

:::demo 在列中设置`filters` `filter-method`属性即可开启该列的筛选，filters 是一个数组，`filter-method`是一个方法，它用于决定某些数据是否显示，会传入两个参数：`value`和`row`。
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

:::demo 在列中设置`filters` `filter-method`属性即可开启该列的筛选，filters 是一个数组，`filter-method`是一个方法，它用于决定某些数据是否显示，会传入两个参数：`value`和`row`。

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
| stripe | 是否为斑马纹 table | boolean | — | false |
| border | 是否带有纵向边框 | boolean | — | false |
| fit | 列的宽度是否自撑开 | boolean | — | true |
| maxHeight | Table 的最大高度 | number | - | - |
| rowClassName | 行的 className 的回调。 | Function(row, index) | - | - |
| sumText | 合计行第一列的文本 | String | - | 合计 |
| showSummary | 是否在表尾显示合计行 | Boolean | - | false |
| getSummaries | 自定义的合计计算方法 | Function({ columns, data }) | - | - |
| emptyText | 空数据时显示的文本内容 | String | - | - |



### Table Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| onSelectAll | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| onSelectChange | 当选择项发生变化时会触发该事件 | selection |

### Table Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| clearSelection | 清空用户的选择，当使用 reserve-selection 功能的时候，可能会需要使用此方法 | selection |

### Table-column Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 显示的标题 | string | — | — |
| prop | 对应列内容的字段名，也可以使用 property 属性 | string | — | — |
| width | 对应列的宽度 | string | — | — |
| minWidth | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | string | — | — |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean | true, left, right | - |
| sortable | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | boolean, string | true, false, 'custom' | false |
| sortMethod | 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效 | Function(a, b) | - | - |
| resizable | 对应列是否可以通过拖动改变宽度（如果需要在 el-table 上设置 border 属性为真） | boolean | — | true |
| type | 对应列的类型。如果设置了 `selection` 则显示多选框，如果设置了 `index` 则显示该行的索引（从 1 开始计算） | string | selection/index | — |
| formatter | 用来格式化内容 | Function(row, column) | — | — |
| align | 对齐方式 | String | left, center, right | left |
| filters | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。 | Array[{ text, value }] | — | — |
| filterMethod | 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。 | Function(value, row) | — | — |
