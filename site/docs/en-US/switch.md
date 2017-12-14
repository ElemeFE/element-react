## Switch

Switch is used for switching between two opposing states.

### Basic usage

:::demo Bind `value` to a `Boolean` typed variable. You can add `onText` or `offText` attribute to show texts when the component is `on` or `off`, respectively. The `onColor` and `offColor` attribute decides the background color in two states.

```js
render() {
  return (
    <div>
      <Switch
        value={true}
        onText=""
        offText="">
      </Switch>
      <Switch
        value={true}
        onColor="#13ce66"
        offColor="#ff4949">
      </Switch>
    </div>
  )
}
```
:::

### Extended value types

:::demo You can set `onValue` and `offValue` attributes. They both receive a `Boolean`, `String` or `Number` typed value.

```js
constructor(props) {
  super(props);

  this.state = {
    value: 100,
  }
}

render() {
  return (
    <Tooltip
      placement="top"
      content={
        <div>Switch value: {this.state.value}</div>
      }
    >
      <Switch
        value={this.state.value}
        onColor="#13ce66"
        offColor="#ff4949"
        onValue={100}
        offValue={0}
        onChange={(value)=>{this.setState({value: value})}}
       >
      </Switch>
    </Tooltip>
  )
}
```
:::

### Disabled

:::demo Adding the `disabled` attribute disables Switch.

```js
render() {
  return (
    <div>
      <Switch
        value={true}
        onText=""
        offText=""
        disabled>
      </Switch>
      <Switch
        value={true}
        disabled>
      </Switch>
    </div>
  )
}
```
:::

### Focus

:::demo Adding the `allowFocus` attribute，allow `focus` and `blur` events on the input.

```js
render() {
  return (
    <div>
      <Switch
        allowFocus={true}
        onFocus={()=>console.log('focus')}
        onBlur={()=>console.log('blur')}
        >
      </Switch>
    </div>
  )
}
```
:::

### Attributes

| Attribute      | Description    | Type      | Accepted Values     | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | whether Switch is disabled    | boolean   | — | false   |
| width  | width of Switch    | number   | — | 58（with text）/ 46（no text） |
| onIconClass  | class name of the icon displayed when in `on` state, overrides `onText`| string   | — | — |
| offIconClass  | class name of the icon displayed when in `off` state, overrides `offText` | string   | — | — |
| onText  | text displayed when in `on` state  | string   | — | ON |
| offText  | text displayed when in `off` state    | string   | — | OFF |
| onValue  | switch value when in `on` state    | boolean / string / number | — | true |
| offValue  | switch value when in `off` state    | boolean / string / number | — | false |
| onColor  | background color when in `on` state   | string   | — | #20A0FF |
| offColor  |background color when in `off` state  | string   | — | #C0CCDA |
| name  | input name of Switch   | string   | — | — |
| allowFocus | allow `focus` and `blur` events on the input | boolean | — | false |

### Events
| Event Name      | Description    | Parameters      |
|---------- |-------- |---------- |
| onChange  | triggers when value changes  | value |
| onBlur  | triggers on blur (if `allow-focus` is true) | event: Event |
| onFocus  | triggers on focus (if `allow-focus` is true) | event: Event |
