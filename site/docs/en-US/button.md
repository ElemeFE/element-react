## Button

Commonly used button.

### Basic usage

::: demo Button provides 7 themes defined by the `type` attribute.

```js
render() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button type="primary">Primary Button</Button>
      <Button type="text">Text Button</Button>
    </div>
  )
}
```
:::

### Disabled Button

The `disableds` attribute determines if the button is disabled.

:::demo Use `disabled` attribute to determine whether a button is disabled. It accepts a `Boolean` value.

```js
render() {
  return (
    <div>
      <Button plain={true} disabled={true}>Default Button</Button>
      <Button type="primary" disabled={true}>Primary Button</Button>
      <Button type="text" disabled={true}>Text Button</Button>
    </div>
  )
}
```
:::

### Color Indication

Different colors represent different meanings.

:::demo Use `plain` attribute to create a plain button, and it accepts a `Boolean` value. You can assign different `type` to a plain button as mentioned above. **Note**: When using the plain button, you still can set `type` to `text`, but it makes no difference. A plain button will be styled like a `text button` by default.
```js
render() {
  return (
    <div className="intro-block">
      <div className="block">
        <span className="demonstration">Default</span>
        <span className="wrapper">
          <Button type="success">Success</Button>
          <Button type="warning">Warning</Button>
          <Button type="danger">Danger</Button>
          <Button type="info">Info</Button>
        </span>
      </div>
      <div className="block">
        <span className="demonstration">Hover to display color</span>
        <span className="wrapper">
          <Button plain={true} type="success">Success</Button>
          <Button plain={true} type="warning">Warning</Button>
          <Button plain={true} type="danger">Danger</Button>
          <Button plain={true} type="info">Info</Button>
        </span>
      </div>
    </div>
  )
}
```
:::

### Icon Button

Use icons to add more meaning to Button. You can use icon alone to save some space, or with text together.

:::demo Use the `icon` attribute to add icon. You can find the icon list in Element icon component. Adding icons to the right side of the text is achievable with an `<i>` tag. Custom icons can be used as well.

```js
render() {
  return (
    <div>
      <Button type="primary" icon="edit"></Button>
      <Button type="primary" icon="share"></Button>
      <Button type="primary" icon="delete"></Button>
      <Button type="primary" icon="search">Search</Button>
      <Button type="primary">Upload<i className="el-icon-upload el-icon-right"></i></Button>
    </div>
  )
}
```
:::

### Button Group

Displayed as a button group, can be used to group a series of similar operations.

:::demo Use tag `Button.Group` to group your buttons.

```js
render() {
  return (
    <div>
      <Button.Group>
          <Button type="primary" icon="arrow-left">Previous Page</Button>
          <Button type="primary">Next Page<i className="el-icon-arrow-right el-icon-right"></i></Button>
      </Button.Group>
      <Button.Group>
          <Button type="primary" icon="edit"></Button>
          <Button type="primary" icon="share"></Button>
          <Button type="primary" icon="delete"></Button>
      </Button.Group>
    </div>
  )
}
```
:::

### Loading Button

Click the button to load data, then the button displays a loading state.

:::demo Set `loading` attribute to `true` to display loading state.

```js
render() {
  return <Button type="primary" loading={true}>Loading</Button>
}
```
:::

### Sizes

Besides default size, Button component provides three additional sizes for you to choose among different scenarios.

:::demo Use attribute `size` to set additional sizes with `large`, `small` or `mini`.

```js
render() {
  return (
    <div>
      <Button type="primary" size="large">Large Button</Button>
      <Button type="primary">Default Button</Button>
      <Button type="primary" size="small">Small Button</Button>
      <Button type="primary" size="mini">Mini Button</Button>
    </div>
  )
}
```
:::

### Attributes
| Attribute      | Description    | Type      | Accepted values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | button size   | string  |   large/small/mini            |    —     |
| type     | button type   | string    |   primary/success/warning/danger/info/text |     —    |
| plain     | determine whether it's a plain button   | Boolean    | — | false   |
| loading   | determine whether it's loading   | Boolean    | — | false   |
| disabled  | disable the button    | boolean   | —   | false   |
| icon  | button icon, accepts an icon name of Element icon component | string   |  —  |  —  |
| nativeType | same as native button's `type` | string | button/submit/reset | button |
