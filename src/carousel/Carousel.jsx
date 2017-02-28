import React from 'react';
import throttle from 'throttle-debounce/throttle';
import { Component, PropTypes, Transition, View } from '../../libs';
import { addResizeListener, removeResizeListener } from '../../libs/utils/resize-event';

export default class Carousel extends Component {
  constructor(props) {
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
  }

  getChildContext() {
    return {
      component: this
    };
  }

  componentDidMount() {
    addResizeListener(this.refs.root, this.resetItemPosition.bind(this));

    if (this.props.initialIndex < this.state.items.length && this.props.initialIndex >= 0) {
      this.setState({
        activeIndex: this.props.initialIndex
      });
    }

    this.startTimer();
  }

  componentDidUpdate(props, state) {
    if (state.activeIndex != this.state.activeIndex) {
      this.resetItemPosition();

      if (this.props.onChange) {
        this.props.onChange(this.state.activeIndex, state.activeIndex);
      }
    }
  }

  componentWillUnmount() {
    removeResizeListener(this.refs.root, this.resetItemPosition.bind(this));
  }

  handleMouseEnter() {
    this.setState({ hover: true });
    this.pauseTimer();
  }

  handleMouseLeave() {
    this.setState({ hover: false });
    this.startTimer();
  }

  itemInStage(item, index) {
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

  handleButtonEnter(arrow) {
    this.state.items.forEach((item, index) => {
      if (arrow === this.itemInStage(item, index)) {
        item.setState({ hover: true });
      }
    });
  }

  handleButtonLeave() {
    this.state.items.forEach(item => {
      item.setState({ hover: false });
    });
  }

  resetItemPosition() {
    this.state.items.forEach((item, index) => {
      item.translateItem(index, this.state.activeIndex);
    });
  }

  playSlides() {
    let { activeIndex } = this.state;

    if (activeIndex < this.state.items.length - 1) {
      activeIndex++;
    } else {
      activeIndex = 0;
    }

    this.setState({ activeIndex });
  }

  pauseTimer() {
    clearInterval(this.timer);
  }

  startTimer() {
    if (this.props.interval <= 0 || !this.props.autoplay) return;
    this.timer = setInterval(this.playSlides.bind(this), Number(this.props.interval));
  }

  addItem(item) {
    this.state.items.push(item);
    this.setActiveItem(0);
  }

  removeItem(item) {
    this.state.items.splice(this.state.items.indexOf(item), 1);
    this.setActiveItem(0);
  }

  setActiveItem(index) {
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

  prev() {
    this.setActiveItem(this.state.activeIndex - 1);
  }

  next() {
    this.setActiveItem(this.state.activeIndex + 1);
  }

  handleIndicatorClick(index) {
    this.setState({
      activeIndex: index
    });
  }

  handleIndicatorHover(index) {
    if (this.props.trigger === 'hover' && index !== this.state.activeIndex) {
      this.setState({
        activeIndex: index
      });
    }
  }

  render() {
    const { type, height, arrow, indicatorPosition } = this.props;
    const { hover, activeIndex, items } = this.state;

    return (
      <div
        ref="root"
        className={this.className('el-carousel', { 'el-carousel--card': type === 'card' })}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <div
          className="el-carousel__container"
          style={{height: height}}>
          <Transition name="carousel-arrow-left" duration="300">
            {
              arrow !== 'never' && (
                <View key={arrow === 'always' || hover} show={arrow === 'always' || hover}>
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
                <View key={arrow === 'always' || hover} show={arrow === 'always' || hover}>
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
                'el-carousel__indicators--outside': indicatorPosition === 'outside' || type === 'card'
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
