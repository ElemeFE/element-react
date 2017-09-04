## Dropdown
Toggleable menu for displaying lists of links and actions.

### Basic usage
Hover on the dropdown menu to unfold it for more actions.

:::demo By default, dropdown list shows when you hover on the triggering element without having to click it.

```js
render() {
  return (
    <Dropdown menu={(
      <Dropdown.Menu>
        <Dropdown.Item>Action 1</Dropdown.Item>
        <Dropdown.Item>Action 2</Dropdown.Item>
        <Dropdown.Item>Action 3</Dropdown.Item>
        <Dropdown.Item disabled>Action 4</Dropdown.Item>
        <Dropdown.Item divided>Action 5</Dropdown.Item>
      </Dropdown.Menu>
      )}
    >
      <span className="el-dropdown-link">
        Dropdown List<i className="el-icon-caret-bottom el-icon--right"></i>
      </span>
    </Dropdown>
  )
}
```

:::

### Triggering element

Use the button to trigger the dropdown list.

:::demo Use `splitButton` to split the triggering element into a button group with the left button being a normal button and right one the actual triggering target. If you wanna insert a separator line between item three and item four, just add a class `divider` to item four.
```js
render() {
  return (
    <div>
      <Dropdown menu={(
        <Dropdown.Menu>
          <Dropdown.Item>Action 1</Dropdown.Item>
          <Dropdown.Item>Action 2</Dropdown.Item>
          <Dropdown.Item>Action 3</Dropdown.Item>
          <Dropdown.Item>Action 4</Dropdown.Item>
          <Dropdown.Item>Action 5</Dropdown.Item>
        </Dropdown.Menu>
      )}>
        <Button type="primary">
          Dropdown List<i className="el-icon-caret-bottom el-icon--right"></i>
        </Button>
      </Dropdown>
      <Dropdown splitButton={true} type="primary" onClick={this.handleClick.bind(this)} menu={(
        <Dropdown.Menu>
          <Dropdown.Item>Action 1</Dropdown.Item>
          <Dropdown.Item>Action 2</Dropdown.Item>
          <Dropdown.Item>Action 3</Dropdown.Item>
          <Dropdown.Item>Action 4</Dropdown.Item>
          <Dropdown.Item>Action 5</Dropdown.Item>
        </Dropdown.Menu>
      )}>Dropdown List</Dropdown>
    </div>
  )
}

handleClick() {
  alert('button click');
}
```
:::

### How to trigger

Click the triggering element or hover on it.

:::demo Use the attribute `trigger`. By default, it is `hover`.

```js
render() {
  return (
    <Layout.Row className="block-col-2">
      <Layout.Col span="12">
        <span className="demonstration">Hover to trigger</span>
        <Dropdown menu={(
          <Dropdown.Menu>
            <Dropdown.Item>Action 1</Dropdown.Item>
            <Dropdown.Item>Action 2</Dropdown.Item>
            <Dropdown.Item>Action 3</Dropdown.Item>
            <Dropdown.Item>Action 4</Dropdown.Item>
            <Dropdown.Item>Action 5</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <span className="el-dropdown-link">
            Dropdown List<i className="el-icon-caret-bottom el-icon--right"></i>
          </span>
        </Dropdown>
      </Layout.Col>
      <Layout.Col span="12">
        <span className="demonstration">Click to trigger</span>
        <Dropdown trigger="click" menu={(
          <Dropdown.Menu>
            <Dropdown.Item>Action 1</Dropdown.Item>
            <Dropdown.Item>Action 2</Dropdown.Item>
            <Dropdown.Item>Action 3</Dropdown.Item>
            <Dropdown.Item>Action 4</Dropdown.Item>
            <Dropdown.Item>Action 5</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <span className="el-dropdown-link">
            Dropdown List<i className="el-icon-caret-bottom el-icon--right"></i>
          </span>
        </Dropdown>
      </Layout.Col>
    </Layout.Row>
  )
}
```
:::

### Menu hiding behavior

Use `hide-on-click` to define if menu closes on clicking.

:::demo By default menu will close when you click on menu items, and it can be turned off by setting hideOnClick to false.
```js
render() {
  return (
    <Dropdown hideOnClick={false} menu={(
      <Dropdown.Menu>
        <Dropdown.Item>Action 1</Dropdown.Item>
        <Dropdown.Item>Action 2</Dropdown.Item>
        <Dropdown.Item>Action 3</Dropdown.Item>
        <Dropdown.Item disabled>Action 4</Dropdown.Item>
        <Dropdown.Item divided>Action 5</Dropdown.Item>
      </Dropdown.Menu>
    )}>
      <span className="el-dropdown-link">
        Dropdown List<i className="el-icon-caret-bottom el-icon--right"></i>
      </span>
    </Dropdown>
  )
}
```
:::

### Command event

Clicking each dropdown item fires an event whose parameter is assigned by each item.

:::demo
```js
handleCommand(command) {
  Message('click on item ' + command);
}

render() {
  return (
    <Dropdown onCommand={this.handleCommand.bind(this)} menu={(
      <Dropdown.Menu>
        <Dropdown.Item command="a">Action 1</Dropdown.Item>
        <Dropdown.Item command="b">Action 2</Dropdown.Item>
        <Dropdown.Item command="c">Action 3</Dropdown.Item>
        <Dropdown.Item command="d" disabled>Action 4</Dropdown.Item>
        <Dropdown.Item command="e" divided>Action 5</Dropdown.Item>
      </Dropdown.Menu>
    )}>
      <span className="el-dropdown-link">
        Dropdown List<i className="el-icon-caret-bottom el-icon--right"></i>
      </span>
    </Dropdown>
  )
}
```
:::


### Dropdown Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type          | menu button type, refer to `Button` Component, only works when `splitButton` is true  | string  |          —             |    —     |
| size          | menu button size, refer to `Button` Component, only works when `splitButton` is true  | string  |          —             |    —     |
| splitButton | whether a button group is displayed | boolean         |     —       | false   |
| size          | component size, refer to `Button` component     | string          | large, small, mini  |  —  |
| menuAlign    | horizontal alignment     | string          | start/end  | end |
| trigger       | how to trigger     | string  |    hover/click  |  hover |
| hideOnClick | whether to hide menu after clicking menu-item     | boolean          | — | true |

### Dropdown Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| onClick | if `splitButton` is `true`, triggers when left button is clicked | — |
| onCommand | triggers when a dropdown item is clicked | the command dispatched from the dropdown item |
| onVisibleChange | triggers when the dropdown appears/disappears | true when it appears, and false otherwise |

### Dropdown Menu Item Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| command       | a command to be dispatched to Dropdown's `command` callback | string  |          —             |    —     |
| disabled      | whether the item is disabled  | boolean  |          —             |    false     |
| divided       | whether a divider is displayed  | boolean  |          —             |    false     |
