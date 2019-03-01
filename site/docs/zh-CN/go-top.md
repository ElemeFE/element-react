## GoTop 回顶部

长页面中从底部回到顶部的按钮，点击可以回到页面顶部。

### 基本用法

通常回顶部按钮出现在页面的右下角，因此建议修改`right`，`bottom`属性进行定位；若有特殊需求，也可以修改`left` ，`top`属性。

::: demo 在 GoTop组件中，你可以修改`right`，`bottom`属性，默认值为right:50px;bottom:50px;。
```js
render() {
  return (
    <div>
      <h3>基本用法：右下角按钮第一个</h3>
      <GoTop bottom="360px" showheight={0}/>
    </div>
  )
}
```
:::

### 出现时机

一般回顶部按钮，不会在滚动距离为0时出现。我们可以通过属性`showheight` 来定义按钮出现时滚动条的高度，默认值为300，单位px。滚动距离大于300，会淡入显示按钮；小于300，会淡出隐藏按钮。

::: demo 在 GoTop组件中，你可以修改`showheight`属性，指定滚动条的滚动距离，默认值：300;类型：number。

```js
render() {
  return (
    <div>
      <h3>在滚动距离为200px时出现按钮：右下角按钮第二个</h3>
      <GoTop bottom="300px" showheight={200}/>
    </div>
  )
}
```

:::

### 替换 icon

GoTop 组件中，默认使用elementUI中的el-icon-caret-top，可以通过设置子元素的方式，替换默认icon图标。

::: demo 通过设置`children`属性来显示 GoTop 的 icon，这能更有效地向用户展示你的显示意图。
```js
render() {
  return (
    <div>
      <h3>替换 icon：右下角按钮第三个</h3>
      <GoTop bottom="240px">
      	<i className="el-icon-arrow-up"></i>
      </GoTop>
    </div>
  )
}
```
:::

### 滑动时间和回调函数

自定义完成滑动所用的时间，属性:` time`，默认值: 300，单位: ms。

::: demo 在 GoTop 组件中，你可以设置完成滑动所用的时间`time`，到达锚点之后会调用一个的`onFinish`的回调函数。`time`属性决定完成滑动所用的时间，接受`number`，默认为300。

```js
render() {
  return (
    <div>
      <h3>自定义滑动时间和回调函数：右下角按钮第四个</h3>
      <GoTop bottom="180px" time={800} 
      	onFinish={() => console.log("go to top")}/>
    </div>
  )
}
```

:::

### title

包含标题，鼠标移入时告诉用户即将去的锚点。

::: demo 使用`title`属性来描述一个锚点。

```js
render() {
  return (
    <div>
      <h3>title：右下角按钮第五个</h3>
      <GoTop bottom="120px" title="go to top" />
    </div>
  )
}
```

:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| showheight | 滚动条滚动距离阈值，单位px | number | — | 300 |
| time | 到达描点所需要的时间，单位ms | number | — | 300 |
| title | title | string | — | — |
| right | 到页面右边的距离 | string | — | 50px |
| bottom | 到页面底端的距离 | string | — | 50px |
| top | 到页面顶端的距离 | string | — | — |
| left | 到页面左边的距离 | string | — | — |

### Events

| 事件名称 | 说明                       | 回调参数 |
| -------- | -------------------------- | -------- |
| onFinish | 滚动条到达顶部时的回调函数 | —        |