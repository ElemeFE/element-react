## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo Button 组件默认提供7种主题，由`type`属性来定义，默认为`default`。

```js
render() {
  return (
    <div>
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="text">文字按钮</Button>
    </div>
  )
}
```
:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```js
render() {
  return (
    <div>
      <Button plain={true} disabled={true}>默认按钮</Button>
      <Button type="primary" disabled={true}>主要按钮</Button>
      <Button type="text" disabled={true}>文字按钮</Button>
    </div>
  )
}
```
:::

### 有颜色倾向

不同的颜色倾向代表不同的提示

:::demo 朴素按钮同样设置了不同的`type`属性对应的样式（可选值同上），默认为`info`。设置`plain`属性，它接受一个`Boolean`。注意，在该情况下，`type`虽然可以为`text`，但是是没有意义的，会显示为`text button`的样式。

```js
render() {
  return (
    <div className="intro-block">
      <div className="block">
        <span className="demonstration">默认显示颜色</span>
        <span className="wrapper">
          <Button type="success">成功按钮</Button>
          <Button type="warning">警告按钮</Button>
          <Button type="danger">危险按钮</Button>
          <Button type="info">信息按钮</Button>
        </span>
      </div>
      <div className="block">
        <span className="demonstration">hover 显示颜色</span>
        <span className="wrapper">
          <Button plain={true} type="success">成功按钮</Button>
          <Button plain={true} type="warning">警告按钮</Button>
          <Button plain={true} type="danger">危险按钮</Button>
          <Button plain={true} type="info">信息按钮</Button>
        </span>
      </div>
    </div>
  )
}
```
:::

### 图标按钮

带图标的按钮可增强辨识度(有文字)或节省空间(无文字)。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```js
render() {
  return (
    <div>
      <Button type="primary" icon="edit"></Button>
      <Button type="primary" icon="share"></Button>
      <Button type="primary" icon="delete"></Button>
      <Button type="primary" icon="search">搜索</Button>
      <Button type="primary">上传<i className="el-icon-upload el-icon-right"></i></Button>
    </div>
  )
}
```
:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`Button.Group`标签来嵌套你的按钮。

```js
render() {
  return (
    <div>
      <Button.Group>
          <Button type="primary" icon="arrow-left">上一页</Button>
          <Button type="primary">下一页<i className="el-icon-arrow-right el-icon-right"></i></Button>
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

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```js
render() {
  return <Button type="primary" loading={true}>加载中</Button>
}
```
:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`large`、`small`、`mini`，通过设置`size`属性来配置它们。

```js
render() {
  return (
    <div>
      <Button type="primary" size="large">大型按钮</Button>
      <Button type="primary">正常按钮</Button>
      <Button type="primary" size="small">小型按钮</Button>
      <Button type="primary" size="mini">超小按钮</Button>
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   large,small,mini            |    —     |
| type     | 类型   | string    |   primary,success,warning,danger,info,text |     —    |
| plain     | 是否朴素按钮   | Boolean    | true,false | false   |
| loading     | 是否加载中状态   | Boolean    | — | false   |
| disabled  | 禁用    | boolean   | true, false   | false   |
| icon  | 图标，已有的图标库中的图标名 | string   |  —  |  —  |
| nativeType | 原生 type 属性 | string | button,submit,reset | button |
