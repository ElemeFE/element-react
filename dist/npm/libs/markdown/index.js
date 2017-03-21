'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Markdown = function (_React$Component) {
  _inherits(Markdown, _React$Component);

  function Markdown(props) {
    _classCallCheck(this, Markdown);

    var _this = _possibleConstructorReturn(this, (Markdown.__proto__ || Object.getPrototypeOf(Markdown)).call(this, props));

    _this.components = new Map();
    return _this;
  }

  _createClass(Markdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderDOM();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderDOM();
    }
  }, {
    key: 'renderDOM',
    value: function renderDOM() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              id = _step$value[0],
              component = _step$value[1];

          var div = document.getElementById(id);

          if (div instanceof HTMLElement) {
            _reactDom2.default.unmountComponentAtNode(div);
            _reactDom2.default.render(component, div);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var document = this.document(localStorage.getItem('ELEMENT_LANGUAGE') || navigator.language);

      if (typeof document === 'string') {
        this.components.clear();

        var html = (0, _marked2.default)(document.replace(/:::\s?demo\s?([^]+?):::/g, function (match, p1, offset) {
          var id = offset.toString(36);

          _this2.components.set(id, _react2.default.createElement(_canvas2.default, Object.assign({
            name: _this2.constructor.name.toLowerCase()
          }, _this2.props), p1));

          return '<div id=' + id + '></div>';
        }));

        return _react2.default.createElement('div', { dangerouslySetInnerHTML: {
            __html: html
          } });
      } else {
        return _react2.default.createElement('span', null);
      }
    }
  }]);

  return Markdown;
}(_react2.default.Component);

var _default = Markdown;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Markdown, 'Markdown', 'libs/markdown/index.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'libs/markdown/index.jsx');
}();

;