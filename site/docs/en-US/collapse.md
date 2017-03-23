## Collapse

Use Collapse to store contents.

### Basic usage

You can expand multiple panels

:::demo
```js
render() {
  const activeName = "1";
  return (
    <Collapse value={activeName}>
      <Collapse.Item title="Consistency" name="1">
        <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
        <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
      </Collapse.Item>
      <Collapse.Item title="Feedback" name="2">
        <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
        <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
      </Collapse.Item>
      <Collapse.Item title="Efficiency" name="3">
        <div>Simplify the process: keep operating process simple and intuitive;</div>
        <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
        <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
      </Collapse.Item>
      <Collapse.Item title="Controllability" name="4">
        <div>Decision making: giving advices about operations is acceptable, but do not make decisions for the users;</div>
        <div>Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.</div>
      </Collapse.Item>
    </Collapse>
  )
}
```
:::

### Accordion

In accordion mode, only one panel can be expanded at once

:::demo Activate accordion mode using the `accordion` attribute.
```js
render() {
  const activeName = "1";
  return (
    <Collapse value={activeName} accordion>
      <Collapse.Item title="Consistency" name="1">
        <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
        <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
      </Collapse.Item>
      <Collapse.Item title="Feedback" name="2">
        <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
        <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
      </Collapse.Item>
      <Collapse.Item title="Efficiency" name="3">
        <div>Simplify the process: keep operating process simple and intuitive;</div>
        <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
        <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
      </Collapse.Item>
      <Collapse.Item title="Controllability" name="4">
        <div>Decision making: giving advices about operations is acceptable, but do not make decisions for the users;</div>
        <div>Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.</div>
      </Collapse.Item>
    </Collapse>
  )
}
```
:::

### Custom title

Besides using the `title` attribute, you can customize panel title with named slots, which makes adding custom content, e.g. icons, possible.

:::demo
```js
render() {
  return (
    <Collapse accordion>
      <Collapse.Item title={<span>Consistency<i className="header-icon el-icon-information"></i></span>}>
        <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
        <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
      </Collapse.Item>
      <Collapse.Item title="Feedback">
        <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
        <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
      </Collapse.Item>
      <Collapse.Item title="Efficiency">
        <div>Simplify the process: keep operating process simple and intuitive;</div>
        <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
        <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
      </Collapse.Item>
      <Collapse.Item title="Controllability">
        <div>Decision making: giving advices about operations is acceptable, but do not make decisions for the users;</div>
        <div>Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.</div>
      </Collapse.Item>
    </Collapse>
  )
}
```
:::

### Collapse Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| accordion | whether to activate accordion mode | boolean | — | false |
| value | currently active panel | string (accordion mode)/array (non-accordion mode) | — | — |

### Collapse Events
| Event Name | Description | Parameters |
|---------|---------|---------|
| onChange | triggers when active panels change | activeNames: array (non-accordion mode)/string (accordion mode) |

### Collapse Item Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | unique identification of the panel | string/number | — | — |
| title | title of the panel | string | — | — |
