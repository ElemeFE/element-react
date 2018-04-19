/* @flow */

import React from 'react';
import throttle from 'throttle-debounce/throttle';
import { Component, PropTypes, Transition, View } from '../../libs';
import { addResizeListener, removeResizeListener } from '../../libs/utils/resize-event';

type State = {
  items: Array<Component>,
  activeIndex: number,
  containerWidth: number,
  timer: ?number,
  hover: boolean
};

type Context = {
  component: Carousel
};

export default class Carousel extends Component {
  state: State;
  throttledArrowClick: (index: number) => void;
  throttledIndicatorHover: (index: number) => void;

  constructor(props: Object) {
    super(props);

    this.state = {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    };

    this.throttledArrowClick = throttle(300, true, index => {
      this.setActiveItem(index);
    });

    this.throttledIndicatorHover = throttle(300, index => {
      this.handleIndicatorHover(index);
    });

    this.resetItemPosition = this._resetItemPosition.bind(this)
  }

  getChildContext(): Context {
    return {
      component: this
    };
  }

  componentDidMount() {
    

    if (this.props.initialIndex < this.state.items.length && this.props.initialIndex >= 0) {
      this.setState({
        activeIndex: this.props.initialIndex
      });
    }

    this.startTimer();
  }

  componentDidUpdate(props: Object, state: State): void {
    addResizeListener(this.refs.root, this.resetItemPosition);
    
    if (state.activeIndex != this.state.activeIndex) {
      this.resetItemPosition(state.activeIndex);

      if (this.props.onChange) {
        this.props.onChange(this.state.activeIndex, state.activeIndex);
      }
    }
  }

  componentWillUnmount(): void {
    removeResizeListener(this.refs.root, this.resetItemPosition);
  }

  handleMouseEnter(): void {
    this.setState({ hover: true });
    this.pauseTimer();
  }

  handleMouseLeave(): void {
    this.setState({ hover: false });
    this.startTimer();
  }

  itemInStage(item: Component, index: number): mixed {
    const length = this.state.items.length;

    if (index === length - 1 && item.state.inStage && this.state.items[0].state.active ||
      (item.state.inStage && this.state.items[index + 1] && this.state.items[index + 1].state.active)) {
      return 'left';
    } else if (index === 0 && item.state.inStage && this.state.items[length - 1].state.active ||
      (item.state.inStage && this.state.items[index - 1] && this.state.items[index - 1].state.active)) {
      return 'right';
    }

    return false;
  }

  handleButtonEnter(arrow: mixed): void {
    this.state.items.forEach((item, index) => {
      if (arrow === this.itemInStage(item, index)) {
        item.setState({ hover: true });
      }
    });
  }

  handleButtonLeave(): void {
    this.state.items.forEach(item => {
      item.setState({ hover: false });
    });
  }

  _resetItemPosition(oldIndex: number): void {
    this.state.items.forEach((item, index) => {
      item.translateItem(index, this.state.activeIndex, oldIndex);
    });
  }

  playSlides(): void {
    let { activeIndex } = this.state;

    if (activeIndex < this.state.items.length - 1) {
      activeIndex++;
    } else {
      activeIndex = 0;
    }

    this.setState({ activeIndex });
  }

  pauseTimer(): void {
    clearInterval(this.timer);
  }

  startTimer(): void {
    if (this.props.interval <= 0 || !this.props.autoplay) return;
    this.timer = setInterval(this.playSlides.bind(this), Number(this.props.interval));
  }

  addItem(item: Component): void {
    this.state.items.push(item);
    this.setActiveItem(0);
  }

  removeItem(item: Component): void {
    this.state.items.splice(this.state.items.indexOf(item), 1);
    this.setActiveItem(0);
  }

  setActiveItem(index: number): void {
    let { activeIndex } = this.state;

    if (typeof index === 'string') {
      const filteredItems = this.state.items.filter(item => item.props.name === index);

      if (filteredItems.length > 0) {
        index = this.state.items.indexOf(filteredItems[0]);
      }
    }

    index = Number(index);

    if (isNaN(index) || index !== Math.floor(index)) {
      process.env.NODE_ENV !== 'production' &&
      console.warn('[Element Warn][Carousel]index must be an integer.');
      return;
    }

    let length = this.state.items.length;

    if (index < 0) {
      activeIndex = length - 1;
    } else if (index >= length) {
      activeIndex = 0;
    } else {
      activeIndex = index;
    }

    this.setState({ activeIndex });
  }

  prev(): void {
    this.setActiveItem(this.state.activeIndex - 1);
  }

  next(): void {
    this.setActiveItem(this.state.activeIndex + 1);
  }

  handleIndicatorClick(index: number): void {
    this.setState({
      activeIndex: index
    });
  }

  handleIndicatorHover(index: number): void {
    if (this.props.trigger === 'hover' && index !== this.state.activeIndex) {
      this.setState({
        activeIndex: index
      });
    }
  }

  get iscard(): boolean {
    const { type } = this.props;
    if (type) {
      return type === 'card' || type === 'flatcard';
    }
    return false;
  }

  render(): React.Element<any> {
    const { height, arrow, indicatorPosition } = this.props;
    const { hover, activeIndex, items } = this.state;
    return (
      <div
        ref="root"
        className={this.className('el-carousel', { 'el-carousel--card': this.iscard })}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <div
          className="el-carousel__container"
          style={{height: height}}>
          <Transition name="carousel-arrow-left">
            {
              arrow !== 'never' && (
                <View show={arrow === 'always' || hover}>
                  <button
                    className="el-carousel__arrow el-carousel__arrow--left"
                    onMouseEnter={this.handleButtonEnter.bind(this, 'left')}
                    onMouseLeave={this.handleButtonLeave.bind(this)}
                    onClick={this.throttledArrowClick.bind(this, activeIndex - 1)}
                  >
                    <i className="el-icon-arrow-left"></i>
                  </button>
                </View>
              )
            }
          </Transition>
          <Transition name="carousel-arrow-right">
            {
              arrow !== 'never' && (
                <View show={arrow === 'always' || hover}>
                  <button
                    className="el-carousel__arrow el-carousel__arrow--right"
                    onMouseEnter={this.handleButtonEnter.bind(this, 'right')}
                    onMouseLeave={this.handleButtonLeave.bind(this)}
                    onClick={this.throttledArrowClick.bind(this, activeIndex + 1)}
                  >
                    <i className="el-icon-arrow-right"></i>
                  </button>
                </View>
              )
            }
          </Transition>
          {this.props.children}
        </div>
        {
          indicatorPosition !== 'none' && (
            <ul
              className={this.classNames('el-carousel__indicators', {
                'el-carousel__indicators--outside': indicatorPosition === 'outside' || this.iscard
              })}
            >
              {
                items.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={this.classNames('el-carousel__indicator', { 'is-active': index === activeIndex })}
                      onMouseEnter={this.throttledIndicatorHover.bind(this, index)}
                      onClick={this.handleIndicatorClick.bind(this, index)}
                    >
                      <button className="el-carousel__button"></button>
                    </li>
                  )
                })
              }
            </ul>
          )
        }
      </div>
    )
  }
}

Carousel.childContextTypes = {
  component: PropTypes.any
};

Carousel.propTypes = {
  initialIndex: PropTypes.number,
  height: PropTypes.string,
  trigger: PropTypes.string,
  autoplay: PropTypes.bool,
  interval: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  indicatorPosition: PropTypes.string,
  indicator: PropTypes.bool,
  arrow: PropTypes.string,
  type: PropTypes.oneOf(['card', 'flatcard']),
  onChange: PropTypes.func
};

Carousel.defaultProps = {
  initialIndex: 0,
  trigger: 'hover',
  autoplay: true,
  interval: 3000,
  indicator: true,
  arrow: 'hover'
};
