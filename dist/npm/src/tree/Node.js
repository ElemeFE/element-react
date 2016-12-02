'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

function NodeContent(props) {
  var nodeModel = props.nodeModel,
      renderContent = props.renderContent,
      context = props.context;


  if (typeof renderContent === 'function') {
    return renderContent(Object.freeze(context));
  } else {
    return _react2.default.createElement(
      'span',
      { className: 'el-tree-node__label' },
      nodeModel.label
    );
  }
}

NodeContent.propTypes = {
  nodeModel: _libs.PropTypes.object.isRequired,
  renderContent: _libs.PropTypes.func,
  context: _libs.PropTypes.object.isRequired
};

var Node = function (_Component) {
  _inherits(Node, _Component);

  function Node(props) {
    _classCallCheck(this, Node);

    var _this = _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this, props));

    _this.state = {
      expanded: false,
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

      var triggerChange = (0, _utils.debounce)(function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (_this2.isDeconstructed) return;
        _this2.handleSelectChange.apply(_this2, args);
      }, 20);

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
    key: 'handleClick',
    value: function handleClick() {
      this.props.treeNode.setCurrentNode(this);
    }
  }, {
    key: 'handleExpandIconClick',
    value: function handleExpandIconClick(event) {
      var _this4 = this;

      var target = event.target;
      var _props2 = this.props,
          nodeModel = _props2.nodeModel,
          onNodeClicked = _props2.onNodeClicked;

      if (target.tagName.toUpperCase() !== 'DIV' && target.parentNode.nodeName.toUpperCase() !== 'DIV' || target.nodeName.toUpperCase() === 'LABEL') return;
      if (this.state.expanded) {
        nodeModel.collapse();
        this.setState({ expanded: false }, function () {
          return _this4.refs.collapse.triggerChange();
        });
      } else {
        nodeModel.expand(function () {
          _this4.setState({ expanded: true, childNodeRendered: true }, function () {
            return _this4.refs.collapse.triggerChange();
          });
        });
      }

      onNodeClicked(nodeModel.data, nodeModel, this);
    }
  }, {
    key: 'handleUserClick',
    value: function handleUserClick() {
      var nodeModel = this.props.nodeModel;
      if (nodeModel.indeterminate) {
        nodeModel.setChecked(nodeModel.checked, true);
      }
    }
  }, {
    key: 'handleCheckChange',
    value: function handleCheckChange(ev) {
      var nodeModel = this.props.nodeModel;
      nodeModel.setChecked(ev.target.checked, true);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state = this.state,
          childNodeRendered = _state.childNodeRendered,
          expanded = _state.expanded;
      var _props3 = this.props,
          treeNode = _props3.treeNode,
          nodeModel = _props3.nodeModel,
          renderContent = _props3.renderContent,
          isShowCheckbox = _props3.isShowCheckbox;


      return _react2.default.createElement(
        'div',
        {
          onClick: this.handleClick.bind(this),
          className: this.classNames('el-tree-node', { expanded: childNodeRendered && expanded, 'is-current': treeNode.getCurrentNode() === this })
        },
        _react2.default.createElement(
          'div',
          {
            className: 'el-tree-node__content',
            style: { 'paddingLeft': nodeModel.level * 16 + 'px' },
            onClick: this.handleExpandIconClick.bind(this) },
          _react2.default.createElement('span', { className: this.classNames('el-tree-node__expand-icon', { 'is-leaf': nodeModel.isLeaf, expanded: !nodeModel.isLeaf && expanded }) }),
          isShowCheckbox && _react2.default.createElement(_checkbox2.default, {
            checked: nodeModel.checked,
            onChange: this.handleCheckChange.bind(this),
            indeterminate: nodeModel.indeterminate
          }),
          nodeModel.loading && _react2.default.createElement(
            'span',
            { className: 'el-tree-node__icon el-icon-loading' },
            ' '
          ),
          _react2.default.createElement(NodeContent, { nodeModel: nodeModel, renderContent: renderContent, context: this })
        ),
        _react2.default.createElement(
          _CollapseTransition2.default,
          { isShow: expanded, ref: 'collapse' },
          _react2.default.createElement(
            'div',
            {
              className: 'el-tree-node__children' },
            nodeModel.childNodes.map(function (e, idx) {
              var props = Object.assign({}, _this5.props, { nodeModel: e });
              return _react2.default.createElement(Node, _extends({}, props, { key: idx }));
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
  renderContent: _libs.PropTypes.func,
  treeNode: _libs.PropTypes.object.isRequired,
  isShowCheckbox: _libs.PropTypes.bool,
  onCheckChange: _libs.PropTypes.func,
  onNodeClicked: _libs.PropTypes.func
};

Node.defaultProps = {
  nodeModel: {},
  options: {},
  onCheckChange: function onCheckChange() {},
  onNodeClicked: function onNodeClicked() {}
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