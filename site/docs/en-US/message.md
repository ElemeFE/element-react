## Message

Used to show feedback after an activity. The difference with Notification is that the latter is often used to show a system level passive notification.

### Basic usage

Displays at the top, and disappears after 3 seconds.

:::demo The setup of Message is very similar to notification, so parts of the options won't be explained in detail here. You can check the options table below combined with notification doc to understand it.

```js
open() {
  Message('This is a message.');
}

render() {
  return <Button plain={true} onClick={this.open.bind(this)}>Show message</Button>
}
```
:::

### Types

Used to show the feedback of Success, Warning, Message and Error activities.

:::demo When you need more customizations, Message component can also take an object as parameter. For example, setting value of `type` can define different types, and its default is `info`. In such cases the main body is passed in as the value of `message`. Also, we have registered methods for different types, so you can directly call it without passing a type like `open4`.
```js
open() {
  Message({
    message: 'Congrats, this is a success message.',
    type: 'success'
  });

}

open2() {
  Message({
    message: 'Warning, this is a warning message.',
    type: 'warning'
  });
}

open3() {
  Message('This is a message.');
}

open4() {
  Message.error('Oops, this is a error message.');
}

render() {
  return (
    <div>
      <Button plain={true} onClick={this.open.bind(this)}>success</Button>
      <Button plain={true} onClick={this.open2.bind(this)}>warning</Button>
      <Button plain={true} onClick={this.open3.bind(this)}>message</Button>
      <Button plain={true} onClick={this.open4.bind(this)}>error</Button>
    </div>
  )
}
```
:::

### Closable

A close button can be added.

:::demo A default Message cannot be closed manually. If you need a closable message, you can set `showClose` field. Besides, same as notification, message has a controllable `duration`. Default duration is 3000 ms, and it won't disappear when set to `0`.
```js
open5() {
  Message({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success'
  });
}

open6() {
  Message({
    showClose: true,
    message: 'Warning, this is a warning message.',
    type: 'warning'
  });
}

open7() {
  Message({
    showClose: true,
    message: 'This is a message.',
    type: 'info'
  });
}

open8() {
  Message({
    showClose: true,
    message: 'Oops, this is a error message.',
    type: 'error'
  });
}

render() {
  return (
    <div>
      <Button plain={true} onClick={this.open5.bind(this)}>success</Button>
      <Button plain={true} onClick={this.open6.bind(this)}>warning</Button>
      <Button plain={true} onClick={this.open7.bind(this)}>info</Button>
      <Button plain={true} onClick={this.open8.bind(this)}>error</Button>
    </div>
  )
}
```
:::

### Local import

Import `Message`:

```javascript
import { Message } from 'element-react';
```

In this case you should call `Message(options)`. We have also registered methods for different types, e.g. `Message.success(options)`.

### Options
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message | message text | string/ReactElement | — | — |
| type | message type | string | success/warning/info/error | info |
| iconClass | custom icon's class, overrides `type` | string | — | — |
| customClass | custom class name for Message | string | — | — |
| duration | display duration, millisecond. If set to 0, it will not turn off automatically | number | — | 3000 |
| showClose | whether to show a close button | boolean | — | false |
| onClose | callback function when closed with the message instance as the parameter | function | — | — |

### Methods
`Message` and `this.$message` returns the current Message instance. To manually close the instance, you can call `close` on it.
| Method | Description |
| ---- | ---- |
| close | close the Message |
