## Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法

适用广泛的基础单选

:::demo `value`的值为当前被选中的`Option`的 value 属性值
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
    value: ''
  };
}

render() {
  return (
    <Select value={this.state.value}>
      {
        this.state.options.map(el => {
          return <Select.Option key={el.value} label={el.label} value={el.value} />
        })
      }
    </Select>
  )
}
```
:::

### 有禁用选项

:::demo 在`Option`中，设定`disabled`值为 true，即可禁用该选项
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶',
      disabled: true
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
    value: ''
  };
}

render() {
  return (
    <Select value={this.state.value}>
      {
        this.state.options.map(el => {
          return <Select.Option key={el.value} label={el.label} value={el.value} disabled={el.disabled} />
        })
      }
    </Select>
  )
}
```
:::

### 禁用状态

选择器不可用状态

:::demo 为`Select`设置`disabled`属性，则整个选择器不可用
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
    value: ''
  };
}

render() {
  return (
    <Select value={this.state.value} disabled={true}>
      {
        this.state.options.map(el => {
          return <Select.Option key={el.value} label={el.label} value={el.value} />
        })
      }
    </Select>
  )
}
```
:::

### 可清空单选

包含清空按钮，可将选择器清空为初始状态

:::demo 为`Select`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
    value: ''
  };
}

render() {
  return (
    <Select value={this.state.value} clearable={true}>
      {
        this.state.options.map(el => {
          return <Select.Option key={el.value} label={el.label} value={el.value} />
        })
      }
    </Select>
  )
}
```
:::

### 基础多选

适用性较广的基础多选，用 Tag 展示已选项

:::demo 为`Select`设置`multiple`属性即可启用多选，此时`value`的值为当前选中值所组成的数组
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
    value: []
  };
}

render() {
  return (
    <Select value={this.state.value} multiple={true}>
      {
        this.state.options.map(el => {
          return <Select.Option key={el.value} label={el.label} value={el.value} />
        })
      }
    </Select>
  )
}
```
:::

### 自定义模板

可以自定义备选项

:::demo 将自定义的 HTML 模板插入`Option`中即可。
```js
constructor(props) {
  super(props);

  this.state = {
    cities: [{
      value: 'Beijing',
      label: '北京'
    }, {
      value: 'Shanghai',
      label: '上海'
    }, {
      value: 'Nanjing',
      label: '南京'
    }, {
      value: 'Chengdu',
      label: '成都'
    }, {
      value: 'Shenzhen',
      label: '深圳'
    }, {
      value: 'Guangzhou',
      label: '广州'
    }],
    value: []
  };
}

render() {
  return (
    <Select value={this.state.value}>
      {
        this.state.cities.map(el => {
          return (
            <Select.Option key={el.value} label={el.label} value={el.value}>
              <span style={{float: 'left'}}>{el.label}</span>
              <span style={{float: 'right', color: '#8492a6', fontSize: 13}}>{el.value}</span>
            </Select.Option>
          )
        })
      }
    </Select>
  )
}
```
:::

### 分组

备选项进行分组展示

:::demo 使用`OptionGroup`对备选项进行分组，它的`label`属性为分组名
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      label: '热门城市',
      options: [{
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Beijing',
        label: '北京'
      }]
    }, {
      label: '城市名',
      options: [{
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }, {
        value: 'Dalian',
        label: '大连'
      }]
    }],
    value: ''
  };
}

render() {
  return (
    <Select value={this.state.value}>
      {
        this.state.options.map(group => {
          return (
            <Select.OptionGroup key={group.label} label={group.label}>
              {
                group.options.map(el => {
                  return (
                    <Select.Option key={el.value} label={el.label} value={el.value}>
                      <span style={{float: 'left'}}>{el.label}</span>
                      <span style={{float: 'right', color: '#8492a6', fontSize: 13}}>{el.value}</span>
                    </Select.Option>
                  )
                })
              }
            </Select.OptionGroup>
          )
        })
      }
    </Select>
  )
}
```
:::

### 可搜索

可以利用搜索功能快速查找选项

:::demo 为`Select`添加`filterable`属性即可启用搜索功能。默认情况下，Select 会找出所有`label`属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个`filterMethod`来实现。`filterMethod`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
    value: []
  };
}

render() {
  return (
    <Select value={this.state.value} filterable={true}>
      {
        this.state.options.map(el => {
          return <Select.Option key={el.value} label={el.label} value={el.value} />
        })
      }
    </Select>
  )
}
```
:::

### 远程搜索

从服务器搜索数据，输入关键字进行查找

:::demo 为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remoteMethod`。`remoteMethod`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。
```js
constructor(props) {
  super(props);

  this.state = {
    options: [],
    states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",   "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
    "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
  }
}

onSearch(query) {
  if (query !== '') {
    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        options: this.state.states.map(item => {
          return { value: item, label: item };
        }).filter(item => {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
      });
    }, 200);
  } else {
    this.setState({
      options: []
    });
  }
}

render() {
  return (
    <Select value={this.state.value} multiple={true} filterable={true} remote={true} remoteMethod={this.onSearch.bind(this)} loading={this.state.loading}>
      {
        this.state.options.map(el => {
          return <Select.Option key={el.value} label={el.label} value={el.value} />
        })
      }
    </Select>
  )
}
```
:::

### Select Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 单选时是否可以清空选项 | boolean | — | false |
| name | select input 的 name 属性 | string | — | — |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| filterMethod | 自定义过滤方法 | function | — | — |
| remote | 是否为远程搜索 | boolean | — | false |
| remoteMethod | 远程搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| onChange | 选中值发生变化时触发 | 目前的选中值 |
| onVisibleChange | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| onRemoveTag | 多选模式下移除tag时触发 | 移除的tag值 |
| onClear | 可清空的单选模式下用户点击清空按钮时触发 | - |

### Option Group Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 分组的组名 | string | — | — |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | — | false |

### Option Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 选项的值 | string/number/object | — | — |
| label | 选项的标签，若不设置则默认与 `value` 相同 | string/number | — | — |
| disabled | 是否禁用该选项 | boolean | — | false |
