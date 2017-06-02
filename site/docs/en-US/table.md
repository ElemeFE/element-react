## Table

Display multiple data with similar format. You can sort, filter, compare your data in a table.

### Basic table

Basic table is just for data display.

:::demo After setting attribute `data` & `columns` of `Table` with an object array, you can use `prop` (corresponding to a key of the object in `data` array) in `columns` to insert data to table columns, and set the attribute `label` to define the column name. You can also use the attribute `width` to define the width of columns.
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 180
      },
      {
        label: "Name",
        prop: "name",
        width: 180
      },
      {
        label: "Address",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }]
  }
}

render() {
  return (
    <Table
      style={{width: '100%'}}
      columns={this.state.columns}
      data={this.state.data}
    />
  )
}
```
:::

### Striped Table

Striped table makes it easier to distinguish different rows.

:::demo Attribute `stripe` accepts a `Boolean`. If `true`, table will be striped.

```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 180
      },
      {
        label: "Name",
        prop: "name",
        width: 180
      },
      {
        label: "Address",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
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

### Table with border

:::demo By default, Table has no vertical border. If you need it, you can set attribute `border` to `true`.

```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 180
      },
      {
        label: "Name",
        prop: "name",
        width: 180
      },
      {
        label: "Address",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
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

### Table with status

You can highlight your table content to distinguish between "success, information, warning, danger" and other states.

:::demo Use `rowClassName` in `Table` to add custom classes to a certain row. Then you can style it with custom classes.

```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 180
      },
      {
        label: "Name",
        prop: "name",
        width: 180
      },
      {
        label: "Address",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
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

### Table with fixed header

When there are too many rows, you can use a fixed header.

:::demo By setting the attribute `height` of `Table`, you can fix the table header without any other codes.

```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 180
      },
      {
        label: "Name",
        prop: "name",
        width: 180
      },
      {
        label: "Address",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-08',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-06',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-07',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
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

### Table with fixed column

When there are too many columns, you can fix some of them.

:::demo Attribute `fixed` is used in `columns`, it accepts a `Boolean`. If `true`, the column will be fixed at left. It also accepts two string literals: 'left' and 'right', both indicating that the column will be fixed at corresponding direction.

```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 150,
        fixed: 'left'
      },
      {
        label: "Name",
        prop: "name",
        width: 160
      },
      {
        label: "Province",
        prop: "province",
        width: 160
      },
      {
        label: "Address",
        prop: "address",
        width: 400
      },
      {
        label: "Operations",
        fixed: 'right',
        width: 150,
        render: ()=>{
          return <span><Button type="text" size="small">Detail</Button><Button type="text" size="small">Edit</Button></span>
        }
      }
    ],
    data: [{
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
    }, {
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
    }, {
      date: '2016-05-04',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
    }, {
      date: '2016-05-01',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
    }, {
      date: '2016-05-08',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
    }, {
      date: '2016-05-06',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
    }, {
      date: '2016-05-07',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
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
      height={255}
    />
  )
}    
```
:::

### Table with fixed columns and header

When you have huge chunks of data to put in a table, you can fix the header and columns at the same time.

:::demo  Fix columns and header at the same time by combining the above two examples.

```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 150,
        fixed: 'left',
        align: 'center'
      },
      {
        label: "Name",
        prop: "name",
        width: 160,
        align: 'right'
      },
      {
        label: "Province",
        prop: "province",
        width: 160
      },
      {
        label: "Address",
        prop: "address",
        width: 400
      },
      {
        label: "Zip",
        prop: "zip",
        width: 120
      }
    ],
    data: [{
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-08',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-06',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }, {
      date: '2016-05-07',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
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

### Single select

Single row selection is supported.

:::demo Table supports single row selection. You can activate it by adding the `highlightCurrentRow` attribute. An event called `onCurrentChange` will be triggered when row selection changes, and its parameters are the rows after and before this change: `currentRow` and `oldCurrentRow`. If you need to display row index, you can add a new `columns` with its `type` attribute assigned to `index`, and you will see the index starting from 1.

```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        type: 'index'
      },
      {
        label: "Date",
        prop: "date",
        width: 150
      },
      {
        label: "Name",
        prop: "name",
        width: 160
      },
      {
        label: "Address",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
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
      onCurrentChange={item => console.log(item)}
    />
  )
}
```
:::

### Multiple select

You can also select multiple rows.

:::demo Activating multiple selection is easy: simply add an `columns` with its `type` set to `selection`

```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        type: 'selection'
      },
      {
        label: "Date",
        prop: "date",
        width: 150
      },
      {
        label: "Name",
        prop: "name",
        width: 160
      },
      {
        label: "Address",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-08',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-06',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-07',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
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

### Sorting

Sort the data to find or compare data quickly.

:::demo Set attribute `sortable` in a certain column to sort the data based on this column. It accepts `Boolean` with a default value `false`. In this example we use another attribute named `formatter` to format the value of certain columns. It accepts a function which has two parameters: `row` and `column`. You can handle it according to your own needs.
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 180,
        sortable: true
      },
      {
        label: "Name",
        prop: "name",
        width: 180,
        sortable: true
      },
      {
        label: "Address",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
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

### Filter

Filter the table to find desired data.

:::demo Set attribute `filters` in `columns` makes this column filterable. `filters` is an array.

```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 180
      },
      {
        label: "Name",
        prop: "name",
        width: 180
      },
      {
        label: "Address",
        prop: "address"
      },
      {
        label: 'Tag',
        prop: 'tag',
        width: 100,
        filters: [{ text: 'Home', value: 'Home' }, { text: 'Office', value: 'Office' }],
        render: (data, column)=>{
          if (data['tag'] == 'Home') {
            return <Tag type="primary">{data['tag']}</Tag>
          } else if (data['tag'] == 'Office') {
            return <Tag type="success">{data['tag']}</Tag>
          }
        }
      }
    ],
    data: [{
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      tag: 'Home'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      tag: 'Office'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      tag: 'Home'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      tag: 'Office'
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

### Table Attributes
| Attribute      | Description          | Type      | Accepted Values     | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | table data | array | — | — |
| height | Table's height. By default it has an `auto` height. If its value is a number, the height is measured in pixels; if its value is a string, the height is affected by external styles | string, number | — | — |
| stripe | whether table is striped | boolean | — | false |
| border | whether table has vertical border | boolean | — | false |
| fit | whether width of column automatically fits its container | boolean | — | true |
| rowClassName | function that returns custom class names for a row, or a string assigning class names for every row | Function(row, index) | - | - |
| emptyText | Displayed text when data is empty | String | - | - |

### Table Events
| Event Name | Description | Parameters |
| ---- | ---- | ---- |
| select | triggers when user clicks the checkbox in a row | selection, row |
| onSelectAll | triggers when user clicks the checkbox in table header | selection |
| onSelectChange | triggers when selection changes | selection |

### Table Methods
| Event Name | Description | Attribute |
| ---- | ---- | ---- |
| clearSelection | toggle if a certain row is selected. With the second parameter, you can directly set if this row is selected  | selection |

### Table-column Attributes
| Attribute      | Description          | Type      | Accepted Values     | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | column label | string | — | — |
| prop | field name. You can also use its alias: `property` | string | — | — |
| width | column width | string | — | — |
| minWidth | column minimum width. Columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion | string | — | — |
| fixed | whether column is fixed at left/right. Will be fixed at left if `true`  | string, boolean | true, left, right | - |
| sortable | whether column can be sorted | boolean, string | true, false, 'custom' | false |
| resizable |  whether column width can be resized, works when `border` of `el-table` is `true`  | boolean | — | true |
| type | type of the column. If set to `selection`, the column will display checkbox. If set to `index`, the column will display index of the row (staring from 1). If set to `expand`, the column will display expand icon. | string | selection/index | — |
| formatter | function that formats content | Function(row, column) | — | — |
| align | alignment | String | left, center, right | left |
| selectable | function that determines if a certain row can be selected, works when `type` is 'selection'  | Function(row, index) | - | - |
| reserveSelection | whether to reserve selection after data refreshing, works when `type` is 'selection' | Boolean | - | false |
| filters | an array of data filtering options. For each element in this array, `text` and `value` are required| Array[{ text, value }] | — | — |
