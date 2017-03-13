'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _libs = require('../../libs');

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _Suggestions = require('./Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoComplete = function (_Component) {
  _inherits(AutoComplete, _Component);

  function AutoComplete(props) {
    _classCallCheck(this, AutoComplete);

    var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).call(this, props));

    _this.state = {
      inputValue: props.value,
      isFocus: false,
      suggestions: [],
      loading: false,
      highlightedIndex: -1
    };
    return _this;
  }

  _createClass(AutoComplete, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({ inputValue: props.value });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var visible = this.suggestionVisible();
      var reference = _reactDom2.default.findDOMNode(this.inputNode);

      if (reference instanceof HTMLElement) {
        this.suggestionsNode.onVisibleChange(visible, reference.offsetWidth);
      }
    }
  }, {
    key: 'getData',
    value: function getData(queryString) {
      var _this2 = this;

      this.setState({ loading: true });

      this.props.fetchSuggestions(queryString, function (suggestions) {
        _this2.setState({ loading: false });

        if (Array.isArray(suggestions)) {
          _this2.setState({ suggestions: suggestions });
        } else {
          console.error('autocomplete suggestions must be an array');
        }
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      if (e.target instanceof HTMLInputElement) {
        var _value = e.target.value;

        this.setState({ inputValue: _value });

        if (!this.props.triggerOnFocus && !_value) {
          this.setState({ suggestions: [] });return;
        }

        this.getData(_value);
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.setState({ isFocus: true });

      if (this.props.triggerOnFocus) {
        this.getData(this.state.inputValue);
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      var _this3 = this;

      // 因为 blur 事件处理优先于 select 事件执行
      setTimeout(function () {
        _this3.setState({ isFocus: false });
      }, 100);
    }
  }, {
    key: 'handleKeyEnter',
    value: function handleKeyEnter() {
      if (this.suggestionVisible() && this.state.highlightedIndex >= 0 && this.state.highlightedIndex < this.state.suggestions.length) {
        this.select(this.state.suggestions[this.state.highlightedIndex]);
      }
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      if (this.state.isFocus) {
        this.setState({ isFocus: false });
      }
    }
  }, {
    key: 'select',
    value: function select(item) {
      var _this4 = this;

      this.setState({ inputValue: item.value }, function () {
        _this4.setState({ suggestions: [] });
      });

      if (this.props.onSelect) {
        this.props.onSelect(item);
      }
    }
  }, {
    key: 'highlight',
    value: function highlight(index) {
      if (!this.suggestionVisible() || this.state.loading) return;
      if (index < 0) index = 0;
      if (index >= this.state.suggestions.length) {
        index = this.state.suggestions.length - 1;
      }
      var reference = _reactDom2.default.findDOMNode(this.suggestionsNode);
      if (reference instanceof HTMLElement) {
        var suggestion = document.querySelector('.el-autocomplete-suggestion__wrap');
        var suggestionList = document.querySelectorAll('.el-autocomplete-suggestion__list li');
        if (suggestion instanceof HTMLElement && suggestionList instanceof NodeList) {
          var highlightItem = suggestionList[index];
          var scrollTop = suggestion.scrollTop;
          var offsetTop = highlightItem.offsetTop;

          if (offsetTop + highlightItem.scrollHeight > scrollTop + suggestion.clientHeight) {
            suggestion.scrollTop += highlightItem.scrollHeight;
          }

          if (offsetTop < scrollTop) {
            suggestion.scrollTop -= highlightItem.scrollHeight;
          }

          this.setState({ highlightedIndex: index });
        }
      }
    }

    /* Computed Methods */

  }, {
    key: 'suggestionVisible',
    value: function suggestionVisible() {
      var suggestions = this.state.suggestions;
      var isValidData = Array.isArray(suggestions) && suggestions.length > 0;

      return (isValidData || this.state.loading) && this.state.isFocus;
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      var highlightedIndex = this.state.highlightedIndex;


      switch (e.keyCode) {
        case 13:
          this.handleKeyEnter(highlightedIndex);
          break;
        case 38:
          this.highlight(highlightedIndex - 1);
          break;
        case 40:
          this.highlight(highlightedIndex + 1);
          break;
        default:
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props = this.props,
          disabled = _props.disabled,
          placeholder = _props.placeholder,
          name = _props.name,
          size = _props.size,
          icon = _props.icon,
          append = _props.append,
          prepend = _props.prepend,
          onIconClick = _props.onIconClick,
          popperClass = _props.popperClass;
      var _state = this.state,
          inputValue = _state.inputValue,
          suggestions = _state.suggestions;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-autocomplete') },
        _react2.default.createElement(_input2.default, {
          ref: function ref(node) {
            return _this5.inputNode = node;
          },
          value: inputValue,
          disabled: disabled,
          placeholder: placeholder,
          name: name,
          size: size,
          icon: icon,
          prepend: prepend,
          append: append,
          onIconClick: onIconClick,
          onChange: this.handleChange.bind(this),
          onFocus: this.handleFocus.bind(this),
          onBlur: this.handleBlur.bind(this),
          onKeyDown: this.onKeyDown.bind(this)
        }),
        _react2.default.createElement(_Suggestions2.default, {
          ref: function ref(node) {
            return _this5.suggestionsNode = node;
          },
          className: this.classNames(popperClass),
          suggestions: suggestions
        })
      );
    }
  }]);

  return AutoComplete;
}(_libs.Component);

AutoComplete.defaultProps = {
  triggerOnFocus: true
};


AutoComplete.childContextTypes = {
  component: _libs.PropTypes.any
};

var _default = (0, _reactClickOutside2.default)(AutoComplete);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AutoComplete, 'AutoComplete', 'src/auto-complete/AutoComplete.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/auto-complete/AutoComplete.jsx');
}();

;