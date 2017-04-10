'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../../libs');

var _draggable = require('../draggable');

var _draggable2 = _interopRequireDefault(_draggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HueSlider = function (_Component) {
  _inherits(HueSlider, _Component);

  function HueSlider(props) {
    _classCallCheck(this, HueSlider);

    var _this = _possibleConstructorReturn(this, (HueSlider.__proto__ || Object.getPrototypeOf(HueSlider)).call(this, props));

    _this.state = {
      thumbLeft: 0,
      thumbTop: 0
    };
    return _this;
  }

  _createClass(HueSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _refs = this.refs,
          bar = _refs.bar,
          thumb = _refs.thumb;

      var dragConfig = {
        drag: function drag(event) {
          _this2.handleDrag(event);
        },
        end: function end(event) {
          _this2.handleDrag(event);
        }
      };
      (0, _draggable2.default)(bar, dragConfig);
      (0, _draggable2.default)(thumb, dragConfig);
      this.update();
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      var thumb = this.refs.thumb;
      var target = event.target;
      if (target !== thumb) {
        this.handleDrag(event);
      }
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(event) {
      var rect = this.$el.getBoundingClientRect();
      var thumb = this.refs.thumb;
      var _props = this.props,
          vertical = _props.vertical,
          color = _props.color;
      var onChange = this.context.onChange;

      var hue = void 0;
      if (!vertical) {
        var left = event.clientX - rect.left;
        left = Math.min(left, rect.width - thumb.offsetWidth / 2);
        left = Math.max(thumb.offsetWidth / 2, left);
        hue = Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 360);
      } else {
        var top = event.clientY - rect.top;
        top = Math.min(top, rect.height - thumb.offsetHeight / 2);
        top = Math.max(thumb.offsetHeight / 2, top);
        hue = Math.round((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight) * 360);
      }
      color.set('hue', hue);
      this.update();
      onChange(color);
    }
  }, {
    key: 'getThumbLeft',
    value: function getThumbLeft() {
      var _props2 = this.props,
          vertical = _props2.vertical,
          color = _props2.color;

      if (vertical) return 0;
      var el = this.$el;
      var hue = color.get('hue');
      if (!el) return 0;
      var thumb = this.refs.thumb;
      return Math.round(hue * (el.offsetWidth - thumb.offsetWidth / 2) / 360);
    }
  }, {
    key: 'getThumbTop',
    value: function getThumbTop() {
      var _props3 = this.props,
          vertical = _props3.vertical,
          color = _props3.color;

      if (!vertical) return 0;
      var el = this.$el;
      var hue = color.get('hue');
      if (!el) return 0;
      var thumb = this.refs.thumb;
      return Math.round(hue * (el.offsetHeight - thumb.offsetHeight / 2) / 360);
    }
  }, {
    key: 'update',
    value: function update() {
      this.setState({
        thumbLeft: this.getThumbLeft(),
        thumbTop: this.getThumbTop()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var vertical = this.props.vertical;
      var _state = this.state,
          thumbLeft = _state.thumbLeft,
          thumbTop = _state.thumbTop;

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(el) {
            return _this3.$el = el;
          },
          className: this.classNames({
            'el-color-hue-slider': true,
            'is-vertical': vertical
          }),
          style: { float: 'right' }
        },
        _react2.default.createElement('div', {
          className: 'el-color-hue-slider__bar',
          onClick: function onClick(e) {
            return _this3.handleClick(e);
          },
          ref: 'bar'
        }),
        _react2.default.createElement('div', {
          className: 'el-color-hue-slider__thumb',
          style: {
            left: thumbLeft + 'px',
            top: thumbTop + 'px'
          },
          ref: 'thumb'
        })
      );
    }
  }]);

  return HueSlider;
}(_libs.Component);

var _default = HueSlider;
exports.default = _default;


HueSlider.contextTypes = {
  onChange: _libs.PropTypes.func
};

HueSlider.propTypes = {
  vertical: _libs.PropTypes.bool,
  color: _libs.PropTypes.object.isRequired
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(HueSlider, 'HueSlider', 'src/color-picker/components/HueSlider.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/color-picker/components/HueSlider.jsx');
}();

;