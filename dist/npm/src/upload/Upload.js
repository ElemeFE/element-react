'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _UploadList = require('./UploadList');

var _UploadList2 = _interopRequireDefault(_UploadList);

var _iFrameUpload = require('./iFrameUpload');

var _iFrameUpload2 = _interopRequireDefault(_iFrameUpload);

var _AjaxUpload = require('./AjaxUpload');

var _AjaxUpload2 = _interopRequireDefault(_AjaxUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Upload = function (_Component) {
  _inherits(Upload, _Component);

  function Upload(props) {
    _classCallCheck(this, Upload);

    var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));

    _this.state = {
      fileList: [],
      dragOver: false,
      draging: false,
      tempIndex: 1
    };
    return _this;
  }

  _createClass(Upload, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var fileList = this.state.fileList;

      return {
        onPreview: this.handlePreview.bind(this),
        onRemove: this.handleRemove.bind(this),
        fileList: fileList
      };
    }
  }, {
    key: 'getFile',
    value: function getFile(file) {
      var fileList = this.state.fileList;

      var target = fileList.find(function (item) {
        return item.uid === file.uid;
      });
      return target;
    }
  }, {
    key: 'handleStart',
    value: function handleStart(file) {
      var _state = this.state,
          fileList = _state.fileList,
          tempIndex = _state.tempIndex;

      file.uid = Date.now() + tempIndex++;
      var _file = {
        status: 'uploading',
        name: file.name,
        size: file.size,
        percentage: 0,
        uid: file.uid,
        showProgress: true
      };
      if (this.props.thumbnailMode) {
        try {
          _file.url = URL.createObjectURL(file);
        } catch (err) {
          throw err;
        }
      }
      this.setState({
        fileList: fileList.concat(_file),
        tempIndex: tempIndex
      });
    }
  }, {
    key: 'handleProgress',
    value: function handleProgress(e, file) {
      var fileList = this.state.fileList;

      var _file = this.getFile(file);
      _file.percentage = e.percent || 0;
      this.setState({ fileList: fileList });
    }
  }, {
    key: 'handleSuccess',
    value: function handleSuccess(res, file) {
      var _this2 = this;

      var fileList = this.state.fileList;

      var _file = this.getFile(file);
      if (_file) {
        _file.status = 'finished';
        _file.response = res;
        this.setState({ fileList: fileList });
        this.props.onSuccess(res, _file, this.fileList);
        setTimeout(function () {
          _file.showProgress = false;
          _this2.setState({ fileList: fileList });
        }, 1000);
      }
    }
  }, {
    key: 'handleError',
    value: function handleError(err, response, file) {
      var _this3 = this;

      var _file = this.getFile(file);
      var fileList = this.state.fileList;

      _file.status = 'fail';
      fileList.splice(fileList.indexOf(_file), 1);
      this.setState({ fileList: fileList }, function () {
        return _this3.props.onError(err, response, file);
      });
    }
  }, {
    key: 'handleRemove',
    value: function handleRemove(file) {
      var _this4 = this;

      var _file = this.getFile(file);
      var fileList = this.state.fileList;

      fileList.splice(fileList.indexOf(_file), 1);
      this.setState({ fileList: fileList }, function () {
        return _this4.props.onRemove(file, fileList);
      });
    }
  }, {
    key: 'handlePreview',
    value: function handlePreview(file) {
      if (file.status === 'finished') {
        this.props.onPreview(file);
      }
    }
  }, {
    key: 'clearFiles',
    value: function clearFiles() {
      this.setState({
        fileList: []
      });
    }
  }, {
    key: 'showCover',
    value: function showCover() {
      var fileList = this.state.fileList;

      var file = fileList[fileList.length - 1];
      return this.props.thumbnailMode && file && file.status !== 'fail';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var fileList = this.state.fileList;
      var _props = this.props,
          showUploadList = _props.showUploadList,
          thumbnailMode = _props.thumbnailMode,
          type = _props.type,
          tip = _props.tip,
          action = _props.action,
          multiple = _props.multiple,
          beforeUpload = _props.beforeUpload,
          withCredentials = _props.withCredentials,
          headers = _props.headers,
          name = _props.name,
          data = _props.data,
          accept = _props.accept;

      var uploadList = void 0;
      if (showUploadList && !thumbnailMode && fileList.length) {
        uploadList = _react2.default.createElement(_UploadList2.default, null);
      }
      var restProps = {
        type: type,
        action: action,
        multiple: multiple,
        beforeUpload: beforeUpload,
        withCredentials: withCredentials,
        headers: headers,
        name: name,
        data: data,
        accept: thumbnailMode ? 'image/*' : accept,
        onStart: function onStart(file) {
          return _this5.handleStart(file);
        },
        onProgress: function onProgress(e, file) {
          return _this5.handleProgress(e, file);
        },
        onSuccess: function onSuccess(res, file) {
          return _this5.handleSuccess(res, file);
        },
        onError: function onError(error, res, file) {
          return _this5.handleError(error, res, file);
        },
        onPreview: function onPreview(file) {
          return _this5.handlePreview(file);
        },
        onRemove: function onRemove(file) {
          return _this5.handleRemove(file);
        },
        ref: 'upload-inner',
        showCover: this.showCover()
      };
      var children = _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.cloneElement(child);
      });
      var uploadComponent = typeof FormData !== 'undefined' ? _react2.default.createElement(
        _AjaxUpload2.default,
        restProps,
        children
      ) : _react2.default.createElement(
        'iFrameUpload',
        restProps,
        children
      );
      if (type === 'select') {
        return _react2.default.createElement(
          'div',
          { className: 'el-upload' },
          uploadList,
          uploadComponent,
          tip
        );
      }
      if (type === 'drag') {
        return _react2.default.createElement(
          'div',
          { style: this.style(), className: this.className('el-upload') },
          uploadComponent,
          tip,
          uploadList
        );
      }
    }
  }]);

  return Upload;
}(_libs.Component);

var _default = Upload;
exports.default = _default;


Upload.childContextTypes = {
  onPreview: _libs.PropTypes.func,
  onRemove: _libs.PropTypes.func,
  fileList: _libs.PropTypes.array
};

Upload.propTypes = {
  action: _libs.PropTypes.string.isRequired,
  headers: _libs.PropTypes.object,
  data: _libs.PropTypes.object,
  multiple: _libs.PropTypes.bool,
  name: _libs.PropTypes.string,
  withCredentials: _libs.PropTypes.bool,
  thumbnailMode: _libs.PropTypes.bool,
  showUploadList: _libs.PropTypes.bool,
  accept: _libs.PropTypes.string,
  type: _libs.PropTypes.oneOf(['select', 'drag']),
  tip: _libs.PropTypes.node,
  beforeUpload: _libs.PropTypes.func,
  onRemove: _libs.PropTypes.func,
  onPreview: _libs.PropTypes.func,
  onSuccess: _libs.PropTypes.func,
  onError: _libs.PropTypes.func
};

Upload.defaultProps = {
  headers: {},
  name: 'file',
  type: 'select',
  showUploadList: true,
  onRemove: function onRemove() {},
  onPreview: function onPreview() {},
  onSuccess: function onSuccess() {},
  onError: function onError() {}
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Upload, 'Upload', 'src/upload/Upload.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/upload/Upload.jsx');
}();

;