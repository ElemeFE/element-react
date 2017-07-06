## Cascader

If the options have a clear hierarchical structure, Cascader can be used to view and select them.

### Basic usage

There are two ways to expand child option items.

:::demo Assigning the `options` attribute to an array of options renders a Cascader. The `expandTrigger` attribute defines how child options are expanded. This example also demonstrates the `onChange` event, whose parameter is the value of Cascader, an array made up of the values of each selected level.
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: 'guide',
      label: 'Guide',
      children: [{
        value: 'disciplines',
        label: 'Disciplines',
        children: [{
          value: 'consistency',
          label: 'Consistency'
        }, {
          value: 'feedback',
          label: 'Feedback'
        }, {
          value: 'efficiency',
          label: 'Efficiency'
        }, {
          value: 'controllability',
          label: 'Controllability'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'side nav',
          label: 'Side Navigation'
        }, {
          value: 'top nav',
          label: 'Top Navigation'
        }]
      }]
    }, {
      value: 'component',
      label: 'Component',
      children: [{
        value: 'basic',
        label: 'Basic',
        children: [{
          value: 'layout',
          label: 'Layout'
        }, {
          value: 'color',
          label: 'Color'
        }, {
          value: 'typography',
          label: 'Typography'
        }, {
          value: 'icon',
          label: 'Icon'
        }, {
          value: 'button',
          label: 'Button'
        }]
      }, {
        value: 'form',
        label: 'Form',
        children: [{
          value: 'radio',
          label: 'Radio'
        }, {
          value: 'checkbox',
          label: 'Checkbox'
        }, {
          value: 'input',
          label: 'Input'
        }, {
          value: 'input-number',
          label: 'InputNumber'
        }, {
          value: 'select',
          label: 'Select'
        }, {
          value: 'cascader',
          label: 'Cascader'
        }, {
          value: 'switch',
          label: 'Switch'
        }, {
          value: 'slider',
          label: 'Slider'
        }, {
          value: 'time-picker',
          label: 'TimePicker'
        }, {
          value: 'date-picker',
          label: 'DatePicker'
        }, {
          value: 'datetime-picker',
          label: 'DateTimePicker'
        }, {
          value: 'upload',
          label: 'Upload'
        }, {
          value: 'rate',
          label: 'Rate'
        }, {
          value: 'form',
          label: 'Form'
        }]
      }, {
        value: 'data',
        label: 'Data',
        children: [{
          value: 'table',
          label: 'Table'
        }, {
          value: 'tag',
          label: 'Tag'
        }, {
          value: 'progress',
          label: 'Progress'
        }, {
          value: 'tree',
          label: 'Tree'
        }, {
          value: 'pagination',
          label: 'Pagination'
        }, {
          value: 'badge',
          label: 'Badge'
        }]
      }, {
        value: 'notice',
        label: 'Notice',
        children: [{
          value: 'alert',
          label: 'Alert'
        }, {
          value: 'loading',
          label: 'Loading'
        }, {
          value: 'message',
          label: 'Message'
        }, {
          value: 'message-box',
          label: 'MessageBox'
        }, {
          value: 'notification',
          label: 'Notification'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'menu',
          label: 'NavMenu'
        }, {
          value: 'tabs',
          label: 'Tabs'
        }, {
          value: 'breadcrumb',
          label: 'Breadcrumb'
        }, {
          value: 'dropdown',
          label: 'Dropdown'
        }, {
          value: 'steps',
          label: 'Steps'
        }]
      }, {
        value: 'others',
        label: 'Others',
        children: [{
          value: 'dialog',
          label: 'Dialog'
        }, {
          value: 'tooltip',
          label: 'Tooltip'
        }, {
          value: 'popover',
          label: 'Popover'
        }, {
          value: 'card',
          label: 'Card'
        }, {
          value: 'carousel',
          label: 'Carousel'
        }, {
          value: 'collapse',
          label: 'Collapse'
        }]
      }]
    }, {
      value: 'resource',
      label: 'Resource',
      children: [{
        value: 'axure',
        label: 'Axure Components'
      }, {
        value: 'sketch',
        label: 'Sketch Templates'
      }, {
        value: 'docs',
        label: 'Design Documentation'
      }]
    }],
    selectedOptions: [],
    selectedOptions2: []
  }
}

handleChange(key, value) {
  this.setState({ [key]: value });

  console.log(value);
}

render() {
  return (
    <div>
      <div className="block">
        <span className="demonstration">Child options expand when clicked (default)</span>
        <Cascader
          options={this.state.options}
          value={this.state.selectedOptions}
          onChange={this.handleChange.bind(this, 'selectedOptions')} />
      </div>
      <div className="block">
        <span className="demonstration">Child options expand when hovered</span>
        <Cascader
          options={this.state.options}
          expandTrigger="hover"
          value={this.state.selectedOptions2}
          onChange={this.handleChange.bind(this, 'selectedOptions2')} />
      </div>
    </div>
  )
}
```
:::

### Disabled option

Disable an option by setting a `disabled` field in the option object.

:::demo In this example, the first item in `options` array has a `disabled: true` field, so it is disabled. By default, Cascader checks the `disabled` field in each option object; if you are using another field name to indicate whether an option is disabled, you can assign it in the `props` attribute (see the API table below for details). And of course, field name `value`, `label` and `children` can also be customized in the same way.
```js
constructor(props) {
  super(props);

  this.state = {
    optionsWithDisabled: [{
      value: 'guide',
      label: 'Guide',
      disabled: true,
      children: [{
        value: 'disciplines',
        label: 'Disciplines',
        children: [{
          value: 'consistency',
          label: 'Consistency'
        }, {
          value: 'feedback',
          label: 'Feedback'
        }, {
          value: 'efficiency',
          label: 'Efficiency'
        }, {
          value: 'controllability',
          label: 'Controllability'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'side nav',
          label: 'Side Navigation'
        }, {
          value: 'top nav',
          label: 'Top Navigation'
        }]
      }]
    }, {
      value: 'component',
      label: 'Component',
      children: [{
        value: 'basic',
        label: 'Basic',
        children: [{
          value: 'layout',
          label: 'Layout'
        }, {
          value: 'color',
          label: 'Color'
        }, {
          value: 'typography',
          label: 'Typography'
        }, {
          value: 'icon',
          label: 'Icon'
        }, {
          value: 'button',
          label: 'Button'
        }]
      }, {
        value: 'form',
        label: 'Form',
        children: [{
          value: 'radio',
          label: 'Radio'
        }, {
          value: 'checkbox',
          label: 'Checkbox'
        }, {
          value: 'input',
          label: 'Input'
        }, {
          value: 'input-number',
          label: 'InputNumber'
        }, {
          value: 'select',
          label: 'Select'
        }, {
          value: 'cascader',
          label: 'Cascader'
        }, {
          value: 'switch',
          label: 'Switch'
        }, {
          value: 'slider',
          label: 'Slider'
        }, {
          value: 'time-picker',
          label: 'TimePicker'
        }, {
          value: 'date-picker',
          label: 'DatePicker'
        }, {
          value: 'datetime-picker',
          label: 'DateTimePicker'
        }, {
          value: 'upload',
          label: 'Upload'
        }, {
          value: 'rate',
          label: 'Rate'
        }, {
          value: 'form',
          label: 'Form'
        }]
      }, {
        value: 'data',
        label: 'Data',
        children: [{
          value: 'table',
          label: 'Table'
        }, {
          value: 'tag',
          label: 'Tag'
        }, {
          value: 'progress',
          label: 'Progress'
        }, {
          value: 'tree',
          label: 'Tree'
        }, {
          value: 'pagination',
          label: 'Pagination'
        }, {
          value: 'badge',
          label: 'Badge'
        }]
      }, {
        value: 'notice',
        label: 'Notice',
        children: [{
          value: 'alert',
          label: 'Alert'
        }, {
          value: 'loading',
          label: 'Loading'
        }, {
          value: 'message',
          label: 'Message'
        }, {
          value: 'message-box',
          label: 'MessageBox'
        }, {
          value: 'notification',
          label: 'Notification'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'menu',
          label: 'NavMenu'
        }, {
          value: 'tabs',
          label: 'Tabs'
        }, {
          value: 'breadcrumb',
          label: 'Breadcrumb'
        }, {
          value: 'dropdown',
          label: 'Dropdown'
        }, {
          value: 'steps',
          label: 'Steps'
        }]
      }, {
        value: 'others',
        label: 'Others',
        children: [{
          value: 'dialog',
          label: 'Dialog'
        }, {
          value: 'tooltip',
          label: 'Tooltip'
        }, {
          value: 'popover',
          label: 'Popover'
        }, {
          value: 'card',
          label: 'Card'
        }, {
          value: 'carousel',
          label: 'Carousel'
        }, {
          value: 'collapse',
          label: 'Collapse'
        }]
      }]
    }, {
      value: 'resource',
      label: 'Resource',
      children: [{
        value: 'axure',
        label: 'Axure Components'
      }, {
        value: 'sketch',
        label: 'Sketch Templates'
      }, {
        value: 'docs',
        label: 'Design Documentation'
      }]
    }]
  };
}

render() {
  return (
    <Cascader
      options={this.state.optionsWithDisabled}
    />
  )
}
```
:::

### Display only the last level

The input can display only the last level instead of all levels.

:::demo The `show-all-levels` attribute defines if all levels are displayed. If it is `false`, only the last level is displayed.
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: 'guide',
      label: 'Guide',
      children: [{
        value: 'disciplines',
        label: 'Disciplines',
        children: [{
          value: 'consistency',
          label: 'Consistency'
        }, {
          value: 'feedback',
          label: 'Feedback'
        }, {
          value: 'efficiency',
          label: 'Efficiency'
        }, {
          value: 'controllability',
          label: 'Controllability'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'side nav',
          label: 'Side Navigation'
        }, {
          value: 'top nav',
          label: 'Top Navigation'
        }]
      }]
    }, {
      value: 'component',
      label: 'Component',
      children: [{
        value: 'basic',
        label: 'Basic',
        children: [{
          value: 'layout',
          label: 'Layout'
        }, {
          value: 'color',
          label: 'Color'
        }, {
          value: 'typography',
          label: 'Typography'
        }, {
          value: 'icon',
          label: 'Icon'
        }, {
          value: 'button',
          label: 'Button'
        }]
      }, {
        value: 'form',
        label: 'Form',
        children: [{
          value: 'radio',
          label: 'Radio'
        }, {
          value: 'checkbox',
          label: 'Checkbox'
        }, {
          value: 'input',
          label: 'Input'
        }, {
          value: 'input-number',
          label: 'InputNumber'
        }, {
          value: 'select',
          label: 'Select'
        }, {
          value: 'cascader',
          label: 'Cascader'
        }, {
          value: 'switch',
          label: 'Switch'
        }, {
          value: 'slider',
          label: 'Slider'
        }, {
          value: 'time-picker',
          label: 'TimePicker'
        }, {
          value: 'date-picker',
          label: 'DatePicker'
        }, {
          value: 'datetime-picker',
          label: 'DateTimePicker'
        }, {
          value: 'upload',
          label: 'Upload'
        }, {
          value: 'rate',
          label: 'Rate'
        }, {
          value: 'form',
          label: 'Form'
        }]
      }, {
        value: 'data',
        label: 'Data',
        children: [{
          value: 'table',
          label: 'Table'
        }, {
          value: 'tag',
          label: 'Tag'
        }, {
          value: 'progress',
          label: 'Progress'
        }, {
          value: 'tree',
          label: 'Tree'
        }, {
          value: 'pagination',
          label: 'Pagination'
        }, {
          value: 'badge',
          label: 'Badge'
        }]
      }, {
        value: 'notice',
        label: 'Notice',
        children: [{
          value: 'alert',
          label: 'Alert'
        }, {
          value: 'loading',
          label: 'Loading'
        }, {
          value: 'message',
          label: 'Message'
        }, {
          value: 'message-box',
          label: 'MessageBox'
        }, {
          value: 'notification',
          label: 'Notification'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'menu',
          label: 'NavMenu'
        }, {
          value: 'tabs',
          label: 'Tabs'
        }, {
          value: 'breadcrumb',
          label: 'Breadcrumb'
        }, {
          value: 'dropdown',
          label: 'Dropdown'
        }, {
          value: 'steps',
          label: 'Steps'
        }]
      }, {
        value: 'others',
        label: 'Others',
        children: [{
          value: 'dialog',
          label: 'Dialog'
        }, {
          value: 'tooltip',
          label: 'Tooltip'
        }, {
          value: 'popover',
          label: 'Popover'
        }, {
          value: 'card',
          label: 'Card'
        }, {
          value: 'carousel',
          label: 'Carousel'
        }, {
          value: 'collapse',
          label: 'Collapse'
        }]
      }]
    }, {
      value: 'resource',
      label: 'Resource',
      children: [{
        value: 'axure',
        label: 'Axure Components'
      }, {
        value: 'sketch',
        label: 'Sketch Templates'
      }, {
        value: 'docs',
        label: 'Design Documentation'
      }]
    }]
  }
}

render() {
  return (
    <Cascader
      options={this.state.options}
      showAllLevels={false}
    />
  )
}
```
:::

### With default value

:::demo The default value can be defined with an array.
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: 'guide',
      label: 'Guide',
      children: [{
        value: 'disciplines',
        label: 'Disciplines',
        children: [{
          value: 'consistency',
          label: 'Consistency'
        }, {
          value: 'feedback',
          label: 'Feedback'
        }, {
          value: 'efficiency',
          label: 'Efficiency'
        }, {
          value: 'controllability',
          label: 'Controllability'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'side nav',
          label: 'Side Navigation'
        }, {
          value: 'top nav',
          label: 'Top Navigation'
        }]
      }]
    }, {
      value: 'component',
      label: 'Component',
      children: [{
        value: 'basic',
        label: 'Basic',
        children: [{
          value: 'layout',
          label: 'Layout'
        }, {
          value: 'color',
          label: 'Color'
        }, {
          value: 'typography',
          label: 'Typography'
        }, {
          value: 'icon',
          label: 'Icon'
        }, {
          value: 'button',
          label: 'Button'
        }]
      }, {
        value: 'form',
        label: 'Form',
        children: [{
          value: 'radio',
          label: 'Radio'
        }, {
          value: 'checkbox',
          label: 'Checkbox'
        }, {
          value: 'input',
          label: 'Input'
        }, {
          value: 'input-number',
          label: 'InputNumber'
        }, {
          value: 'select',
          label: 'Select'
        }, {
          value: 'cascader',
          label: 'Cascader'
        }, {
          value: 'switch',
          label: 'Switch'
        }, {
          value: 'slider',
          label: 'Slider'
        }, {
          value: 'time-picker',
          label: 'TimePicker'
        }, {
          value: 'date-picker',
          label: 'DatePicker'
        }, {
          value: 'datetime-picker',
          label: 'DateTimePicker'
        }, {
          value: 'upload',
          label: 'Upload'
        }, {
          value: 'rate',
          label: 'Rate'
        }, {
          value: 'form',
          label: 'Form'
        }]
      }, {
        value: 'data',
        label: 'Data',
        children: [{
          value: 'table',
          label: 'Table'
        }, {
          value: 'tag',
          label: 'Tag'
        }, {
          value: 'progress',
          label: 'Progress'
        }, {
          value: 'tree',
          label: 'Tree'
        }, {
          value: 'pagination',
          label: 'Pagination'
        }, {
          value: 'badge',
          label: 'Badge'
        }]
      }, {
        value: 'notice',
        label: 'Notice',
        children: [{
          value: 'alert',
          label: 'Alert'
        }, {
          value: 'loading',
          label: 'Loading'
        }, {
          value: 'message',
          label: 'Message'
        }, {
          value: 'message-box',
          label: 'MessageBox'
        }, {
          value: 'notification',
          label: 'Notification'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'menu',
          label: 'NavMenu'
        }, {
          value: 'tabs',
          label: 'Tabs'
        }, {
          value: 'breadcrumb',
          label: 'Breadcrumb'
        }, {
          value: 'dropdown',
          label: 'Dropdown'
        }, {
          value: 'steps',
          label: 'Steps'
        }]
      }, {
        value: 'others',
        label: 'Others',
        children: [{
          value: 'dialog',
          label: 'Dialog'
        }, {
          value: 'tooltip',
          label: 'Tooltip'
        }, {
          value: 'popover',
          label: 'Popover'
        }, {
          value: 'card',
          label: 'Card'
        }, {
          value: 'carousel',
          label: 'Carousel'
        }, {
          value: 'collapse',
          label: 'Collapse'
        }]
      }]
    }, {
      value: 'resource',
      label: 'Resource',
      children: [{
        value: 'axure',
        label: 'Axure Components'
      }, {
        value: 'sketch',
        label: 'Sketch Templates'
      }, {
        value: 'docs',
        label: 'Design Documentation'
      }]
    }],
    selectedOptions3: ['component', 'data', 'tag']
  }
}

render() {
  return (
    <Cascader
      options={this.state.options}
      value={this.state.selectedOptions3}
    />
  )
}
```
:::

### Change on select

Parent options can also be selected.

:::demo By default only the options in the last level can be selected. By assigning `change-on-select` to `true`, options in parent levels can also be selected.
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: 'guide',
      label: 'Guide',
      children: [{
        value: 'disciplines',
        label: 'Disciplines',
        children: [{
          value: 'consistency',
          label: 'Consistency'
        }, {
          value: 'feedback',
          label: 'Feedback'
        }, {
          value: 'efficiency',
          label: 'Efficiency'
        }, {
          value: 'controllability',
          label: 'Controllability'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'side nav',
          label: 'Side Navigation'
        }, {
          value: 'top nav',
          label: 'Top Navigation'
        }]
      }]
    }, {
      value: 'component',
      label: 'Component',
      children: [{
        value: 'basic',
        label: 'Basic',
        children: [{
          value: 'layout',
          label: 'Layout'
        }, {
          value: 'color',
          label: 'Color'
        }, {
          value: 'typography',
          label: 'Typography'
        }, {
          value: 'icon',
          label: 'Icon'
        }, {
          value: 'button',
          label: 'Button'
        }]
      }, {
        value: 'form',
        label: 'Form',
        children: [{
          value: 'radio',
          label: 'Radio'
        }, {
          value: 'checkbox',
          label: 'Checkbox'
        }, {
          value: 'input',
          label: 'Input'
        }, {
          value: 'input-number',
          label: 'InputNumber'
        }, {
          value: 'select',
          label: 'Select'
        }, {
          value: 'cascader',
          label: 'Cascader'
        }, {
          value: 'switch',
          label: 'Switch'
        }, {
          value: 'slider',
          label: 'Slider'
        }, {
          value: 'time-picker',
          label: 'TimePicker'
        }, {
          value: 'date-picker',
          label: 'DatePicker'
        }, {
          value: 'datetime-picker',
          label: 'DateTimePicker'
        }, {
          value: 'upload',
          label: 'Upload'
        }, {
          value: 'rate',
          label: 'Rate'
        }, {
          value: 'form',
          label: 'Form'
        }]
      }, {
        value: 'data',
        label: 'Data',
        children: [{
          value: 'table',
          label: 'Table'
        }, {
          value: 'tag',
          label: 'Tag'
        }, {
          value: 'progress',
          label: 'Progress'
        }, {
          value: 'tree',
          label: 'Tree'
        }, {
          value: 'pagination',
          label: 'Pagination'
        }, {
          value: 'badge',
          label: 'Badge'
        }]
      }, {
        value: 'notice',
        label: 'Notice',
        children: [{
          value: 'alert',
          label: 'Alert'
        }, {
          value: 'loading',
          label: 'Loading'
        }, {
          value: 'message',
          label: 'Message'
        }, {
          value: 'message-box',
          label: 'MessageBox'
        }, {
          value: 'notification',
          label: 'Notification'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'menu',
          label: 'NavMenu'
        }, {
          value: 'tabs',
          label: 'Tabs'
        }, {
          value: 'breadcrumb',
          label: 'Breadcrumb'
        }, {
          value: 'dropdown',
          label: 'Dropdown'
        }, {
          value: 'steps',
          label: 'Steps'
        }]
      }, {
        value: 'others',
        label: 'Others',
        children: [{
          value: 'dialog',
          label: 'Dialog'
        }, {
          value: 'tooltip',
          label: 'Tooltip'
        }, {
          value: 'popover',
          label: 'Popover'
        }, {
          value: 'card',
          label: 'Card'
        }, {
          value: 'carousel',
          label: 'Carousel'
        }, {
          value: 'collapse',
          label: 'Collapse'
        }]
      }]
    }, {
      value: 'resource',
      label: 'Resource',
      children: [{
        value: 'axure',
        label: 'Axure Components'
      }, {
        value: 'sketch',
        label: 'Sketch Templates'
      }, {
        value: 'docs',
        label: 'Design Documentation'
      }]
    }]
  };
}

render() {
  return (
    <Cascader
      options={this.state.options}
      changeOnSelect={true}
    />
  )
}
```
:::

### Dynamically load child options

Load child options when their parent option is clicked or hovered over.

:::demo In this example, the options array does not have data of cities when initialized. With the `active-item-change` event, you can load the cities of a specific state dynamically. Besides, this example also demonstrates how `props` is used.
```js
constructor(props) {
  super(props);

  this.state = {
    options2: [{
      label: 'California',
      cities: []
    }, {
      label: 'Florida',
      cities: []
    }],
    props: {
      value: 'label',
      children: 'cities'
    }
  }
}

handleItemChange(val) {
  console.log('active item:', val);

  setTimeout(() => {
    if (val.indexOf('California') > -1 && !this.state.options2[0].cities.length) {
      this.state.options2[0].cities = [{
        label: 'Los Angeles'
      }];
    } else if (val.indexOf('Florida') > -1 && !this.state.options2[1].cities.length) {
      this.state.options2[1].cities = [{
        label: 'Orlando'
      }];
    }

    this.forceUpdate();
  }, 300);
}

render() {
  return (
    <Cascader
      props={this.state.props}
      options={this.state.options2}
      activeItemChange={this.handleItemChange.bind(this)}
    />
  )
}
```
:::

### Filterable

Search and select options with a keyword.

:::demo Adding `filterable` to `el-cascader` enables filtering
```js
constructor(props) {
  super(props);

  this.state = {
    options: [{
      value: 'guide',
      label: 'Guide',
      children: [{
        value: 'disciplines',
        label: 'Disciplines',
        children: [{
          value: 'consistency',
          label: 'Consistency'
        }, {
          value: 'feedback',
          label: 'Feedback'
        }, {
          value: 'efficiency',
          label: 'Efficiency'
        }, {
          value: 'controllability',
          label: 'Controllability'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'side nav',
          label: 'Side Navigation'
        }, {
          value: 'top nav',
          label: 'Top Navigation'
        }]
      }]
    }, {
      value: 'component',
      label: 'Component',
      children: [{
        value: 'basic',
        label: 'Basic',
        children: [{
          value: 'layout',
          label: 'Layout'
        }, {
          value: 'color',
          label: 'Color'
        }, {
          value: 'typography',
          label: 'Typography'
        }, {
          value: 'icon',
          label: 'Icon'
        }, {
          value: 'button',
          label: 'Button'
        }]
      }, {
        value: 'form',
        label: 'Form',
        children: [{
          value: 'radio',
          label: 'Radio'
        }, {
          value: 'checkbox',
          label: 'Checkbox'
        }, {
          value: 'input',
          label: 'Input'
        }, {
          value: 'input-number',
          label: 'InputNumber'
        }, {
          value: 'select',
          label: 'Select'
        }, {
          value: 'cascader',
          label: 'Cascader'
        }, {
          value: 'switch',
          label: 'Switch'
        }, {
          value: 'slider',
          label: 'Slider'
        }, {
          value: 'time-picker',
          label: 'TimePicker'
        }, {
          value: 'date-picker',
          label: 'DatePicker'
        }, {
          value: 'datetime-picker',
          label: 'DateTimePicker'
        }, {
          value: 'upload',
          label: 'Upload'
        }, {
          value: 'rate',
          label: 'Rate'
        }, {
          value: 'form',
          label: 'Form'
        }]
      }, {
        value: 'data',
        label: 'Data',
        children: [{
          value: 'table',
          label: 'Table'
        }, {
          value: 'tag',
          label: 'Tag'
        }, {
          value: 'progress',
          label: 'Progress'
        }, {
          value: 'tree',
          label: 'Tree'
        }, {
          value: 'pagination',
          label: 'Pagination'
        }, {
          value: 'badge',
          label: 'Badge'
        }]
      }, {
        value: 'notice',
        label: 'Notice',
        children: [{
          value: 'alert',
          label: 'Alert'
        }, {
          value: 'loading',
          label: 'Loading'
        }, {
          value: 'message',
          label: 'Message'
        }, {
          value: 'message-box',
          label: 'MessageBox'
        }, {
          value: 'notification',
          label: 'Notification'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'menu',
          label: 'NavMenu'
        }, {
          value: 'tabs',
          label: 'Tabs'
        }, {
          value: 'breadcrumb',
          label: 'Breadcrumb'
        }, {
          value: 'dropdown',
          label: 'Dropdown'
        }, {
          value: 'steps',
          label: 'Steps'
        }]
      }, {
        value: 'others',
        label: 'Others',
        children: [{
          value: 'dialog',
          label: 'Dialog'
        }, {
          value: 'tooltip',
          label: 'Tooltip'
        }, {
          value: 'popover',
          label: 'Popover'
        }, {
          value: 'card',
          label: 'Card'
        }, {
          value: 'carousel',
          label: 'Carousel'
        }, {
          value: 'collapse',
          label: 'Collapse'
        }]
      }]
    }, {
      value: 'resource',
      label: 'Resource',
      children: [{
        value: 'axure',
        label: 'Axure Components'
      }, {
        value: 'sketch',
        label: 'Sketch Templates'
      }, {
        value: 'docs',
        label: 'Design Documentation'
      }]
    }]
  }
}

render() {
  return (
    <div>
      <div className="block">
        <span className="demonstration">Only options of the last level can be selected</span>
        <Cascader
          placeholder="Try searching: Guide"
          options={this.state.options}
          filterable={true}
        />
      </div>
      <div className="block">
        <span className="demonstration">Options of all levels can be selected</span>
        <Cascader
          placeholder="Try searching: Guide"
          options={this.state.options}
          filterable={true}
          changeOnSelect={true}
        />
      </div>
    </div>
  )
}
```
:::

### Attributes
| Attribute | Description         | Type    | Options       | Default|
|---------- |-------------------- |---------|-------------  |-------- |
| options   | data of the options | array | — | — |
| props | configuration options, see the following table | object | — | — |
| value | selected value | array | — | — |
| popperClass | custom class name for Cascader's dropdown | string | — | — |
| placeholder | input placeholder | string | — | Select |
| disabled  | whether Cascader is disabled | boolean |  — | false |
| clearable  | whether selected value can be cleared | boolean | — | false |
| expandTrigger  | trigger mode of expanding current item | string | click / hover | click |
| showAllLevels | whether to display all levels of the selected value in the input | boolean | — | true |
| filterable  | whether the options can be searched | boolean | — | — |
| debounce | debounce delay when typing filter keyword, in millisecond | number | — | 300 |
| changeOnSelect | whether selecting an option of any level is permitted | boolean | — | false |
| size  | size of Input | string | large / small / mini | — |
| beforeFilter | hook function before filtering with the value to be filtered as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, filtering will be aborted | function(value) | — | — |

### props
| Attribute | Description | Type | Accepted Values | Default |
| --------- | ----------------- | ------ | ------ | ------ |
| label     | specify which key of option object is used as the option's label | string | — | — |
| value     | specify which key of option object is used as the option's value | string | — | — |
| children  | specify which key of option object is used as the option's child options | string | — | — |
| disabled  | specify which key of option object indicates if the option is disabled | string | — | — |

### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| change  | triggers when the binding value changes | value |
| activeItemChange | triggers when active option changes, only works when `change-on-select` is `false` | an array of active options |
