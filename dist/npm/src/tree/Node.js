'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _debounce = require('throttle-debounce/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _libs = require('../../libs');

var _utils = require('../../libs/utils');

var _CollapseTransition = require('./CollapseTransition');

var _CollapseTransition2 = _interopRequireDefault(_CollapseTransition);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function NodeContent(_ref) {
  var context = _ref.context,
      renderContent = _ref.renderContent;
  var _context$props = context.props,
      nodeModel = _context$props.nodeModel,
      treeNode = _context$props.treeNode;


  if (typeof renderContent === 'function') {
    return renderContent(nodeModel, nodeModel.data, treeNode.store);
  } else {
    return _react2.default.createElement(
      'span',
      { className: 'el-tree-node__label' },
      nodeModel.label
    );
  }
}

NodeContent.propTypes = {
  renderContent: _libs.PropTypes.func,
  context: _libs.PropTypes.object.isRequired
};

var Node = function (_Component) {
  _inherits(Node, _Component);

  function Node(props) {
    _classCallCheck(this, Node);

    var _this = _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this, props));

    _this.state = {
      childNodeRendered: false,
      isShowCheckbox: false
    };
    _this.state.isShowCheckbox = props.treeNode.isShowCheckbox;

    _this.oldChecked = false;
    _this.oldIndeterminate = false;
    _this.idGen = new _utils.IDGenerator();
    return _this;
  }

  _createClass(Node, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this,
          _watchers;

      var nodeModel = this.props.nodeModel;
      var childrenKey = this.props.options.children || 'children';

      var triggerChange = (0, _debounce2.default)(20, function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (_this2.isDeconstructed) return;
        _this2.handleSelectChange.apply(_this2, args);
      });

      this.loadHandler = this.enhanceLoad(nodeModel);
      this.watchers = (_watchers = {}, _defineProperty(_watchers, this.idGen.next(), (0, _utils.watchPropertyChange)(nodeModel, 'indeterminate', function (value) {
        triggerChange(nodeModel.checked, value);
      })), _defineProperty(_watchers, this.idGen.next(), (0, _utils.watchPropertyChange)(nodeModel, 'checked', function (value) {
        triggerChange(value, nodeModel.indeterminate);
      })), _defineProperty(_watchers, this.idGen.next(), (0, _utils.watchPropertyChange)(nodeModel, 'loading', function () {
        _this2.setState({});
      })), _watchers);

      if (nodeModel.data != null) {
        this.watchers[this.idGen.next()] = (0, _utils.watchPropertyChange)(nodeModel.data, childrenKey, function () {
          nodeModel.updateChildren();
          _this2.setState({}); //force update view
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.loadHandler();
      // clear watchs
      for (var w in this.watchers) {
        if (this.watchers[w]) {
          this.watchers[w]();
        }
      }
      this.isDeconstructed = true;
    }
  }, {
    key: 'enhanceLoad',
    value: function enhanceLoad(nodeModel) {
      var _this3 = this;

      var load = nodeModel.load;
      var enhanced = function enhanced() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        load.apply(null, args);
        _this3.setState({});
      };
      nodeModel.load = enhanced;
      return function () {
        nodeModel.load = load;
      };
    }
  }, {
    key: 'handleSelectChange',
    value: function handleSelectChange(checked, indeterminate) {
      var _props = this.props,
          onCheckChange = _props.onCheckChange,
          nodeModel = _props.nodeModel;

      // !NOTE: 原码是 && 的关系，感觉有bug

      if (this.oldChecked !== checked || this.oldIndeterminate !== indeterminate) {
        onCheckChange(nodeModel.data, checked, indeterminate);
        this.setState({}); //force update
      }

      this.oldChecked = checked;
      this.oldIndeterminate = indeterminate;
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
    key: 'handleClick',
    value: function handleClick(evt) {
      if (evt) evt.stopPropagation();
      var _props2 = this.props,
          nodeModel = _props2.nodeModel,
          treeNode = _props2.treeNode;


      treeNode.setCurrentNode(this);
      if (treeNode.props.expandOnClickNode) {
        this.handleExpandIconClick();
      }
    }
  }, {
    key: 'handleExpandIconClick',
    value: function handleExpandIconClick(evt) {
      var _this4 = this;

      if (evt) evt.stopPropagation();

      var _props3 = this.props,
          nodeModel = _props3.nodeModel,
          parent = _props3.parent;
      var _props$treeNode$props = this.props.treeNode.props,
          onNodeCollapse = _props$treeNode$props.onNodeCollapse,
          onNodeExpand = _props$treeNode$props.onNodeExpand;


      if (nodeModel.isLeaf) return;

      if (nodeModel.expanded) {
        nodeModel.collapse();
        this.refresh();
        onNodeCollapse(nodeModel.data, nodeModel, this);
      } else {
        nodeModel.expand(function () {
          _this4.setState({ childNodeRendered: true }, function () {
            onNodeExpand(nodeModel.data, nodeModel, _this4);
          });
          parent.closeSiblings(nodeModel);
        });
      }
    }
  }, {
    key: 'closeSiblings',
    value: function closeSiblings(exclude) {
      var _props4 = this.props,
          treeNode = _props4.treeNode,
          nodeModel = _props4.nodeModel;

      if (!treeNode.props.accordion) return;
      if (nodeModel.isLeaf || !nodeModel.childNodes || !nodeModel.childNodes.length) return;

      nodeModel.childNodes.filter(function (e) {
        return e !== exclude;
      }).forEach(function (e) {
        return e.collapse();
      });
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.setState({});
    }
  }, {
    key: 'handleUserClick',
    value: function handleUserClick() {
      var _props$treeNode = this.props.treeNode,
          nodeModel = _props$treeNode.nodeModel,
          checkStrictly = _props$treeNode.checkStrictly;

      if (nodeModel.indeterminate) {
        nodeModel.setChecked(nodeModel.checked, !checkStrictly);
      }
    }
  }, {
    key: 'handleCheckChange',
    value: function handleCheckChange(checked) {
      this.props.nodeModel.setChecked(checked, true);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var childNodeRendered = this.state.childNodeRendered;
      var _props5 = this.props,
          treeNode = _props5.treeNode,
          nodeModel = _props5.nodeModel,
          renderContent = _props5.renderContent,
          isShowCheckbox = _props5.isShowCheckbox;


      var expanded = nodeModel.expanded;

      return _react2.default.createElement(
        'div',
        {
          onClick: this.handleClick.bind(this),
          className: this.classNames('el-tree-node', {
            expanded: childNodeRendered && expanded,
            'is-current': treeNode.getCurrentNode() === this,
            'is-hidden': !nodeModel.visible
          }),
          style: { display: nodeModel.visible ? '' : 'none' }
        },
        _react2.default.createElement(
          'div',
          {
            className: 'el-tree-node__content',
            style: { paddingLeft: (nodeModel.level - 1) * treeNode.props.indent + 'px' }
          },
          _react2.default.createElement('span', {
            className: this.classNames('el-tree-node__expand-icon', {
              'is-leaf': nodeModel.isLeaf,
              expanded: !nodeModel.isLeaf && expanded
            }),
            onClick: this.handleExpandIconClick.bind(this)
          }),
          isShowCheckbox && _react2.default.createElement(_checkbox2.default, {
            checked: nodeModel.checked,
            onChange: this.handleCheckChange.bind(this),
            indeterminate: nodeModel.indeterminate,
            onClick: this.handleUserClick.bind(this)
          }),
          nodeModel.loading && _react2.default.createElement(
            'span',
            { className: 'el-tree-node__loading-icon el-icon-loading' },
            ' '
          ),
          _react2.default.createElement(NodeContent, {
            nodeModel: nodeModel,
            renderContent: treeNode.props.renderContent,
            context: this
          })
        ),
        _react2.default.createElement(
          _CollapseTransition2.default,
          { isShow: expanded, ref: 'collapse' },
          _react2.default.createElement(
            'div',
            { className: 'el-tree-node__children' },
            nodeModel.childNodes.map(function (e, idx) {
              var props = Object.assign({}, _this5.props, { nodeModel: e, parent: _this5 });
              return _react2.default.createElement(Node, _extends({}, props, { key: _this5.getNodeKey(e, idx) }));
            })
          )
        )
      );
    }
  }]);

  return Node;
}(_libs.Component);

var _default = Node;
exports.default = _default;


Node.propTypes = {
  nodeModel: _libs.PropTypes.object,
  options: _libs.PropTypes.object,
  treeNode: _libs.PropTypes.object.isRequired,
  isShowCheckbox: _libs.PropTypes.bool,
  onCheckChange: _libs.PropTypes.func
};

Node.defaultProps = {
  nodeModel: {},
  options: {},
  onCheckChange: function onCheckChange() {}
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NodeContent, 'NodeContent', 'src/tree/Node.jsx');

  __REACT_HOT_LOADER__.register(Node, 'Node', 'src/tree/Node.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/tree/Node.jsx');
}();

;