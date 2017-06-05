## Carousel

Loop a series of images or texts in a limited space

### Basic usage

::: demo Combine `Carousel` with `Carousel.Item`, and you'll get a carousel. Content of each slide is completely customizable, and you just need to place it inside  `Carousel.Item` tag. By default the carousel switches when mouse hovers over an indicator. Set `trigger` to `click`, and the carousel switches only when an indicator is clicked.
```js
render() {
  return (
    <div className="demo-1 small">
      <div className="block">
        <span className="demonstration">Switch when indicator is hovered (default)</span>
        <Carousel height="150px">
          {
            [1,2,3,4].map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <h3>{item}</h3>
                </Carousel.Item>
              )
            })
          }
        </Carousel>
      </div>
      <div className="block">
        <span className="demonstration">Switch when indicator is clicked</span>
        <Carousel trigger="click" height="150px">
          {
            [1,2,3,4].map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <h3>{item}</h3>
                </Carousel.Item>
              )
            })
          }
        </Carousel>
      </div>
    </div>
  )
}
```
:::

### Indicators

Indicators can be displayed outside the carousel

::: demo The `indicator-position` attribute determines where the indicators are located. By default they are inside the carousel, and setting `indicator-position` to `outside` moves them outside; setting `indicator-position` to `none` hides the indicators.
```js
render() {
  return (
    <div className="demo-2 medium">
      <Carousel indicatorPosition="outside">
        {
          [1,2,3,4].map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <h3>{item}</h3>
              </Carousel.Item>
            )
          })
        }
      </Carousel>
    </div>
  )
}
```
:::

### Arrows

You can define when arrows are displayed

::: demo The `arrow` attribute determines when arrows are displayed. By default they appear when mouse hovers over the carousel. Setting `arrow` to `always` or `never` shows/hides the arrows permanently.
```js
render() {
  return (
    <div className="demo-3 medium">
      <Carousel interval="5000" arrow="always">
        {
          [1,2,3,4].map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <h3>{item}</h3>
              </Carousel.Item>
            )
          })
        }
      </Carousel>
    </div>
  )
}
```
:::

### Card mode

When a page is wide enough but has limited height, you can activate card mode for carousels

::: demo Setting `type` to `card` activates the card mode. Apart from the appearance, the biggest difference between card mode and common mode is that clicking the slides at both sides directly switches the carousel in card mode.
```js
render() {
  return (
    <div className="demo-4 medium">
      <Carousel interval="4000" type="card" height="200px">
        {
          [1,2,3,4,5,6].map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <h3>{item}</h3>
              </Carousel.Item>
            )
          })
        }
      </Carousel>
    </div>
  )
}
```
:::


### Flat Card mode
set card size same

::: demo Setting `type` to `flatcard` activates the flatcard mode. Apart from the appearance, the biggest difference between card mode and common mode is that clicking the slides at both sides directly switches the carousel in card mode.
```js
render() {
  return (
    <div className="demo-4 medium">
      <Carousel interval="4000" type="flatcard" height="200px">
        {
          [1,2,3,4,5,6].map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <h3>{item}</h3>
              </Carousel.Item>
            )
          })
        }
      </Carousel>
    </div>
  )
}
```
:::

### Carousel Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| height | height of the carousel | number | — | 300 |
| initialIndex | index of the initially active slide (starting from 0) | number | — | 0 |
| trigger | how indicators are triggered | string | hover/click | hover |
| autoplay | whether automatically loop the slides | boolean | — | true |
| interval | interval of the auto loop, in milliseconds | number | — | 3000 |
| indicatorPosition | position of the indicators | string | outside/none | — |
| arrow | when arrows are shown | string | always/hover/never | hover |
| type | type of the Carousel | string | card/flatcard | — |

### Carousel Events
| Event Name | Description | Parameters |
|---------|---------|---------|
| onChange | triggers when the active slide switches | index of the new active slide, index of the old active slide |

### Carousel Methods
| Method | Description | Parameters |
|---------- |-------------- | -- |
| setActiveItem | manually switch slide | index of the slide to be switched to, starting from 0; or the `name` of corresponding `Carousel.Item` |
| prev | switch to the previous slide | — |
| next | switch to the next slide | — |

### Carousel-Item Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | name of the item, can be used in `setActiveItem` | string | — | — |
