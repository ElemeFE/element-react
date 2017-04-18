'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rate = function (_Component) {
  _inherits(Rate, _Component);

  function Rate(props) {
    _classCallCheck(this, Rate);

    var _this = _possibleConstructorReturn(this, (Rate.__proto__ || Object.getPrototypeOf(Rate)).call(this, props));

    _this.state = {
      pointerAtLeftHalf: false,
      currentValue: _this.props.value - 1,
      hoverIndex: -1,
      value: -1
    };
    var _this$props = _this.props,
        iconClasses = _this$props.iconClasses,
        voidIconClass = _this$props.voidIconClass,
        disabledVoidIconClass = _this$props.disabledVoidIconClass,
        colors = _this$props.colors,
        voidColor = _this$props.voidColor,
        disabledVoidColor = _this$props.disabledVoidColor;


    _this.classMap = {
      lowClass: iconClasses[0],
      mediumClass: iconClasses[1],
      highClass: iconClasses[2],
      voidClass: voidIconClass,
      disabledVoidClass: disabledVoidIconClass
    };

    _this.colorMap = {
      lowColor: colors[0],
      mediumColor: colors[1],
      highColor: colors[2],
      voidColor: voidColor,
      disabledVoidColor: disabledVoidColor
    };
    return _this;
  }

  _createClass(Rate, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'setCurrentValue',
    value: function setCurrentValue(value) {
      var _props = this.props,
          disabled = _props.disabled,
          allowHalf = _props.allowHalf;
      // const { pointerAtLeftHalf, currentValue, hoverIndex } = this.state;

      if (disabled) {
        return;
      }
      /* istanbul ignore if */
      if (allowHalf) {
        // let target = window.event.target;
        // console.log(target)
        // if (hasClass(target, 'el-rate__item')) {
        //   target = target.querySelector('.el-rate__icon');
        // }
        // if (hasClass(target, 'el-rate__decimal')) {
        //   target = target.parentNode;
        // }
        // this.setState({
        //   pointerAtLeftHalf: event.offsetX * 2 <= target.clientWidth,
        //   currentValue: (event.offsetX * 2 <= target.clientWidth) ? value - 0.5 : value
        // })
      } else {
        this.setState({
          currentValue: value
        });
      }
      this.setState({
        hoverIndex: value
      });
    }
  }, {
    key: 'getValueFromMap',
    value: function getValueFromMap(value, map) {
      var _props2 = this.props,
          lowThreshold = _props2.lowThreshold,
          highThreshold = _props2.highThreshold;

      var result = '';
      if (value <= lowThreshold - 1) {
        result = map.lowColor || map.lowClass;
      } else if (value >= highThreshold - 1) {
        result = map.highColor || map.highClass;
      } else {
        result = map.mediumColor || map.mediumClass;
      }

      return result;
    }
  }, {
    key: 'getIconStyle',
    value: function getIconStyle(item) {
      var disabled = this.props.disabled;
      var currentValue = this.state.currentValue;

      var voidColor = disabled ? this.colorMap.disabledVoidColor : this.colorMap.voidColor;
      return {
        color: item <= currentValue ? this.activeColor() : voidColor
      };
    }
  }, {
    key: 'showDecimalIcon',
    value: function showDecimalIcon(item) {
      var _props3 = this.props,
          disabled = _props3.disabled,
          allowHalf = _props3.allowHalf,
          value = _props3.value;
      var _state = this.state,
          pointerAtLeftHalf = _state.pointerAtLeftHalf,
          currentValue = _state.currentValue;

      var showWhenDisabled = disabled && this.valueDecimal() > 0 && item - 1 < value - 1 && item > value - 1;
      /* istanbul ignore next */
      var showWhenAllowHalf = allowHalf && pointerAtLeftHalf && (item - 0.5).toFixed(1) === currentValue.toFixed(1);
      return showWhenDisabled || showWhenAllowHalf;
    }
  }, {
    key: 'classes',
    value: function classes() {
      var currentValue = this.state.currentValue;
      var _props4 = this.props,
          allowHalf = _props4.allowHalf,
          max = _props4.max;

      var result = [];
      var i = 0;
      var threshold = currentValue;
      if (allowHalf && currentValue !== Math.floor(currentValue)) {
        threshold--;
      }
      for (; i <= threshold; i++) {
        result.push(this.activeClass());
      }
      for (; i < max; i++) {
        result.push(this.voidClass());
      }
      return result;
    }
  }, {
    key: 'valueDecimal',
    value: function valueDecimal() {
      var value = this.props.value;

      return value * 100 - Math.floor(value) * 100;
    }
  }, {
    key: 'decimalIconClass',
    value: function decimalIconClass() {
      return this.getValueFromMap(this.props.value, this.classMap);
    }
  }, {
    key: 'voidClass',
    value: function voidClass() {
      return this.props.disabled ? this.classMap.disabledVoidClass : this.classMap.voidClass;
    }
  }, {
    key: 'activeClass',
    value: function activeClass() {
      return this.getValueFromMap(this.state.currentValue, this.classMap);
    }
  }, {
    key: 'activeColor',
    value: function activeColor() {
      return this.getValueFromMap(this.state.currentValue, this.colorMap);
    }
  }, {
    key: 'selectValue',
    value: function selectValue(value) {
      var _props5 = this.props,
          disabled = _props5.disabled,
          allowHalf = _props5.allowHalf,
          onChange = _props5.onChange;
      var pointerAtLeftHalf = this.state.pointerAtLeftHalf;

      if (disabled) {
        return;
      }
      if (allowHalf && pointerAtLeftHalf) {
        // this.$emit('input', this.currentValue);
      } else {
        this.setState({
          currentValue: value,
          value: value
        }, function () {
          onChange && onChange(value + 1);
        });
      }
    }
  }, {
    key: 'decimalStyle',
    value: function decimalStyle() {
      var _props6 = this.props,
          disabled = _props6.disabled,
          allowHalf = _props6.allowHalf;

      var width = '';
      if (disabled) {
        width = (this.valueDecimal() < 50 ? 0 : 50) + '%';
      }
      if (allowHalf) {
        width = '50%';
      }
      return {
        color: this.activeColor(),
        width: width
      };
    }
  }, {
    key: 'showText',
    value: function showText() {
      var _props7 = this.props,
          disabled = _props7.disabled,
          texts = _props7.texts,
          textTemplate = _props7.textTemplate,
          value = _props7.value;
      var currentValue = this.state.currentValue;

      var result = '';
      if (disabled) {
        result = textTemplate.replace(/\{\s*value\s*\}/, value);
      } else {
        result = texts[Math.ceil(currentValue)];
      }
      return result;
    }
  }, {
    key: 'resetCurrentValue',
    value: function resetCurrentValue() {
      var _props8 = this.props,
          disabled = _props8.disabled,
          allowHalf = _props8.allowHalf;
      var value = this.state.value;

      if (disabled) {
        return;
      }
      if (allowHalf) {
        this.setState({
          pointerAtLeftHalf: value !== Math.floor(value)
        });
      }
      this.setState({
        currentValue: value,
        hoverIndex: -1
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props9 = this.props,
          showText = _props9.showText,
          textColor = _props9.textColor,
          disabled = _props9.disabled;
      var hoverIndex = this.state.hoverIndex;

      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-rate') },
        [].concat(_toConsumableArray(Array(5))).map(function (v, k) {
          return _react2.default.createElement(
            'span',
            {
              className: 'el-rate__item',
              style: { cursor: disabled ? 'auto' : 'pointer' },
              onClick: function onClick() {
                return _this2.selectValue(k);
              },
              onMouseMove: function onMouseMove() {
                return _this2.setCurrentValue(k);
              },
              onMouseLeave: function onMouseLeave() {
                return _this2.resetCurrentValue();
              },
              key: k
            },
            _react2.default.createElement(
              'i',
              {
                style: _this2.getIconStyle(k),
                className: hoverIndex === k ? 'hover el-rate__icon ' + _this2.classes()[k] : 'el-rate__icon ' + _this2.classes()[k]
              },
              _this2.showDecimalIcon(k) ? _react2.default.createElement('i', {
                style: _this2.decimalStyle(),
                className: 'el-rate__decimal ' + _this2.decimalIconClass()
              }) : null
            )
          );
        }),
        showText ? _react2.default.createElement(
          'span',
          { className: 'el-rate__text', style: { color: textColor } },
          this.showText()
        ) : null
      );
    }
  }]);

  return Rate;
}(_libs.Component);

var _default = Rate;
exports.default = _default;


Rate.propTypes = {
  colors: _libs.PropTypes.array,
  texts: _libs.PropTypes.array,
  showText: _libs.PropTypes.bool,
  textColor: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  value: _libs.PropTypes.number,
  onChange: _libs.PropTypes.func,
  textTemplate: _libs.PropTypes.string,
  lowThreshold: _libs.PropTypes.number,
  highThreshold: _libs.PropTypes.number,
  max: _libs.PropTypes.number,
  voidColor: _libs.PropTypes.string,
  disabledVoidColor: _libs.PropTypes.string,
  iconClasses: _libs.PropTypes.array,
  voidIconClass: _libs.PropTypes.string,
  disabledVoidIconClass: _libs.PropTypes.string,
  allowHalf: _libs.PropTypes.bool
};

Rate.defaultProps = {
  colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'], // icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色
  texts: ['极差', '失望', '一般', '满意', '惊喜'], // 辅助文字数组
  showText: false, // 是否显示辅助文字
  textColor: '#1F2D3D', //   辅助文字的颜色
  disabled: false, // 是否为只读
  value: 0, // 星级
  lowThreshold: 2, // 低分和中等分数的界限值，值本身被划分在低分中
  highThreshold: 4, // 高分和中等分数的界限值，值本身被划分在高分中
  max: 5,
  voidColor: '#C6D1DE',
  disabledVoidColor: '#EFF2F7',
  iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
  voidIconClass: 'el-icon-star-off',
  disabledVoidIconClass: 'el-icon-star-on',
  allowHalf: false,
  textTemplate: '{value}'
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Rate, 'Rate', 'src/rate/Rate.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/rate/Rate.jsx');
}();

;