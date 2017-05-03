## Checkbox

A group of options for multiple choices.

### Basic usage

Checkbox can be used alone to switch between two states.

:::demo Define `checked`(bind variable) in `Checkbox`. The default value is a `Boolean` for single `Checkbox`, and it becomes `true` when selected. Content inside the `Checkbox` tag will become the description following the button of the checkbox.

```js
render() {
  return <Checkbox checked>Option</Checkbox>
}
```
:::

### Disabled State

Disabled state for checkbox.

::: demo Set the `disabled` attribute.

```js
render() {
  return (
    <div>
      <Checkbox disabled>Option 1</Checkbox>
      <Checkbox checked disabled>Option 2</Checkbox>
    </div>
  )
}
```
:::

### Checkbox group

It is used for multiple checkboxes which are bound in one group, and indicates whether one option is selected by checking if it is checked.

:::demo `Checkbox.Group` element can manage multiple checkboxes in one group by using `value` which is bound as an `Array`. Inside the `Checkbox` element, `label` is the value of the checkbox. If no content is nested in that tag, `label` will be rendered as the description following the button of the checkbox. `label` also corresponds with the element values in the array. It is selected if the specified value exists in the array, and vice versa.

```js
constructor(props) {
  super(props);

  this.state = {
    checkList: ['Option A', 'Selected and disabled']
  }
}
render() {
  return (
    <Checkbox.Group options={this.state.checkList}>
      <Checkbox label="Option A"></Checkbox>
      <Checkbox label="Option B"></Checkbox>
      <Checkbox label="Option C"></Checkbox>
      <Checkbox label="Disabled" disabled></Checkbox>
      <Checkbox label="Selected and disabled" disabled></Checkbox>
    </Checkbox.Group>
  )
}
```
:::

### Indeterminate

The `indeterminate` property can help you to achieve a 'check all' effect.

:::demo

```js
constructor(props) {
  super(props);

  this.state = {
    checkAll: false,
    cities: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'],
    checkedCities: ['Shanghai', 'Beijing'],
    isIndeterminate: true,
  }
}

handleCheckAllChange(checked) {
  const checkedCities = checked ? ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'] : [];

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
        onChange={this.handleCheckAllChange.bind(this)}>Check all</Checkbox>
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

### Minimum / Maximum items checked

The `min` and `max` properties can help you to limit the number of checked items.

:::demo

```js
constructor(props) {
  super(props);

  this.state = {
    checkAll: false,
    cities: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'],
    checkedCities: ['Shanghai', 'Beijing'],
    isIndeterminate: true,
  }
}

handleCheckAllChange(checked) {
  const checkedCities = checked ? ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'] : [];

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
        onChange={this.handleCheckAllChange.bind(this)}>Check all</Checkbox>
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

### Button style

Checkbox with button styles.

:::demo You just need to change `<el-checkbox>` element into `<el-checkbox-button>` element. We also provide `size` attribute for these buttons: `large` and `small`.
```js
constructor(props) {
  super(props);

  this.state = {
    cities: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'],
    checkboxGroup1: ['Shanghai'],
    checkboxGroup2: ['Beijing'],
    checkboxGroup3: ['Guangzhou']
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
            return <Checkbox.Button key={index} label={city} disabled={city === 'Shenzhen'}>{city}</Checkbox.Button>
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
| Attribute      | Description         | Type    | Options                         | Default|
|---------- |-------- |---------- |-------------  |-------- |
| label     | value of the checkbox when used inside a `Checkbox.Group`   | string    |       —        |     —    |
| trueLabel | value of the checkbox if it's checked   | string, number    |       —        |     —    |
| falseLabel | value of the checkbox if it's not checked   | string, number    |      —         |     —    |
| disabled  | if the checkbox is disabled   | boolean   |  — | false   |
| checked  | if the checkbox is checked   | boolean   |  — | false   |
| indeterminate  | same as `indeterminate` in native checkbox | boolean   |  — | false   |

### Checkbox-group Attributes
| Attribute      | Description         | Type    | Options                         | Default|
|---------- |-------- |---------- |-------------  |-------- |
|size | the size of checkbox buttons | string | large/small | —
|fill  | border and background color when button is active | string   | — | #20a0ff   |
|textColor | font color when button is active | string   | — | #ffffff   |
| min     | minimum number of checkbox checked   | number    |       —        |     —    |
| max     | maximum number of checkbox checked   | number    |       —        |     —    |

### Checkbox-group Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| onChange  | triggers when the binding value changes | value |
