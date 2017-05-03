## Badge

A number or status mark on buttons and icons.

### Basic usage

Displays the amount of new messages.

:::demo The amount is defined with `value` which accepts `Number` or `String`.

```js
render() {
  return (
    <div>
      <Badge value={ 12 }>
        <Button size="small">Comments</Button>
      </Badge>
      <Badge value={ 3 }>
        <Button size="small">Replies</Button>
      </Badge>
      <Dropdown trigger="click" menu={(
        <Dropdown.Menu>
          <Dropdown.Item className="clearfix">
            <span>Comments</span><Badge className="mark" value={ 12 } />
          </Dropdown.Item>
          <Dropdown.Item className="clearfix">
            <span>Replies</span><Badge className="mark" value={ 3 } />
          </Dropdown.Item>
        </Dropdown.Menu>
        )}
      >
        <span className="el-dropdown-link">
          Click me<i className="el-icon-caret-bottom el-icon--right"></i>
        </span>
      </Dropdown>
    </div>
  )
}
```
:::

### Max value

You can customize the max value.

::: demo The max value is defined by property `max` which is a `Number`. Note that it only works when `value` is also a `Number`.

```js
render() {
  return (
    <div>
      <Badge value={ 200 } max={ 99 }>
        <Button size="small">Comments</Button>
      </Badge>
      <Badge value={ 100 } max={ 10 }>
        <Button size="small">Replies</Button>
      </Badge>
    </div>
  )
}
```
:::

### Customizations

Displays text content other than numbers.

:::demo When `value` is a `String`, it can display customized text.

```js
render() {
  return (
    <div>
      <Badge value={ 'new' }>
        <Button size="small">Comments</Button>
      </Badge>
      <Badge value={ 'hot' }>
        <Button size="small">Replies</Button>
      </Badge>
    </div>
  )
}
```
:::

### Little red dot

Use a red dot to mark content that needs to be noticed.

:::demo Use the attribute `isDot`. It is a `Boolean`.

```js
render() {
  return (
    <div>
      <Badge isDot>
        Query
      </Badge>
      <Badge isDot>
        <Button className="share-button" icon="share" type="primary"></Button>
      </Badge>
    </div>
  )
}
```
:::

### Attributes
| Attribute          | Description            | Type            | Accepted Values                 | Default   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value          | display value      | string, number          |          —             |    —     |
| max          |  maximum value, shows '{max}+' when exceeded. Only works if `value` is a `Number`   | number  |         —              |     —    |
| isDot       | if a little dot is displayed   | boolean  |  —  |  false |
| hidden | hidden badge | boolean | — | false |
