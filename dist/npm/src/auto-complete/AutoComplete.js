'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _libs = require('../../libs');

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

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
      value: props.value,
      suggestions: [],
      suggestionVisible: false,
      loading: false,
      highlightedIndex: -1
    };
    return _this;
  }

  _createClass(AutoComplete, [{
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      var highlightedIndex = this.state.highlightedIndex;


      switch (e.keyCode) {
        case 13:
          this.select(highlightedIndex);
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
    key: 'handleChange',
    value: function handleChange(e) {
      var _this2 = this;

      this.setState({
        value: e.target.value
      }, function () {
        _this2.showSuggestions(_this2.state.value);
      });
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      if (this.props.triggerOnFocus) {
        this.showSuggestions(this.state.value);
      }
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      this.hideSuggestions();
    }
  }, {
    key: 'select',
    value: function select(index) {
      var _this3 = this;

      var suggestions = this.state.suggestions;


      if (suggestions && suggestions[index]) {
        (function () {
          var item = suggestions[index];

          _this3.setState({ value: item.value }, function () {
            if (_this3.props.onSelect) {
              _this3.props.onSelect(item);
            }

            _this3.hideSuggestions();
          });
        })();
      }
    }
  }, {
    key: 'hideSuggestions',
    value: function hideSuggestions() {
      this.setState({
        suggestionVisible: false,
        suggestions: [],
        loading: false
      });
    }
  }, {
    key: 'showSuggestions',
    value: function showSuggestions(value) {
      var _this4 = this;

      this.setState({
        suggestionVisible: true,
        loading: true
      }, function () {
        _this4.props.fetchSuggestions(value, function (result) {
          var _state = _this4.state,
              suggestions = _state.suggestions,
              loading = _state.loading;


          loading = false;

          if (Array.isArray(result) && result.length > 0) {
            suggestions = result;
          } else {
            _this4.hideSuggestions();
          }

          _this4.setState({ suggestions: suggestions, loading: loading });
        });
      });
    }
  }, {
    key: 'highlight',
    value: function highlight(index) {
      var _state2 = this.state,
          suggestions = _state2.suggestions,
          suggestionVisible = _state2.suggestionVisible,
          loading = _state2.loading;


      if (!suggestionVisible || loading) {
        return;
      }

      if (index < 0) {
        index = 0;
      } else if (index >= suggestions.length) {
        index = suggestions.length - 1;
      }

      var elSuggestions = this.refs.suggestions;
      var elSelect = elSuggestions.children[index];
      var scrollTop = elSuggestions.scrollTop;
      var offsetTop = elSelect.offsetTop;
      if (offsetTop + elSelect.scrollHeight > scrollTop + elSuggestions.clientHeight) {
        elSuggestions.scrollTop += elSelect.scrollHeight;
      }
      if (offsetTop < scrollTop) {
        elSuggestions.scrollTop -= elSelect.scrollHeight;
      }

      this.setState({
        highlightedIndex: index
      });
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
          customItem = _props.customItem,
          popperClass = _props.popperClass;
      var _state3 = this.state,
          value = _state3.value,
          suggestions = _state3.suggestions,
          suggestionVisible = _state3.suggestionVisible,
          loading = _state3.loading,
          highlightedIndex = _state3.highlightedIndex;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-autocomplete') },
        _react2.default.createElement(_input2.default, {
          value: value,
          disabled: disabled,
          placeholder: placeholder,
          name: name,
          size: size,
          onChange: this.handleChange.bind(this),
          onFocus: this.handleFocus.bind(this),
          onKeyDown: this.onKeyDown.bind(this)
        }),
        _react2.default.createElement(
          _libs.Transition,
          { name: 'md-fade-bottom' },
          suggestionVisible && _react2.default.createElement(
            'ul',
            { ref: 'suggestions', className: this.classNames('el-autocomplete__suggestions', popperClass, {
                'is-loading': loading
              }) },
            loading && _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('i', { className: 'el-icon-loading' })
            ),
            suggestions.map(function (item, index) {
              return _react2.default.createElement(
                'li',
                {
                  key: index,
                  className: _this5.classNames({ 'highlighted': highlightedIndex === index }),
                  onClick: _this5.select.bind(_this5, index) },
                !customItem ? item.value : _react2.default.createElement(customItem, {
                  index: index,
                  item: item
                })
              );
            })
          )
        )
      );
    }
  }]);

  return AutoComplete;
}(_libs.Component);

AutoComplete.propTypes = {
  placeholder: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  name: _libs.PropTypes.string,
  size: _libs.PropTypes.string,
  value: _libs.PropTypes.string,
  popperClass: _libs.PropTypes.string,
  fetchSuggestions: _libs.PropTypes.func,
  triggerOnFocus: _libs.PropTypes.bool,
  customItem: _libs.PropTypes.any,
  onSelect: _libs.PropTypes.func
};

AutoComplete.defaultProps = {
  triggerOnFocus: true
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