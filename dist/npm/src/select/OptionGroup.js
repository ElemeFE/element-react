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

var OptionGroup = function (_Component) {
  _inherits(OptionGroup, _Component);

  function OptionGroup() {
    _classCallCheck(this, OptionGroup);

    return _possibleConstructorReturn(this, (OptionGroup.__proto__ || Object.getPrototypeOf(OptionGroup)).apply(this, arguments));
  }

  _createClass(OptionGroup, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'ul',
        { style: this.style(), className: this.className('el-select-group__wrap') },
        _react2.default.createElement(
          'li',
          { className: 'el-select-group__title' },
          this.props.label
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'ul',
            { className: 'el-select-group' },
            this.props.children
          )
        )
      );
    }
  }]);

  return OptionGroup;
}(_libs.Component);

var _default = OptionGroup;
exports.default = _default;


OptionGroup.propTypes = {
  label: _libs.PropTypes.string
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(OptionGroup, 'OptionGroup', 'src/select/OptionGroup.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/select/OptionGroup.jsx');
}();

;