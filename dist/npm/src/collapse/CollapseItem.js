'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _dom = require('../../libs/utils/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollapseItem = function (_Component) {
  _inherits(CollapseItem, _Component);

  function CollapseItem(props) {
    _classCallCheck(this, CollapseItem);

    return _possibleConstructorReturn(this, (CollapseItem.__proto__ || Object.getPrototypeOf(CollapseItem)).call(this, props));
  }

  _createClass(CollapseItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _dom.loadStyleString)('.collapse-enter {\n        max-height: 0px;\n        -webkit-transition: max-height .3s ease;\n        overflow: hidden;\n      }\n      .collapse-enter.collapse-enter-active {\n        height: auto;\n        max-height: 100px;\n      }\n      .collapse-leave {\n        max-height: 100px;\n        -webkit-transition: max-height .3s ease;\n      }\n      .collapse-leave.collapse-leave-active {\n        overflow: hidden;\n        max-height: 0px;\n      }\n      ', 'collaspe-item');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          isActive = _props.isActive,
          _onClick = _props.onClick,
          name = _props.name;


      return _react2.default.createElement(
        'div',
        { className: this.classNames({ 'el-collapse-item': true, 'is-active': isActive }) },
        _react2.default.createElement(
          'div',
          { className: 'el-collapse-item__header', onClick: function onClick() {
              return _onClick(name);
            } },
          _react2.default.createElement('i', { className: 'el-collapse-item__header__arrow el-icon-arrow-right' }),
          title
        ),
        _react2.default.createElement(
          _libs.Transition,
          { name: 'collapse' },
          isActive && _react2.default.createElement(
            'div',
            { className: 'el-collapse-item__wrap' },
            _react2.default.createElement(
              'div',
              { className: 'el-collapse-item__content' },
              this.props.children
            )
          )
        )
      );
    }
  }]);

  return CollapseItem;
}(_libs.Component);

var _default = CollapseItem;
exports.default = _default;


CollapseItem.propTypes = {
  onClick: _libs.PropTypes.func,
  isActive: _libs.PropTypes.bool,
  title: _libs.PropTypes.node,
  name: _libs.PropTypes.string
};

CollapseItem.defaultProps = {};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CollapseItem, 'CollapseItem', 'src/collapse/CollapseItem.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/collapse/CollapseItem.jsx');
}();

;