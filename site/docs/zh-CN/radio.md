## Radio 单选框

在一组备选项中进行单选

### 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

:::demo 要使用 Radio 组件，只需要设置`v-model`绑定变量，选中意味着变量的值为相应 Radio `label`属性的值，`label`可以是`String`或者`Number`。

```js
constructor(props) {
  super(props);

  this.state = {
    value: 1
  }
}

onChange(value, event) {
  this.setState({
    value: event.target.checked && value
  });
}

render() {
  return (
    <div>
      <Radio value="1" checked={this.state.value === '1'} onChange={this.onChange.bind(this, '1')}>备选项</Radio>
      <Radio value="2" checked={this.state.value === '2'} onChange={this.onChange.bind(this, '2')}>备选项</Radio>
    </div>
  )
}
```
:::

### 禁用状态

单选框不可用的状态。

:::demo 注意：请牢记，选中的条件是绑定的变量值等于`label`中的值。只要在`el-radio`元素中设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用。

```js
render() {
  return (
    <div>
      <Radio value="1" disabled={true}>备选项</Radio>
      <Radio value="2" disabled={true}>备选项</Radio>
    </div>
  )
}
```
:::

### 单选框组

适用于在多个互斥的选项中选择的场景

:::demo 结合`el-radio-group`元素和子元素`el-radio`可以实现单选组，在`el-radio-group`中绑定`v-model`，在`el-radio`中设置好`label`即可，无需再给每一个`el-radio`绑定变量，另外，还提供了`change`事件来响应变化，它会传入一个参数`value`。

```js
constructor(props) {
  super(props);

  this.state = {
    value: 3
  }
}

onChange(event) {
  this.setState({
    value: event.target.value
  });
}

render() {
  return (
    <Radio.Group value={this.state.value} onChange={this.onChange.bind(this)}>
      <Radio value="3">备选项</Radio>
      <Radio value="6">备选项</Radio>
      <Radio value="9">备选项</Radio>
    </Radio.Group>
  )
}
```
:::

### 按钮样式

按钮样式的单选组合。

:::demo 只需要把`el-radio`元素换成`el-radio-button`元素即可，此外，Element 还提供了`size`属性给按钮组，支持`large`和`small`两种（如果不设定为默认）。

```js
constructor(props) {
  super(props);

  this.state = {
    value: '北京'
  }
}

onChange(event) {
  this.setState({
    value: event.target.value
  });
}

render() {
  return (
    <Radio.Group value={this.state.value} onChange={this.onChange.bind(this)}>
      <Radio.Button value="上海" />
      <Radio.Button value="北京" />
      <Radio.Button value="广州" disabled={true} />
      <Radio.Button value="深圳" />
    </Radio.Group>
  )
}
```
:::

### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value   | string,number    |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |

### Radio-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | Radio 按钮组尺寸   | string  | large, small  |    —     |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value  | string,number  |        —       |     —    |
| disabled  | 是否禁用    | boolean   | — | false   |
| fill  | 按钮激活时的填充色和边框色    | string   | — | #20a0ff   |
| textColor  | 按钮激活时的文本颜色    | string   | — | #ffffff   |
