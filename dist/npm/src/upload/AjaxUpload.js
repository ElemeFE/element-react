'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _Cover = require('./Cover');

var _Cover2 = _interopRequireDefault(_Cover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AjaxUpload = function (_Component) {
  _inherits(AjaxUpload, _Component);

  function AjaxUpload(props) {
    _classCallCheck(this, AjaxUpload);

    var _this = _possibleConstructorReturn(this, (AjaxUpload.__proto__ || Object.getPrototypeOf(AjaxUpload)).call(this, props));

    _this.state = {
      dragOver: false
    };
    return _this;
  }

  _createClass(AjaxUpload, [{
    key: 'onDrop',
    value: function onDrop(e) {
      e.preventDefault();
      this.setState({ dragOver: false });
      this.uploadFiles(e.dataTransfer.files);
    }
  }, {
    key: 'isImage',
    value: function isImage(str) {
      return str.indexOf('image') !== -1;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var files = e.target.files;
      if (!files) {
        return;
      }
      this.uploadFiles(files);
      this.refs.input.value = null;
    }
  }, {
    key: 'uploadFiles',
    value: function uploadFiles(files) {
      var _this2 = this;

      var _props = this.props,
          multiple = _props.multiple,
          thumbnailMode = _props.thumbnailMode;

      var postFiles = Array.prototype.slice.call(files);
      if (postFiles.length === 0) {
        return;
      }
      if (!multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      postFiles.forEach(function (file) {
        var isImage = _this2.isImage(file.type);
        if (thumbnailMode && !isImage) {
          return;
        } else {
          _this2.upload(file);
        }
      });
    }
  }, {
    key: 'upload',
    value: function upload(file) {
      var _this3 = this;

      var beforeUpload = this.props.beforeUpload;

      if (!beforeUpload) {
        return this.post(file);
      }
      var before = beforeUpload(file);
      if (before && before.then) {
        before.then(function (processedFile) {
          if (Object.prototype.toString.call(processedFile) === '[object File]') {
            _this3.post(processedFile);
          } else {
            _this3.post(file);
          }
        });
      } else if (before !== false) {
        this.post(file);
      }
    }
  }, {
    key: 'post',
    value: function post(file) {
      var _props2 = this.props,
          filename = _props2.name,
          headers = _props2.headers,
          withCredentials = _props2.withCredentials,
          data = _props2.data,
          action = _props2.action,
          onStart = _props2.onStart,
          _onProgress = _props2.onProgress,
          _onSuccess = _props2.onSuccess,
          _onError = _props2.onError;

      onStart && onStart(file);
      var formData = new FormData();
      formData.append(filename, file);
      (0, _ajax2.default)({
        headers: headers,
        withCredentials: withCredentials,
        file: file,
        data: data,
        filename: filename,
        action: action,
        onProgress: function onProgress(e) {
          return _onProgress(e, file);
        },
        onSuccess: function onSuccess(res) {
          return _onSuccess(res, file);
        },
        onError: function onError(err, response) {
          return _onError(err, response, file);
        }
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.refs.input.click();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var dragOver = this.state.dragOver;
      var _props3 = this.props,
          type = _props3.type,
          multiple = _props3.multiple,
          accept = _props3.accept,
          showCover = _props3.showCover;

      return _react2.default.createElement(
        'div',
        {
          className: this.classNames({
            'el-upload__inner': true,
            'el-dragger': type === 'drag',
            'is-dragOver': dragOver,
            'is-showCover': showCover
          }),
          onClick: function onClick() {
            return _this4.handleClick();
          },
          onDrop: function onDrop(e) {
            return _this4.onDrop(e);
          },
          onDragOver: function onDragOver(e) {
            e.preventDefault();
            _this4.setState({ dragOver: true });
          },
          onDragLeave: function onDragLeave(e) {
            e.preventDefault();
            _this4.setState({ dragOver: false });
          }
        },
        showCover ? _react2.default.createElement(_Cover2.default, { onClick: function onClick() {
            return _this4.handleClick();
          } }) : _react2.default.Children.map(this.props.children, function (child) {
          return _react2.default.cloneElement(child);
        }),
        _react2.default.createElement('input', { className: 'el-upload__input', type: 'file', ref: 'input', onChange: function onChange(e) {
            return _this4.handleChange(e);
          }, multiple: multiple, accept: accept })
      );
    }
  }]);

  return AjaxUpload;
}(_libs.Component);

var _default = AjaxUpload;
exports.default = _default;


AjaxUpload.propTypes = {
  type: _libs.PropTypes.string,
  data: _libs.PropTypes.object,
  action: _libs.PropTypes.string.isRequired,
  name: _libs.PropTypes.string,
  accept: _libs.PropTypes.string,
  headers: _libs.PropTypes.object,
  withCredentials: _libs.PropTypes.bool,
  multiple: _libs.PropTypes.bool,
  thumbnailMode: _libs.PropTypes.bool,
  onStart: _libs.PropTypes.func,
  onProgress: _libs.PropTypes.func,
  onSuccess: _libs.PropTypes.func,
  onError: _libs.PropTypes.func,
  beforeUpload: _libs.PropTypes.func,
  showCover: _libs.PropTypes.bool
};

AjaxUpload.defaultProps = {
  name: 'file'
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AjaxUpload, 'AjaxUpload', 'src/upload/AjaxUpload.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/upload/AjaxUpload.jsx');
}();

;