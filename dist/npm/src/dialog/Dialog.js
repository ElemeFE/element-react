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

var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _this.state = {
      bodyOverflow: null
    };
    return _this;
  }

  _createClass(Dialog, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.willOpen(this.props, nextProps)) {
        if (this.props.lockScroll) {
          if (!this.state.bodyOverflow) {
            this.setState({
              bodyOverflow: document.body.style.overflow
            });
          }
          document.body.style.overflow = 'hidden';
        }
      }

      if (this.willClose(this.props, nextProps) && this.props.lockScroll) {
        if (this.props.modal && this.state.bodyOverflow !== 'hidden') {
          document.body.style.overflow = this.state.bodyOverflow;
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.willOpen(prevProps, this.props)) {
        this.refs.wrap.focus();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.style.removeProperty('overflow');
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      if (this.props.closeOnPressEscape && e.keyCode === 27) {
        this.close(e);
      }
    }
  }, {
    key: 'handleWrapperClick',
    value: function handleWrapperClick(e) {
      if (this.props.closeOnClickModal && e.target === e.currentTarget) {
        this.close(e);
      }
    }
  }, {
    key: 'close',
    value: function close(e) {
      this.props.onCancel(e);
    }
  }, {
    key: 'willOpen',
    value: function willOpen(prevProps, nextProps) {
      return !prevProps.visible && nextProps.visible;
    }
  }, {
    key: 'willClose',
    value: function willClose(prevProps, nextProps) {
      return prevProps.visible && !nextProps.visible;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          visible = _props.visible,
          title = _props.title,
          size = _props.size,
          top = _props.top,
          modal = _props.modal,
          customClass = _props.customClass;


      return _react2.default.createElement(
        _libs.View,
        { show: visible },
        _react2.default.createElement(
          'div',
          {
            style: this.style({ zIndex: 1013 }),
            className: this.className('el-dialog__wrapper'),
            onClick: function onClick(e) {
              return _this2.handleWrapperClick(e);
            },
            ref: 'wrap',
            tabIndex: -1,
            onKeyDown: function onKeyDown(e) {
              return _this2.onKeyDown(e);
            }
          },
          _react2.default.createElement(
            'div',
            {
              ref: 'dialog',
              className: this.classNames("el-dialog", 'el-dialog--' + size, customClass),
              style: size === 'full' ? {} : { 'marginBottom': '50px', 'top': top }
            },
            _react2.default.createElement(
              'div',
              { className: 'el-dialog__header' },
              _react2.default.createElement(
                'span',
                { className: 'el-dialog__title' },
                title
              ),
              _react2.default.createElement(
                'div',
                { className: 'el-dialog__headerbtn' },
                _react2.default.createElement('i', { className: 'el-dialog__close el-icon el-icon-close', onClick: function onClick(e) {
                    return _this2.close(e);
                  } })
              )
            ),
            this.props.children
          )
        ),
        _react2.default.createElement(
          _libs.View,
          { show: modal, transition: 'v-modal', transitionKey: 'dialog-v-modal' },
          _react2.default.createElement('div', { className: 'v-modal', style: { zIndex: 1012 } })
        )
      );
    }
  }]);

  return Dialog;
}(_libs.Component);

var _default = Dialog;
exports.default = _default;


Dialog.propTypes = {
  // 控制对话框是否可见
  visible: _react.PropTypes.bool.isRequired,
  // 标题
  title: _react.PropTypes.string,
  // 大小 (tiny/small/large/full)
  size: _react.PropTypes.string,
  // top 值（仅在 size 不为 full 时有效）
  top: _react.PropTypes.string,
  // 控制遮罩层展示
  modal: _react.PropTypes.bool,
  // Dialog 的自定义类名
  customClass: _react.PropTypes.string,
  // 是否在 Dialog 出现时将 body 滚动锁定
  lockScroll: _react.PropTypes.bool,
  // 是否可以通过点击 modal 关闭 Dialog
  closeOnClickModal: _react.PropTypes.bool,
  // 是否可以通过按下 ESC 关闭 Dialog
  closeOnPressEscape: _react.PropTypes.bool,
  // 点击遮罩层或右上角叉或取消按钮的回调
  onCancel: _react.PropTypes.func.isRequired
};

Dialog.defaultProps = {
  visible: false,
  title: '',
  size: 'small',
  top: '15%',
  modal: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Dialog, 'Dialog', 'src/dialog/Dialog.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/dialog/Dialog.jsx');
}();

;