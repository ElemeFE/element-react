## Steps

Guide the user to complete tasks in accordance with the process. Its steps can be set according to the actual application scenario and the number of the steps can't be less than 2.

### Basic usage

Simple step bar.

:::demo Set `active` attribute with `Number` type, which indicates the index of steps and starts from 0. You can set `space` attribute when the width of the step needs to be fixed which accepts `Boolean` type. The unit of the `space` attribute is `px`. If not set, it is responsive. Setting the `finishStatus` attribute can change the state of the steps that have been completed.

```js
constructor(props) {
  super(props);

  this.state = {
    active: 0
  };
}

next() {
  let active = this.state.active + 1;
  if (active > 3) {
    active = 0;
  }
  this.setState({ active });
}

render() {
  return (
    <div>
      <Steps space={200} active={this.state.active} finishStatus="success">
        <Steps.Step title="Step 1"></Steps.Step>
        <Steps.Step title="Step 2"></Steps.Step>
        <Steps.Step title="Step 3"></Steps.Step>
      </Steps>
      <Button onClick={() => this.next()}>Next step</Button>
    </div>
  )
}
```
:::

### Step bar that contains status

Shows the status of the step for each step.

:::demo Use `title` attribute to set the name of the step.

```js
render() {
  return (
    <Steps space={100} active={1} finishStatus="success">
      <Steps.Step title="Done"></Steps.Step>
      <Steps.Step title="Processing"></Steps.Step>
      <Steps.Step title="Step 3"></Steps.Step>
    </Steps>
  )
}
```
:::

### Step bar with description

There is description for each step.

:::demo
```js
render() {
  return (
    <Steps space={200} active={1}>
      <Steps.Step title="Step 1" description="Some description"></Steps.Step>
      <Steps.Step title="Step 2" description="Some description"></Steps.Step>
      <Steps.Step title="Step 3" description="Some description"></Steps.Step>
    </Steps>
  )
}
```
:::

### Step bar with icon

A variety of custom icons can be used in the step bar.

:::demo The icon is set by the `icon` property. The types of icons can be found in the document for the Icon component.

```js
render() {
  return (
    <Steps space={100} active={1}>
      <Steps.Step title="Step 1" icon="edit"></Steps.Step>
      <Steps.Step title="Step 2" icon="upload"></Steps.Step>
      <Steps.Step title="Step 3" icon="picture"></Steps.Step>
    </Steps>
  )
}
```
:::

### Vertical step bar

Vertical step bars.

:::demo You only need to set the `direction` attribute to` vertical` in the `Steps` element.

```js
render() {
  return (
    <Steps space={100} direction="vertical" active={1}>
      <Steps.Step title="Step 1"></Steps.Step>
      <Steps.Step title="Step 2"></Steps.Step>
      <Steps.Step title="Step 3"></Steps.Step>
    </Steps>
  )
}
```
:::

### Steps Attributes

| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| space | the spacing of each step, will be responsive if omitted. Support percentage. | Number,String | — | — |
| direction | display direction | string | vertical/horizontal | horizontal |
| active | current activation step  | number | — | 0 |
| processStatus | status of current step | string | wait/process/finish/error/success | process |
| finishStatus | status of end step | string | wait/process/finish/error/success | finish |
| alignCenter | whether step description is centered | boolean | — | false |
| center | center whole `Steps` component | boolean | - | false |

### Step Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| title | step title | string | — | — |
| description | step description | string | — | — |
| icon | step icon | icons provided by Element Icon. Can be overwritten by a named slot if you want to use  custom icons | string | — |
