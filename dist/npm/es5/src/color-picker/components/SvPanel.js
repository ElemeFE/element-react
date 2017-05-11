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

var SvPanel = function (_Component) {
  _inherits(SvPanel, _Component);

  function SvPanel(props) {
    _classCallCheck(this, SvPanel);

    var _this = _possibleConstructorReturn(this, (SvPanel.__proto__ || Object.getPrototypeOf(SvPanel)).call(this, props));

    _this.state = {
      cursorTop: 0,
      cursorLeft: 0,
      background: 'hsl(0, 100%, 50%)'
    };
    return _this;
  }

  _createClass(SvPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var dragConfig = {
        drag: function drag(event) {
          _this2.handleDrag(event);
        },
        end: function end(event) {
          _this2.handleDrag(event);
        }
      };
      (0, _draggable2.default)(this.$el, dragConfig);
      this.update();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var background = this.state.background;

      var newBackground = 'hsl(' + nextProps.color.get('hue') + ', 100%, 50%)';
      if (newBackground !== background) {
        this.update(nextProps);
      }
    }
  }, {
    key: 'update',
    value: function update(props) {
      var _ref = props || this.props,
          color = _ref.color;

      var saturation = color.get('saturation');
      var value = color.get('value');
      var el = this.$el;

      var _el$getBoundingClient = el.getBoundingClientRect(),
          width = _el$getBoundingClient.width,
          height = _el$getBoundingClient.height;

      if (!height) height = width * 3 / 4;
      this.setState({
        cursorLeft: saturation * width / 100,
        cursorTop: (100 - value) * height / 100,
        background: 'hsl(' + color.get('hue') + ', 100%, 50%)'
      });
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(event) {
      var color = this.props.color;
      var onChange = this.context.onChange;

      var el = this.$el;
      var rect = el.getBoundingClientRect();
      var left = event.clientX - rect.left;
      var top = event.clientY - rect.top;
      left = Math.max(0, left);
      left = Math.min(left, rect.width);
      top = Math.max(0, top);
      top = Math.min(top, rect.height);
      this.setState({
        cursorLeft: left,
        cursorTop: top,
        background: 'hsl(' + color.get('hue') + ', 100%, 50%)'
      }, function () {
        color.set({
          saturation: left / rect.width * 100,
          value: 100 - top / rect.height * 100
        });
        onChange(color);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          cursorTop = _state.cursorTop,
          cursorLeft = _state.cursorLeft,
          background = _state.background;

      return _react2.default.createElement(
        'div',
        {
          className: 'el-color-svpanel',
          style: { backgroundColor: background },
          ref: function ref(el) {
            return _this3.$el = el;
          }
        },
        _react2.default.createElement('div', { className: 'el-color-svpanel__white' }),
        _react2.default.createElement('div', { className: 'el-color-svpanel__black' }),
        _react2.default.createElement(
          'div',
          {
            className: 'el-color-svpanel__cursor',
            style: {
              top: cursorTop + 'px',
              left: cursorLeft + 'px'
            }
          },
          _react2.default.createElement('div', null)
        )
      );
    }
  }]);

  return SvPanel;
}(_libs.Component);

var _default = SvPanel;
exports.default = _default;


SvPanel.contextTypes = {
  onChange: _libs.PropTypes.func
};

SvPanel.propTypes = {
  color: _libs.PropTypes.object.isRequired
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(SvPanel, 'SvPanel', 'src/color-picker/components/SvPanel.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/color-picker/components/SvPanel.jsx');
}();

;