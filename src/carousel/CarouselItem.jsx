/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes, View } from '../../libs';

type State = {
  hover: boolean,
  translate: number,
  scale: number,
  active: boolean,
  ready: boolean,
  inStage: boolean,
  animating: boolean
};

export default class CarouselItem extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    };
  }

  componentWillMount(): void {
    this.parent().addItem(this);
  }

  componentWillUnmount(): void {
    this.parent().removeItem(this);
  }

  get isFlat(): boolean {
    return this.parent().props.type === 'flatcard';
  }

  get CARD_SCALE(): number {
     return this.isFlat ? 1 : 0.83;
  }

  get calculateWidth(): ?string {
    if (this.isFlat) {
      return parseInt(100 / 3) + '%';
    }
  }

  processIndex(index: number, activeIndex: number, length: number): number {
    if (activeIndex === 0 && index === length - 1) {
      return -1;
    } else if (activeIndex === length - 1 && index === 0) {
      return length;
    } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
      return length + 1;
    } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
      return -2;
    }

    return index;
  }

  calculateTranslate(index: number, activeIndex: number, parentWidth: number): number {
    const denominator = this.isFlat ? 3 : 4;
    if (this.state.inStage) {
      return parentWidth * ((2 - this.CARD_SCALE) * (index - activeIndex) + 1) / denominator;
    } else if (index < activeIndex) {
      return -(1 + this.CARD_SCALE) * parentWidth / denominator;
    } else {
      return (denominator - 1 + this.CARD_SCALE) * parentWidth / denominator;
    }
  }

  translateItem(index: number, activeIndex: number, oldIndex: number) {
    const parent: any = ReactDOM.findDOMNode(this.parent());
    const parentWidth = parent.offsetWidth;
    const length = this.parent().state.items.length;

    if (!this.parent().iscard && oldIndex !== undefined) {
      this.state.animating = index === activeIndex || index === oldIndex;
    }

    if (index !== activeIndex && length > 2) {
      index = this.processIndex(index, activeIndex, length);
    }

    if (this.parent().iscard) {
      this.state.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
      this.state.active = index === activeIndex;
      this.state.translate = this.calculateTranslate(index, activeIndex, parentWidth);
      this.state.scale = this.state.active ? 1 : this.CARD_SCALE;
    } else {
      this.state.active = index === activeIndex;
      this.state.translate = parentWidth * (index - activeIndex);
    }

    this.state.ready = true;

    this.forceUpdate();
  }

  handleItemClick() {
    if (this.parent().iscard) {
      const index = this.parent().state.items.indexOf(this);
      this.parent().setActiveItem(index);
    }
  }

  parent(): Object {
    return this.context.component;
  }

  render() {
    const { hover, translate, scale, active, ready, inStage, animating } = this.state;

    return (
      <View show={ready}>
        <div
          className={this.className('el-carousel__item', {
            'is-active': active,
            'el-carousel__item--card': this.parent().iscard,
            'is-in-stage': inStage,
            'is-hover': hover,
            'is-animating': animating
          })}
          onClick={this.handleItemClick.bind(this)}
          style={{
            msTransform: `translateX(${ translate }px) scale(${ scale })`,
            WebkitTransform: `translateX(${ translate }px) scale(${ scale })`,
            transform: `translateX(${ translate }px) scale(${ scale })`
          }}>
          {
            this.parent().iscard && (
              <View show={!active}>
                <div className="el-carousel__mask" />
              </View>
            )
          }
          {this.props.children}
        </div>
      </View>
    )
  }
}

CarouselItem.contextTypes = {
  component: PropTypes.any
};
