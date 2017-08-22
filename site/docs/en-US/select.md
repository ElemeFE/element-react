## Select

When there are plenty of options, use a drop-down menu to display and select desired ones.

### Basic usage

:::demo `value` is the value of `Option` that is currently selected.

```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: 'Option1',
      label: 'Option1'
    }, {
      value: 'Option2',
      label: 'Option2'
    }, {
      value: 'Option3',
      label: 'Option3'
    }, {
      value: 'Option4',
      label: 'Option4'
    }, {
      value: 'Option5',
      label: 'Option5'
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

### Disabled option

:::demo Set the value of `disabled` in `Option` to `true` to disable this option.

```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: 'Option1',
      label: 'Option1'
    }, {
      value: 'Option2',
      label: 'Option2',
      disabled: true
    }, {
      value: 'Option3',
      label: 'Option3'
    }, {
      value: 'Option4',
      label: 'Option4'
    }, {
      value: 'Option5',
      label: 'Option5'
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

### Disabled select

Disable the whole component.

:::demo Set `disabled` of `Select` to make it disabled.
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

### Clearable single select

You can clear Select using a clear icon.

:::demo Set `clearable` attribute for `Select` and a clear icon will appear. Note that `clearable` is only for single select.
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: 'Option1',
      label: 'Option1'
    }, {
      value: 'Option2',
      label: 'Option2'
    }, {
      value: 'Option3',
      label: 'Option3'
    }, {
      value: 'Option4',
      label: 'Option4'
    }, {
      value: 'Option5',
      label: 'Option5'
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

### Basic multiple select

Multiple select uses tags to display selected options.

:::demo Set `multiple` attribute for `Select` to enable multiple mode. In this case, the value of `value` will be an array of selected options.
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: 'Option1',
      label: 'Option1'
    }, {
      value: 'Option2',
      label: 'Option2'
    }, {
      value: 'Option3',
      label: 'Option3'
    }, {
      value: 'Option4',
      label: 'Option4'
    }, {
      value: 'Option5',
      label: 'Option5'
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

### Custom template

You can customize HTML templates for options.

:::demo Insert customized HTML templates into `Option`.

```js
constructor(props) {
  super(props);

  this.state = {
    cities: [{
      value: 'Beijing',
      label: 'Beijing'
    }, {
      value: 'Shanghai',
      label: 'Shanghai'
    }, {
      value: 'Nanjing',
      label: 'Nanjing'
    }, {
      value: 'Chengdu',
      label: 'Chengdu'
    }, {
      value: 'Shenzhen',
      label: 'Shenzhen'
    }, {
      value: 'Guangzhou',
      label: 'Guangzhou'
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

### Grouping

Display options in groups.

:::demo Use `OptionGroup` to group the options, and its `label` attribute stands for the name of the group.

```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      label: 'Popular cities',
      options: [{
        value: 'Shanghai',
        label: 'Shanghai'
      }, {
        value: 'Beijing',
        label: 'Beijing'
      }]
    }, {
      label: 'City name',
      options: [{
        value: 'Chengdu',
        label: 'Chengdu'
      }, {
        value: 'Shenzhen',
        label: 'Shenzhen'
      }, {
        value: 'Guangzhou',
        label: 'Guangzhou'
      }, {
        value: 'Dalian',
        label: 'Dalian'
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

### Option filtering

You can filter options for your desired ones.

:::demo Adding `filterable` to `Select` enables filtering. By default, Select will find all the options whose `label` attribute contains the input value. If you prefer other filtering strategies, you can pass the `filterMethod`. `filterMethod` is a `Function` that gets called when the input value changes, and its parameter is the current input value.
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: 'Option1',
      label: 'Option1'
    }, {
      value: 'Option2',
      label: 'Option2'
    }, {
      value: 'Option3',
      label: 'Option3'
    }, {
      value: 'Option4',
      label: 'Option4'
    }, {
      value: 'Option5',
      label: 'Option5'
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

### Remote Search

Enter keywords and search data from server.

:::demo Set the value of `filterable` and `remote` with `true` to enable remote search, and you should pass the `remoteMethod`. `remoteMethod` is a `Function` that gets called when the input value changes, and its parameter is the current input value.

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
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| multiple | whether multiple-select is activated | boolean | — | false |
| disabled | whether Select is disabled | boolean | — | false |
| size | size of Input | string | large/small/mini | — |
| clearable | whether single select can be cleared | boolean | — | false |
| multipleLimit | maximum number of options user can select when `multiple` is `true`. No limit when set to 0 | number | — | 0 |
| name | the name attribute of select input | string | — | — |
| placeholder | placeholder | string | — | Select |
| filterable | whether Select is filterable | boolean | — | false |
| allowCreate | whether creating new items is allowed. To use this, `filterable` must be true | boolean | — | false |
| filterMethod | custom filter method | function | — | — |
| remote | whether options are loaded from server | boolean | — | false |
| remoteMethod | custom remote search method | function | — | — |
| loading | whether Select is loading data from server | boolean | — | false |
| loadingText | displayed text while loading data from server | string | — | Loading |
| noMatchText | displayed text when no data matches the filtering query | string | — | No matching data |
| noDataText | displayed text when there is no options | string | — | No data |
| popperClass | custom class name for Select's dropdown | string | — | — |

### Select Events
| Event Name | Description | Parameters |
|---------|---------|---------|
| onChange | triggers when the selected value changes | current selected value |
| onVisibleChange | triggers when the dropdown appears/disappears | true when it appears, and false otherwise |
| onRemoveTag | triggers when a tag is removed in multiple mode | removed tag value |
| onClear | triggers when the clear icon is clicked in a clearable Select | - |

### Option Group Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | name of the group | string | — | — |
| disabled | whether to disable all options in this group | boolean | — | false |

### Option Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | value of option | string/number/object | — | — |
| label | label of option, same as `value` if omitted | string/number | — | — |
| disabled | whether option is disabled | boolean | — | false |
