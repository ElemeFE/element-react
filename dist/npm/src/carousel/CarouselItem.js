'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CARD_SCALE = 0.83;

var CarouselItem = function (_Component) {
  _inherits(CarouselItem, _Component);

  function CarouselItem(props) {
    _classCallCheck(this, CarouselItem);

    var _this = _possibleConstructorReturn(this, (CarouselItem.__proto__ || Object.getPrototypeOf(CarouselItem)).call(this, props));

    _this.state = {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false
    };
    return _this;
  }

  _createClass(CarouselItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.parent().addItem(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.parent().removeItem(this);
    }
  }, {
    key: 'processIndex',
    value: function processIndex(index, activeIndex, length) {
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
  }, {
    key: 'calculateTranslate',
    value: function calculateTranslate(index, activeIndex, parentWidth) {
      if (this.state.inStage) {
        return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
      } else if (index < activeIndex) {
        return -(1 + CARD_SCALE) * parentWidth / 4;
      } else {
        return (3 + CARD_SCALE) * parentWidth / 4;
      }
    }
  }, {
    key: 'translateItem',
    value: function translateItem(index, activeIndex) {
      var parentWidth = _reactDom2.default.findDOMNode(this.parent()).offsetWidth;
      var length = this.parent().state.items.length;

      if (index !== activeIndex && length > 2) {
        index = this.processIndex(index, activeIndex, length);
      }

      if (this.parent().props.type === 'card') {
        this.state.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        this.state.active = index === activeIndex;
        this.state.translate = this.calculateTranslate(index, activeIndex, parentWidth);
        this.state.scale = this.state.active ? 1 : CARD_SCALE;
      } else {
        this.state.active = index === activeIndex;
        this.state.translate = parentWidth * (index - activeIndex);
      }

      this.state.ready = true;

      this.forceUpdate();
    }
  }, {
    key: 'handleItemClick',
    value: function handleItemClick() {
      if (this.parent().props.type === 'card') {
        var index = this.parent().state.items.indexOf(this);
        this.parent().setActiveItem(index);
      }
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          hover = _state.hover,
          translate = _state.translate,
          scale = _state.scale,
          active = _state.active,
          ready = _state.ready,
          inStage = _state.inStage;


      return _react2.default.createElement(
        _libs.View,
        { show: ready },
        _react2.default.createElement(
          'div',
          {
            className: this.className('el-carousel__item', {
              'is-active': active,
              'el-carousel__item--card': this.parent().props.type === 'card',
              'is-in-stage': inStage,
              'is-hover': hover
            }),
            onClick: this.handleItemClick.bind(this),
            style: {
              msTransform: 'translateX(' + translate + 'px) scale(' + scale + ')',
              WebkitTransform: 'translateX(' + translate + 'px) scale(' + scale + ')',
              transform: 'translateX(' + translate + 'px) scale(' + scale + ')'
            } },
          this.parent().props.type === 'card' && _react2.default.createElement(
            _libs.View,
            { show: !active },
            _react2.default.createElement('div', { className: 'el-carousel__mask' })
          ),
          this.props.children
        )
      );
    }
  }]);

  return CarouselItem;
}(_libs.Component);

var _default = CarouselItem;
exports.default = _default;


CarouselItem.contextTypes = {
  component: _libs.PropTypes.any
};

CarouselItem.propTypes = {
  name: _libs.PropTypes.string
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CARD_SCALE, 'CARD_SCALE', 'src/carousel/CarouselItem.jsx');

  __REACT_HOT_LOADER__.register(CarouselItem, 'CarouselItem', 'src/carousel/CarouselItem.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/carousel/CarouselItem.jsx');
}();

;