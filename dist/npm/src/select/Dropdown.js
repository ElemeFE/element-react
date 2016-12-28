'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../libs/utils/style');

var _style2 = _interopRequireDefault(_style);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_style2.default.reset('\n  .el-select-dropdown {\n    position: absolute !important;\n  }\n');

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown() {
    _classCallCheck(this, Dropdown);

    return _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));
  }

  _createClass(Dropdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.referenceElm = this.$parent.$refs.reference.$el;
      // this.$parent.popperElm = this.popperElm = this.$el;
      // this.$on('updatePopper', this.updatePopper);
      // this.$on('destroyPopper', this.destroyPopper);
    }
  }, {
    key: 'updatePopper',
    value: function updatePopper() {}
  }, {
    key: 'destroyPopper',
    value: function destroyPopper() {}
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { ref: 'popper', className: this.className('el-select-dropdown', {
            'is-multiple': this.parent().props.multiple
          }), style: this.style({
            minWidth: this.parent().state.inputWidth
          }) },
        this.props.children
      );
    }
  }]);

  return Dropdown;
}(_libs.Component);

var _default = Dropdown;
exports.default = _default;


Dropdown.contextTypes = {
  component: _libs.PropTypes.any
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Dropdown, 'Dropdown', 'src/select/Dropdown.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/select/Dropdown.jsx');
}();

;