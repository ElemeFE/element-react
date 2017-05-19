## Layout

Quickly and easily create layouts with the basic 24-column.

### Basic layout

Create basic grid layout using columns.

::: demo With `row` and `col`, we can easily manipulate the layout using the `span` attribute.
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

### Column spacing

Column spacing is supported.

::: demo Row provides `gutter` attribute to specify spacings between columns, and its default value is 0.
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

### Hybrid layout

Form a more complex hybrid layout by combining the basic 1/24 columns.

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

### Column offset

You can specify column offsets.

::: demo You can specify the number of column offset by setting the value of `offset` attribute of Col.

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

### Alignment

Use the flex layout to make flexible alignment of columns.

::: demo You can enable flex layout by setting `type` attribute to 'flex', and define the layout of child elements by setting `justify` attribute with start, center, end, space-between or space-around.
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

### Responsive Layout

Taking example by Bootstrap's responsive design, four breakpoints are preset: xs, sm, md and lg.

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
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| gutter | grid spacing | number | — | 0 |
| type | layout mode, you can use flex, works in modern browsers | string | — | — |
| justify | horizontal alignment of flex layout | string | start/end/center/space-around/space-between | start |
| align | vertical alignment of flex layout | string | top/middle/bottom | top |
| tag | custom element tag | string | * | div |

### Col Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| span | number of column the grid spans | number | — | — |
| offset | number of spacing on the left side of the grid | number | — | 0 |
| push |  number of columns that grid moves to the right | number | — | 0 |
| pull |  number of columns that grid moves to the left | number | — | 0 |
| xs | `<768px` Responsive columns or column props object | number/object (i.e： {span: 4, offset: 4}) | — | — |
| sm | `≥768px` Responsive columns or column props object | number/object (i.e： {span: 4, offset: 4}) | — | — |
| md | `≥992` Responsive columns or column props object | number/object (i.e： {span: 4, offset: 4}) | — | — |
| lg | `≥1200` Responsive columns or column props object | number/object (i.e： {span: 4, offset: 4}) | — | — |
| tag | custom element tag | string | * | div |
