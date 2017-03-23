## Card 卡片
将信息聚合在卡片容器中展示。

### 基础用法

包含标题，内容和操作。

:::demo Card 组件包括`header`和`body`部分，`header`部分需要有显式具名 slot 分发，同时也是可选的。
```js
render() {
  return (
    <Card
      className="box-card"
      header={
        <div className="clearfix">
          <span style={{ "lineHeight": "36px" }}>卡片名称</span>
          <span style={{ "float": "right" }}>
            <Button type="primary">操作按钮</Button>
          </span>
        </div>
      }
    >
      <div className="text item">列表内容 1</div>
      <div className="text item">列表内容 2</div>
      <div className="text item">列表内容 3</div>
      <div className="text item">列表内容 4</div>
    </Card>
  )
}
```
:::

### 简单卡片

卡片可以只有内容区域。

:::demo
```js
render() {
  return (
    <Card className="box-card">
      <div className="text item">列表内容 0</div>
      <div className="text item">列表内容 1</div>
      <div className="text item">列表内容 2</div>
      <div className="text item">列表内容 3</div>
    </Card>
  )
}
```
:::

### 带图片

可配置定义更丰富的内容展示。

:::demo 配置`body-style`属性来自定义`body`部分的`style`，我们还使用了布局组件。
```js
render() {
  return (
    <Layout.Row>
      <Layout.Col span={ 8 } offset={ 0 }>
        <Card bodyStyle={{ padding: 0 }}>
          <img src={this.props.imgSrc} className="image" />
          <div style={{ padding: 14 }}>
            <span>好吃的汉堡</span>
            <div className="bottom clearfix">
              <time className="time">2016-10-21 16:19</time>
              <Button type="text" className="button">操作按钮</Button>
            </div>
          </div>
        </Card>
      </Layout.Col>
      <Layout.Col span={ 8 } offset={ 2 }>
        <Card bodyStyle={{ padding: 0 }}>
          <img src={this.props.imgSrc} className="image" />
          <div style={{ padding: 14 }}>
            <span>好吃的汉堡</span>
            <div className="bottom clearfix">
              <time className="time">2016-10-21 16:19</time>
              <Button type="text" className="button">操作按钮</Button>
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
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header | 设置 header，也可以通过 `slot#header` 传入 DOM | string| — | — |
| bodyStyle | 设置 body 的样式| object| — | { padding: '20px' } |
