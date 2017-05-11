'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _utils = require('../../libs/utils');

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

var _treeStore = require('./model/tree-store');

var _treeStore2 = _interopRequireDefault(_treeStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = function (_Component) {
  _inherits(Tree, _Component);

  function Tree(props) {
    _classCallCheck(this, Tree);

    var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

    var _this$props = _this.props,
        data = _this$props.data,
        lazy = _this$props.lazy,
        options = _this$props.options,
        load = _this$props.load,
        defaultCheckedKeys = _this$props.defaultCheckedKeys,
        defaultExpandedKeys = _this$props.defaultExpandedKeys,
        currentNodeKey = _this$props.currentNodeKey,
        nodeKey = _this$props.nodeKey,
        checkStrictly = _this$props.checkStrictly,
        autoExpandParent = _this$props.autoExpandParent,
        defaultExpandAll = _this$props.defaultExpandAll,
        filterNodeMethod = _this$props.filterNodeMethod;

    _this.state = {
      store: new _treeStore2.default({
        key: nodeKey, data: data, lazy: lazy, props: options, load: load, currentNodeKey: currentNodeKey, checkStrictly: checkStrictly,
        defaultCheckedKeys: defaultCheckedKeys, defaultExpandedKeys: defaultExpandedKeys, autoExpandParent: autoExpandParent, defaultExpandAll: defaultExpandAll, filterNodeMethod: filterNodeMethod
      }),
      currentNode: null
    };

    return _this;
  }

  _createClass(Tree, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data instanceof Array) {
        this.root.setData(nextProps.data);
        this.setState({}); //force update
      }
    }
  }, {
    key: 'filter',
    value: function filter(value) {
      if (!this.props.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
      this.store.filter(value);
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.setState({});
    }
  }, {
    key: 'getNodeKey',
    value: function getNodeKey(node, otherwise) {
      var nodeKey = this.props.nodeKey;
      if (nodeKey && node) {
        return node.data[nodeKey];
      }
      return otherwise;
    }
  }, {
    key: 'getCheckedNodes',
    value: function getCheckedNodes(leafOnly) {
      return this.store.getCheckedNodes(leafOnly);
    }
  }, {
    key: 'getCheckedKeys',
    value: function getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly);
    }
  }, {
    key: 'setCheckedNodes',
    value: function setCheckedNodes(nodes, leafOnly) {
      if (!this.props.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
      this.store.setCheckedNodes(nodes, leafOnly);
    }
  }, {
    key: 'setCheckedKeys',
    value: function setCheckedKeys(keys, leafOnly) {
      if (!this.props.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
      this.store.setCheckedKeys(keys, leafOnly);
    }
  }, {
    key: 'setChecked',
    value: function setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep);
    }

    // used by child nodes, use tree store to store this info?

  }, {
    key: 'getCurrentNode',
    value: function getCurrentNode() {
      return this.state.currentNode;
    }
  }, {
    key: 'setCurrentNode',
    value: function setCurrentNode(node) {
      (0, _utils.require_condition)(node != null);

      var _props = this.props,
          onCurrentChange = _props.onCurrentChange,
          onNodeClicked = _props.onNodeClicked;

      this.store.setCurrentNode(node);
      this.setState({
        currentNode: node
      }, function () {
        var nodeModel = node.props.nodeModel;
        onCurrentChange(nodeModel.data, node);
        onNodeClicked(nodeModel.data, node);
      });
    }
  }, {
    key: 'closeSiblings',
    value: function closeSiblings(exclude) {
      var accordion = this.props.accordion;

      if (!accordion) return;
      if (!this.root.childNodes || !this.root.childNodes.length) return;

      this.root.childNodes.filter(function (e) {
        return e !== exclude;
      }).forEach(function (e) {
        return e.collapse();
      });
      this.refresh();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          options = _props2.options,
          renderContent = _props2.renderContent,
          highlightCurrent = _props2.highlightCurrent,
          isShowCheckbox = _props2.isShowCheckbox,
          onCheckChange = _props2.onCheckChange,
          onNodeClicked = _props2.onNodeClicked,
          emptyText = _props2.emptyText;


      var renderEmptyText = function renderEmptyText() {
        if (!_this2.root.childNodes || _this2.root.childNodes.length === 0) {
          return _react2.default.createElement(
            'div',
            { className: 'el-tree__empty-block' },
            _react2.default.createElement(
              'span',
              { className: 'el-tree__empty-text' },
              emptyText
            )
          );
        } else return null;
      };

      return _react2.default.createElement(
        'div',
        {
          className: this.className('el-tree', {
            'el-tree--highlight-current': highlightCurrent
          })
        },
        this.root.childNodes.map(function (e, idx) {
          return _react2.default.createElement(_Node2.default, {
            ref: 'cnode',
            key: _this2.getNodeKey(e, idx),
            nodeModel: e,
            options: options,
            renderContent: renderContent,
            treeNode: _this2,
            parent: _this2,
            isShowCheckbox: isShowCheckbox,
            onCheckChange: onCheckChange
          });
        }),
        renderEmptyText()
      );
    }
  }, {
    key: 'root',
    get: function get() {
      return this.state.store.root;
    }
  }, {
    key: 'store',
    get: function get() {
      return this.state.store;
    }
  }]);

  return Tree;
}(_libs.Component);

var _default = Tree;
exports.default = _default;


Tree.propTypes = {
  autoExpandParent: _libs.PropTypes.bool,
  checkStrictly: _libs.PropTypes.bool,
  currentNodeKey: _libs.PropTypes.any,
  defaultCheckedKeys: _libs.PropTypes.array,
  defaultExpandedKeys: _libs.PropTypes.array,
  defaultExpandAll: _libs.PropTypes.bool,
  data: _libs.PropTypes.array,
  emptyText: _libs.PropTypes.string,
  expandOnClickNode: _libs.PropTypes.bool,
  filterNodeMethod: _libs.PropTypes.func,
  renderContent: _libs.PropTypes.func,
  isShowCheckbox: _libs.PropTypes.bool,
  accordion: _libs.PropTypes.bool,
  indent: _libs.PropTypes.number,
  nodeKey: _libs.PropTypes.string,
  options: _libs.PropTypes.shape({
    children: _libs.PropTypes.string,
    label: _libs.PropTypes.string,
    icon: _libs.PropTypes.string
  }), //equal to props in vue element
  lazy: _libs.PropTypes.bool, //todo: check this
  highlightCurrent: _libs.PropTypes.bool,
  // (f:(resolve, reject)=>Unit)=>Unit
  load: _libs.PropTypes.func,
  //
  onCheckChange: _libs.PropTypes.func,
  // todo: 这个地方需要改下， 现在是current和nodeclick一起被设置上了
  // (nodeModel.data, node)=>Unit
  onNodeClicked: _libs.PropTypes.func,
  // (nodeModel.data, node)=>Unit
  onCurrentChange: _libs.PropTypes.func,
  // (nodeModel.data, nodeModel, Node)=>Unit
  onNodeExpand: _libs.PropTypes.func,
  onNodeCollapse: _libs.PropTypes.func
};

Tree.defaultProps = {
  autoExpandParent: true,
  defaultCheckedKeys: [],
  defaultExpandedKeys: [],
  data: [],
  expandOnClickNode: true,
  emptyText: _locale2.default.t('el.tree.emptyText'),
  indent: 16,
  options: { children: 'children', label: 'label', icon: 'icon' },
  onCheckChange: function onCheckChange() {},
  onNodeClicked: function onNodeClicked() {},
  onCurrentChange: function onCurrentChange() {},
  onNodeExpand: function onNodeExpand() {},
  onNodeCollapse: function onNodeCollapse() {}
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Tree, 'Tree', 'src/tree/Tree.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/tree/Tree.jsx');
}();

;