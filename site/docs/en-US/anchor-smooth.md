## AnchorSmooth 

A label slide to anchor point.

### Basic usage

Similar to the use of a tag, the attribute targetId is used to indicate the anchor that you want to reach.

::: demo The AnchorSmooth component provides `targetId` attributes to point to ID elements that exist in the page and must have values. If the child element does not exist, `targetId` is used as the child element.
```js
render() {
  return (
    <div>
      <div className='anchor-point' id='anchor0'>Here is the anchor#anchor0</div>
      <div className='anchor-group'>
          <AnchorSmooth targetId='anchor1' />
          <AnchorSmooth targetId='anchor1'>
      		Slide to anchor#anchor1
      	  </AnchorSmooth>
      </div>
    </div>
  )
}
```
:::

### callback

The attribute `onFinish` can bind a callback function and execute the callback function after reaching the anchor point.

::: demo In the AnchorSmooth component, you can set the `onFinish` callback function that completes the sliding, and then call the `onFinish` function when it reaches the anchor.
```js
render() {
  return (
    <div>
      <div id='anchor1' className='anchor-point'>
      	  Here is the anchor#anchor1
      </div>
      <AnchorSmooth 
          targetId='anchor2' 
          onFinish={() => console.log("Arrive at anchor2")}>
          Go to the anchor with ID anchor2 and execute the callback function
	  </AnchorSmooth>
    </div>
  )
}
```
:::

### set title

The` title` property tells the user the anchor to go when the mouse moves in.

::: demo Use the `title` attribute to describe an anchor.
```js
render() {
  return (
    <div>
      <div id='anchor2' className='anchor-point'>
      	 Here is the anchor#anchor2
      </div>
      <AnchorSmooth 
          targetId='anchor0' 
          title="go to anchor0" 
          onFinish={() => console.log("Arrive at anchor0")}>
      	To the anchor with ID anchor0, containing title
	  </AnchorSmooth>
    </div>
  )
}
```
:::

### Attributes

| Attribute | Description | Type  | Accepted Values            | Default |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **targetId** | Anchor target   **REQUIRED** | string | — | — |
| title | title | string | — | — |

### Events

| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| onFinish | fires when anchor is arrived | — |

