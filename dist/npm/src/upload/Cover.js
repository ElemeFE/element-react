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

var Cover = function (_Component) {
  _inherits(Cover, _Component);

  function Cover(props) {
    _classCallCheck(this, Cover);

    var _this = _possibleConstructorReturn(this, (Cover.__proto__ || Object.getPrototypeOf(Cover)).call(this, props));

    _this.state = {
      mouseover: false
    };
    return _this;
  }

  _createClass(Cover, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _context = this.context,
          fileList = _context.fileList,
          onPreview = _context.onPreview,
          onRemove = _context.onRemove;
      var mouseover = this.state.mouseover;

      var image = fileList[fileList.length - 1];
      return image && _react2.default.createElement(
        'div',
        { className: 'el-dragger__cover', onClick: function onClick(e) {
            return e.stopPropagation();
          } },
        _react2.default.createElement(
          _libs.Transition,
          { name: 'fade-in' },
          image.status === 'uploading' ? _react2.default.createElement(_src.Progress, {
            className: 'el-dragger__cover__progress',
            percentage: image.percentage,
            showText: false,
            status: image.status === 'finished' ? 'success' : '' }) : _react2.default.createElement('span', null)
        ),
        image.status === 'finished' && _react2.default.createElement(
          'div',
          {
            className: 'el-dragger__cover__content',
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ mouseover: true });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ mouseover: false });
            }
          },
          _react2.default.createElement('img', { src: image.url }),
          _react2.default.createElement(
            _libs.Transition,
            { name: 'fade-in' },
            _react2.default.createElement(
              _libs.View,
              { show: mouseover },
              _react2.default.createElement(
                'div',
                { className: 'el-dragger__cover__interact' },
                _react2.default.createElement(
                  'div',
                  { className: 'el-draggeer__cover__btns' },
                  _react2.default.createElement(
                    'span',
                    { className: 'btn', onClick: function onClick() {
                        return _this2.props.onClick();
                      } },
                    _react2.default.createElement('i', { className: 'el-icon-upload2' }),
                    _react2.default.createElement(
                      'span',
                      null,
                      _locale2.default.t('el.upload.continue')
                    )
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'btn', onClick: function onClick() {
                        return onPreview(image);
                      } },
                    _react2.default.createElement('i', { className: 'el-icon-view' }),
                    _react2.default.createElement(
                      'span',
                      null,
                      _locale2.default.t('el.upload.preview')
                    )
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'btn', onClick: function onClick() {
                        return onRemove(image);
                      } },
                    _react2.default.createElement('i', { className: 'el-icon-delete2' }),
                    _react2.default.createElement(
                      'span',
                      null,
                      _locale2.default.t('el.upload.delete')
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            _libs.Transition,
            { name: 'md-fade-top' },
            _react2.default.createElement(
              _libs.View,
              { show: mouseover },
              _react2.default.createElement(
                'h4',
                { className: 'el-dragger__cover__title' },
                image.name
              )
            )
          )
        )
      );
    }
  }]);

  return Cover;
}(_libs.Component);

var _default = Cover;
exports.default = _default;


Cover.contextTypes = {
  onPreview: _libs.PropTypes.func,
  onRemove: _libs.PropTypes.func,
  fileList: _libs.PropTypes.array
};

Cover.propTypes = {
  onClick: _libs.PropTypes.func
};

Cover.defaultProps = {
  onClick: function onClick() {}
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