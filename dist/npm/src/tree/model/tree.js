'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = function () {
  function Tree(options) {
    var _this = this;

    _classCallCheck(this, Tree);

    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        var self = this;
        self[option] = options[option];
      }
    }

    this.root = new _node2.default({
      data: this.data,
      lazy: this.lazy,
      props: this.props,
      load: this.load
    });

    if (this.lazy && this.load) {
      var loadFn = this.load;
      loadFn(this.root, function (data) {
        _this.root.doCreateChildren(data);
      });
    }
  }

  _createClass(Tree, [{
    key: 'getCheckedNodes',
    value: function getCheckedNodes(leafOnly) {
      var checkedNodes = [];
      var walk = function walk(node) {
        var childNodes = node.root ? node.root.childNodes : node.childNodes;

        childNodes.forEach(function (child) {
          if (!leafOnly && child.checked || leafOnly && child.isLeaf && child.checked) {
            checkedNodes.push(child.data);
          }

          walk(child);
        });
      };

      walk(this);

      return checkedNodes;
    }
  }]);

  return Tree;
}();

var _default = Tree;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Tree, 'Tree', 'src/tree/model/tree.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/tree/model/tree.js');
}();

;