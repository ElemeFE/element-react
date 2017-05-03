## InputNumber

Input numerical values with a customizable range.

### Basic usage

:::demo Bind a variable to `value` in `InputNumber` element and you can set default value with `defaultValue`.

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
    <InputNumber defaultValue={this.state.value} onChange={this.onChange.bind(this)} min="1" max="10"></InputNumber>
  )
}
```
:::

### Disabled

:::demo The `disabled` attribute accepts a `boolean`, and if the value is `true`, the component is disabled. If you just need to control the value within a range, you can add `min` attribute to set the minimum value and `max` to set the maximum value. By default, the minimum value is `0`.

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

### Steps

Allows you to define incremental steps.

:::demo Add `step` attribute to set the step.

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

### Size

Additional `large` and `small` sizes of the input box are available

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

| Attribute      | Description          | Type      | Accepted Values       | Default  |
|----| ----| ---| ----| -----|
|value | binding value| number | — | — |
|min | the minimum allowed value | number | — | 0 |
|max | the maximum allowed value | number | — | `Infinity` |
|step | incremental step | number | — | 1 |
|size | size of the component | string | large/small| — |
|disabled| whether the component is disabled | boolean | — | false |
|controls| whether to enable the control buttons | boolean | — | true |

### Events

| Event Name | Description | Parameters |
|----| ---- | -----|
|change | triggers when the value changes | value after change |
