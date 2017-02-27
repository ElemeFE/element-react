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
      tempIndex: 1
    };
    return _this;
  }

  _createClass(Upload, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.init(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.init(nextProps);
    }
  }, {
    key: 'init',
    value: function init(props) {
      var tempIndex = this.state.tempIndex;
      var fileList = props.fileList;

      var uploadFiles = fileList.map(function (file) {
        file.uid = file.uid || Date.now() + tempIndex++;
        file.status = 'success';
        return file;
      });
      this.setState({ fileList: uploadFiles });
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        onPreview: this.handlePreview.bind(this),
        onRemove: this.handleRemove.bind(this)
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
          tempIndex = _state.tempIndex,
          fileList = _state.fileList;

      file.uid = Date.now() + tempIndex++;
      var _file = {
        status: 'ready',
        name: file.name,
        size: file.size,
        percentage: 0,
        uid: file.uid,
        raw: file
      };
      try {
        _file.url = URL.createObjectURL(file);
      } catch (err) {
        console.error(err);
        return;
      }
      fileList.push(_file);
      this.setState({
        fileList: fileList,
        tempIndex: tempIndex
      });
    }
  }, {
    key: 'handleProgress',
    value: function handleProgress(e, file) {
      var fileList = this.state.fileList;

      var _file = this.getFile(file);
      _file.percentage = e.percent || 0;
      _file.status = 'uploading';
      this.props.onProgress(e, _file, fileList);
      this.setState({ fileList: fileList });
    }
  }, {
    key: 'handleSuccess',
    value: function handleSuccess(res, file) {
      var _this2 = this;

      var fileList = this.state.fileList;

      var _file = this.getFile(file);
      if (_file) {
        _file.status = 'success';
        _file.response = res;

        setTimeout(function () {
          _this2.setState({ fileList: fileList }, function () {
            _this2.props.onSuccess(res, _file, fileList);
            _this2.props.onChange(_file, fileList);
          });
        }, 1000);
      }
    }
  }, {
    key: 'handleError',
    value: function handleError(err, file) {
      var _this3 = this;

      var fileList = this.state.fileList;

      var _file = this.getFile(file);
      _file.status = 'fail';
      fileList.splice(fileList.indexOf(_file), 1);
      this.setState({ fileList: fileList }, function () {
        _this3.props.onError(err, _file, fileList);
        _this3.props.onChange(_file, fileList);
      });
    }
  }, {
    key: 'handleRemove',
    value: function handleRemove(file) {
      var _this4 = this;

      var fileList = this.state.fileList;

      var _file = this.getFile(file);
      fileList.splice(fileList.indexOf(_file), 1);
      this.setState({ fileList: fileList }, function () {
        return _this4.props.onRemove(file, fileList);
      });
    }
  }, {
    key: 'handlePreview',
    value: function handlePreview(file) {
      if (file.status === 'success') {
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
    key: 'submit',
    value: function submit() {
      var _this5 = this;

      this.state.fileList.filter(function (file) {
        return file.status === 'ready';
      }).forEach(function (file) {
        _this5.refs['upload-inner'].upload(file.raw, file);
      });
    }
  }, {
    key: 'showCover',
    value: function showCover() {
      var fileList = this.state.fileList;

      var file = fileList[fileList.length - 1];
      return file && file.status !== 'fail';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var fileList = this.state.fileList;
      var _props = this.props,
          showFileList = _props.showFileList,
          autoUpload = _props.autoUpload,
          drag = _props.drag,
          tip = _props.tip,
          action = _props.action,
          multiple = _props.multiple,
          beforeUpload = _props.beforeUpload,
          withCredentials = _props.withCredentials,
          headers = _props.headers,
          name = _props.name,
          data = _props.data,
          accept = _props.accept,
          listType = _props.listType,
          className = _props.className;

      var uploadList = void 0;
      if (showFileList && fileList.length) {
        uploadList = _react2.default.createElement(_UploadList2.default, { listType: listType, fileList: fileList });
      }
      var restProps = {
        autoUpload: autoUpload,
        drag: drag,
        action: action,
        multiple: multiple,
        beforeUpload: beforeUpload,
        withCredentials: withCredentials,
        headers: headers,
        name: name,
        data: data,
        accept: accept,
        listType: listType,
        onStart: function onStart(file) {
          return _this6.handleStart(file);
        },
        onProgress: function onProgress(e, file) {
          return _this6.handleProgress(e, file);
        },
        onSuccess: function onSuccess(res, file) {
          return _this6.handleSuccess(res, file);
        },
        onError: function onError(error, res, file) {
          return _this6.handleError(error, res, file);
        },
        onPreview: function onPreview(file) {
          return _this6.handlePreview(file);
        },
        onRemove: function onRemove(file) {
          return _this6.handleRemove(file);
        },
        ref: 'upload-inner',
        showCover: this.showCover()
      };
      var trigger = this.props.trigger || this.props.children;
      var uploadComponent = typeof FormData !== 'undefined' ? _react2.default.createElement(
        _AjaxUpload2.default,
        restProps,
        trigger
      ) : _react2.default.createElement(
        'iFrameUpload',
        restProps,
        trigger
      );
      return _react2.default.createElement(
        'div',
        { className: className },
        listType === 'picture-card' ? uploadList : '',
        this.props.trigger ? [uploadComponent, this.props.children] : uploadComponent,
        tip,
        listType !== 'picture-card' ? uploadList : ''
      );
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
  showFileList: _libs.PropTypes.bool,
  fileList: _libs.PropTypes.array,
  autoUpload: _libs.PropTypes.bool,
  accept: _libs.PropTypes.string,
  drag: _libs.PropTypes.bool,
  listType: _libs.PropTypes.oneOf(['text', 'picture', 'picture-card']),
  tip: _libs.PropTypes.node,
  trigger: _libs.PropTypes.node,
  beforeUpload: _libs.PropTypes.func,
  onRemove: _libs.PropTypes.func,
  onPreview: _libs.PropTypes.func,
  onProgress: _libs.PropTypes.func,
  onSuccess: _libs.PropTypes.func,
  onError: _libs.PropTypes.func,
  onChange: _libs.PropTypes.func,
  className: _libs.PropTypes.string
};

Upload.defaultProps = {
  headers: {},
  name: 'file',
  type: 'select',
  listType: 'text',
  fileList: [],
  showFileList: true,
  autoUpload: true,
  onRemove: function onRemove() {},
  onPreview: function onPreview() {},
  onProgress: function onProgress() {},
  onSuccess: function onSuccess() {},
  onError: function onError() {},
  onChange: function onChange() {}
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