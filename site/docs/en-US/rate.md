## Rate

Used for rating

### Basic usage

:::demo Rate divides rating scores into three levels and these levels can be distinguished by using different background colors. By default background colors are the same, but you can assign them to reflect three levels using the `colors` attribute, and their two thresholds can be defined by `low-threshold` and `high-threshold`.

```js
render() {
  return (
    <div className="intro-block">
      <div className="block">
        <span className="demonstration">Default</span>
        <span className="wrapper">
          <Rate change={(val) => alert(val)} />
        </span>
      </div>
      <div className="block">
        <span className="demonstration">Color for different levels</span>
        <span className="wrapper">
          <Rate colors={['#99A9BF', '#F7BA2A', '#FF9900']} />
        </span>
      </div>
    </div>
  )
}
```
:::

### With text

Using text to indicate rating score

:::demo Add attribute `show-text` to display text at the right of Rate. You can assign texts for different scores using `texts`. `texts` is an array whose length should be equal to the max score `max`.

```js
render() {
  return (
    <Rate
      showText={true}
      texts={['oops', 'disappointed', 'normal', 'good', 'great']}
    />
  )
}
```
:::

### Read-only

Read-only Rate is for displaying rating score. Half star is supported.

:::demo Use attribute `disabled` to make the component read-only. Add `show-text` to display the rating score at the right side. Additionally, you can use attribute `text-template` to provide a text template. It must contain `{value}`, and `{value}` will be replaced with the rating score.

```js
render() {
  return <Rate disabled={true} value={3.9} showText={true} />
}
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| max | max rating score | number | — | 5 |
| disabled | whether Rate is read-only | boolean | — | false |
| allow-half | whether picking half start is allowed | boolean | — | false |
| low-threshold | threshold value between low and medium level. The value itself will be included in low level | number | — | 2 |
| high-threshold | threshold value between medium and high level. The value itself will be included in high level | number | — | 4 |
| colors | color array for icons. It should have 3 elements, each of which corresponds with a score level  | array | — | ['#F7BA2A', '#F7BA2A', '#F7BA2A'] |
| void-color | color of unselected icons | string | — | #C6D1DE |
| disabledVoidColor | color of unselected read-only icons | string | — | #EFF2F7 |
| icon-classes |  array of class names of icons. It should have 3 elements, each of which corresponds with a score level | array | — | ['el-icon-star-on', 'el-icon-star-on','el-icon-star-on'] |
| void-icon-class | class name of unselected icons | string | — | el-icon-star-off |
| disabled-void-icon-class | class name of unselected read-only icons | string | — | el-icon-star-on |
| show-text | whether to display texts | boolean | — | false |
| text-color | color of texts | string | — | #1F2D3D |
| texts | text array | array | — | ['极差', '失望', '一般', '满意', '惊喜'] |
| text-template | text template when the component is read-only | string | — | {value} |

### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| onChange | Triggers when rate value is changed | value after changing |
