## Transfer

### Basic usage
:::demo Data is passed to Transfer via the `data` attribute. The data needs to be an object array, and each object should have these attributes: `key` being the identification of the data item, `label` being the displayed text, and `disabled` indicating if the data item is disabled. Items inside the target list are in sync with the variable binding to `value`, and the value of that variable is an array of target item keys. So, if you don't want the target list be initially empty, you can initialize the `value` with an array.
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
      label: `Option ${ i }`,
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

### Filterable

You can search and filter data items.

:::demo Set the `filterable` attribute to `true` to enable filter mode. By default, if the data item `label` contains the search keyword, it will be included in the search result. Also, you can implement you own filter method with the `filterMethod` attribute. It takes a method and passes search keyword and each data item to it whenever the keyword changes. For a certain data item, if the method returns true, it will be included in the result list.
```html
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
  const states = ['California', 'Illinois', 'Maryland', 'Texas', 'Florida', 'Colorado', 'Connecticut '];
  const initials = ['CA', 'IL', 'MD', 'TX', 'FL', 'CO', 'CT'];
  states.forEach((city, index) => {
    data.push({
      label: city,
      key: index,
      initial: initials[index]
    });
  });
  return data;
}

filterMethod(query, item) {
  return item.initial.toLowerCase().indexOf(query.toLowerCase()) > -1;
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
      filterPlaceholder="State Abbreviations"
      value={value}
      onChange={this._handleChange}
      data={this.data}>
    </Transfer>
  )
}

```
:::

### Customizable

You can customize list titles, button texts, render function for data items, checking status texts in list footer and list footer contents.

:::demo Use `titles`, `buttonTexts`, `renderContent` and `footerFormat` to respectively customize list titles, button texts, render function for data items, checking status texts in list footer. For list footer contents, two attributes are provided: `leftFooter` and `rightFooter`. Plus, if you want some items initially checked, you can use `leftDefaultChecked` and `rightDefaultChecked`. Finally, this example demonstrate the `onChange` event.
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
      label: `Option ${ i }`,
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
      buttonTexts={['To left', 'To right']}
      footerFormat={{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }}
      onChange={this._handleChange}
      data={this.data}
      leftFooter={
        <Button style={this.style} size="small">Operation</Button>
      }
      rightFooter={
        <Button style={this.style} size="small">Operation</Button>
      }
    >
    </Transfer>
  )
}

```
:::

### Prop aliases

By default, Transfer looks for `key`, `label` and `disabled` in a data item. If your data items have different key names, you can use the `propsAlias` attribute to define aliases.
:::demo The data items in this example do not have `key`s or `label`s, instead they have `value`s and `desc`s. So you need to set aliases for `key` and `label`.
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
      desc: `Option ${ i }`,
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
| Attribute | Description | Type  | Accepted Values | Default |
|---------- |-------- |---------- |-------------  |-------- |
| data | data source | array[{ key, label, disabled }] | — | [ ] |
| filterable | whether Transfer is filterable | boolean | — | false |
| filterPlaceholder | placeholder for the filter input | string | — | Enter keyword |
| filterMethod | custom filter method | function | — | — |
| titles | custom list titles | array | — | ['List 1', 'List 2'] |
| buttonTexts | custom button texts | array | — | [ ] |
| renderContent | custom render function for data items | function(h, option) | — | — |
| footerFormat | texts for checking status in list footer | object{noChecked, hasChecked} | — | { noChecked: '${total} items', hasChecked: '${checked}/${total} checked' } |
| propsAlias | prop aliases for data source | object{key, label, disabled} | — | — |
| leftDefaultChecked | key array of initially checked data items of the left list | array | — | [ ] |
| rightDefaultChecked | key array of initially checked data items of the right list | array | — | [ ] |
| leftFooter | content of left list footer | ReactElement | — | — |
| rightFooter | content of right list footer | ReactElement | — | — |

### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| onChange | triggers when data items change in the right list | key array of current data items in the right list, transfer direction (left or right), moved item keys |
