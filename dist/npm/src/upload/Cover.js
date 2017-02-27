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

var Cover = function (_Component) {
  _inherits(Cover, _Component);

  function Cover(props) {
    _classCallCheck(this, Cover);

    var _this = _possibleConstructorReturn(this, (Cover.__proto__ || Object.getPrototypeOf(Cover)).call(this, props));

    _this.state = {
      dragOver: false
    };
    return _this;
  }

  _createClass(Cover, [{
    key: 'handleDragover',
    value: function handleDragover(e) {
      e.preventDefault();
      this.setState({ dragOver: true });
    }
  }, {
    key: 'handleDragleave',
    value: function handleDragleave(e) {
      e.preventDefault();
      this.setState({ dragOver: false });
    }
  }, {
    key: 'onDrop',
    value: function onDrop(e) {
      e.preventDefault();
      this.setState({ dragOver: false });
      this.props.onFile(e.dataTransfer.files);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var dragOver = this.state.dragOver;

      return _react2.default.createElement(
        'div',
        {
          className: this.classNames({
            'el-upload-dragger': true,
            'is-dragover': dragOver
          }),
          onDrop: function onDrop(e) {
            return _this2.onDrop(e);
          },
          onDragOver: function onDragOver(e) {
            return _this2.handleDragover(e);
          },
          onDragLeave: function onDragLeave(e) {
            return _this2.handleDragleave(e);
          }
        },
        this.props.children
      );
    }
  }]);

  return Cover;
}(_libs.Component);

var _default = Cover;
exports.default = _default;


Cover.propTypes = {
  onFile: _libs.PropTypes.func
};

Cover.defaultProps = {
  onFile: function onFile() {}
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Cover, 'Cover', 'src/upload/Cover.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/upload/Cover.jsx');
}();

;