## Slider 滑块

通过拖动滑块在一个固定区间内进行选择

### 基础用法

在拖动滑块时，显示当前值

:::demo 通过设置绑定值自定义滑块的初始值
```js
constructor(props) {
  super(props);

  this.state = {
    value1: 0,
    value2: 50,
    value3: 36,
    value4: 48,
    value5: 42
  }
}

formatTooltip(val) {
  return val / 100;
}

render() {
  return (
    <div>
      <div className="block">
        <span className="demonstration">默认</span>
        <Slider value={this.state.value1} />
      </div>
      <div className="block">
        <span className="demonstration">自定义初始值</span>
        <Slider value={this.state.value2} />
      </div>
      <div className="block">
        <span className="demonstration">隐藏 Tooltip</span>
        <Slider value={this.state.value3} showTooltip={false} />
      </div>
      <div className="block">
        <span className="demonstration">格式化 Tooltip</span>
        <Slider value={this.state.value4} formatTooltip={this.formatTooltip.bind(this)} />
      </div>
      <div className="block">
        <span className="demonstration">禁用</span>
        <Slider value={this.state.value3} disabled={true} />
      </div>
    </div>
  )
}
```
:::

### 离散值

选项可以是离散的

:::demo 改变`step`的值可以改变步长，通过设置`showStep`属性可以显示间断点
```js
constructor(props) {
  super(props);

  this.state = {
    value4: 0,
    value5: 0
  }
}

render() {
  return (
    <div>
      <div className="block">
        <span className="demonstration">不显示间断点</span>
        <Slider value={this.state.value4} step="10" />
      </div>
      <div className="block">
        <span className="demonstration">显示间断点</span>
        <Slider value={this.state.value5} step="10" showStops={true} />
      </div>
    </div>
  )
}
```
:::

### 带有输入框

通过输入框设置精确数值

:::demo 设置`showInput`属性会在右侧显示一个输入框
```js
constructor(props) {
  super(props);

  this.state = {
    value: 0
  }
}

render() {
  return (
    <div className="block">
      <Slider value={this.state.value} showInput={true} />
    </div>
  )
}
```
:::

### 范围选择

支持选择某一数值范围

:::demo 设置`range`即可开启范围选择，此时绑定值是一个数组，其元素分别为最小边界值和最大边界值
```js
constructor(props) {
  super(props);

  this.state = {
    value: [4, 8]
  }
}

render() {
  return (
    <div className="block">
      <Slider value={this.state.value} max={10} range={true} showStops={true} />
    </div>
  )
}
```
:::

### 竖向模式

:::demo 设置`vertical`可使 Slider 变成竖向模式，此时必须设置高度`height`属性
```js
constructor(props) {
  super(props);

  this.state = {
    value: 0
  }
}

render() {
  return (
    <div className="block">
      <Slider value={this.state.value} vertical={true} height="200px" />
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| min | 最小值 | number | — | 0 |
| max | 最大值 | number | — | 100 |
| disabled | 是否禁用 | boolean | — | false |
| step | 步长 | number | — | 1 |
| showInput | 是否显示输入框，仅在非范围选择时有效 | boolean | — | false |
| showInputControls | 在显示输入框的情况下，是否显示输入框的控制按钮 | boolean | — | true|
| showStops | 是否显示间断点 | boolean | — | false |
| range | 是否为范围选择 | boolean | — | false |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange | 值改变时触发 | 改变后的值 |
