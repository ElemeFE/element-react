## Progress

Progress is used to show the progress of current operation, and inform the user the current status.

### Linear progress bar (external percentage)

:::demo Use `percentage` attribute to set the percentage. It's **required** and must be between `0-100`.
```js
render() {
  return (
    <div>
      <Progress percentage={0} />
      <Progress percentage={70} />
      <Progress percentage={100} status="success" />
      <Progress percentage={50} status="exception" />
    </div>
  )
}
```
:::

### Linear progress bar (internal percentage)

In this case the percentage takes no additional space.

:::demo `strokeWidth` attribute decides the `width` of progress bar, and use `textInside` attribute to put description inside the progress bar.
```js
render() {
  return (
    <div>
      <Progress strokeWidth={18} percentage={0} textInside />
      <Progress strokeWidth={18} percentage={70} textInside />
      <Progress strokeWidth={18} percentage={100} status="success" textInside />
      <Progress strokeWidth={18} percentage={50} status="exception" textInside />
    </div>
  )
}
```
:::

### Circular progress bar

:::demo You can specify `type` attribute to `circle` to use circular progress bar, and use `width` attribute to change the size of circle.
```js
render() {
  return (
    <div>
      <Progress type="circle" percentage={0} />
      <Progress type="circle" percentage={25} />
      <Progress type="circle" percentage={100} status="success" />
      <Progress type="circle" percentage={50} status="exception" />
    </div>
  )
}
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
| --- | ---- | ---- | ---- | ---- |
| **percentage** | percentage, **required** | number | 0-100 | 0 |
| type | the type of progress bar | string | line/circle | line |
| strokeWidth | the width of progress bar | number | — | 6 |
| textInside | whether to place the percentage inside progress bar, only works when `type` is 'line' | boolean | — | false |
| status | the current status of progress bar | string | success/exception | — |
| width | the canvas width of circle progress bar | number | — | 126 |
| showText | whether to show percentage | boolean | — | true |
