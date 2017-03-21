## Icon

Element provides a set of common icons.

### Basic usage

Just assign the class name to `el-icon-iconName`.

:::demo

```js
render() {
  return (
    <div>
      <i className="el-icon-edit"></i>
      <i className="el-icon-share"></i>
      <i className="el-icon-delete"></i>
      <Button type="primary" icon="search">Search</Button>
    </div>
  )
}
```
:::

### Icons

:::demo
```js
render() {
  return (
    <ul className="icon-list">
      {this.props.iconList.map((v, i) =>
        <li key={i}><span><Icon name={v} />{v}</span></li>
      )}
    </ul>
  )
}
```
:::
