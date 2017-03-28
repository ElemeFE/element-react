## ColorPicker

ColorPicker is a color selector supporting multiple color formats.

### Basic usage

:::demo ColorPicker requires a string typed variable to be bound to `value`.
```js
render() {
  const color1 = '#20a0ff';
  const color2 = null;
  return (
    <div>
      <div className="block">
        <span className="demonstration">With default value</span>
        <ColorPicker value={color1}></ColorPicker>
      </div>
      <div className="block">
        <span className="demonstration">With no default value</span>
        <ColorPicker value={color2}></ColorPicker>
      </div>
    </div>
  )
}
```
:::

### Alpha

:::demo ColorPicker supports alpha channel selecting. To activate alpha selecting, just add the `showAlpha` attribute.
```js
render() {
  const color3 = 'rgba(19, 206, 102, 0.8)';
  return (
    <div style={{padding: '24px'}}>
      <ColorPicker value={color3} showAlpha></ColorPicker>
    </div>
  )
}
```
:::

### Attributes
| Attribute | Description | Type | Accepted Values | Default |
|---------- |-------- |---------- |-------------  |-------- |
| showAlpha | whether to display the alpha slider | boolean | — | false |
| colorFormat | color format of v-model | string | hsl / hsv / hex / rgb | hex (when show-alpha is false)/ rgb (when show-alpha is true) |

### Events
| Event Name | Description | Parameters |
|---------|--------|---------|
| onChange | triggers when input value changes | color value |
