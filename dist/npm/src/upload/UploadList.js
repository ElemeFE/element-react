'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _src = require('../../src');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadList = function (_Component) {
  _inherits(UploadList, _Component);

  function UploadList(props) {
    _classCallCheck(this, UploadList);

    return _possibleConstructorReturn(this, (UploadList.__proto__ || Object.getPrototypeOf(UploadList)).call(this, props));
  }

  _createClass(UploadList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _context = this.context,
          onPreview = _context.onPreview,
          onRemove = _context.onRemove;
      var _props = this.props,
          listType = _props.listType,
          fileList = _props.fileList;

      var isFinished = function isFinished(status) {
        return status === 'success';
      };
      return _react2.default.createElement(
        _libs.Transition,
        { component: 'ul', className: this.classNames(_defineProperty({
            'el-upload-list': true
          }, 'el-upload-list--' + listType, true)),
          name: 'list'
        },
        fileList.map(function (file) {
          return _react2.default.createElement(
            'li',
            {
              className: _this2.classNames(_defineProperty({
                'el-upload-list__item': true
              }, 'is-' + file.status, true)),
              key: file.uid
            },
            ['picture-card', 'picture'].includes(listType) && isFinished(file.status) && _react2.default.createElement('img', { className: 'el-upload-list__item-thumbnail', src: file.url, alt: '' }),
            _react2.default.createElement(
              'a',
              { className: 'el-upload-list__item-name', onClick: function onClick() {
                  return onPreview(file);
                } },
              _react2.default.createElement('i', { className: 'el-icon-document' }),
              file.name
            ),
            _react2.default.createElement(
              _libs.View,
              { className: 'el-upload-list__item-status-label', show: isFinished(file.status), component: 'label' },
              _react2.default.createElement('i', { className: _this2.classNames({
                  'el-icon-circle-check': listType === 'text',
                  'el-icon-check': ['picture-card', 'picture'].includes(listType)
                }) }),
              _react2.default.createElement('i', { className: 'el-icon-close', onClick: function onClick() {
                  return onRemove(file);
                } })
            ),
            _react2.default.createElement(
              _libs.View,
              { className: 'el-upload-list__item-actions', show: listType === 'picture-card' && isFinished(file.status) },
              _react2.default.createElement(
                'span',
                {
                  onClick: function onClick() {
                    return onPreview(file);
                  },
                  className: 'el-upload-list__item-preview'
                },
                _react2.default.createElement('i', { className: 'el-icon-view' })
              ),
              _react2.default.createElement(
                'span',
                {
                  className: 'el-upload-list__item-delete',
                  onClick: function onClick() {
                    return onRemove(file);
                  }
                },
                _react2.default.createElement('i', { className: 'el-icon-delete2' })
              )
            ),
            file.status === 'uploading' && _react2.default.createElement(_src.Progress, {
              strokeWidth: listType === 'picture-card' ? 6 : 2,
              type: listType === 'picture-card' ? 'circle' : 'line',
              percentage: parseInt(file.percentage, 10),
              status: isFinished(file.status) && file.showProgress ? 'success' : ''
            })
          );
        })
      );
    }
  }]);

  return UploadList;
}(_libs.Component);

var _default = UploadList;
exports.default = _default;


UploadList.contextTypes = {
  onPreview: _libs.PropTypes.func,
  onRemove: _libs.PropTypes.func
};

UploadList.propTypes = {
  listType: _libs.PropTypes.string,
  fileList: _libs.PropTypes.array
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(UploadList, 'UploadList', 'src/upload/UploadList.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/upload/UploadList.jsx');
}();

;