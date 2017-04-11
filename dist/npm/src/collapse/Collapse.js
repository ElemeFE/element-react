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

var Collapse = function (_Component) {
  _inherits(Collapse, _Component);

  function Collapse(props) {
    _classCallCheck(this, Collapse);

    var _this = _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

    _this.state = {
      activeNames: [].concat(_this.props.value)
    };
    return _this;
  }

  _createClass(Collapse, [{
    key: 'setActiveNames',
    value: function setActiveNames(activeNames) {
      var _this2 = this;

      activeNames = [].concat(activeNames);
      this.setState({ activeNames: activeNames }, function () {
        return _this2.props.onChange(activeNames);
      });
    }
  }, {
    key: 'handleItemClick',
    value: function handleItemClick(name) {
      var activeNames = this.state.activeNames;


      if (this.props.accordion) {
        this.setActiveNames(activeNames[0] && activeNames[0] === name ? '' : name);
      } else {
        if (activeNames.includes(name)) {
          this.setActiveNames(activeNames.filter(function (item) {
            return item !== name;
          }));
        } else {
          this.setActiveNames(activeNames.concat(name));
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var content = _react2.default.Children.map(this.props.children, function (child, idx) {
        var name = child.props.name || idx.toString();
        return _react2.default.cloneElement(child, {
          isActive: _this3.state.activeNames.includes(name),
          key: idx,
          name: name,
          onClick: function onClick(item) {
            return _this3.handleItemClick(item);
          }
        });
      });
      return _react2.default.createElement(
        'div',
        { className: 'el-collapse' },
        content
      );
    }
  }]);

  return Collapse;
}(_libs.Component);

Collapse.defaultProps = {
  value: [],
  onChange: function onChange() {}
};
var _default = Collapse;
exports.default = _default;


Collapse.propTypes = {
  accordion: _libs.PropTypes.bool,
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.array, _libs.PropTypes.string]),
  onChange: _libs.PropTypes.func
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Collapse, 'Collapse', 'src/collapse/Collapse.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/collapse/Collapse.jsx');
}();

;