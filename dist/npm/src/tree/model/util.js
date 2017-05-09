'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NODE_KEY = exports.NODE_KEY = '$treeNodeId';

var markNodeData = exports.markNodeData = function markNodeData(node, data) {
  if (data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};

var getNodeKey = exports.getNodeKey = function getNodeKey(key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NODE_KEY, 'NODE_KEY', 'src/tree/model/util.js');

  __REACT_HOT_LOADER__.register(markNodeData, 'markNodeData', 'src/tree/model/util.js');

  __REACT_HOT_LOADER__.register(getNodeKey, 'getNodeKey', 'src/tree/model/util.js');
}();

;