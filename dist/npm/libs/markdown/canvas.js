'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _babelStandalone = require('babel-standalone');

var _highlight2 = require('./highlight');

var _highlight3 = _interopRequireDefault(_highlight2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Canvas = function (_React$Component) {
  _inherits(Canvas, _React$Component);

  function Canvas(props) {
    _classCallCheck(this, Canvas);

    var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, props));

    _this.state = {
      showBlock: false
    };
    return _this;
  }

  _createClass(Canvas, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _marked2.default.setOptions({
        highlight: function highlight(code) {
          return _highlight3.default.highlightAuto(code).value;
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderSource();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderSource();
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return Math.max(this.refs.highlight.offsetHeight, this.refs.description && this.refs.description.offsetHeight || 0);
    }
  }, {
    key: 'blockControl',
    value: function blockControl() {
      this.setState({
        showBlock: !this.state.showBlock
      });
    }
  }, {
    key: 'renderSource',
    value: function renderSource() {
      var _this2 = this;

      if (this.shouldUpdate) {
        var div = this.refs.source;

        if (div instanceof HTMLElement) {
          require(['../../src'], function (Element) {
            var args = ['context', 'React'],
                argv = [_this2, _react2.default];

            for (var key in Element) {
              args.push(key);
              argv.push(Element[key]);
            }

            args.push(_this2.component);

            _reactDom2.default.unmountComponentAtNode(div);
            _reactDom2.default.render(new (Function.prototype.bind.apply(Function, [null].concat(args)))().apply(null, argv), div);
          });
        }
      }

      delete this.shouldUpdate;
    }
  }, {
    key: 'render',
    value: function render() {
      var document = this.props.children.match(/([^]*)\n?(```[^]+```)/);
      var source = document[2].match(/```(.*)\n([^]+)```/);
      var description = (0, _marked2.default)(document[1]);
      var highlight = (0, _marked2.default)(document[2]);
      var component = (0, _babelStandalone.transform)('\n      class Demo extends React.Component {\n        ' + source[2] + '\n      }\n\n      __rtn = (function() {\n        return <Demo {...context.props} />\n      })();\n    ', {
        presets: ['es2015', 'react']
      }).code.replace('__rtn = ', 'return ');

      this.shouldUpdate = component != this.component || this.component === undefined;
      this.component = component;

      return _react2.default.createElement(
        'div',
        { className: 'demo-block demo-box demo-' + this.props.name },
        _react2.default.createElement('div', { className: 'source', ref: 'source' }),
        _react2.default.createElement(
          'div',
          { className: 'meta', style: {
              height: this.state.showBlock ? this.getHeight() : 0
            } },
          description && _react2.default.createElement('div', { ref: 'description', className: 'description', dangerouslySetInnerHTML: { __html: description } }),
          _react2.default.createElement('div', { ref: 'highlight', className: 'highlight', dangerouslySetInnerHTML: { __html: highlight } })
        ),
        this.state.showBlock ? _react2.default.createElement(
          'div',
          { className: 'demo-block-control', onClick: this.blockControl.bind(this) },
          _react2.default.createElement('i', { className: 'el-icon-caret-top' }),
          _react2.default.createElement(
            'span',
            null,
            '\u9690\u85CF\u4EE3\u7801'
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'demo-block-control', onClick: this.blockControl.bind(this) },
          _react2.default.createElement('i', { className: 'el-icon-caret-bottom' }),
          _react2.default.createElement(
            'span',
            null,
            '\u663E\u793A\u4EE3\u7801'
          )
        )
      );
    }
  }]);

  return Canvas;
}(_react2.default.Component);

var _default = Canvas;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Canvas, 'Canvas', 'libs/markdown/canvas.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'libs/markdown/canvas.jsx');
}();

;