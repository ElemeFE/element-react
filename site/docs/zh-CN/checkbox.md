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
constructor(props) {
  super(props);
  this.state = {
    checkList: ['复选框 A', '选中且禁用']
  }
}
render() {
  return (
    <Checkbox.Group options={this.state.checkList}>
      <Checkbox label="复选框 A"></Checkbox>
      <Checkbox label="复选框 B"></Checkbox>
      <Checkbox label="复选框 C"></Checkbox>
      <Checkbox label="禁用" disabled></Checkbox>
      <Checkbox label="选中且禁用" disabled></Checkbox>
    </Checkbox.Group>
  )
}
```
:::

### indeterminate状态

indeterminate属性用以表示checkbox的不确定状态，一般用于实现全选的效果

:::demo 设置indeterminate属性该表checkbox不确定状态.

```js
constructor(props) {
  super(props);
  this.state = {
    checkAll: false,
    cities: ['上海', '北京', '广州', '深圳'],
    checkedCities: ['上海', '北京'],
    isIndeterminate: true,
  }
}

handleCheckAllChange(e) {
  const checkedCities = e.target.checked ? ['上海', '北京', '广州', '深圳'] : [];
  this.setState({
    isIndeterminate: false,
    checkAll: e.target.checked,
    checkedCities: checkedCities,
  });
}

handleCheckedCitiesChange(value) {
  const checkedCount = value.length;
  const citiesLength = this.state.cities.length;
  this.setState({
    checkedCities: value,
    checkAll: checkedCount === citiesLength,
    isIndeterminate: checkedCount > 0 && checkedCount < citiesLength,
  });
}

render() {
  const cbItem = this.state.cities.map((city, index) => 
    <Checkbox key={index} label={city}></Checkbox>
  );
 
  return (
    <div>
      <Checkbox checked={this.state.checkAll} indeterminate={this.state.isIndeterminate} onChange={(e) => this.handleCheckAllChange(e)}>全选</Checkbox>
      <div style={{margin: '15px 0'}}></div>
      <Checkbox.Group 
        options={this.state.checkedCities} 
        onChange={(value) => this.handleCheckedCitiesChange(value)}>
        {cbItem}
      </Checkbox.Group>
    </div>
  )
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
| onChange  | 当绑定值变化时触发的事件 |  value 所有选中项  |
