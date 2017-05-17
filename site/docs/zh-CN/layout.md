## Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。

### 基础布局

使用单一分栏创建基础的栅格布局。

::: demo 通过 Row 和 Col 组件，并通过 Col 组件的 `span` 属性我们就可以自由地组合布局。
```js
render() {
  return (
    <div>
      <Layout.Row>
        <Layout.Col span="24"><div className="grid-content bg-purple-dark"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row>
        <Layout.Col span="12"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="12"><div className="grid-content bg-purple-light"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row>
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="8"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple-light"></div></Layout.Col>
      </Layout.Row>
    </div>
  )
}
```
:::

### 分栏间隔

分栏之间存在间隔。

::: demo Row 组件 提供 `gutter` 属性来指定每一栏之间的间隔，默认间隔为 0。
```js
render() {
  return (
    <Layout.Row gutter="20">
      <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
    </Layout.Row>
  )
}
```
:::

### 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

::: demo
```js
render() {
  return (
    <div>
      <Layout.Row gutter="20">
        <Layout.Col span="16"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row gutter="20">
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row gutter="20">
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="16"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    </div>
  )
}
```
:::

### 分栏偏移

支持偏移指定的栏数。

::: demo 通过制定 Col 组件的 `offset` 属性可以指定分栏偏移的栏数。
```js
render() {
  return (
    <div>
      <Layout.Row gutter="20">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6" offset="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row gutter="20">
        <Layout.Col span="6" offset="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6" offset="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row gutter="20">
        <Layout.Col span="12" offset="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    </div>
  )
}
```
:::

### 对齐方式

对分栏进行灵活的对齐。

::: demo 将 `type` 属性赋值为 'flex'，可以启用 flex 布局，并可通过 `justify` 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。
```js
render() {
  return (
    <div>
      <Layout.Row type="flex" className="row-bg">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row type="flex" className="row-bg" justify="center">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row type="flex" className="row-bg" justify="end">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row type="flex" className="row-bg" justify="space-between">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row type="flex" className="row-bg" justify="space-around">
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span={6}><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
    </div>
  )
}
```
:::

### 响应式布局

参照了 Bootstrap 的 响应式设计，预设了四个响应尺寸：`xs`、`sm`、`md`和`lg`。

::: demo
```js
render() {
  return (
    <Layout.Row gutter="10">
      <Layout.Col xs="8" sm="6" md="4" lg="3"><div className="grid-content bg-purple"></div></Layout.Col>
      <Layout.Col xs="4" sm="6" md="8" lg="9"><div className="grid-content bg-purple-light"></div></Layout.Col>
      <Layout.Col xs="4" sm="6" md="8" lg="9"><div className="grid-content bg-purple"></div></Layout.Col>
      <Layout.Col xs="8" sm="6" md="4" lg="3"><div className="grid-content bg-purple-light"></div></Layout.Col>
    </Layout.Row>
  )
}
```
:::

### Row Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| gutter | 栅格间隔 | number | — | 0 |
| type | 布局模式，可选 flex，现代浏览器下有效 | string | — | — |
| justify | flex 布局下的水平排列方式 | string | start/end/center/space-around/space-between | start |
| align | flex 布局下的垂直排列方式 | string | top/middle/bottom | top |
| tag | 自定义元素标签 | string | * | div |

### Col Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **span** | 栅格占据的列数，**必选参数** | number | — | — |
| offset | 栅格左侧的间隔格数 | number | — | 0 |
| push |  栅格向右移动格数 | number | — | 0 |
| pull |  栅格向左移动格数 | number | — | 0 |
| xs | `<768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| sm | `≥768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| md | `≥992` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| lg | `≥1200` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| tag | 自定义元素标签 | string | * | div |
