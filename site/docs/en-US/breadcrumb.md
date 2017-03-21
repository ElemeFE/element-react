## Breadcrumb

Displays the location of the current page, making it easier to browser back.

### Basic usage


:::demo In `Breadcrumb`, each `Breadcrumb.Item` is a tag that stands for every level starting from homepage. This component has a `String` attribute `separator`, and it determines the separator. Its default value is '/'.

```js
render() {
  return (
    <Breadcrumb separator="/">
      <Breadcrumb.Item>Homepage</Breadcrumb.Item>
      <Breadcrumb.Item>Promotion Management</Breadcrumb.Item>
      <Breadcrumb.Item>Promotion List</Breadcrumb.Item>
      <Breadcrumb.Item>Promotion Detail</Breadcrumb.Item>
    </Breadcrumb>
  )
}
```
:::

### Breadcrumb Attributes
| Attribute      | Description          | Type      | Accepted Values            | Default|
|---------- |-------------- |---------- |--------------------------------  |-------- |
| separator | separator character | string | — | / |
