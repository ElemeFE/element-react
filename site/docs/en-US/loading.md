## Loading

Show animation while loading data.

### Loading inside a container

Displays animation in a container (such as a table) while loading data.

:::demo

```js
constructor(props) {
  super(props);

  this.table = {
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
      date: '2016-05-02',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District'
    }, {
      date: '2016-05-04',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District'
    }, {
      date: '2016-05-01',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District'
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

### Loading text

You can customize a text message.

:::demo Add attribute `text` and its value will be displayed under the spinner.
```js
constructor(props) {
  super(props);

  this.table = {
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
      date: '2016-05-02',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District'
    }, {
      date: '2016-05-04',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District'
    }, {
      date: '2016-05-01',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District'
    }]
  }
}

render() {
  return (
    <div className="el-loading-demo">
      <Loading text="Loading...">
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

### Full screen loading

Show a full screen animation while loading data.

:::demo Add the `fullscreen` modifier to create a full screen mask, and it will append to body.

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
      <Button type="primary" onClick={this.onClick.bind(this)}>Full screen loading for 3 seconds</Button>
      {
        this.state.fullscreen && <Loading fullscreen={true} />
      }
    </div>
  )
}
```
:::

### Options
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| fullscreen | same as the `fullscreen` modifier of `v-loading` | boolean | — | true |
| text | loading text that displays under the spinner | string | — | — |
| loading | control the loading state | bool | - | true |
