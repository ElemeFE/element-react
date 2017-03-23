## ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

### 基础用法

:::demo 通过value属性控制当前显示的颜色。
```js
render() {
  const color1 = '#20a0ff';
  const color2 = null;
  return (
    <div>
      <div className="block">
        <span className="demonstration">有默认值</span>
        <ColorPicker value={color1}></ColorPicker>
      </div>
      <div className="block">
        <span className="demonstration">无默认值</span>
        <ColorPicker value={color2}></ColorPicker>
      </div>
    </div>
  )
}
```
:::

### 选择透明度

:::demo ColorPicker 支持普通颜色，也支持带 Alpha 通道的颜色，通过`showAlpha`属性即可控制是否支持透明度的选择。
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
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| showAlpha | 是否支持透明度选择 | boolean | — | false |
| colorFormat | 写入 value 的颜色的格式 | string | hsl / hsv / hex / rgb | hex（show-alpha 为 false）/ rgb（show-alpha 为 true） |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange | 当绑定值变化时触发 | 当前值 |
