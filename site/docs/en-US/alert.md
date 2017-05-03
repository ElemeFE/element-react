## Alert

Displays important alert messages.

### Basic usage

Alert components are non-overlay elements in the page that does not disappear automatically.

::: demo Alert provides 4 types of themes defined by `type`, whose default value is `info`.
```js
render() {
  return (
    <div>
      <Alert title="success alert" type="success" />
      <Alert title="info alert" type="info" />
      <Alert title="warning alert" type="warning" />
      <Alert title="error alert" type="error" />
    </div>
  )
}
```
:::

### Customizable close button

Customize the close button as texts or other symbols.

::: demo Alert allows you to configure if it's closable. The close button text and closing callbacks are also customizable. `closable` attribute decides if the component can be closed or not. It accepts `boolean`, and the default is `true`. You can set `closeText` attribute to replace the default cross symbol as the close button. Be careful that `closeText` must be a string. `close` event fires when the component is closed.

```js
render() {
  return (
    <div>
      <Alert title="unclosable alert" type="success" closable={false} />
      <Alert title="customized close-text" type="info" closeText="Gotcha" />
      <Alert title="alert with callback" type="warning" onClose={() => alert('Hello World!')}/>
    </div>
  )
}
```
:::

### With icon

Displaying an icon improves readability.

::: demo Setting the `showIcon` attribute displays an icon that corresponds with the current Alert type.

```js
render() {
  return (
    <div>
      <Alert title="success alert" type="success" showIcon={true} />
      <Alert title="info alert" type="info" showIcon={true} />
      <Alert title="warning alert" type="warning" showIcon={true} />
      <Alert title="error alert" type="error" showIcon={true} />
    </div>
  )
}
```
:::

### With description

Description includes a message with more detailed information.

::: demo Besides the required `title` attribute, you can add a `description` attribute to help you describe the alert with more details. Description can only store text string, and it will word wrap automatically.

```js
render() {
  return <Alert title="with description" type="success" description="This is a description." />
}
```
:::

### With icon and description

::: demo At last, this is an example with both icon and description.

```js
render() {
  return (
    <div>
      <Alert title="success alert" type="success" description="more text description" showIcon={true} />
      <Alert title="info alert" type="info" description="more text description" showIcon={true} />
      <Alert title="warning alert" type="warning" description="more text description" showIcon={true} />
      <Alert title="error alert" type="error" description="more text description" showIcon={true} />
    </div>
  )
}
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **title** | title **REQUIRED** | string | — | — |
| type | component type | string | success/warning/info/error | info |
| description | supportive text | string | — | — |
| closable | if closable or not | boolean | — | true |
| closeText | customized close button text | string | — | — |
| showIcon | if a type icon is displayed | boolean | — | false |


### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| onClose | fires when alert is closed | — |
