## Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

### 基础用法
基础的、简洁的标签页。

:::demo Tabs 组件提供了选项卡功能，只需要使用`Tabs`和子元素`Tabs.Pane`即可，在两个元素中，我们分别提供了一系列的属性来方便使用，`Tabs.Pane`中`label`决定了选项卡标题，标签内部写入内容即可。在下例中我们在`Tabs`中设置了`activeName`属性，接受一个`String`值，表明选中的选项卡，在`Tabs.Pane`中可以设置对应的`name`属性，如果没有设置name，则默认值为顺序的`1`/`2`/`3`/`4`。例子选中选项卡2，如果不设置`name`，将`activeName`设为`2`，可以达成相同效果。

```html
<Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
  <Tabs.Pane label="用户管理" name="1" />
  <Tabs.Pane label="配置管理" name="2" />
  <Tabs.Pane label="角色管理" name="3" />
  <Tabs.Pane label="定时补偿任务" name="4" />
</Tabs>
```
:::

### 选项卡样式
选项卡样式的标签页。

:::demo 只需要设置`type`属性即可，如果需要标签风格，将其设置为`card`。

```html
<Tabs type="card" activeName="1">
  <Tabs.Pane label="用户管理" name="1" />
  <Tabs.Pane label="配置管理" name="2" />
  <Tabs.Pane label="角色管理" name="3" />
  <Tabs.Pane label="定时补偿任务" name="4" />
</Tabs>
```
:::

### 可关闭
可以关闭标签页。

:::demo 在`Tabs`中设置`closable`属性，接受一个`Boolean`，设置为`true`时为可关闭。

```html
<Tabs type="card" closable activeName="1" onTabRemove={ (tab) => console.log(tab.props.name) }>
  <Tabs.Pane label="用户管理" name="1" />
  <Tabs.Pane label="配置管理" name="2" />
  <Tabs.Pane label="角色管理" name="3" />
  <Tabs.Pane label="定时补偿任务" name="4" />
</Tabs>
```
:::

### 卡片化
卡片化的标签页。

:::demo 将`type`设置为`border-card`。

```html
<Tabs type="border-card" activeName="1">
  <Tabs.Pane label="用户管理" name="1" />
  <Tabs.Pane label="配置管理" name="2" />
  <Tabs.Pane label="角色管理" name="3" />
  <Tabs.Pane label="定时补偿任务" name="4" />
</Tabs>
```
:::

### Tabs Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type          | 风格类型      | string         |   card, border-card            |    —     |
| closable          |  标签是否可关闭    | boolean  |  true, false             |     false    |
| activeName       | 选中选项卡的 name    | string  |  —  |  第一个选项卡的 name |

### Tabs Events
| 事件名称          | 说明            | 回调参数            |
|-------------  |---------------- |---------------- |
| onTabClick          |  tab 被选中的钩子      | 被选中的标签 tab         |
| onTabRemove          |    tab 被删除的钩子    | 被删除的标签 tab  |

### Tabs.Pane Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| label          | 选项卡标题      | string          |          —             |    —     |
| name          |  与选项卡 activeName 对应的标识符，表示选项卡别名    | string  |         —              |     该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1'    |
