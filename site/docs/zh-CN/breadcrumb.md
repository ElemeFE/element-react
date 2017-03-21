## Breadcrumb 面包屑
显示当前页面的路径，快速返回之前的任意页面。

### 基础用法

适用广泛的基础用法。

:::demo 在`Breadcrumb`中使用`Breadcrumb.Item`标签表示从首页开始的每一级。Element 提供了一个`separator`属性，在`Breadcrumb`标签中设置它来决定分隔符，它只能是字符串，默认为斜杠`/`。

```js
render() {
  return (
    <Breadcrumb separator="/">
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item>活动管理</Breadcrumb.Item>
      <Breadcrumb.Item>活动列表</Breadcrumb.Item>
      <Breadcrumb.Item>活动详情</Breadcrumb.Item>
    </Breadcrumb>
  )
}
```
:::

### Breadcrumb Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| separator | 分隔符 | string | — | 斜杠'/' |
