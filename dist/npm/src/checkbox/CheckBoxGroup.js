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

var CheckboxGroup = function (_Component) {
  _inherits(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    _classCallCheck(this, CheckboxGroup);

    var _this = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

    _this.state = {
      options: _this.props.options || []
    };
    return _this;
  }

  _createClass(CheckboxGroup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.options !== this.props.options) {
        this.setState({
          options: nextProps.options
        });
      }
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return { isWrap: true };
    }
  }, {
    key: 'onChange',
    value: function onChange(e, label, value) {
      var _state = this.state,
          options = _state.options,
          values = _state.values;

      var newOptions = void 0,
          newValues = void 0;
      if (e.target.checked) {
        newOptions = options.concat(value || label);
      } else {
        newOptions = options.filter(function (v) {
          return v != value && v !== label;
        });
      }

      this.setState({
        options: newOptions
      });

      if (this.props.onChange) {
        this.props.onChange(newOptions);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.state.options;

      var children = _react.Children.map(this.props.children, function (child, index) {
        return _react2.default.cloneElement(child, Object.assign({}, child.props, {
          key: index,
          checked: child.props.checked || options.indexOf(child.props.value) >= 0 || options.indexOf(child.props.label) >= 0,
          onChange: _this2.onChange.bind(_this2)
        }));
      });

      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-checkbox-group') },
        children
      );
    }
  }]);

  return CheckboxGroup;
}(_libs.Component);

var _default = CheckboxGroup;
exports.default = _default;


CheckboxGroup.propTypes = {
  options: _libs.PropTypes.array,
  onChange: _libs.PropTypes.func
};

CheckboxGroup.childContextTypes = {
  isWrap: _libs.PropTypes.bool
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CheckboxGroup, 'CheckboxGroup', 'src/checkbox/CheckBoxGroup.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/checkbox/CheckBoxGroup.jsx');
}();

;