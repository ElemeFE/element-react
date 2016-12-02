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

var Row = function (_Component) {
  _inherits(Row, _Component);

  function Row() {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
  }

  _createClass(Row, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        gutter: this.props.gutter
      };
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var style = {};

      if (this.props.gutter) {
        style.marginLeft = '-' + this.props.gutter / 2 + 'px';
        style.marginRight = style.marginLeft;
      }

      return style;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: this.className('el-row', this.props.justify !== 'start' && 'is-justify-' + this.props.justify, this.props.align !== 'top' && 'is-align-' + this.props.align, {
            'el-row--flex': this.props.type === 'flex'
          }),
          style: this.style(this.getStyle())
        },
        this.props.children
      );
    }
  }]);

  return Row;
}(_libs.Component);

var _default = Row;
exports.default = _default;


Row.childContextTypes = {
  gutter: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string])
};

Row.propTypes = {
  gutter: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  type: _libs.PropTypes.string,
  justify: _libs.PropTypes.string,
  align: _libs.PropTypes.string
};

Row.defaultProps = {
  justify: 'start',
  align: 'top'
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Row, 'Row', 'src/layout/Row.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/layout/Row.jsx');
}();

;