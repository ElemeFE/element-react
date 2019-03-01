## AnchorSmooth 滑向锚点

用于a标签滑向锚点。

### 基本用法

和a标签用法类似，使用属性`targetId`表明想到达的锚点。

::: demo AnchorSmooth 组件提供`targetId`属性指向页面中**存在id元素**，必须值。若子元素不存在，则使用`targetId`当作子元素。
```js
render() {
  return (
    <div>
      <div className='anchor-point' id='anchor0'>这里是锚点#anchor0</div>
      <div className='anchor-group'>
          <AnchorSmooth targetId='anchor1' />
          <AnchorSmooth targetId='anchor1'>
      		滑动到锚点anchor1
      	  </AnchorSmooth>
      </div>
    </div>
  )
}
```
:::

### 回调函数

属性`onFinish`可在绑定一个回调函数，在到达锚点后执行回调函数。

::: demo 在 AnchorSmooth 组件中，你可以设置完成滑动完成的回调函数`onFinish`，到达锚点之后会调用`onFinish`函数。
```js
render() {
  return (
    <div>
      <div id='anchor1' className='anchor-point'>
      	  这里是锚点#anchor1
      </div>
      <AnchorSmooth 
          targetId='anchor2' 
          onFinish={() => console.log("Arrive at anchor2")}>
          到id为anchor2的锚点，并执行回调函数
	  </AnchorSmooth>
    </div>
  )
}
```
:::

### 设置标题

`title`属性，鼠标移入时告诉用户即将去的锚点。

::: demo 使用`title`属性来描述一个锚点。
```js
render() {
  return (
    <div>
      <div id='anchor2' className='anchor-point'>
      	 这里是锚点#anchor2
      </div>
      <AnchorSmooth 
          targetId='anchor0' 
          title="go to anchor0" 
          onFinish={() => console.log("Arrive at anchor0")}>
      	到id为anchor0的锚点，包含title
	  </AnchorSmooth>
    </div>
  )
}
```
:::

### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **targetId** | 锚点目标，页面中需要有对应id，**必选参数** | string | — | — |
| title | 辅助性文字 | string | — | — |

### Events

| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onFinish | 锚点到达时的回调函数 | — |
