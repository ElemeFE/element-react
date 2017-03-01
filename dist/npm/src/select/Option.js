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

var Option = function (_Component) {
  _inherits(Option, _Component);

  function Option(props) {
    _classCallCheck(this, Option);

    var _this = _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

    _this.state = {
      index: -1,
      visible: true,
      hitState: false
    };
    return _this;
  }

  _createClass(Option, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.parent().onOptionCreate(this);

      this.setState({
        index: this.parent().state.options.indexOf(this)
      });

      if (this.currentSelected() === true) {
        this.parent().addOptionToValue(this, true);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.parent().onOptionDestroy(this);
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'currentSelected',
    value: function currentSelected() {
      return this.props.selected || (this.parent().props.multiple ? this.parent().state.value.indexOf(this.props.value) > -1 : this.parent().state.value === this.props.value);
    }
  }, {
    key: 'currentLabel',
    value: function currentLabel() {
      return this.props.label || (typeof this.props.value === 'string' || typeof this.props.value === 'number' ? this.props.value : '');
    }
  }, {
    key: 'itemSelected',
    value: function itemSelected() {
      if (Object.prototype.toString.call(this.parent().state.selected) === '[object Object]') {
        return this === this.parent().state.selected;
      } else if (Array.isArray(this.parent().state.selected)) {
        return this.parent().state.selected.map(function (el) {
          return el.props.value;
        }).indexOf(this.props.value) > -1;
      }
    }
  }, {
    key: 'hoverItem',
    value: function hoverItem() {
      if (!this.props.disabled && !this.parent().props.disabled) {
        this.parent().setState({
          hoverIndex: this.parent().state.options.indexOf(this)
        });
      }
    }
  }, {
    key: 'selectOptionClick',
    value: function selectOptionClick() {
      if (this.props.disabled !== true && this.parent().props.disabled !== true) {
        this.parent().onOptionClick(this);
      }
    }
  }, {
    key: 'queryChange',
    value: function queryChange(query) {
      // query 里如果有正则中的特殊字符，需要先将这些字符转义
      var parsedQuery = query.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');

      var visible = new RegExp(parsedQuery, 'i').test(this.currentLabel());

      if (!visible) {
        this.parent().setState({
          filteredOptionsCount: this.parent().state.filteredOptionsCount - 1
        });
      }

      this.setState({ visible: visible });
    }
  }, {
    key: 'resetIndex',
    value: function resetIndex() {
      this.setState({
        index: this.parent().state.options.indexOf(this)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          visible = _state.visible,
          index = _state.index;


      return _react2.default.createElement(
        _libs.View,
        { show: visible },
        _react2.default.createElement(
          'li',
          {
            style: this.style(),
            className: this.className('el-select-dropdown__item', {
              'selected': this.itemSelected(),
              'is-disabled': this.props.disabled || this.parent().props.disabled,
              'hover': this.parent().state.hoverIndex === index
            }),
            onMouseEnter: this.hoverItem.bind(this),
            onClick: this.selectOptionClick.bind(this)
          },
          this.props.children || _react2.default.createElement(
            'span',
            null,
            this.currentLabel()
          )
        )
      );
    }
  }]);

  return Option;
}(_libs.Component);

var _default = Option;
exports.default = _default;


Option.contextTypes = {
  component: _libs.PropTypes.any
};

Option.propTypes = {
  value: _libs.PropTypes.any.isRequired,
  label: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  selected: _libs.PropTypes.bool,
  disabled: _libs.PropTypes.bool
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Option, 'Option', 'src/select/Option.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/select/Option.jsx');
}();

;