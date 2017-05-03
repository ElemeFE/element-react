## Checkbox 多选框

一组备选项中进行多选

### 基础用法

单独使用可以表示两种状态之间的切换。

:::demo 简单的Checkbox，使用`checked`切换选中状态。
```js
render() {
  return <Checkbox checked>备选项</Checkbox>
}
```
:::

### 禁用状态

多选框不可用状态。

:::demo 设置`disabled`属性即可。

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

:::demo Checkbox.Group元素能把多个 checkbox 管理为一组，只需要在 Group 中使用`value`绑定Array类型的变量即可，`label`属性除了改变 checkbox 按钮后的介绍外，同时也是该 checkbox 对应的值，`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。

```js
constructor(props) {
  super(props);

  this.state = {
    checkList: ['复选框 A', '选中且禁用']
  }
}
render() {
  return (
    <Checkbox.Group value={this.state.checkList}>
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

`indeterminate`属性用以表示checkbox的不确定状态，一般用于实现全选的效果

:::demo 设置`indeterminate`属性该表checkbox不确定状态.

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

handleCheckAllChange(checked) {
  const checkedCities = checked ? ['上海', '北京', '广州', '深圳'] : [];

  this.setState({
    isIndeterminate: false,
    checkAll: checked,
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
  return (
    <div>
      <Checkbox
        checked={this.state.checkAll}
        indeterminate={this.state.isIndeterminate}
        onChange={this.handleCheckAllChange.bind(this)}>全选</Checkbox>
      <div style={{margin: '15px 0'}}></div>
      <Checkbox.Group
        value={this.state.checkedCities}
        onChange={this.handleCheckedCitiesChange.bind(this)}>
        {
          this.state.cities.map((city, index) =>
            <Checkbox key={index} label={city}></Checkbox>
          )
        }
      </Checkbox.Group>
    </div>
  )
}
```
:::

### 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

:::demo

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

handleCheckAllChange(checked) {
  const checkedCities = checked ? ['上海', '北京', '广州', '深圳'] : [];

  this.setState({
    isIndeterminate: false,
    checkAll: checked,
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
  return (
    <div>
      <Checkbox
        checked={this.state.checkAll}
        indeterminate={this.state.isIndeterminate}
        onChange={this.handleCheckAllChange.bind(this)}>全选</Checkbox>
      <div style={{margin: '15px 0'}}></div>
      <Checkbox.Group
        min="1"
        max="2"
        value={this.state.checkedCities}
        onChange={this.handleCheckedCitiesChange.bind(this)}>
        {
          this.state.cities.map((city, index) =>
            <Checkbox key={index} label={city}></Checkbox>
          )
        }
      </Checkbox.Group>
    </div>
  )
}
```
:::

### 按钮样式

按钮样式的多选组合。

:::demo 只需要把`Checkbox`元素替换为`Checkbox.Button`元素即可。此外，Element 还提供了`size`属性，支持`large`和`small`两种。
```js
constructor(props) {
  super(props);

  this.state = {
    cities: ['上海', '北京', '广州', '深圳'],
    checkboxGroup1: ['上海'],
    checkboxGroup2: ['北京'],
    checkboxGroup3: ['广州']
  }
}

render() {
  return (
    <div>
      <div style={{margin: '15px 0'}}></div>
      <Checkbox.Group value={this.state.checkboxGroup1}>
        {
          this.state.cities.map((city, index) => {
            return <Checkbox.Button key={index} label={city}>{city}</Checkbox.Button>
          })
        }
      </Checkbox.Group>
      <div style={{margin: '15px 0'}}></div>
      <Checkbox.Group value={this.state.checkboxGroup2} size="small">
        {
          this.state.cities.map((city, index) => {
            return <Checkbox.Button key={index} label={city} disabled={city === '深圳'}>{city}</Checkbox.Button>
          })
        }
      </Checkbox.Group>
      <div style={{margin: '15px 0'}}></div>
      <Checkbox.Group value={this.state.checkboxGroup3} size="large" fill="#324057" textColor="#a4aebd" min="1" max="3">
        {
          this.state.cities.map((city, index) => {
            return <Checkbox.Button key={index} label={city}>{city}</Checkbox.Button>
          })
        }
      </Checkbox.Group>
    </div>
  )
}
```
:::

### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选中状态的值（只有在`Checkbox.Group`或者绑定对象类型为`array`时有效）| string    |       —        |     —    |
| trueLabel | 选中时的值   | string, number | — |     —    |
| falseLabel | 没有选中时的值   | string, number    |      —         |     —    |
| disabled  | 按钮禁用    | boolean   |  — | false   |
| checked  | 当前是否勾选    | boolean   |  — | false   |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制    | boolean   |  — | false   |

### Checkbox.Group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | Checkbox 按钮组尺寸   | string  | large, small  |    —     |
| fill  | 按钮激活时的填充色和边框色    | string   | — | #20a0ff   |
| textColor  | 按钮激活时的文本颜色    | string   | — | #ffffff   |
| min     | 可被勾选的 checkbox 的最大数量   | number    |       —        |     —    |
| max     | 可被勾选的 checkbox 的最小数量   | number    |       —        |     —    |

### Checkbox.Group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange  | 当绑定值变化时触发的事件 | value |
