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

### Attributes

| Attribute      | Description    | Type      | Accepted Values     | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | whether Switch is disabled    | boolean   | — | false   |
| width  | width of Switch    | number   | — | 58（with text）/ 46（no text） |
| onIconClass  | class name of the icon displayed when in `on` state, overrides `onText`| string   | — | — |
| offIconClass  | class name of the icon displayed when in `off` state, overrides `offText` | string   | — | — |
| onText  | text displayed when in `on` state  | string   | — | ON |
| offText  | text displayed when in `off` state    | string   | — | OFF |
| onColor  | background color when in `on` state   | string   | — | #20A0FF |
| offColor  |background color when in `off` state  | string   | — | #C0CCDA |
| name  | input name of Switch   | string   | — | — |

### Events
| Event Name      | Description    | Parameters      |
|---------- |-------- |---------- |
| onChange  | triggers when value changes  | value |
