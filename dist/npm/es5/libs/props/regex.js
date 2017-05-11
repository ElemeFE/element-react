'use strict';

var _utils = require('../utils');

module.exports = (0, _utils.createPropType)(function (props, propName, componentName) {
  var value = props[propName];

  if (!(value instanceof RegExp)) {
    return new Error('Invalid prop ' + propName + ' of ' + componentName + ', should be valid regex.');
  }
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;