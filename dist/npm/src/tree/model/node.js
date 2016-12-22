'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nodeIdSeed = 0;

var reInitChecked = function reInitChecked(node) {

  var siblings = node.childNodes;

  var all = true;
  var none = true;

  for (var i = 0, j = siblings.length; i < j; i++) {
    var sibling = siblings[i];
    if (sibling.checked !== true || sibling.indeterminate) {
      all = false;
    }
    if (sibling.checked !== false || sibling.indeterminate) {
      none = false;
    }
  }

  if (all) {
    node.setChecked(true);
  } else if (!all && !none) {
    node.setChecked('half');
  } else if (none) {
    node.setChecked(false);
  }
};

var getPropertyFromData = function getPropertyFromData(node, prop) {
  var props = node.props;
  var data = node.data || {};
  var config = props[prop];

  if (typeof config === 'function') {
    return config(data, node);
  } else if (typeof config === 'string') {
    return data[config];
  } else if (typeof config === 'undefined') {
    return '';
  }
};

var Node = function () {
  function Node(options) {
    _classCallCheck(this, Node);

    this.id = nodeIdSeed++;
    this.text = null;
    this.checked = false;
    this.indeterminate = false;
    this.data = null;
    this.expanded = false;
    this.props = null;
    this.parent = null;
    this.lazy = false;

    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    // internal
    this.level = -1;
    this.loaded = false;
    this.childNodes = [];
    this.loading = false;

    if (this.parent) {
      this.level = this.parent.level + 1;
    }

    if (this.lazy !== true && this.data) {
      this.setData(this.data);
    }
  }

  _createClass(Node, [{
    key: 'setData',
    value: function setData(data) {
      if (!Array.isArray(data) && !data.$treeNodeId) {
        Object.defineProperty(data, '$treeNodeId', {
          value: this.id,
          enumerable: false,
          configurable: false,
          writable: false
        });
      }

      this.data = data;
      this.childNodes = [];

      var children = void 0;
      if (this.level === -1 && this.data instanceof Array) {
        children = this.data;
      } else {
        children = getPropertyFromData(this, 'children') || [];
      }

      for (var i = 0, j = children.length; i < j; i++) {
        this.insertChild({ data: children[i] });
      }
    }
  }, {
    key: 'insertChild',
    value: function insertChild(child, index) {
      if (!child) throw new Error('insertChild error: child is required.');

      if (!(child instanceof Node)) {
        Object.assign(child, {
          parent: this,
          lazy: this.lazy,
          load: this.load,
          props: this.props
        });
        child = new Node(child);
      }

      child.level = this.level + 1;

      if (typeof index === 'undefined') {
        this.childNodes.push(child);
      } else {
        this.childNodes.splice(index, 0, child);
      }
    }
  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      var index = this.childNodes.indexOf(child);

      if (index > -1) {
        child.parent = null;
        this.childNodes.splice(index, 1);
      }
    }
  }, {
    key: 'removeChildByData',
    value: function removeChildByData(data) {
      var targetNode = null;
      this.childNodes.forEach(function (node) {
        if (node.data === data) {
          targetNode = node;
        }
      });

      if (targetNode) {
        this.removeChild(targetNode);
      }
    }
  }, {
    key: 'expand',
    value: function expand(callback) {
      if (this.shouldLoadData()) {
        this.loadData(function (data) {
          if (data instanceof Array) {
            callback();
          }
        });
      } else {
        this.expanded = true;
        if (callback) {
          callback();
        }
      }
    }
  }, {
    key: 'doCreateChildren',
    value: function doCreateChildren(array) {
      var _this = this;

      var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      array.forEach(function (item) {
        _this.insertChild(Object.assign({ data: item }, defaultProps));
      });
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.expanded = false;
    }
  }, {
    key: 'shouldLoadData',
    value: function shouldLoadData() {
      return this.lazy === true && this.load && !this.loaded;
    }
  }, {
    key: 'hasChild',
    value: function hasChild() {
      var childNodes = this.childNodes;
      if (!this.lazy || this.lazy === true && this.loaded === true) {
        return childNodes && childNodes.length > 0;
      }
      return true;
    }
  }, {
    key: 'setChecked',
    value: function setChecked(value, deep) {
      var _this2 = this;

      this.indeterminate = value === 'half';
      this.checked = value === true;

      var handleDeep = function handleDeep() {
        if (deep) {
          var childNodes = _this2.childNodes;
          for (var i = 0, j = childNodes.length; i < j; i++) {
            var child = childNodes[i];
            child.setChecked(value !== false, deep);
          }
        }
      };

      if (this.shouldLoadData()) {
        // Only work on lazy load data.
        this.loadData(function () {
          handleDeep();
        }, {
          checked: value !== false
        });
      } else {
        handleDeep();
      }

      var parent = this.parent;
      if (parent.level === -1) return;

      reInitChecked(parent);
    }
  }, {
    key: 'getChildren',
    value: function getChildren() {
      // this is data
      var data = this.data;
      if (!data) return null;

      var props = this.props;
      var children = 'children';
      if (props) {
        children = props.children || 'children';
      }

      if (data[children] === undefined) {
        data[children] = null;
      }

      return data[children];
    }
  }, {
    key: 'updateChildren',
    value: function updateChildren() {
      var _this3 = this;

      var newData = this.getChildren() || [];
      var oldData = this.childNodes.map(function (node) {
        return node.data;
      });

      var newDataMap = {};
      var newNodes = [];

      newData.forEach(function (item, index) {
        if (item.$treeNodeId) {
          newDataMap[item.$treeNodeId] = { index: index, data: item };
        } else {
          newNodes.push({ index: index, data: item });
        }
      });

      oldData.forEach(function (item) {
        if (!newDataMap[item.$treeNodeId]) _this3.removeChildByData(item);
      });
      newNodes.forEach(function (_ref) {
        var index = _ref.index,
            data = _ref.data;
        return _this3.insertChild({ data: data }, index);
      });
    }
  }, {
    key: 'loadData',
    value: function loadData(callback) {
      var _this4 = this;

      var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.lazy === true && this.load && !this.loaded) {
        this.loading = true;

        var resolve = function resolve(children) {
          _this4.loaded = true;
          _this4.loading = false;
          _this4.childNodes = [];

          _this4.doCreateChildren(children, defaultProps);

          if (callback) {
            callback.call(_this4, children);
          }
        };

        this.load(this, resolve);
      } else {
        if (callback) {
          callback.call(this);
        }
      }
    }
  }, {
    key: 'label',
    get: function get() {
      return getPropertyFromData(this, 'label');
    }
  }, {
    key: 'icon',
    get: function get() {
      return getPropertyFromData(this, 'icon');
    }
  }, {
    key: 'isLeaf',
    get: function get() {
      return !this.hasChild();
    }
  }]);

  return Node;
}();

var _default = Node;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(nodeIdSeed, 'nodeIdSeed', 'src/tree/model/node.js');

  __REACT_HOT_LOADER__.register(reInitChecked, 'reInitChecked', 'src/tree/model/node.js');

  __REACT_HOT_LOADER__.register(getPropertyFromData, 'getPropertyFromData', 'src/tree/model/node.js');

  __REACT_HOT_LOADER__.register(Node, 'Node', 'src/tree/model/node.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/tree/model/node.js');
}();

;