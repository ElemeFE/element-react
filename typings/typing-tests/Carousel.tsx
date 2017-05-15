import * as React from 'react'
import { Carousel } from 'element-react'
import { Carousel as CarouselNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onChange = (current, prev) => { }
  render() {
    return (
      <div>
        <Carousel className="className" style={{ width: 100 }}>
          <Carousel.Item className="className" style={{ width: 100 }}>
            <h3>idi</h3>
          </Carousel.Item>
        </Carousel>
        <Carousel interval="3000" indicatorPosition="none" arrow="always">
          <Carousel.Item>
            <h3>idi</h3>
          </Carousel.Item>
        </Carousel>
        <Carousel arrow="hover">
          <Carousel.Item>
            <h3>idi</h3>
          </Carousel.Item>
        </Carousel>
        <Carousel initialIndex={1} height="200" trigger="click" autoplay={true} interval={3000} indicatorPosition="outside" indicator={true} arrow="never" type="card" onChange={this.onChange}>
          <Carousel.Item name="name">
            <h3>idi</h3>
          </Carousel.Item>
        </Carousel>

        <CarouselNext className="className" style={{ width: 100 }}>
          <CarouselNext.Item className="className" style={{ width: 100 }}>
            <h3>idi</h3>
          </CarouselNext.Item>
        </CarouselNext>
        <CarouselNext interval="3000" indicatorPosition="none" arrow="always">
          <CarouselNext.Item>
            <h3>idi</h3>
          </CarouselNext.Item>
        </CarouselNext>
        <CarouselNext arrow="hover">
          <CarouselNext.Item>
            <h3>idi</h3>
          </CarouselNext.Item>
        </CarouselNext>
        <CarouselNext initialIndex={1} height="200" trigger="click" autoplay={true} interval={3000} indicatorPosition="outside" indicator={true} arrow="never" type="card" onChange={this.onChange}>
          <CarouselNext.Item name="name">
            <h3>idi</h3>
          </CarouselNext.Item>
        </CarouselNext>
      </div>
    )
  }
}

class CarouselComponent extends Carousel {
  componentDidMount() {
    this.setActiveItem(1)
    this.prev()
    this.next()
  }
}
