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

var _tree = require('./model/tree');

var _tree2 = _interopRequireDefault(_tree);

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
        load = _this$props.load;

    _this.state = {
      treeModel: new _tree2.default({ data: data, lazy: lazy, props: options, load: load }),
      currentNode: null
    };
    return _this;
  }

  _createClass(Tree, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data instanceof Array) {
        this.state.treeModel.root.setData(nextProps.data);
        this.setState({}); //force update
      }
    }
  }, {
    key: 'getCheckedNodes',
    value: function getCheckedNodes(leafOnly) {
      this.state.treeModel.getCheckedNodes(leafOnly);
    }

    /**
     * node: Node
     */

  }, {
    key: 'getCurrentNode',
    value: function getCurrentNode() {
      return this.state.currentNode;
    }
  }, {
    key: 'setCurrentNode',
    value: function setCurrentNode(node) {
      (0, _utils.require_condition)(node != null);

      this.setState({
        currentNode: node
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var treeModel = this.state.treeModel;
      var _props = this.props,
          options = _props.options,
          renderContent = _props.renderContent,
          highlightCurrent = _props.highlightCurrent,
          isShowCheckbox = _props.isShowCheckbox,
          onCheckChange = _props.onCheckChange,
          onNodeClicked = _props.onNodeClicked;


      return _react2.default.createElement(
        'div',
        {
          style: this.style(),
          className: this.className('el-tree', {
            'el-tree--highlight-current': highlightCurrent
          })
        },
        treeModel.root.childNodes.map(function (e, idx) {
          return _react2.default.createElement(_Node2.default, {
            key: idx,
            nodeModel: e,
            options: options,
            renderContent: renderContent,
            treeNode: _this2,
            isShowCheckbox: isShowCheckbox,
            onCheckChange: onCheckChange,
            onNodeClicked: onNodeClicked
          });
        })
      );
    }
  }]);

  return Tree;
}(_libs.Component);

var _default = Tree;
exports.default = _default;


Tree.propTypes = {
  data: _libs.PropTypes.array,
  renderContent: _libs.PropTypes.func,
  isShowCheckbox: _libs.PropTypes.bool,
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
  // (nodeModel.data, nodeModel, this)=>Unit
  onNodeClicked: _libs.PropTypes.func
};

Tree.defaultProps = {
  data: [],
  options: { children: 'children', label: 'label', icon: 'icon' },
  onCheckChange: function onCheckChange() {},
  onNodeClicked: function onNodeClicked() {}
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