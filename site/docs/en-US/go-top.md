## GoTop

In a long page, you can go back to the top of the page by clicking on the button from the bottom to the top.

### Basic usage

Usually the top-back button appears in the lower right corner of the page, so it is recommended to modify the `right`, `bottom` attributes for positioning; if there are special needs, you can also modify the `left`, `top` attributes.

::: demo In the GoTop component, you can modify the `right` and `bottom` attributes with the default values of right: 50px and bottom: 50px.
```js
render() {
  return (
    <div>
      <h3>Basic usage: The first button in the lower right corner</h3>
      <GoTop bottom="360px" showheight={0}/>
    </div>
  )
}
```
:::

### Property `showheight`

Usually the top button will not appear when the rolling distance is 0. We can define the height of the scrollbar when the button appears by the attribute `showheight`, with the default value of 300, per unit px. If the scroll distance is greater than 300, the display button will fade in; if the scroll distance is less than 300, the hidden button will fade out.

::: demo In the GoTop component, you can modify the showheight property to specify the scroll distance of the scrollbar, default value: 300; type: number.

```js
render() {
  return (
    <div>
      <h3>
          A button appears when the scroll distance is 200 px: 
          the second button in the lower right corner
      </h3>
      <GoTop bottom="300px" showheight={200}/>
    </div>
  )
}
```

:::

### With icon

By default, the `el-icon-caret-top` in elementUI can be used to replace the default icon by setting sub-elements.

::: demo By setting the` children` attribute to display GoTop's icon, you can more effectively show the user your display intentions.
```js
render() {
  return (
    <div>
      <h3>With icon：The third button in the lower right corner</h3>
      <GoTop bottom="240px">
      	<i className="el-icon-arrow-up"></i>
      </GoTop>
    </div>
  )
}
```
:::

### Sliding time and callback function

Customize the time used to complete the sliding, attribute: `time`, default value: 300, unit: Ms.

::: demo In the GoTop component, you can set the `time` needed to complete the sliding and call an `onFinish` callback function when you reach the anchor.

```js
render() {
  return (
    <div>
      <h3>
      	Custom sliding time and callback function:
      	The fourth button in the lower right corner
      </h3>
      <GoTop bottom="180px" time={800} 
      	onFinish={() => console.log("go to top")}/>
    </div>
  )
}
```

:::

### Set title

The` title` property tells the user the anchor to go when the mouse moves in.

::: demo Use the `title` attribute to describe an anchor.

```js
render() {
  return (
    <div>
      <h3>Title: the fifth button in the lower right corner</h3>
      <GoTop bottom="120px" title="go to top" />
    </div>
  )
}
```

:::

### Attributes
| Attribute | Description | Type  | Accepted Values            | Default |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| showheight | Scrollbar Scroll Distance Threshold, Unit PX | number | — | 300 |
| time | The time required to reach the top, unit MS | number | — | 300 |
| title | title | string | — | — |
| right | Distance to the rightof the page | string | — | 50px |
| bottom | Distance to the bottom of the page | string | — | 50px |
| top | Distance to the top of the page | string | — | — |
| left | Distance to the left of the page | string | — | — |

### Events

| Event Name | Description                  | Parameters |
| ---------- | ---------------------------- | ---------- |
| onFinish   | fires when anchor is arrived | —          |