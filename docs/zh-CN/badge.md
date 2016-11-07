## Badge 标记

出现在按钮、图标旁的数字或状态标记。

### 基础用法
展示新消息数量。

:::demo 定义`value`属性，它接受`Number`或者`String`。

```html
<Badge value={ 12 } className="demo-badge">
  <Button size="small">评论</Button>
</Badge>
<Badge value={ 3 } className="demo-badge">
  <Button size="small">回复</Button>
</Badge>
<Button type="text">等待下拉菜单</Button>
```
:::

### 最大值
可自定义最大值。

:::demo 由`max`属性定义，它接受一个`Number`，需要注意的是，只有当`value`为`Number`时，它才会生效。

```html
<Badge value={ 200 } max={ 99 } className="demo-badge">
  <Button size="small">评论</Button>
</Badge>
<Badge value={ 100 } max={ 10 } className="demo-badge">
  <Button size="small">回复</Button>
</Badge>
```
:::

### 自定义内容
可以显示数字以外的文本内容。

:::demo 定义`value`为`String`类型是时可以用于显示自定义文本。

```html
<Badge value={ 'new' } className="demo-badge">
  <Button size="small">评论</Button>
</Badge>
<Badge value={ 'hot' } className="demo-badge">
  <Button size="small">回复</Button>
</Badge>
```
:::

### 小红点
以红点的形式标注需要关注的内容。

:::demo 除了数字外，设置`isDot`属性，它接受一个`Boolean`。

```html
<Badge isDot className="demo-badge">
  数据查询
</Badge>
<Badge isDot className="demo-badge">
  <Button icon="share" type="primary"></Button>
</Badge>
```
:::

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value          | 显示值      | string, number          |          —             |    —     |
| max          |  最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型    | number  |         —              |     —    |
| isDot       | 小圆点    | boolean  |  —  |  false |
