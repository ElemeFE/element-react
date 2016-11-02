## Checkbox 多选框

一组备选项中进行多选

### 基础用法

单独使用可以表示两种状态之间的切换。

:::demo 简单的checkbox，使用checked切换选中状态。
```html
<CheckBox checked>备选项</CheckBox>
```
:::

### 禁用状态

多选框不可用状态。

:::demo 设置disabled属性即可。

```html
<CheckBox disabled>备选项1</CheckBox>
<CheckBox checked disabled>备选项2</CheckBox>
```
:::

### 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中的项。

:::demo checkbox-group元素能把多个 checkbox 管理为一组，只需要在 Group 中使用options绑定Array类型的变量即可，label属性除了改变 checkbox 按钮后的介绍外，同时也是该 checkbox 对应的值，label与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。

```html
<CheckBox.Group options={['复选框A', '选中且禁用']}>
  <CheckBox label="复选框A"></CheckBox>
  <CheckBox label="复选框B"></CheckBox>
  <CheckBox label="复选框C"></CheckBox>
  <CheckBox label="禁用" disabled></CheckBox>
  <CheckBox label="选中且禁用" disabled></CheckBox>
</CheckBox.Group>
```
:::

### 可切换值的多选框

多选框单独时，除了可以表示为是否选中的逻辑值以外，你还可以设定其选中和未选中所表示的值。

:::demo 使用true-label和false-label可以自定义选中时和未选中时的值，可以为String或Number类型。

```html
<CheckBox trueLabel="可用" falseLabel="不可用"></CheckBox>
```
:::

### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选中状态的值（只有在checkbox-group下有意义）   | string    |       —        |      —   |
| trueLabel  | 选中时的值    | string, number   | — | — |
| falseLabel  | 没有选中时的值    | string, number   | — | — |
| disabled  | 按钮禁用    | boolean   | — | false |
| checked  | 当前是否勾选    | boolean   | — | false |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制    | boolean   | — | false |

### Checkbox-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| options  | 指定可选项    | array   | — | [ ] |

### Checkbox-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 |  event 事件对象  |
