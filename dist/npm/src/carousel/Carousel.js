'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _throttle = require('throttle-debounce/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _libs = require('../../libs');

var _resizeEvent = require('../../libs/utils/resize-event');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Carousel = function (_Component) {
  _inherits(Carousel, _Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _this.state = {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    };

    _this.throttledArrowClick = (0, _throttle2.default)(300, true, function (index) {
      _this.setActiveItem(index);
    });

    _this.throttledIndicatorHover = (0, _throttle2.default)(300, function (index) {
      _this.handleIndicatorHover(index);
    });
    return _this;
  }

  _createClass(Carousel, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _resizeEvent.addResizeListener)(this.refs.root, this.resetItemPosition.bind(this));

      if (this.props.initialIndex < this.state.items.length && this.props.initialIndex >= 0) {
        this.setState({
          activeIndex: this.props.initialIndex
        });
      }

      this.startTimer();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      if (state.activeIndex != this.state.activeIndex) {
        this.resetItemPosition();

        if (this.props.onChange) {
          this.props.onChange(this.state.activeIndex, state.activeIndex);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _resizeEvent.removeResizeListener)(this.refs.root, this.resetItemPosition.bind(this));
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({ hover: true });
      this.pauseTimer();
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({ hover: false });
      this.startTimer();
    }
  }, {
    key: 'itemInStage',
    value: function itemInStage(item, index) {
      var length = this.state.items.length;

      if (index === length - 1 && item.state.inStage && this.state.items[0].state.active || item.state.inStage && this.state.items[index + 1] && this.state.items[index + 1].state.active) {
        return 'left';
      } else if (index === 0 && item.state.inStage && this.state.items[length - 1].state.active || item.state.inStage && this.state.items[index - 1] && this.state.items[index - 1].state.active) {
        return 'right';
      }

      return false;
    }
  }, {
    key: 'handleButtonEnter',
    value: function handleButtonEnter(arrow) {
      var _this2 = this;

      this.state.items.forEach(function (item, index) {
        if (arrow === _this2.itemInStage(item, index)) {
          item.setState({ hover: true });
        }
      });
    }
  }, {
    key: 'handleButtonLeave',
    value: function handleButtonLeave() {
      this.state.items.forEach(function (item) {
        item.setState({ hover: false });
      });
    }
  }, {
    key: 'resetItemPosition',
    value: function resetItemPosition() {
      var _this3 = this;

      this.state.items.forEach(function (item, index) {
        item.translateItem(index, _this3.state.activeIndex);
      });
    }
  }, {
    key: 'playSlides',
    value: function playSlides() {
      var activeIndex = this.state.activeIndex;


      if (activeIndex < this.state.items.length - 1) {
        activeIndex++;
      } else {
        activeIndex = 0;
      }

      this.setState({ activeIndex: activeIndex });
    }
  }, {
    key: 'pauseTimer',
    value: function pauseTimer() {
      clearInterval(this.timer);
    }
  }, {
    key: 'startTimer',
    value: function startTimer() {
      if (this.props.interval <= 0 || !this.props.autoplay) return;
      this.timer = setInterval(this.playSlides.bind(this), Number(this.props.interval));
    }
  }, {
    key: 'addItem',
    value: function addItem(item) {
      this.state.items.push(item);
      this.setActiveItem(0);
    }
  }, {
    key: 'removeItem',
    value: function removeItem(item) {
      this.state.items.splice(this.state.items.indexOf(item), 1);
      this.setActiveItem(0);
    }
  }, {
    key: 'setActiveItem',
    value: function setActiveItem(index) {
      var activeIndex = this.state.activeIndex;


      if (typeof index === 'string') {
        var filteredItems = this.state.items.filter(function (item) {
          return item.props.name === index;
        });

        if (filteredItems.length > 0) {
          index = this.state.items.indexOf(filteredItems[0]);
        }
      }

      index = Number(index);

      if (isNaN(index) || index !== Math.floor(index)) {
        process.env.NODE_ENV !== 'production' && console.warn('[Element Warn][Carousel]index must be an integer.');
        return;
      }

      var length = this.state.items.length;

      if (index < 0) {
        activeIndex = length - 1;
      } else if (index >= length) {
        activeIndex = 0;
      } else {
        activeIndex = index;
      }

      this.setState({ activeIndex: activeIndex });
    }
  }, {
    key: 'prev',
    value: function prev() {
      this.setActiveItem(this.state.activeIndex - 1);
    }
  }, {
    key: 'next',
    value: function next() {
      this.setActiveItem(this.state.activeIndex + 1);
    }
  }, {
    key: 'handleIndicatorClick',
    value: function handleIndicatorClick(index) {
      this.setState({
        activeIndex: index
      });
    }
  }, {
    key: 'handleIndicatorHover',
    value: function handleIndicatorHover(index) {
      if (this.props.trigger === 'hover' && index !== this.state.activeIndex) {
        this.setState({
          activeIndex: index
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          type = _props.type,
          height = _props.height,
          arrow = _props.arrow,
          indicatorPosition = _props.indicatorPosition;
      var _state = this.state,
          hover = _state.hover,
          activeIndex = _state.activeIndex,
          items = _state.items;


      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: this.className('el-carousel', { 'el-carousel--card': type === 'card' }),
          onMouseEnter: this.handleMouseEnter.bind(this),
          onMouseLeave: this.handleMouseLeave.bind(this)
        },
        _react2.default.createElement(
          'div',
          {
            className: 'el-carousel__container',
            style: { height: height } },
          _react2.default.createElement(
            _libs.Transition,
            { name: 'carousel-arrow-left', duration: '300' },
            arrow !== 'never' && _react2.default.createElement(
              _libs.View,
              { key: arrow === 'always' || hover, show: arrow === 'always' || hover },
              _react2.default.createElement(
                'button',
                {
                  className: 'el-carousel__arrow el-carousel__arrow--left',
                  onMouseEnter: this.handleButtonEnter.bind(this, 'left'),
                  onMouseLeave: this.handleButtonLeave.bind(this),
                  onClick: this.throttledArrowClick.bind(this, activeIndex - 1)
                },
                _react2.default.createElement('i', { className: 'el-icon-arrow-left' })
              )
            )
          ),
          _react2.default.createElement(
            _libs.Transition,
            { name: 'carousel-arrow-right' },
            arrow !== 'never' && _react2.default.createElement(
              _libs.View,
              { key: arrow === 'always' || hover, show: arrow === 'always' || hover },
              _react2.default.createElement(
                'button',
                {
                  className: 'el-carousel__arrow el-carousel__arrow--right',
                  onMouseEnter: this.handleButtonEnter.bind(this, 'right'),
                  onMouseLeave: this.handleButtonLeave.bind(this),
                  onClick: this.throttledArrowClick.bind(this, activeIndex + 1)
                },
                _react2.default.createElement('i', { className: 'el-icon-arrow-right' })
              )
            )
          ),
          this.props.children
        ),
        indicatorPosition !== 'none' && _react2.default.createElement(
          'ul',
          {
            className: this.classNames('el-carousel__indicators', {
              'el-carousel__indicators--outside': indicatorPosition === 'outside' || type === 'card'
            })
          },
          items.map(function (item, index) {
            return _react2.default.createElement(
              'li',
              {
                key: index,
                className: _this4.classNames('el-carousel__indicator', { 'is-active': index === activeIndex }),
                onMouseEnter: _this4.throttledIndicatorHover.bind(_this4, index),
                onClick: _this4.handleIndicatorClick.bind(_this4, index)
              },
              _react2.default.createElement('button', { className: 'el-carousel__button' })
            );
          })
        )
      );
    }
  }]);

  return Carousel;
}(_libs.Component);

var _default = Carousel;
exports.default = _default;


Carousel.childContextTypes = {
  component: _libs.PropTypes.any
};

Carousel.propTypes = {
  initialIndex: _libs.PropTypes.number,
  height: _libs.PropTypes.string,
  trigger: _libs.PropTypes.string,
  autoplay: _libs.PropTypes.bool,
  interval: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  indicatorPosition: _libs.PropTypes.string,
  indicator: _libs.PropTypes.bool,
  arrow: _libs.PropTypes.string,
  type: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func
};

Carousel.defaultProps = {
  initialIndex: 0,
  trigger: 'hover',
  autoplay: true,
  interval: 3000,
  indicator: true,
  arrow: 'hover'
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Carousel, 'Carousel', 'src/carousel/Carousel.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/carousel/Carousel.jsx');
}();

;