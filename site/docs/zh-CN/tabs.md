## Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

### 基础用法
基础的、简洁的标签页。

:::demo Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

```js
render() {
  return (
    <Tabs activeName="2" onTabClick={ (tab) => console.log(tab.props.name) }>
      <Tabs.Pane label="用户管理" name="1">用户管理</Tabs.Pane>
      <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
      <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
      <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
    </Tabs>
  )
}
```
:::

### 选项卡样式
选项卡样式的标签页。

:::demo 只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。

```js
render() {
  return (
    <Tabs type="card" activeName="1">
      <Tabs.Pane label="用户管理" name="1">用户管理</Tabs.Pane>
      <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
      <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
      <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
    </Tabs>
  )
}
```
:::

### 可关闭
可以关闭标签页。

:::demo 通过设置 `closable` 属性来打开 `Tabs` 的可关闭标签效果, `closable` 也可以设置在 `Tab Panel` 中实现部分标签页的可关闭效果。

```js
render() {
  return (
    <Tabs type="card" closable activeName="1" onTabRemove={ (tab) => console.log(tab.props.name) }>
      <Tabs.Pane label="用户管理" name="1">用户管理</Tabs.Pane>
      <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
      <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
      <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
    </Tabs>
  )
}
```
:::

### 卡片化
卡片化的标签页。

:::demo 将`type`设置为`border-card`。

```js
render() {
  return (
    <Tabs type="border-card" activeName="1">
      <Tabs.Pane label="用户管理" name="1">用户管理</Tabs.Pane>
      <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
      <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
      <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
    </Tabs>
  )
}
```
:::

### 自定义标签页
可以通过具名 slot 来实现自定义标签页的内容。

:::demo

```js
render() {
  const label = <span><Icon name="date" /> 用户管理</span>

  return (
    <Tabs type="border-card" activeName="1">
      <Tabs.Pane label={label} name="1">用户管理</Tabs.Pane>
      <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
      <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
      <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
    </Tabs>
  )
}
```
:::

### 动态添加标签页
展示如何通过触发器来动态增加标签页。

:::demo

```js
constructor() {
  super();
  this.state = {
    tabs: [{
      title: 'Tab 1',
      name: 'Tab 1',
      content: 'Tab 1 content',
    }, {
      title: 'Tab 2',
      name: 'Tab 2',
      content: 'Tab 2 content',
    }],
    tabIndex: 2,
  }
}

addTab() {
  const { tabs, tabIndex } = this.state;
  const index = tabIndex + 1;

  tabs.push({
    title: 'new Tab',
    name: 'Tab ' + index,
    content: 'new Tab content',
  })
  this.setState({
    tabs,
    tabIndex: index,
  });
}

render() {
  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        <Button size="small" onClick={() => this.addTab()}>add tab</Button>
      </div>
      <Tabs type="card">
        {
          this.state.tabs.map((item, index) => {
            return <Tabs.Pane key={index} closable label={item.title} name={item.name}>{item.content}</Tabs.Pane>
          })
        }
      </Tabs>
    </div>
  )
}
```
:::

### Tabs Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type          | 风格类型      | string         |   card, border-card            |    —     |
| closable          |  标签是否可关闭    | boolean  |  true, false             |     false    |
| activeName       | 选中选项卡的 name    | string  |  —  |  第一个选项卡的 name |
| value       | 绑定值，选中选项卡的name    | string  |  —  |  第一个选项卡的 name |

### Tabs Events
| 事件名称          | 说明            | 回调参数            |
|-------------  |---------------- |---------------- |
| onTabClick          |  tab 被选中的钩子      | 被选中的标签 tab         |
| onTabRemove          |    tab 被删除的钩子    | 被删除的标签 tab  |

### Tabs.Pane Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| label          | 选项卡标题      | string,node          |          —             |    —     |
| disabled       | 是否禁用    | boolean  |  —  |  false |
| name          |  与选项卡 activeName 对应的标识符，表示选项卡别名    | string  |         —              |     该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1'    |
| closable       | 标签是否可关闭    | boolean  |  —  |  false |
