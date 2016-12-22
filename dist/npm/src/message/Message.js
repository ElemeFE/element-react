'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Message;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Toast = require('./Toast');

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Message() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = arguments[1];

  var div = document.createElement('div');

  document.body.appendChild(div);

  if (typeof props === 'string') {
    props = {
      message: props
    };
  }

  if (type) {
    props.type = type;
  }

  var component = _react2.default.createElement(_Toast2.default, Object.assign(props, {
    onClose: function onClose() {
      _reactDom2.default.unmountComponentAtNode(div);
      document.body.removeChild(div);

      if (props.onClose instanceof Function) {
        props.onClose();
      }
    }
  }));

  _reactDom2.default.render(component, div);
}

/* eslint-disable */
['success', 'warning', 'info', 'error'].forEach(function (type) {
  Message[type] = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return Message(options, type);
  };
});
/* eslint-enable */

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Message, 'Message', 'src/message/Message.jsx');
}();

;