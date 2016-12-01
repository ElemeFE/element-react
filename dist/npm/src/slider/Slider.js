'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _inputNumber = require('../input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _tooltip = require('../tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.state = {
      oldValue: props.value,
      inputValue: props.value,
      currentPosition: (props.value - props.min) / (props.max - props.min) * 100 + '%'
    };
    return _this;
  }

  _createClass(Slider, [{
    key: 'onSliderClick',
    value: function onSliderClick(event) {
      if (this.props.disabled) return;

      var currentX = event.clientX;
      var sliderOffsetLeft = this.refs.slider.getBoundingClientRect().left;
      var newPos = (currentX - sliderOffsetLeft) / this.sliderWidth() * 100;

      this.setPosition(newPos);
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(event) {
      var _props = this.props,
          max = _props.max,
          min = _props.min;
      var value = event.target.value;


      if (value === '') {
        return;
      }

      if (!isNaN(value)) {
        this.setPosition((value - min) * 100 / (max - min));
      }
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(event) {
      this.startX = event.clientX;
      this.startPos = parseInt(this.state.currentPosition, 10);

      this.setState({
        dragging: true
      });
    }
  }, {
    key: 'onDragging',
    value: function onDragging(event) {
      if (this.state.dragging) {
        // this.refs.tooltip.showPopper = true;
        this.currentX = event.clientX;

        var diff = (this.currentX - this.startX) / this.sliderWidth() * 100;

        this.newPos = this.startPos + diff;
        this.setPosition(this.newPos);
      }
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd() {
      if (this.state.dragging) {
        this.setState({
          dragging: false
        });

        // this.refs.tooltip.showPopper = false;
        this.setPosition(this.newPos);

        window.removeEventListener('mousemove', this.onDragging.bind(this));
        window.removeEventListener('mouseup', this.onDragEnd.bind(this));
      }
    }
  }, {
    key: 'onButtonDown',
    value: function onButtonDown(event) {
      if (this.props.disabled) return;

      this.onDragStart(event);

      window.addEventListener('mousemove', this.onDragging.bind(this));
      window.addEventListener('mouseup', this.onDragEnd.bind(this));
    }
  }, {
    key: 'setPosition',
    value: function setPosition(newPos) {
      if (newPos >= 0 && newPos <= 100) {
        var _props2 = this.props,
            max = _props2.max,
            min = _props2.min,
            step = _props2.step;


        var lengthPerStep = 100 / ((max - min) / step);
        var steps = Math.round(newPos / lengthPerStep);

        var value = Math.round(steps * lengthPerStep * (max - min) * 0.01 + min);

        this.setState({
          inputValue: value,
          currentPosition: (value - min) / (max - min) * 100 + '%'
        });

        if (!this.state.dragging) {
          if (value !== this.state.oldValue) {
            this.state.oldValue = value;

            if (this.props.onChange) {
              this.props.onChange({
                target: {
                  value: value
                }
              });
            }
          }
        }
      }
    }
  }, {
    key: 'sliderWidth',
    value: function sliderWidth() {
      return parseInt(this.refs.slider.offsetWidth, 10);
    }
  }, {
    key: 'stops',
    value: function stops() {
      var _props3 = this.props,
          max = _props3.max,
          min = _props3.min,
          step = _props3.step,
          value = _props3.value;


      var stopCount = (max - value) / step;
      var currentLeft = parseFloat(this.state.currentPosition);
      var stepWidth = 100 * step / (max - min);

      var result = [];

      for (var i = 1; i < stopCount; i++) {
        result.push(currentLeft + i * stepWidth);
      }

      return result;
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({
        hovering: true
      });

      // this.$refs.tooltip.showPopper = true;
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({
        hovering: false
      });

      // this.$refs.tooltip.showPopper = false;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-slider') },
        this.props.showInput && _react2.default.createElement(_inputNumber2.default, {
          ref: 'input',
          className: 'el-slider__input',
          defaultValue: this.state.inputValue,
          value: this.state.inputValue,
          onChange: this.onInputChange.bind(this),
          step: this.props.step,
          disabled: this.props.disabled,
          min: this.props.min,
          max: this.props.max,
          size: 'small' }),
        _react2.default.createElement(
          'div',
          { ref: 'slider', className: this.classNames('el-slider__runway', {
              'show-input': this.props.showInput,
              'disabled': this.props.disabled
            }), onClick: this.onSliderClick.bind(this) },
          _react2.default.createElement('div', { className: 'el-slider__bar', style: {
              width: this.state.currentPosition
            } }),
          _react2.default.createElement(
            'div',
            {
              ref: 'button',
              className: this.classNames('el-slider__button-wrapper', {
                'hover': this.state.hovering,
                'dragging': this.state.dragging
              }),
              style: {
                left: this.state.currentPosition
              },
              onMouseEnter: this.handleMouseEnter.bind(this),
              onMouseLeave: this.handleMouseLeave.bind(this),
              onMouseDown: this.onButtonDown.bind(this) },
            _react2.default.createElement(
              _tooltip2.default,
              { ref: 'tooltip', placement: 'top', content: _react2.default.createElement(
                  'span',
                  null,
                  this.state.inputValue
                ) },
              _react2.default.createElement('div', { className: this.classNames('el-slider__button', {
                  'hover': this.state.hovering,
                  'dragging': this.state.dragging
                }) })
            )
          ),
          this.props.showStops && this.stops().map(function (item, index) {
            return _react2.default.createElement('div', { key: index, className: 'el-slider__stop', style: { 'left': item + '%' } });
          })
        )
      );
    }
  }]);

  return Slider;
}(_libs.Component);

var _default = Slider;
exports.default = _default;


Slider.propTypes = {
  min: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  max: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  step: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  value: _libs.PropTypes.number,
  showInput: _libs.PropTypes.bool,
  showStops: _libs.PropTypes.bool,
  disabled: _libs.PropTypes.bool,
  onChange: _libs.PropTypes.func
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Slider, 'Slider', 'src/slider/Slider.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/slider/Slider.jsx');
}();

;