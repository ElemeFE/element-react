## Loading

Show animation while loading data.

### Loading inside a container

Displays animation in a container (such as a table) while loading data.

:::demo Element provides two ways to invoke Loading: directive and service. For the custom directive `loading`, you just need to bind a `boolean` value to it. By default, the loading mask will append to the element where the directive is used. Adding the `body` modifier makes the mask append to the body element.

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

:::demo Add attribute `element-loading-text` to the element on which `v-loading` is bound, and its value will be displayed under the spinner.
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

:::demo Add the `fullscreen` modifier to create a full screen mask, and it will append to body. In this case, if you disable scrolling on body, you add another modifier `lock`.

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
| target | the DOM node Loading needs to cover. Accepts a DOM object or a string. If it's a string, it will be passed to `document.querySelector` to get the corresponding DOM node | object/string | — | document.body |
| body | same as the `body` modifier of `v-loading` | boolean | — | false |
| fullscreen | same as the `fullscreen` modifier of `v-loading` | boolean | — | true |
| lock | same as the `lock` modifier of `v-loading` | boolean | — | false |
| text | loading text that displays under the spinner | string | — | — |
| customClass | custom class name for Loading | string | — | — |
