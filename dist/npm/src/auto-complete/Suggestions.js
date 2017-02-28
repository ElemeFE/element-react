'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _popper = require('../../libs/utils/popper');

var _popper2 = _interopRequireDefault(_popper);

var _libs = require('../../libs');

var _scrollbar = require('../scrollbar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Suggestions = function (_Component) {
  _inherits(Suggestions, _Component);

  function Suggestions(props) {
    _classCallCheck(this, Suggestions);

    var _this = _possibleConstructorReturn(this, (Suggestions.__proto__ || Object.getPrototypeOf(Suggestions)).call(this, props));

    _this.state = {
      showPopper: false,
      dropdownWidth: ''
    };
    return _this;
  }

  _createClass(Suggestions, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var reference = _reactDom2.default.findDOMNode(this.parent().refs.input);

      if (this.state.showPopper) {
        if (this.popperJS) {
          this.popperJS.update();
        } else {
          this.popperJS = new _popper2.default(reference, this.refs.popper, {
            gpuAcceleration: false,
            forceAbsolute: true
          });
        }
      } else {
        if (this.popperJS) {
          this.popperJS.destroy();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.popperJS) {
        this.popperJS.destroy();
      }
    }
  }, {
    key: 'onVisibleChange',
    value: function onVisibleChange(visible, inputWidth) {
      this.setState({
        dropdownWidth: inputWidth,
        showPopper: visible
      });
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'select',
    value: function select(item) {
      this.parent().select(item);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var customItem = this.parent().props.customItem;
      var _parent$state = this.parent().state,
          loading = _parent$state.loading,
          highlightedIndex = _parent$state.highlightedIndex;
      var suggestions = this.props.suggestions;
      var _state = this.state,
          showPopper = _state.showPopper,
          dropdownWidth = _state.dropdownWidth;


      return _react2.default.createElement(
        _libs.Transition,
        { name: 'el-zoom-in-top' },
        _react2.default.createElement(
          _libs.View,
          { show: showPopper },
          _react2.default.createElement(
            'div',
            {
              ref: 'popper',
              className: this.classNames('el-autocomplete-suggestion', {
                'is-loading': loading
              }),
              style: {
                width: dropdownWidth,
                zIndex: 1
              }
            },
            _react2.default.createElement(
              _scrollbar.Scrollbar,
              {
                viewComponent: 'ul',
                wrapClass: 'el-autocomplete-suggestion__wrap',
                viewClass: 'el-autocomplete-suggestion__list'
              },
              loading ? _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement('i', { className: 'el-icon-loading' })
              ) : suggestions.map(function (item, index) {
                return _react2.default.createElement(
                  'li',
                  {
                    key: index,
                    className: _this2.classNames({ 'highlighted': highlightedIndex === index }),
                    onClick: _this2.select.bind(_this2, item) },
                  !customItem ? item.value : _react2.default.createElement(customItem, {
                    index: index,
                    item: item
                  })
                );
              })
            )
          )
        )
      );
    }
  }]);

  return Suggestions;
}(_libs.Component);

var _default = Suggestions;
exports.default = _default;


Suggestions.contextTypes = {
  component: _libs.PropTypes.any
};

Suggestions.propTypes = {
  suggestions: _libs.PropTypes.array
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Suggestions, 'Suggestions', 'src/auto-complete/Suggestions.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/auto-complete/Suggestions.jsx');
}();

;