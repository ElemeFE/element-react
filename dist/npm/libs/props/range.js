'use strict';

var _utils = require('../utils');

module.exports = function (min, max) {
  return (0, _utils.createPropType)(function (props, propName, componentName) {
    var value = props[propName];

    if (value < min || value > max) {
      return new Error('Invalid prop ' + propName + ' of ' + componentName + ', should between ' + min + ' and ' + max + '.');
    }
  });
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;