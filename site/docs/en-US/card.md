## Card
Integrate information in a card container.

### Basic usage

Card includes title, content and operations.

:::demo Card is made up of `header` and `body`. `header` is optional, and its content distribution depends on a named slot.
```js
render() {
  return (
    <Card
      className="box-card"
      header={
        <div className="clearfix">
          <span style={{ "lineHeight": "36px" }}>Card Name</span>
          <span style={{ "float": "right" }}>
            <Button type="primary">Operation Button</Button>
          </span>
        </div>
      }
    >
      <div className="text item">List item 1</div>
      <div className="text item">List item 2</div>
      <div className="text item">List item 3</div>
      <div className="text item">List item 4</div>
    </Card>
  )
}
```
:::

### Simple card

The header part can be omitted.

:::demo
```js
render() {
  return (
    <Card className="box-card">
      <div className="text item">List item 1</div>
      <div className="text item">List item 2</div>
      <div className="text item">List item 3</div>
      <div className="text item">List item 4</div>
    </Card>
  )
}
```
:::

### With images

Display richer content by adding some configs.

:::demo The `body-style` attribute defines CSS style of custom `body`. This example also uses `el-col` for layout.
```js
render() {
  return (
    <Layout.Row>
      <Layout.Col span={ 8 } offset={ 0 }>
        <Card bodyStyle={{ padding: 0 }}>
          <img src={this.props.imgSrc} className="image" />
          <div style={{ padding: 14 }}>
            <span>Yummy hamburger</span>
            <div className="bottom clearfix">
              <time className="time">2016-10-21 16:19</time>
              <Button type="text" className="button">Operating button</Button>
            </div>
          </div>
        </Card>
      </Layout.Col>
      <Layout.Col span={ 8 } offset={ 2 }>
        <Card bodyStyle={{ padding: 0 }}>
          <img src={this.props.imgSrc} className="image" />
          <div style={{ padding: 14 }}>
            <span>Yummy hamburger</span>
            <div className="bottom clearfix">
              <time className="time">2016-10-21 16:19</time>
              <Button type="text" className="button">Operating button</Button>
            </div>
          </div>
        </Card>
      </Layout.Col>
    </Layout.Row>
  )
}
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| header | Title of the card. Also accepts a DOM passed by `slot#header` | string| — | — |
| bodyStyle | CSS style of body | object| — | { padding: '20px' } |
