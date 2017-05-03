## Notification

Displays a global notification message at the upper right corner of the page.

### Basic usage

::: demo Element has registered the `Notification` method and it receives an object as its parameter. In the simplest case, you can set the `title` field and the` message` field for the title and body of the notification. By default, the notification automatically closes after 4500ms, but by setting `duration` you can control its duration. Specifically, if set to `0`, it will not close automatically. Note that `duration` receives a `Number` in milliseconds.

```js
render() {
  return (
    <div>
      <Button plain={true} onClick={this.open.bind(this)}>Close automatically</Button>
      <Button plain={true} onClick={this.open2.bind(this)}>Won't close automatically</Button>
    </div>
  )
}

open() {
  Notification({
    title: 'Title',
    message: 'This is a reminder'
  });
}

open2() {
  Notification({
    title: 'Prompt',
    message: 'This is a message that does not automatically close',
    duration: 0
  });
}
```
:::

### With types

We provide four types: success, warning, info and error.

::: demo Element provides four notification types: `success`, `warning`, `info` and `error`. They are set by the `type` field, and other values will be ignored. We also registered methods for these types that can be invoked directly like `open5` and `open6` without passing a `type` field.
```js
render() {
  return (
    <div>
      <Button plain={true} onClick={this.open3.bind(this)}>Success</Button>
      <Button plain={true} onClick={this.open4.bind(this)}>Warning</Button>
      <Button plain={true} onClick={this.open5.bind(this)}>Info</Button>
      <Button plain={true} onClick={this.open6.bind(this)}>Error</Button>
    </div>
  )
}

open3() {
  Notification({
    title: 'Success',
    message: 'This is a success message',
    type: 'success'
  });
}

open4() {
  Notification({
    title: 'Warning',
    message: 'This is a warning message',
    type: 'warning'
  });
}

open5() {
  Notification.info({
    title: 'Info',
    message: 'This is an info message'
  });
}

open6() {
  Notification.error({
    title: 'Error',
    message: 'This is an error message'
  });
}
```
:::

### With offset

Customize Notification's offset from the top edge of the screen

::: demo Set the `offset` attribute to customize Notification's offset from the top edge of the screen. Note that every Notification instance of the same moment should have the same offset.
```js
render() {
  return (
    <Button plain={true} onClick={this.open.bind(this)}>Notification with offset</Button>
  )
}

open() {
  Notification({
    title: 'Success',
    message: 'This is a success message',
    offset: 100
  });
}
```
:::

### Local import

Import `Notification`:

```javascript
import { Notification } from 'element-react';
```

In this case you should call `Notification(options)`. We have also registered methods for different types, e.g. `Notification.success(options)`.

### Options
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | title | string | — | — |
| message | description text | string/ReactElement | — | — |
| type | notification type | string | success/warning/info/error | — |
| iconClass | custom icon's class. It will be overridden by `type` | string | — | — |
| duration | duration before close. It will not automatically close if set 0 | number | — | 4500 |
| onClose | callback function when closed | function | — | — |
| onClick | callback function when notification clicked | function | — | — |
| offset | offset from the top edge of the screen. Every Notification instance of the same moment should have the same offset | number | — | 0 |

### Methods
`Notification` returns the current Message instance. To manually close the instance, you can call `close` on it.

| Method | Description |
| ---- | ---- |
| close | close the Notification |
