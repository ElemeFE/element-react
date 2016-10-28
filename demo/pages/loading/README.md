## Loading 加载

加载数据时显示动效。

### 区域加载

在表格等容器中加载数据时显示。

:::demo 在 Loading 组件中，Element 准备了自定义命令`v-loading`，只需要绑定`Boolean`即可。默认状况下，Loading 遮罩会插入到绑定元素的子节点，通过添加`body`修饰符，可以使遮罩插入至 DOM 中的 body 上。

```html
<div className="el-loading-demo">
  <Loading>
    <div className="el-loading-mask" />
  </Loading>
</div>
```
:::

### 整页加载

页面数据加载时显示。

:::demo 当需要全屏遮罩时，可使用`fullscreen`修饰符（此时遮罩会插入至 body 上）。此时若需要锁定屏幕的滚动，可以使用`lock`修饰符。

```html
<div>
  <Button type="primary" onClick={context.onClick.bind(context)}>显示整页加载，3 秒后消失</Button>
  {
    context.state.fullscreen && <Loading fullscreen={true} />
  }
</div>
```
:::
