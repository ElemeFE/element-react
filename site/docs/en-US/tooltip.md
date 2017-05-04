## Tooltip

Display prompt information for mouse hover.

### Basic Usage

Tooltip has 9 placements.

:::demo Use attribute `content` to set the display content when hover. The attribute `placement` determines the position of the tooltip. Its value is `[orientation]-[alignment]` with four orientations `top`, `left`, `right`, `bottom` and three alignments `start`, `end`, `null`, and the default alignment is null. Take `placement="left-end"` for example, Tooltip will display on the left of the element which you are hovering and the bottom of the tooltip aligns with the bottom of the element.

```js
render() {
  return (
    <div className="box">
      <div className="top">
        <Tooltip className="item" effect="dark" content="Top Left prompts info" placement="top-start">
          <Button>top-start</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Top Center prompts info" placement="top">
          <Button>top</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Top Right prompts info" placement="top-end">
          <Button>top-end</Button>
        </Tooltip>
      </div>
      <div className="left">
        <Tooltip className="item" effect="dark" content="Left Top prompts info" placement="left-start">
          <Button>left-start</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Left Center prompts info" placement="left">
          <Button>left</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Left Bottom prompts info" placement="left-end">
          <Button>left-end</Button>
        </Tooltip>
      </div>

      <div className="right">
        <Tooltip className="item" effect="dark" content="Right Top prompts info" placement="right-start">
          <Button>right-start</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Right Center prompts info" placement="right">
          <Button>right</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Right Bottom prompts info" placement="right-end">
          <Button>right-end</Button>
        </Tooltip>
      </div>
      <div className="bottom">
        <Tooltip className="item" effect="dark" content="Bottom Left prompts info" placement="bottom-start">
          <Button>bottom-start</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Bottom Center prompts info" placement="bottom">
          <Button>bottom</Button>
        </Tooltip>
        <Tooltip className="item" effect="dark" content="Bottom Right prompts info" placement="bottom-end">
          <Button>bottom-end</Button>
        </Tooltip>
      </div>
    </div>
  )
}
```
:::

### Theme

Tooltip has two themes:`dark`和`light`。


:::demo Set `effect` to modify theme, and the default value is `dark`.
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

### More Content

Display multiple lines of text and set their format.

:::demo `content` can also be `ReactElement`。
```js
render() {
  return (
    <Tooltip
      placement="top"
      content={
        <div>multiple lines<br/>second line</div>
      }
    >
      <Button>Top center</Button>
    </Tooltip>
  )
}
```
:::

### Advanced usage

In addition to basic usages, there are some attributes that allow you to customize your own: `transition` attribute allows you to customize the animation in which the tooltip shows or hides, and the default value is `fade-in-linear`. `disabled` attribute allows you to disable `tooltip`. You just need set it to `true`.

:::demo By the state to control whether to display
```js
constructor(props){
  super(props);

  this.state = {
    disabled: false
  }
}

render() {
  return (
    <Tooltip disabled={ this.state.disabled } content="click to close tooltip function" placement="bottom" effect="light">
      <Button onClick={ e => this.setState({ disabled: true}) }>{`click to ${this.state.disabled ? 'active' : 'close' } tooltip function`}</Button>
    </Tooltip>
  )
}
```
:::

### Attributes
| Attribute               | Description                                | Type             | Accepted Values      | Default |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  effect        |  Tooltip theme  | String            | `dark`, `light`  | dark  |
|  content        |  display content  | String/Node            | — | — |
|  placement        |  position of Tooltip  | String           |  `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` |  bottom |
|  visible        |  visibility of Tooltip  | Boolean           | — |  false |
|  disabled       |  whether Tooltip is disabled  | Boolean           | — |  false |
|  transition     |  animation name      | String             | — | `fade-in-linear` |
|  visibleArrow   |  whether an arrow is displayed | Boolean | — | true |
| openDelay | delay of appearance, in millisecond | Number | — | 0 |
| manual | whether to control Tooltip manually. `mouseenter` and `mouseleave` won't have effects if set to `true` | Boolean | true,false| false |
