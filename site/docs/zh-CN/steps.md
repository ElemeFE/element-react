## Steps 步骤条
引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

### 基础用法

简单的步骤条。

:::demo 设置`active`属性，接受一个`Number`，表明步骤的 index，从 0 开始。需要定宽的步骤条时，设置`space`属性即可，它接受`Boolean`，单位为`px`，如果不设置，则为自适应。设置`finishStatus`属性可以改变已经完成的步骤的状态。
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
        <Steps.Step title="步骤 1"></Steps.Step>
        <Steps.Step title="步骤 2"></Steps.Step>
        <Steps.Step title="步骤 3"></Steps.Step>
      </Steps>
      <Button onClick={() => this.next()}>下一步</Button>
    </div>
  )
}
```

:::

### 含状态步骤条

每一步骤显示出该步骤的状态。

:::demo 也可以使用`title`具名分发。
```js
render() {
  return (
    <Steps space={100} active={1} finishStatus="success">
      <Steps.Step title="已完成"></Steps.Step>
      <Steps.Step title="进行中"></Steps.Step>
      <Steps.Step title="步骤 3"></Steps.Step>
    </Steps>
  )
}
```
:::

### 有描述的步骤条

每个步骤有其对应的步骤状态描述。

:::demo 带描述的步骤条。
```js
render() {
  return (
    <Steps space={200} active={1}>
      <Steps.Step title="步骤 1" description="这是一段很长很长很长的描述性文字"></Steps.Step>
      <Steps.Step title="步骤 2" description="这是一段很长很长很长的描述性文字"></Steps.Step>
      <Steps.Step title="步骤 3" description="这是一段很长很长很长的描述性文字"></Steps.Step>
    </Steps>
  )
}
```
:::

### 带图标的步骤条
步骤条内可以启用各种自定义的图标。

:::demo 通过`icon`属性来设置图标，图标的类型可以参考 Icon 组件的文档。
```js
render() {
  return (
    <Steps space={100} active={1}>
      <Steps.Step title="步骤 1" icon="edit"></Steps.Step>
      <Steps.Step title="步骤 2" icon="upload"></Steps.Step>
      <Steps.Step title="步骤 3" icon="picture"></Steps.Step>
    </Steps>
  )
}
```
:::

### 竖式步骤条

竖直方向的步骤条。

:::demo 只需要在`Steps`元素中设置`direction`属性为`vertical`即可。
```js
render() {
  return (
    <Steps space={100} direction="vertical" active={1}>
      <Steps.Step title="步骤 1"></Steps.Step>
      <Steps.Step title="步骤 2"></Steps.Step>
      <Steps.Step title="步骤 3"></Steps.Step>
    </Steps>
  )
}
```
:::

### Steps Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| space | 每个 step 的间距，不填写将自适应间距 | Number | — | — |
| direction | 显示方向 | string | vertical/horizontal | horizontal |
| active | 设置当前激活步骤  | number | — | 0 |
| processStatus | 设置当前步骤的状态 | string | wait/process/finish/error/success | process |
| finishStatus | 设置结束步骤的状态 | string | wait/process/finish/error/success | finish |

### Step Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 标题 | string | — | — |
| description | 描述性文字 | string/ReactElement | — | — |
| icon | 图标 | Element Icon 提供的图标，如果要使用自定义图标可以通过自定义element的方式写入 | string | — |
