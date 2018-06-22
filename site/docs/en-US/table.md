## Table

Display multiple data with similar format. You can sort, filter, compare your data in a table.

### Basic table

Basic table is just for data display.

:::demo After setting attribute `data` & `columns` of `Table` with an object array, you can use `prop` (corresponding to a key of the object in `data` array) in `column` to insert data to table columns, and set the attribute `label` to define the column name. You can also use the attribute `width` to define the width of columns.
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

:::demo Attribute `fixed` is used in `column`, it accepts a `Boolean`. If `true`, the column will be fixed at left. It also accepts two string literals: 'left' and 'right', both indicating that the column will be fixed at corresponding direction.

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
        width: 120
      },
      {
        label: "State",
        prop: "state",
        width: 120
      },
      {
        label: "City",
        prop: "city",
        width: 120
      },
      {
        label: "Address",
        prop: "address",
        width: 300
      },
      {
        label: "Operations",
        fixed: 'right',
        width: 120,
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
        width: 120,
        align: 'right'
      },
      {
        label: "State",
        prop: "state",
        width: 120
      },
      {
        label: "City",
        prop: "city",
        width: 120
      },
      {
        label: "Address",
        prop: "address",
        width: 300
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

### Fluid-height Table with fixed header (and columns)

When the the data is dynamically changed, you might want the table to have a maximum height rather than a fixed height and to show the scroll bar if needed.

:::demo  By setting the attribute `maxHeight` of `Table`, you can fix the table header. The table body scrolls only if the height of the rows exceeds the max height value.
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
        width: 120,
      },
      {
        label: "State",
        prop: "state",
        width: 120
      },
      {
        label: "City",
        prop: "city",
        width: 120
      },
      {
        label: "Address",
        prop: "address",
        width: 300
      },
      {
        label: "Zip",
        prop: "zip",
        width: 120,
      },
      {
        label: "Operations",
        width: 120,
        fixed: 'right',
        render: (row, column, index)=>{
          return <span><Button type="text" size="small" onClick={this.deleteRow.bind(this, index)}>Remove</Button></span>
        }
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

### Grouping table head

When the data structure is complex, you can use group header to show the data hierarchy.

:::demo When the data structure is complex, you can use group header to show the data hierarchy.
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 150
      },
      {
        label: "Delivery Info",
        subColumns: [
          {
            label: "Name",
            prop: "name",
            width: 120
          },
          {
            label: "Address Info",
            subColumns: [
              {
                label: "State",
                prop: "state",
                width: 120
              },
              {
                label: "City",
                prop: "city",
                width: 120
              },
              {
                label: "Address",
                prop: "address",
                width: 300
              },
              {
                label: "Zip",
                prop: "zip",
                width: 120
              }
            ]
          }
        ]
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
    />
  )
}
```
:::

### Single select

Single row selection is supported.

:::demo Table supports single row selection. You can activate it by adding the `highlightCurrentRow` attribute. An event called `onCurrentChange` will be triggered when row selection changes, and its parameters are the rows after and before this change: `currentRow` and `oldCurrentRow`. If you need to display row index, you can add a new `column` with its `type` attribute assigned to `index`, and you will see the index starting from 1.

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
      highlightCurrentRow={true}
      onCurrentChange={item => console.log(item)}
    />
  )
}
```
:::

### Multiple select

You can also select multiple rows.

:::demo Activating multiple selection is easy: simply add an `column` with its `type` set to `selection`

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
      onSelectChange={(selection) => { console.log(selection) }}
      onSelectAll={(selection) => { console.log(selection) }}
    />
  )
}
```
:::

### Sorting

Sort the data to find or compare data quickly.

:::demo Set attribute `sortable` in a certain column to sort the data based on this column. It accepts `Boolean` with a default value `false`.
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

:::demo Set attribute `filters` in `column` makes this column filterable. `filters` is an array.

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
        filterMethod(value, row) {
                          return row.tag === value;
                        },
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

### Custom column template

Customize table column so it can be integrated with other components.
:::demo You can set column's `render` property to render custom content.
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
        width: 180,
        render: function(data){
          return (
          <span>
            <Icon name="time"/>
            <span style={{marginLeft: '10px'}}>{data.date}</span>
          </span>)
        }
      },
      {
        label: "Name",
        prop: "name",
        width: 180,
        render: function(data){
          return <Tag>{data.name}</Tag>
        }
      },
      {
        label: "Operations",
        render: function() {
          return (
            <span>
             <Button plain={true} type="info" size="small">Edit</Button>
             <Button type="danger" size="small">Delete</Button>
            </span>
          )
        }
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
      highlightCurrentRow={true}
      onCurrentChange={item=>{console.log(item)}}
    />
  )
}
```
:::

### Expandable row

When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.
:::demo Activate expandable row by adding type="expand" and `expandPannel`. The result returned by `expandPannel` will be rendered as the contents of expanded row.
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        type: 'expand',
        expandPannel: function(data) {
          return (
            <div>
              <p>State: {data.state}</p>
              <p>City: {data.city}</p>
              <p>Address: {data.address}</p>
              <p>Zip: {data.zip}</p>
            </div>
          )
        }
      },
      {
        label: "Date",
        prop: "date",
      },
      {
        label: "Name",
        prop: "name",
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
      border={false}
      onCurrentChange={item=>{console.log(item)}}
    />
  )
}
```
:::

### Summary row

For table of numbers, you can add an extra row at the table footer displaying each column's sum.
:::demo You can add the summary row by setting `showSummary` to `true`. By default, for the summary row, the first column does not sum anything up but always displays 'Sum' (you can configure the displayed text using `sumText`), while other columns sum every number in that column up and display them. You can of course define your own sum behaviour. To do so, pass a method to `summaryMethod`, which returns an array, and each element of the returned array will be displayed in the columns of the summary row. The second table of this example is a detailed demo.
```js
constructor(props) {
  super(props);

  this.state = {
    columns: [
      {
        label: "ID",
        prop: "id",
      },
      {
        label: "Name",
        prop: "name",
      },
      {
        label: "Amount 1",
        prop: "amount1"
      },
      {
        label: "Amount 2",
        prop: "amount2"
      },
      {
        label: "Amount 3",
        prop: "amount3"
      }
    ],
    data: [{
      id: '12987122',
      name: 'Tom',
      amount1: '234',
      amount2: '3.2',
      amount3: 10
    }, {
      id: '12987123',
      name: 'Tom',
      amount1: '165',
      amount2: '4.43',
      amount3: 12
    }, {
      id: '12987124',
      name: 'Tom',
      amount1: '324',
      amount2: '1.9',
      amount3: 9
    }, {
      id: '12987125',
      name: 'Tom',
      amount1: '621',
      amount2: '2.2',
      amount3: 17
    }, {
      id: '12987126',
      name: 'Tom',
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
        sumText='Total price'
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
            dataList[i] = isNaN(total) ? total : '$ ' + total;
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
| Attribute      | Description          | Type      | Accepted Values     | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | table data | array | — | — |
| height | Table's height. By default it has an `auto` height. If its value is a number, the height is measured in pixels; if its value is a string, the height is affected by external styles | string/number | — | — |
| maxHeight | Table's maxHeight. The height of the table starts from `auto` until it reaches the maxHeight limit. The `maxHeight` is measured in pixels, same as `height` | string/number | — | — |
| stripe | whether table is striped | boolean | — | false |
| border | whether table has vertical border | boolean | — | false |
| fit | whether width of column automatically fits its container | boolean | — | true |
| showHeader | whether table header is visible | boolean | — | true |
| highlightCurrentRow | whether current row is highlighted | boolean | — | false |
| currentRowKey | key or keys of selected row | string, number, string[], number[] | — | — |
| rowClassName | function that returns custom class names for a row, or a string assigning class names for every row | Function(row, index)/String | — | — |
| rowStyle | function that returns custom style for a row,  or a string assigning custom style for every row | Function(row, index)/Object | — | — |
| rowKey | key of row data, used for optimizing rendering. Required if `reserveSelection` is on. When its type is String, multiLevel access is supported, e.g. `user.info.id`, but `user.info[0].id` is not supported, in which case `Function` should be used. | Function(row)/String | — | — |
| emptyText | Displayed text when data is empty. You can customize this area with `slot="empty"` | String | — | No Data |
| defaultExpandAll | whether expand all rows by default, only works when the table has a column type="expand" | Boolean | — | false |
| expandRowKeys | set expanded rows by this prop, prop's value is the keys of expand rows, you should set rowKey before using this prop | Array | — | |
| defaultSort | set the default sort column and order. property `prop` is used to set default sort column, property `order` is used to set default sort order | Object | `order`: ascending, descending | if `prop` is set, and `order` is not set, then `order` is default to ascending |
| showSummary | whether to display a summary row | Boolean | — | false |
| sumText | displayed text for the first column of summary row | String | — | Sum |
| summaryMethod | custom summary method | Function({ columns, data }) | — | — |

### Table Events
| Event Name | Description | Parameters |
| ---- | ---- | ---- |
| onSelect | triggers when user clicks the checkbox in a row | selection, row |
| onSelectAll | triggers when user clicks the checkbox in table header | selection |
| onSelectChange | triggers when selection changes | selection |
| onCellMouseEnter | triggers when hovering into a cell| row, column, cell, event |
| onCellMouseLeave | triggers when hovering out of a cell | row, column, cell, event |
| onCellClick | triggers when clicking a cell | row, column, cell, event |
| onCellDblClick | triggers when double clicking a cell | row, column, cell, event |
| onRowClick | triggers when clicking a row | row, event, column |
| onRowContextMenu | triggers when user right clicks on a row | row, event |
| onRowDblClick | triggers when double clicking a row | row, event |
| onHeaderClick | triggers when clicking a column header | column, event |
| onSortChange | triggers when Table's sorting changes | { column, prop, order } |
| onFilterChange | column's key. If you need to use the filterChange event, this attribute is mandatory to identify which column is being filtered | filters |
| onCurrentChange | triggers when current row changes | currentRow, oldCurrentRow |
| onHeaderDragend | triggers when finish dragging header | newWidth, oldWidth, column, event |
| onExpand | triggers when user expands or collapses a row | row, expanded |

### Table Methods
| Event Name | Description | Attribute |
| ---- | ---- | ---- |
| clearSelection | used in multiple selection Table, clear selection, might be useful when `reserveSelection` is on | selection |
| toggleRowSelection | used in multiple selection Table, toggle if a certain row is selected. With the second parameter, you can directly set if this row is selected | row, selected |
| setCurrentRow | used in single selection Table, set a certain row selected. If called without any parameter, it will clear selection. | row |


### Table-column Attributes
| Attribute      | Description          | Type      | Accepted Values     | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | type of the column. If set to `selection`, the column will display checkbox. If set to `index`, the column will display index of the row (staring from 1). If set to `expand`, the column will display expand icon.  | string | selection/index/expand | — |
| label | column label | string | — | — |
| columnKey | column's key. If you need to use the onFilterChange event, you need this attribute to identify which column is being filtered | string | string | — | — |
| prop |  field name. You can also use its alias: `property` | string | — | — |
| width | column width | string | — | — |
| minWidth | column minimum width. Columns with `width` has a fixed width, while columns with `minWidth` has a width that is distributed in proportion | string | — | — |
| fixed | whether column is fixed at left/right. Will be fixed at left if `true` | string/boolean | true/left/right | — |
| render | custom render Function | Function(row, column, index) | — | — |
| renderHeader | render function for table header of this column | Function(column) | — | — |
| sortable | whether column can be sorted. Remote sorting can be done by setting this attribute to 'custom' and listening to the `sortChange` event of Table | boolean, string | true, false, custom | false |
| sortMethod | sorting method, works when `sortable` is `true`. Should return a boolean. | Function(a, b) | — | — |
| resizable | whether column width can be resized, works when `border` of `elTable` is `true` | boolean | — | false |
| align | alignment | string | left/center/right | left |
| headerAlign | alignment of the table header. If omitted, the value of the above `align` attribute will be applied | String | left/center/right | — |
| className | class name of cells in the column | string | — | — |
| labelClassName | class name of the label of this column | string | — | — |
| selectable | function that determines if a certain row can be selected, works when `type` is 'selection' | Function(row, index) | — | — |
| reserveSelection | whether to reserve selection after data refreshing, works when `type` is 'selection' | boolean | — | false |
| filters | an array of data filtering options. For each element in this array, `text` and `value` are required | Array[{ text, value }] | — | — |
| filterPlacement | placement for the filter dropdown | String | same as Tooltip's `placement` | — |
| filterMultiple | whether data filtering supports multiple options | Boolean | — | true |
| filterMethod | data filtering method. If `filterMultiple` is on, this method will be called multiple times for each row, and a row will display if one of the calls returns `true` | Function(value, row) | — | — |
| filteredValue | filter value for selected data, might be useful when table header is rendered with `renderHeader` | Array | — | — |
