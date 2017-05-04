## Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

### 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

:::demo 使用`content`属性来决定`hover`时的提示信息。由`placement`属性决定展示效果：`placement`属性值为：`方向-对齐位置`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。如`placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

```js
render() {
  return (
    <div className="box">
      <div className="top">
        <Tooltip className="item" effect="dark" content="Top Left 提示文字" placement="top-start">
          <Button>上左</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Top Center 提示文字" placement="top">
          <Button>上边</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Top Right 提示文字" placement="top-end">
          <Button>上右</Button>
        </Tooltip>
      </div>
      <div className="left">
        <Tooltip className="item" effect="dark" content="Left Top 提示文字" placement="left-start">
          <Button>左上</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Left Center 提示文字" placement="left">
          <Button>左边</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
          <Button>左下</Button>
        </Tooltip>
      </div>

      <div className="right">
        <Tooltip className="item" effect="dark" content="Right Top 提示文字" placement="right-start">
          <Button>右上</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Right Center 提示文字" placement="right">
          <Button>右边</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
          <Button>右下</Button>
        </Tooltip>
      </div>
      <div className="bottom">
        <Tooltip className="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
          <Button>下左</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
          <Button>下边</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Bottom Right 提示文字" placement="bottom-end">
          <Button>下右</Button>
        </Tooltip>
      </div>
    </div>
  )
}
```
:::

### 主题

Tooltip 组件提供了两个不同的主题：`dark`和`light`。


:::demo 通过设置`effect`属性来改变主题，默认为`dark`。
```js
render() {
  return (
    <div>
      <Tooltip content="Top center" placement="top">
        <Button>Dark</Button>
      </Tooltip>
      <Tooltip content="Bottom center" placement="bottom" effect="light">
        <Button>Light</Button>
      </Tooltip>
    </div>
  )
}
```
:::

### 更多 Content

展示多行文本或者是设置文本内容的格式

:::demo `content`属性也可以是`ReactElement`。
```js
render() {
  return (
    <Tooltip
      placement="top"
      content={
        <div>多行信息<br/>第二行信息</div>
      }
    >
      <Button>Top center</Button>
    </Tooltip>
  )
}
```
:::

### 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：`transition`属性可以定制显隐的动画效果，默认为`fade-in-linear`。如果需要关闭`tooltip`功能，`disabled`属性可以满足这个需求，它接受一个`Boolean`，设置为`true`即可。

:::demo 通过 state 中的 disabled 控制是否触发 tooltip
```js
constructor(props){
  super(props);

  this.state = {
    disabled: false
  }
}

render() {
  return (
    <Tooltip disabled={ this.state.disabled } content="点击关闭 tooltip 功能" placement="bottom" effect="light">
      <Button onClick={ e => this.setState({ disabled: true}) }>点击关闭 tooltip 功能</Button>
    </Tooltip>
  )
}
```
:::

### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  effect        |  默认提供的主题  | String            | `dark`, `light`  | dark  |
|  content        |  显示的内容  | String/Node            | — | — |
|  placement        |  Tooltip 的出现位置  | String           |  `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` |  bottom |
|  visible        |  状态是否可见  | Boolean           | — |  false |
|  disabled       |  Tooltip 是否可用  | Boolean           | — |  false |
|  transition     |  定义渐变动画      | String             | — | `fade-in-linear` |
|  visibleArrow   |  是否显示 Tooltip 箭头 | Boolean | — | true |
| openDelay | 延迟出现，单位毫秒 | Number | — | 0 |
| manual | 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效 | Boolean | true,false| false |
