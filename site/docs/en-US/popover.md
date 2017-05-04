## Popover

### Basic usage

Similar to Tooltip, Popover is also built with `Popper.js`. So for some duplicated attributes, please refer to the documentation of Tooltip.

:::demo The attribute `trigger` is used to define how popover is triggered: `hover`, `click` or `focus`.

```js
render() {
  return (
    <div>
      <Popover placement="top-start" title="Title" width="200" trigger="hover" content="This is content, this is content, this is content">
        <Button>Hover to activate</Button>
      </Popover>
      <Popover placement="bottom" title="Title" width="200" trigger="click" content="This is content, this is content, this is content">
        <Button>Click to activate</Button>
      </Popover>
      <Popover placement="right" title="Title" width="200" trigger="focus" content="This is content, this is content, this is content">
        <Button>Focus to activate</Button>
      </Popover>
    </div>
  )
}
```
:::

### Nested information

Other components can be nested in popover. Following is an example of nested table.

:::demo replace the `content` attribute with a default `slot`.

```js
constructor(props){
  super(props);

  this.table = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 150
      },
      {
        label: "Name",
        prop: "name",
        width: 100
      },
      {
        label: "Address",
        prop: "address",
        width: 300
      }
    ],
    data: [{
      date: '2016-05-02',
      name: 'Jack',
      address: 'New York City'
    }, {
      date: '2016-05-04',
      name: 'Jack',
      address: 'New York City'
    }, {
      date: '2016-05-01',
      name: 'Jack',
      address: 'New York City'
    }, {
      date: '2016-05-03',
      name: 'Jack',
      address: 'New York City'
    }]
  }
}

render() {
  return (
    <Popover placement="right" title="Title" width="400" trigger="click" content={(
      <Table
       style={{width: '100%'}}
       stripe={true}
       columns={this.table.columns}
       data={this.table.data} />
    )}>
      <Button>Click to activate</Button>
    </Popover>
  )
}
```
:::

### Nested operation

Of course, you can nest other operations. It's more light-weight than using a dialog.

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
        <p>Are you sure to delete this？</p>
        <div style={{textAlign: 'right', margin: 0}}>
          <Button size="mini" type="text" onClick={this.onDismiss.bind(this)}>Cancel</Button>
          <Button type="primary" size="mini" onClick={this.onDismiss.bind(this)}>Confirm</Button>
        </div>
      </div>
    )}>
      <Button>Delete</Button>
    </Popover>
  )
}
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| trigger | how the popover is triggered | string  | click/focus/hover/manual |    click    |
|  title              | popover title | string | — | — |
|  content        |  popover content, can be replaced with a default `slot`    | string            | — | — |
|  width        |  popover width  | string, number            | — | Min width 150px |
|  placement        |  popover placement  | string | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  disabled       |  whether Popover is disabled  | boolean    | — |  false |
|  value(v-model)        |  whether popover is visible  | Boolean           | — |  false |
|  offset        |  popover offset  | number           | — |  0 |
|  transition     |  popover transition animation      | string             | — | fade-in-linear |
|  visibleArrow   |  whether a tooltip arrow is displayed or not. | boolean | — | true |
|  options        | parameters for [popper.js](https://popper.js.org/documentation.html) | object            | please refer to [popper.js](https://popper.js.org/documentation.html) | `{ boundariesElement: 'body', gpuAcceleration: false }` |
|  popperClass        |  custom class name for popover | string | — | — |
