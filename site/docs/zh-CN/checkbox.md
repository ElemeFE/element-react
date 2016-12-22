## Checkbox 多选框

一组备选项中进行多选

### 基础用法

单独使用可以表示两种状态之间的切换。

:::demo 简单的Checkbox，使用checked切换选中状态。
```js
render() {
  return <Checkbox checked>备选项</Checkbox>
}
```
:::

### 禁用状态

多选框不可用状态。

:::demo 设置disabled属性即可。

```js
render() {
  return (
    <div>
      <Checkbox disabled>备选项1</Checkbox>
      <Checkbox checked disabled>备选项2</Checkbox>
    </div>
  )
}
```
:::

### 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中的项。

:::demo checkbox-group元素能把多个 checkbox 管理为一组，只需要在 Group 中使用options绑定Array类型的变量即可，label属性除了改变 checkbox 按钮后的介绍外，同时也是该 checkbox 对应的值，label与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。

```js
render() {
  return (
    <Checkbox.Group options={['复选框A', '选中且禁用']}>
      <Checkbox label="复选框A"></Checkbox>
      <Checkbox label="复选框B"></Checkbox>
      <Checkbox label="复选框C"></Checkbox>
      <Checkbox label="禁用" disabled></Checkbox>
      <Checkbox label="选中且禁用" disabled></Checkbox>
    </Checkbox.Group>
  )
}
```
:::

### 可切换值的多选框

多选框单独时，除了可以表示为是否选中的逻辑值以外，你还可以设定其选中和未选中所表示的值。

:::demo 使用trueLabel和falseLabel可以自定义选中时和未选中时的值，可以为String或Number类型。

```js
render() {
  return <Checkbox trueLabel="可用" falseLabel="不可用"></Checkbox>
}
```
:::

### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选中状态的值（只有在Checkbox-group下有意义）   | string    |       —        |      —   |
| trueLabel  | 选中时的值    | string, number   | — | — |
| falseLabel  | 没有选中时的值    | string, number   | — | — |
| disabled  | 按钮禁用    | boolean   | — | false |
| checked  | 当前是否勾选    | boolean   | — | false |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制    | boolean   | — | false |

### Checkbox Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange  | 当绑定值变化时触发的事件 |  event 事件对象  |

### Checkbox-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| options  | 指定可选项    | array   | — | [ ] |

### Checkbox-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange  | 当绑定值变化时触发的事件 |  所有选中的选项  |
