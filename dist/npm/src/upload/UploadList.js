'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _src = require('../../src');

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
          fileList = _context.fileList,
          onPreview = _context.onPreview,
          onRemove = _context.onRemove;


      var isFinished = function isFinished(status) {
        return status === 'finished';
      };
      return _react2.default.createElement(
        _libs.Transition,
        { component: 'ul', className: 'el-upload__files', name: 'list' },
        fileList.map(function (file, index) {
          return _react2.default.createElement(
            'li',
            {
              className: _this2.classNames({
                'el-upload__file': true,
                'is-finished': isFinished(file.status)
              }),
              key: index
            },
            _react2.default.createElement(
              'a',
              { className: 'el-upload__file__name', onClick: function onClick() {
                  return onPreview(file);
                } },
              _react2.default.createElement('i', { className: 'el-icon-document' }),
              file.name
            ),
            _react2.default.createElement(
              _libs.View,
              { show: isFinished(file.status) },
              _react2.default.createElement(
                'span',
                { className: 'el-upload__btn-delete', onClick: function onClick() {
                    return onRemove(file);
                  } },
                _locale2.default.t('el.upload.delete')
              )
            ),
            file.showProgress && _react2.default.createElement(_src.Progress, {
              strokeWidth: 2,
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
  onRemove: _libs.PropTypes.func,
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