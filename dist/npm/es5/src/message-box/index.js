'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MessageBox = require('./MessageBox');

var _MessageBox2 = _interopRequireDefault(_MessageBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function alert(message, title, props) {
  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
    props = title;
  }

  props = Object.assign({ title: title, message: message,
    modal: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, props);

  return next(props);
}

function confirm(message, title, props) {
  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
    props = title;
  }

  props = Object.assign({ title: title, message: message,
    modal: 'confirm',
    showCancelButton: true
  }, props);

  return next(props);
}

function prompt(message, title, props) {
  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
    props = title;
  }

  props = Object.assign({ title: title, message: message,
    modal: 'prompt',
    showCancelButton: true,
    showInput: true
  }, props);

  return next(props);
}

function msgbox(props) {
  return next(props);
}

function next(props) {
  return new Promise(function (resolve, reject) {
    var div = document.createElement('div');

    document.body.appendChild(div);

    if (props.lockScroll != false) {
      document.body.style.setProperty('overflow', 'hidden');
    }

    var component = _react2.default.createElement(_MessageBox2.default, Object.assign({}, props, {
      promise: { resolve: resolve, reject: reject },
      onClose: function onClose() {
        _reactDom2.default.unmountComponentAtNode(div);
        document.body.removeChild(div);
        document.body.style.removeProperty('overflow');

        if (props.onClose instanceof Function) {
          props.onClose();
        }
      }
    }));

    _reactDom2.default.render(component, div);
  });
}

var _default = {
  alert: alert,
  confirm: confirm,
  prompt: prompt,
  msgbox: msgbox
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(alert, 'alert', 'src/message-box/index.js');

  __REACT_HOT_LOADER__.register(confirm, 'confirm', 'src/message-box/index.js');

  __REACT_HOT_LOADER__.register(prompt, 'prompt', 'src/message-box/index.js');

  __REACT_HOT_LOADER__.register(msgbox, 'msgbox', 'src/message-box/index.js');

  __REACT_HOT_LOADER__.register(next, 'next', 'src/message-box/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/message-box/index.js');
}();

;