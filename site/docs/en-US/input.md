## Input

Input data using mouse or keyboard.

### Basic usage

::: demo
```js
render() {
  return <Input placeholder="Please input" />
}
```
:::

### Disabled

::: demo Disable the Input with the `disabled` attribute.

```js
render() {
  return <Input disabled placeholder="Please input" />
}
```
:::

### Input with icon

Add an icon to indicate input type.

::: demo You can add an icon at the end of Input by setting the `icon` attribute and use `on-icon-click` hook to complete some work after clicking the icon.

```js
handleIconClick() {

}

render() {
  return (
    <Input
      icon="time"
      placeholder="Pick a date"
      onIconClick={this.handleIconClick.bind(this)}
    />
  )
}
```
:::

### Textarea

Resizable for entering multiple lines of text information. Add attribute `type="textarea"` to change `input` into native `textarea`.

::: demo Control the height by setting the `rows` prop.

```js
render() {
  return (
    <Input
      type="textarea"
      autosize={{ minRows: 2, maxRows: 4}}
      placeholder="Please input"
    />
  )
}
```
:::

### Autosize Textarea

Setting the `autosize` prop for a textarea type of Input makes the height to automatically adjust based on the content. An options object can be provided to `autosize` to specify the minimum and maximum number of lines the textarea can automatically adjust.

::: demo

```js
render() {
  return (
    <div>
      <Input
        type="textarea"
        autosize={true}
        placeholder="Please input"
      />
      <div style={{ margin: '20px 0' }}></div>
      <Input
        type="textarea"
        autosize={{ minRows: 2, maxRows: 4}}
        placeholder="Please input"
      />
    </div>
  )
}
```
:::

### Mixed input

Prepend or append an element, generally a label or a button.

::: demo Use `slot` to distribute elements that prepend or append to Input.

```js
render() {
  return (
    <div>
      <Input placeholder="Please input" prepend="Http://" />
      <Input placeholder="Please input" append=".com" />
      <Input placeholder="Please input" prepend={
        <Select value="" placeholder="Select">
          {
            ['Restaurant', 'Order No.', 'Tel'].map((item, index) => <Select.Option key={index} label={item} value={index} />)
          }
        </Select>
      } append={<Button type="primary" icon="search">Search</Button>} />
    </div>
  )
}
```
:::

### Sizes

::: demo Add `size` attribute to change the size of Input. In addition to the default size, there are three other options: `large`, `small` and `mini`.
```js
render() {
  return (
    <div className="inline-input">
      <Input placeholder="Please input" size="large" />
      <Input placeholder="Please input" />
      <Input placeholder="Please input" size="small" />
      <Input placeholder="Please input" size="mini" />
    </div>
  )
}
```
:::

### Autocomplete

You can get some recommended tips based on the current input.

::: demo Autocomplete component provides input suggestions. The `fetch-suggestions` attribute is a method that returns suggested input. In this example, `querySearch(queryString, cb)` returns suggestions to Autocomplete via `cb(data)` when suggestions are ready.
```js
constructor(props) {
  super(props);

  this.state = {
    restaurants: [
      { "value": "vue", "address": "https://github.com/vuejs/vue" },
      { "value": "element", "address": "https://github.com/ElemeFE/element" },
      { "value": "cooking", "address": "https://github.com/ElemeFE/cooking" },
      { "value": "mint-ui", "address": "https://github.com/ElemeFE/mint-ui" },
      { "value": "vuex", "address": "https://github.com/vuejs/vuex" },
      { "value": "vue-router", "address": "https://github.com/vuejs/vue-router" },
      { "value": "babel", "address": "https://github.com/babel/babel" }
    ],
    value1: '',
    value2: ''
  }
}

querySearch(queryString, cb) {
  const { restaurants } = this.state;
  const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
  // 调用 callback 返回建议列表的数据
  cb(results);
}

createFilter(queryString) {
  return (restaurant) => {
    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
}

handleSelect(item) {

}

render() {
  return (
    <Layout.Row className="inline-input border-grid">
      <Layout.Col span="12" className="tac">
        <div className="text">list suggestions when activated</div>
        <AutoComplete
          placeholder="Please input"
          value={this.state.value1}
          fetchSuggestions={this.querySearch.bind(this)}
          onSelect={this.handleSelect.bind(this)}
        ></AutoComplete>
      </Layout.Col>
      <Layout.Col span="12" className="tac">
        <div className="text">list suggestions on input</div>
        <AutoComplete
          placeholder="Please input"
          value={this.state.value2}
          fetchSuggestions={this.querySearch.bind(this)}
          onSelect={this.handleSelect.bind(this)}
          triggerOnFocus={false}
        ></AutoComplete>
      </Layout.Col>
    </Layout.Row>
  )
}
```
:::

### Custom template

Customize how suggestions are displayed.

:::demo
```js
constructor(props) {
  super(props);

  this.state = {
    restaurants: [
      { "value": "vue", "address": "https://github.com/vuejs/vue" },
      { "value": "element", "address": "https://github.com/ElemeFE/element" },
      { "value": "cooking", "address": "https://github.com/ElemeFE/cooking" },
      { "value": "mint-ui", "address": "https://github.com/ElemeFE/mint-ui" },
      { "value": "vuex", "address": "https://github.com/vuejs/vuex" },
      { "value": "vue-router", "address": "https://github.com/vuejs/vue-router" },
      { "value": "babel", "address": "https://github.com/babel/babel" }
    ],
    value: ''
  }
}

querySearch(queryString, cb) {
  const { restaurants } = this.state;
  const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
  // 调用 callback 返回建议列表的数据
  cb(results);
}

createFilter(queryString) {
  return (restaurant) => {
    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
}

handleSelect(item) {

}

render() {
  return (
    <AutoComplete
      className="my-autocomplete"
      icon="edit"
      placeholder="Please input"
      value={this.state.value}
      fetchSuggestions={this.querySearch.bind(this)}
      customItem={this.props.customItem}
      onSelect={this.handleSelect.bind(this)}
    ></AutoComplete>
  )
}
```
:::

### Remote search

Search data from server-side.

::: demo
```js
constructor(props) {
  super(props);

  this.state = {
    restaurants: [
      { "value": "vue", "address": "https://github.com/vuejs/vue" },
      { "value": "element", "address": "https://github.com/ElemeFE/element" },
      { "value": "cooking", "address": "https://github.com/ElemeFE/cooking" },
      { "value": "mint-ui", "address": "https://github.com/ElemeFE/mint-ui" },
      { "value": "vuex", "address": "https://github.com/vuejs/vuex" },
      { "value": "vue-router", "address": "https://github.com/vuejs/vue-router" },
      { "value": "babel", "address": "https://github.com/babel/babel" }
    ],
    value: ''
  }
}

querySearchAsync(queryString, cb) {
  const { restaurants } = this.state;
  const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;

  clearTimeout(this.timeout);

  this.timeout = setTimeout(() => {
    cb(results);
  }, 3000 * Math.random());
}

createFilter(queryString) {
  return (restaurant) => {
    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
}

handleSelect(item) {

}

render() {
  return (
    <AutoComplete
      placeholder="Please input"
      value={this.state.value}
      fetchSuggestions={this.querySearchAsync.bind(this)}
      onSelect={this.handleSelect.bind(this)}
    ></AutoComplete>
  )
}
```
:::

### Input Attributes

| Attribute      | Description          | Type      | Accepted Values       | Default  |
| ----| ----| ----| ---- | ----- |
|type| Same as the `type` attribute of native input, except that it can be `textarea` | string | — | text |
|value| binding value | string/number| — | — |
|maxLength| maximum Input text length| number| — | — |
|minLength| minimum Input text length| number | — | — |
|placeholder| placeholder of Input| string | — | — |
|disabled | whether Input is disabled | boolean | — | false |
|size | size of Input, works when `type` is not 'textarea' | string | large/small/mini | — |
|icon | icon name | string | — | — |
|rows | number of rows of textarea, only works when `type` is 'textarea' | number | — | 2 |
|autosize | whether textarea has an adaptive height, only works when `type` is 'textarea'. Can accept an object, e.g. { minRows: 2, maxRows: 6 }  | boolean/object | — | false |
|autoComplete | same as `auto-complete` in native input | string | on/off | off |
|name | same as `name` in native input | string | — | — |
| readOnly | same as `readonly` in native input | boolean | — | false |
|max | same as `max` in native input | — | — | — |
|min | same as `min` in native input | — | — | — |
|step| same as `step` in native input | — | — | — |
|resize| control the resizability | string | none, both, horizontal, vertical | — |
|autoFocus | same as `autofocus` in native input | boolean | — | false |
| onIconClick | hook function when clicking on the input icon | function | — | — |
| trim        | trim input contents   | boolean    | — | false |

### Autocomplete Attributes

|Attribute | Description | Type | Options | Default|
|----| ----| ----| ---- | -----|
|placeholder| the placeholder of Autocomplete| string | — | — |
|disabled | whether Autocomplete is disabled  | boolean | — | false|
|icon | icon name | string | — | — |
|value | binding value | string | — | — |
|customItem | component name of your customized suggestion list item | string | — | — |
|fetchSuggestions | a method to fetch input suggestions. When suggestions are ready, invoke `callback(data:[])` to return them to Autocomplete | Function(queryString, callback) | — | — |
| popperClass | custom class name for autocomplete's dropdown | string | — | — |
| triggerOnFocus | whether show suggestions when input focus | boolean | — | true |
| onIconClick | hook function when clicking on the input icon | function | — | — |

### Autocomplete Events

| Event Name | Description | Parameters |
|----| ----| ----|
| onSelect | triggers when a suggestion is clicked | suggestion being clicked |
