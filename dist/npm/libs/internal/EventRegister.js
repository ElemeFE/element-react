'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var registerMap = window.__registerMap = window.__registerMap || {
  ids: {}
};

var not_null = function not_null(t) {
  return t != null;
};

var hasRegistered = function hasRegistered(_ref) {
  var id = _ref.id;

  return not_null(registerMap.ids[id]);
};

var cleanRegister = function cleanRegister(_ref2) {
  var id = _ref2.id;

  delete registerMap.ids[id];
};

var doRegister = function doRegister(_ref3) {
  var id = _ref3.id;

  registerMap.ids[id] = id;
};

/**
 * register events that hooked up react lifecycle
 */

var EventRegister = function (_Component) {
  _inherits(EventRegister, _Component);

  function EventRegister() {
    _classCallCheck(this, EventRegister);

    return _possibleConstructorReturn(this, (EventRegister.__proto__ || Object.getPrototypeOf(EventRegister)).apply(this, arguments));
  }

  _createClass(EventRegister, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          target = _props.target,
          eventName = _props.eventName,
          func = _props.func,
          isUseCapture = _props.isUseCapture,
          id = _props.id;

      eventName = eventName.toLowerCase();
      eventName = /^on/.test(eventName) ? eventName.substring(2) : eventName;
      this.cached = Object.assign({}, this.props, { eventName: eventName });

      (0, _utils.require_condition)(typeof id === 'string', 'id prop is required');
      (0, _utils.require_condition)(!hasRegistered(this.cached), 'id: ' + id + ' has been registered');

      target.addEventListener(eventName, func, isUseCapture);
      doRegister(this.cached);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _cached = this.cached,
          target = _cached.target,
          eventName = _cached.eventName,
          func = _cached.func,
          isUseCapture = _cached.isUseCapture;

      if (hasRegistered(this.cached)) {
        target.removeEventListener(eventName, func, isUseCapture);
        cleanRegister(this.cached);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return EventRegister;
}(_react.Component);

var _default = EventRegister;
exports.default = _default;


EventRegister.propTypes = {
  id: _react.PropTypes.string.isRequired,
  target: _react.PropTypes.object.isRequired,
  eventName: _react.PropTypes.string.isRequired,
  func: _react.PropTypes.func.isRequired,
  isUseCapture: _react.PropTypes.bool
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(registerMap, 'registerMap', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(not_null, 'not_null', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(hasRegistered, 'hasRegistered', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(cleanRegister, 'cleanRegister', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(doRegister, 'doRegister', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(EventRegister, 'EventRegister', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'libs/internal/EventRegister.jsx');
}();

;