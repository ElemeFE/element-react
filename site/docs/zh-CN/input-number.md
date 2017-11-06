## Input Number 数字输入框

仅允许输入标准的数字值，可定义范围

### 基础用法

:::demo 要使用它，只需要在`InputNumber`元素中使用`value`绑定变量即可，`defaultValue`为默认值。
```js
constructor(props) {
  super(props);

  this.state = {
    value: 0
  }
}

onChange(value) {

}

render() {
  return (
    <InputNumber defaultValue={this.state.value} onChange={this.onChange.bind(this)} min="1" max="10"></InputNumber>
  )
}
```
:::

### 禁用状态

:::demo `disabled`属性接受一个`Boolean`，设置为`true`即可禁用整个组件，如果你只需要控制数值在某一范围内，可以设置`min`属性和`max`属性，不设置`min`和`max`时，最小值为 0。

```js
constructor(props) {
  super(props);

  this.state = {
    value: 1
  }
}

onChange(value) {

}

render() {
  return (
    <InputNumber defaultValue={this.state.value} onChange={this.onChange.bind(this)} disabled={true}></InputNumber>
  )
}
```
:::

### 步数

允许定义递增递减的步数控制

:::demo 设置`step`属性可以控制步长，接受一个`Number`。

```js
constructor(props) {
  super(props);

  this.state = {
    value: 5
  }
}

onChange(value) {

}

render() {
  return (
    <InputNumber defaultValue={this.state.value} onChange={this.onChange.bind(this)} step="2"></InputNumber>
  )
}
```
:::

### 尺寸

额外提供了 `large`、`small` 两种尺寸的数字输入框

:::demo

```js
constructor(props) {
  super(props);

  this.state = {
    num4: 1,
    num5: 1,
    num6: 1
  }
}

render() {
  return (
    <div>
      <InputNumber size="large" defaultValue={this.state.num4}></InputNumber>
      <InputNumber defaultValue={this.state.num5}></InputNumber>
      <InputNumber size="small" defaultValue={this.state.num6}></InputNumber>
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|----------|-------------- |----------|--------------------------------  |-------- |
| defaultValue    | 默认值         | number | — | — |
| value    | 绑定值         | number | — | — |
| min      | 设置计数器允许的最小值 | number | — | 0 |
| max      | 设置计数器允许的最大值 | number | — | Infinity |
| step     | 计数器步长           | number   | — | 1 |
| size     | 计数器尺寸           | string   | large, small | — |
| disabled | 是否禁用计数器        | boolean | — | false |
| controls | 是否使用控制按钮        | boolean | — | true |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| onChange | 绑定值被改变时触发 | 最后变更的值 |
