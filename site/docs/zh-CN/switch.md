## Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

### 基本用法

:::demo 绑定`value`到一个`Boolean`类型的变量。可以使用`onText`属性与`offText`属性来设置开关的文字描述，使用`onColor`属性与`offColor`属性来设置开关的背景色。

```js
render() {
  return (
    <div>
      <Switch
        value={true}
        onText=""
        offText="">
      </Switch>
      <Switch
        value={true}
        onColor="#13ce66"
        offColor="#ff4949">
      </Switch>
    </div>
  )
}
```
:::

### 禁用状态

:::demo 设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用。

```js
render() {
  return (
    <div>
      <Switch
        value={true}
        onText=""
        offText=""
        disabled>
      </Switch>
      <Switch
        value={true}
        disabled>
      </Switch>
    </div>
  )
}
```
:::

### 回调事件

:::demo 设置`change`回调事件，当开关状态发生了改变，会回调此函数，并返回当前`value`值。

```js
render() {
  return (
    <Switch
      value={true}
      onText=""
      offText=""
      onChange={(value)=>{console.log('switch ---> ' + value)}}>
    </Switch>
  )
}
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | 是否禁用    | boolean   | — | false   |
| width  | switch 的宽度（像素）    | number   | — | 58（有文字）/ 46（无文字） |
| onIconClass  | switch 打开时所显示图标的类名，<br>设置此项会忽略 `onText`    | string   | — | — |
| offIconClass  | switch 关闭时所显示图标的类名，<br>设置此项会忽略 `offText`    | string   | — | — |
| onText  | switch 打开时的文字    | string   | — | ON |
| offText  | switch 关闭时的文字    | string   | — | OFF |
| onColor  | switch 打开时的背景色    | string   | — | #20A0FF |
| offColor  | switch 关闭时的背景色    | string   | — | #C0CCDA |
| name  | switch 对应的 name 属性    | string   | — | — |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange  | switch 状态发生变化时的回调函数    | value |
