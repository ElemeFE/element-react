## Slider

Drag the slider within a fixed range.

### Basic usage

The current value is displayed when the slider is being dragged.

:::demo Customize the initial value of the slider by setting the binding value.

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
        <span className="demonstration">Default value</span>
        <Slider value={this.state.value1} />
      </div>
      <div className="block">
        <span className="demonstration">Customized initial value</span>
        <Slider value={this.state.value2} />
      </div>
      <div className="block">
        <span className="demonstration">Hide Tooltip</span>
        <Slider value={this.state.value3} showTooltip={false} />
      </div>
      <div className="block">
        <span className="demonstration">Format Tooltip</span>
        <Slider value={this.state.value4} formatTooltip={this.formatTooltip.bind(this)} />
      </div>
      <div className="block">
        <span className="demonstration">Disabled</span>
        <Slider value={this.state.value3} disabled={true} />
      </div>
    </div>
  )
}
```
:::

### Discrete values

The options can be discrete.

:::demo Set step size with the `step` attribute. You can display breakpoints by setting the `showStops` attribute.

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
        <span className="demonstration">Breakpoints not displayed</span>
        <Slider value={this.state.value4} step="10" />
      </div>
      <div className="block">
        <span className="demonstration">Breakpoints displayed</span>
        <Slider value={this.state.value5} step="10" showStops={true} />
      </div>
    </div>
  )
}
```
:::

### Slider with input box

Set value via a input box.

:::demo Set the `showInput` attribute to display an input box on the right.

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

### Range selection

Selecting a range of values is supported.

:::demo Setting the `range` attribute activates range mode, where the binding value is an array made up of two boundary values.
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

### Vertical mode

:::demo Setting the `vertical` attribute to `true` enables vertical mode. In vertical mode, the `height` attribute is required.
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

## Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| min | minimum value | number | — | 0 |
| max | maximum value | number | — | 100 |
| disabled | whether Slider is disabled | boolean | — | false |
| step | step size | number | — | 1 |
| show-input | whether to display an input box, works when `range` is false | boolean | — | false |
| show-input-controls | whether to display control buttons when `show-input` is true | boolean | — | true |
| show-stops | whether to display breakpoints | boolean | — | false |
| show-tooltip | whether to display tooltip value | boolean | — | true |
| range | whether to select a range | boolean | — | false |

## Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| change | triggers when the value changes (if the mouse is being dragged, this event only fires when the mouse is released) | value after changing |
