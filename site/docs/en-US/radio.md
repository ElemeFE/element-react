## Radio

Single selection among multiple options.

### Basic usage

Radio should not have too many options. Otherwise, use the Select component instead.

:::demo Creating a radio component is easy, you just need to bind a variable to Radio's `v-model`. It equals to the value of `label` of the chosen radio. The type of `label` is `String` or `Number`.
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
      <Radio value="1" checked={this.state.value === 1} onChange={this.onChange.bind(this, 1)}>Option A</Radio>
      <Radio value="2" checked={this.state.value === 2} onChange={this.onChange.bind(this, 2)}>Option B</Radio>
    </div>
  )
}
```
:::

### Disabled

`disabled` attribute is used to disable the radio.

:::demo You just need to add the `disabled` attribute.
```js
render() {
  return (
    <div>
      <Radio value="1" disabled={true}>Option A</Radio>
      <Radio value="2" disabled={true}>Option B</Radio>
    </div>
  )
}
```
:::

### Radio button group

Suitable for choosing from some mutually exclusive options.

:::demo Combine `<el-radio-group>` with `<el-radio>` to display a radio group. Bind a variable with `v-model` of `<el-radio-group>` element and set label value in `<el-radio>`. It also provides `change` event with the current value as its parameter.

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
      <Radio value="3">Option A</Radio>
      <Radio value="6">Option B</Radio>
      <Radio value="9">Option C</Radio>
    </Radio.Group>
  )
}
```
:::

### Button style

Radio with button styles.

:::demo You just need to change `<el-radio>` element into `<el-radio-button>` element. We also provide `size` attribute for these buttons: `large` and `small`.
```js
constructor(props) {
  super(props);

  this.state = {
    radio3: 'New York',
    radio4: 'New York',
    radio5: 'New York'
  }
}

onChange(key, event) {
  this.setState({
    [key]: event.target.value
  });
}

render() {
  return (
    <div>
      <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
        <Radio.Button value="New York" />
        <Radio.Button value="Washington" />
        <Radio.Button value="Los Angeles" />
        <Radio.Button value="Chicago" />
      </Radio.Group>
      <Radio.Group value={this.state.radio4} onChange={this.onChange.bind(this, 'radio4')}>
        <Radio.Button value="New York" />
        <Radio.Button value="Washington" />
        <Radio.Button value="Los Angeles" disabled={true} />
        <Radio.Button value="Chicago" />
      </Radio.Group>
      <Radio.Group value={this.state.radio5} disabled={true}>
        <Radio.Button value="New York" />
        <Radio.Button value="Washington" />
        <Radio.Button value="Los Angeles" />
        <Radio.Button value="Chicago" />
      </Radio.Group>
    </div>
  )
}
```
:::

### Radio Attributes

 Attribute      | Description          | Type      | Accepted Values       | Default
---- | ---- | ---- | ---- | ----
label | the value of radio | string/number/boolean | — | —
disabled | whether radio is disabled | boolean | — | false
name | native 'name' attribute | string    |      —         |     —

### Radio-group Attributes

 Attribute      | Description          | Type      | Accepted Values       | Default
---- | ---- | ---- | ---- | ----
size | the size of radio buttons | string | large/small | —
fill  | border and background color when button is active | string   | — | #20a0ff   |
textColor | font color when button is active | string   | — | #ffffff   |

### Radio-group Events

| Event Name | Description | Parameters |
--- | --- | ---
onChange | triggers when the bound value changes | the label value of the chosen radio

### Radio-button Attributes

 Attribute      | Description          | Type      | Accepted Values       | Default
---- | ---- | ---- | ---- | ----
label | the value of radio | string/number | — | —
disabled | whether radio is disabled | boolean | — | false
