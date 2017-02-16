'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NotificationCenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Notification = require('./Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NotificationCenter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = arguments[1];

  var div = document.createElement('div'),
      className = 'el-notification';

  document.body.appendChild(div);

  if (typeof props === 'string') {
    props = {
      message: props
    };
  }

  if (type) {
    props.type = type;
  }

  var instances = document.getElementsByClassName(className);

  props.top = 0;

  for (var i = 0, len = instances.length; i < len; i++) {
    props.top += instances[i].offsetHeight + 16;
  }

  props.top += 16;

  var component = _react2.default.createElement(_Notification2.default, Object.assign({}, props, {
    willUnmount: function willUnmount() {
      _reactDom2.default.unmountComponentAtNode(div);
      document.body.removeChild(div);

      setTimeout(function () {
        var instances = document.querySelectorAll('.el-notification');

        for (var _i = 0, _len = instances.length; _i < _len; _i++) {
          var element = instances[_i];

          if (element.offsetTop > props.offsetHeight) {
            element.style.top = element.offsetTop - props.offsetHeight - 16 + 'px';
          }
        }
      });

      if (props.onClose instanceof Function) {
        props.onClose();
      }
    }
  }));

  _reactDom2.default.render(component, div, function () {
    setTimeout(function () {
      props.offsetHeight = div.getElementsByClassName(className)[0].offsetHeight;
    });
  });
}

/* eslint-disable */
['success', 'warning', 'info', 'error'].forEach(function (type) {
  NotificationCenter[type] = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return NotificationCenter(options, type);
  };
});
/* eslint-enable */

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NotificationCenter, 'NotificationCenter', 'src/notification/NotificationCenter.jsx');
}();

;