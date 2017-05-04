## Transfer 穿梭框

### 基础用法
:::demo Transfer 的数据通过 `data` 属性传入。数据需要是一个对象数组，每个对象有以下属性：`key` 为数据的唯一性标识，`label` 为显示文本，`disabled` 表示该项数据是否禁止转移。目标列表中的数据项会同步到绑定至 `value` 的变量，值为数据项的 `key` 所组成的数组。当然，如果希望在初始状态时目标列表不为空，可以像本例一样为 `value` 绑定的变量赋予一个初始值。
```js
constructor(props) {
  super(props);
  this.state = {
    value: [1, 4]
  }
  this._handleChange = this.handleChange.bind(this);
}

get data() {
  const data = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `备选项 ${ i }`,
      disabled: i % 4 === 0
    });
  }
  return data;
}

handleChange(value) {
  this.setState({ value })
}

render() {
  const { value } = this.state;
  return <Transfer value={value} data={this.data} onChange={this._handleChange}></Transfer>
}

```
:::

### 可搜索

在数据很多的情况下，可以对数据进行搜索和过滤。

:::demo 设置 `filterable` 为 `true` 即可开启搜索模式。默认情况下，若数据项的 `label` 属性包含搜索关键字，则会在搜索结果中显示。你也可以使用 `filterMethod` 定义自己的搜索逻辑。`filterMethod` 接收一个方法，当搜索关键字变化时，会将当前的关键字和每个数据项传给该方法。若方法返回 `true`，则会在搜索结果中显示对应的数据项。
```js
constructor(props) {
  super(props);
  this.state = {
    value: []
  }

  this._handleChange = this.handleChange.bind(this);
  this._filterMethod = this.filterMethod.bind(this);
}

get data() {
  const data = [];
  const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
  const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
  cities.forEach((city, index) => {
    data.push({
      label: city,
      key: index,
      pinyin: pinyin[index]
    });
  });
  return data;
}

filterMethod(query, item) {
  return item.pinyin.indexOf(query) > -1;
}

handleChange(value) {
  this.setState({ value })
}

render() {
  const { value } = this.state;
  return (
    <Transfer
      filterable
      filterMethod={this._filterMethod}
      filterPlaceholder="请输入城市拼音"
      value={value}
      onChange={this._handleChange}
      data={this.data}>
    </Transfer>
  )
}

```
:::

### 可自定义

可以对列表标题文案、按钮文案、数据项的渲染函数、列表底部的勾选状态文案、列表底部的内容区等进行自定义。

:::demo 可以使用 `titles`、`buttonTexts`、`renderContent` 和 `footerFormat` 属性分别对列表标题文案、按钮文案、数据项的渲染函数和列表底部的勾选状态文案进行自定义。对于列表底部的内容区，提供了两个属性：`leftFooter` 和 `rightFooter`。此外，如果希望某些数据项在初始化时就被勾选，可以使用 `leftDefaultChecked` 和 `rightDefaultChecked` 属性。最后，本例还展示了 `onChange` 事件的用法。
```js
constructor(props) {
  super(props);
  this.state = {
    value: [1]
  }

  this._handleChange = this.handleChange.bind(this);
  this._filterMethod = this.filterMethod.bind(this);
  this._renderFunc = this.renderFunc.bind(this);
}

get data() {
  const data = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `备选项 ${ i }`,
      disabled: i % 4 === 0
    });
  }
  return data;
}

filterMethod(query, item) {
  return item.label.indexOf(query) > -1;
}

handleChange(value) {
  this.setState({ value })
}

renderFunc(option) {
  return <span>{ option.key } - { option.label }</span>;
}

get style() {
  return {
    marginLeft: '20px',
    padding: '6px 5px'
  }
}

render() {
  const { value } = this.state;

  return (
    <Transfer
      value={value}
      filterable
      leftDefaultChecked={[2, 3]}
      rightDefaultChecked={[1]}
      renderContent={this.renderFunc}
      titles={['Source', 'Target']}
      buttonTexts={['到左边', '到右边']}
      footerFormat={{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }}
      onChange={this._handleChange}
      data={this.data}
      leftFooter={
        <Button style={this.style} size="small">操作</Button>
      }
      rightFooter={
        <Button style={this.style} size="small">操作</Button>
      }
    >
    </Transfer>
  )
}

```
:::

### 数据项属性别名

默认情况下，Transfer 仅能识别数据项中的 `key`、`label` 和 `disabled` 字段。如果你的数据的字段名不同，可以使用 `propsAlias` 属性为它们设置别名。
:::demo 本例中的数据源没有 `key` 和 `label` 字段，在功能上与它们相同的字段名为 `value` 和 `desc`。因此可以使用`props` 属性为 `key` 和 `label` 设置别名。
```js

constructor(props) {
  super(props);
  this.state = {
    value: []
  }

  this._handleChange = this.handleChange.bind(this);
}

get data() {
  const data = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      value: i,
      desc: `备选项 ${ i }`,
      disabled: i % 4 === 0
    });
  }
  return data;
}

handleChange(value, direction, movedKeys) {
  console.log(value, direction, movedKeys);
  this.setState({ value })
}

render() {
  const { value } = this.state;
  return (
    <Transfer
      value={value}
      propsAlias={{
        key: 'value',
        label: 'desc'
      }}
      data={this.data}
      onChange={this._handleChange}
      >
    </Transfer>
  )
}

```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data | Transfer 的数据源 | array[{ key, label, disabled }] | — | [ ] |
| filterable | 是否可搜索 | boolean | — | false |
| filterPlaceholder | 搜索框占位符 | string | — | 请输入搜索内容 |
| filterMethod | 自定义搜索方法 | function | — | — |
| titles | 自定义列表标题 | array | — | ['列表 1', '列表 2'] |
| buttonTexts | 自定义按钮文案 | array | — | [ ] |
| renderContent | 自定义数据项渲染函数 | function(h, option) | — | — |
| footerFormat | 列表底部勾选状态文案 | object{noChecked, hasChecked} | — | { noChecked: '共 ${total} 项', hasChecked: '已选 ${checked}/${total} 项' } |
| propsAlias | 数据源的字段别名 | object{key, label, disabled} | — | — |
| leftDefaultChecked | 初始状态下左侧列表的已勾选项的 key 数组 | array | — | [ ] |
| rightDefaultChecked | 初始状态下右侧列表的已勾选项的 key 数组 | array | — | [ ] |
| leftFooter | 左侧列表底部的内容 | ReactElement | — | - |
| rightFooter | 右侧列表底部的内容 | ReactElement | — | - |


### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange | 右侧列表元素变化时触发 | 当前值、数据移动的方向（'left' / 'right'）、发生移动的数据 key 数组 |
