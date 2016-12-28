'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tag = function (_Component) {
  _inherits(Tag, _Component);

  function Tag(props) {
    _classCallCheck(this, Tag);

    var _this = _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, props));

    _this.duration = 200;

    _this.state = {
      visible: true
    };
    return _this;
  }

  _createClass(Tag, [{
    key: 'handleClose',
    value: function handleClose() {
      var _this2 = this;

      this.setState({
        visible: false
      }, function () {
        setTimeout(function () {
          if (_this2.props.onClose) {
            _this2.props.onClose();
          }
        }, _this2.duration);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          hit = _props.hit,
          closable = _props.closable,
          closeTransition = _props.closeTransition;


      return _react2.default.createElement(
        _libs.Transition,
        { name: closeTransition ? '' : 'el-zoom-in-center', duration: this.duration },
        _react2.default.createElement(
          _libs.View,
          { key: this.state.visible, show: this.state.visible },
          _react2.default.createElement(
            'span',
            { style: this.style(), className: this.className('el-tag', type && 'el-tag--' + type, {
                'is-hit': hit
              }) },
            this.props.children,
            closable && _react2.default.createElement('i', { className: 'el-tag__close el-icon-close', onClick: this.handleClose.bind(this) })
          )
        )
      );
    }
  }]);

  return Tag;
}(_libs.Component);

var _default = Tag;
exports.default = _default;


Tag.propTypes = {
  closable: _libs.PropTypes.bool,
  type: _libs.PropTypes.string,
  hit: _libs.PropTypes.bool,
  closeTransition: _libs.PropTypes.bool,
  onClose: _libs.PropTypes.func
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Tag, 'Tag', 'src/tag/Tag.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/tag/Tag.jsx');
}();

;