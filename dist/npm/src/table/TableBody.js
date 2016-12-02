'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BodyItem = function (_Component) {
  _inherits(BodyItem, _Component);

  function BodyItem(props, context) {
    _classCallCheck(this, BodyItem);

    var _this = _possibleConstructorReturn(this, (BodyItem.__proto__ || Object.getPrototypeOf(BodyItem)).call(this, props, context));

    _this.state = {
      hover: false
    };
    return _this;
  }

  _createClass(BodyItem, [{
    key: 'onMouseState',
    value: function onMouseState(hover) {
      var fixedLeftBody = this.context.$owerTable.refs.fixedLeftBody;
      var mainBody = this.context.$owerTable.refs.mainBody;
      var fixedRightBody = this.context.$owerTable.refs.fixedRightBody;

      fixedLeftBody && fixedLeftBody.hoverRowItem(this.props.rowIndex, hover);
      mainBody && mainBody.hoverRowItem(this.props.rowIndex, hover);
      fixedRightBody && fixedRightBody.hoverRowItem(this.props.rowIndex, hover);
    }
  }, {
    key: 'setHoverState',
    value: function setHoverState(hover) {
      this.setState({
        hover: hover
      });
    }
  }, {
    key: 'onToggleSelectedRow',
    value: function onToggleSelectedRow(isHiglight, dataItem) {
      var fixedLeftBody = this.context.$owerTable.refs.fixedLeftBody;
      var mainBody = this.context.$owerTable.refs.mainBody;
      var fixedRightBody = this.context.$owerTable.refs.fixedRightBody;

      fixedLeftBody && fixedLeftBody.toggleSelectedRow(isHiglight, dataItem);
      mainBody && mainBody.toggleSelectedRow(isHiglight, dataItem);
      fixedRightBody && fixedRightBody.toggleSelectedRow(isHiglight, dataItem);

      var tableProps = this.context.$owerTable.props;
      tableProps.highlightCurrentRow && tableProps.onCurrentChange && tableProps.onCurrentChange(dataItem);
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var _props = this.props,
          onSelected = _props.onSelected,
          itemData = _props.itemData;

      var checked = e.target.checked;
      onSelected && onSelected(checked, itemData);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          itemData = _props2.itemData,
          columns = _props2.columns,
          rowIndex = _props2.rowIndex,
          rowClassName = _props2.rowClassName,
          isHiglight = _props2.isHiglight,
          selected = _props2.selected;

      var rootClassName = this.classNames(_defineProperty({
        'hover-row': this.state.hover,
        'current-row': isHiglight
      }, rowClassName ? rowClassName(itemData, rowIndex) : '', true));

      return _react2.default.createElement(
        'tr',
        {
          onClick: function onClick() {
            _this2.onToggleSelectedRow(!isHiglight, itemData);
          },
          className: rootClassName,
          onMouseEnter: function onMouseEnter() {
            _this2.onMouseState(true);
          },
          onMouseLeave: function onMouseLeave() {
            _this2.onMouseState(false);
          } },
        columns.map(function (column, idx) {
          var content = column.render ? column.render(itemData, column) : itemData[column.property];
          var className = _this2.classNames({
            'is-hidden': !_this2.props.fixed && column.fixed,
            'is-center': column.align == 'center',
            'is-right': column.align == 'right'
          });
          return _react2.default.createElement(
            'td',
            {
              key: idx,
              className: className,
              style: { width: column.realWidth } },
            column.type == 'selection' && _react2.default.createElement(
              'div',
              { className: 'cell' },
              _react2.default.createElement(_checkbox2.default, { checked: selected, onChange: function onChange(e) {
                  return _this2.onChange(e);
                } })
            ),
            column.type == 'index' && _react2.default.createElement(
              'div',
              { className: 'cell' },
              rowIndex + 1
            ),
            column.type != 'selection' && column.type != 'index' && _react2.default.createElement(
              'div',
              { className: 'cell' },
              content
            )
          );
        })
      );
    }
  }]);

  return BodyItem;
}(_libs.Component);

BodyItem.contextTypes = {
  $owerTable: _react2.default.PropTypes.object
};

BodyItem.propTypes = {
  columns: _libs.PropTypes.array.isRequired,
  itemData: _libs.PropTypes.object.isRequired
};

var TableBody = function (_Component2) {
  _inherits(TableBody, _Component2);

  function TableBody(props, context) {
    _classCallCheck(this, TableBody);

    var _this3 = _possibleConstructorReturn(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).call(this, props, context));

    _this3.rowPrefix = props.fixed + 'TableRow';

    _this3.state = {
      highlightRows: [],
      selected: []
    };
    return _this3;
  }

  _createClass(TableBody, [{
    key: 'toggleSelectedRow',
    value: function toggleSelectedRow(isHiglight, rowData) {
      var highlightCurrentRow = this.props.highlightCurrentRow;

      if (!highlightCurrentRow) {
        return;
      }
      this.setState({
        highlightRows: isHiglight ? [rowData] : []
      });
    }
  }, {
    key: 'hoverRowItem',
    value: function hoverRowItem(rowIndex, hover) {
      var rcRowElement = this.refs[this.rowPrefix + rowIndex];
      rcRowElement.setHoverState(hover);
    }
  }, {
    key: 'isScrollY',
    value: function isScrollY() {
      var tableBodyWrapper = this.context.$owerTable.refs.bodyWrapper;
      var contentHeight = tableBodyWrapper.offsetHeight - (this.isScrollX() ? (0, _utils.getScrollBarWidth)() : 0);
      return contentHeight < this.refs.root.offsetHeight;
    }
  }, {
    key: 'isScrollX',
    value: function isScrollX() {
      var tableBodyWrapper = this.context.$owerTable.refs.bodyWrapper;
      return tableBodyWrapper.offsetWidth < this.refs.root.offsetWidth;
    }
  }, {
    key: 'onSelected',
    value: function onSelected(checked, data) {
      var selected = this.state.selected;

      var dataList = this.props.data;
      var onSelectChange = this.context.$owerTable.props.onSelectChange;


      checked ? selected.push(data) : selected.splice(selected.indexOf(data), 1);

      this.context.$owerTable.refs.header.setState({ allChecked: dataList.length == selected.length });
      this.setState({ selected: selected });

      onSelectChange && onSelectChange(data, checked);
    }
  }, {
    key: 'selectAll',
    value: function selectAll(checked) {
      var data = this.props.data;
      var onSelectAll = this.context.$owerTable.props.onSelectAll;


      this.setState({ selected: checked ? data.slice(0) : [] });
      onSelectAll && onSelectAll(checked ? data : [], checked);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props3 = this.props,
          columns = _props3.columns,
          data = _props3.data,
          rowClassName = _props3.rowClassName,
          fixed = _props3.fixed,
          highlightCurrentRow = _props3.highlightCurrentRow;
      var _state = this.state,
          highlightRows = _state.highlightRows,
          selected = _state.selected;

      var rowPrefix = this.rowPrefix;

      return _react2.default.createElement(
        'table',
        {
          ref: 'root',
          style: this.style(),
          className: this.classNames('el-table__body'),
          cellPadding: 0,
          cellSpacing: 0 },
        _react2.default.createElement(
          'tbody',
          null,
          data.map(function (dataItem, dataIdx) {
            var refId = rowPrefix + dataIdx;
            var isHiglight = highlightRows[0] == dataItem;
            return _react2.default.createElement(BodyItem, {
              fixed: fixed,
              onSelected: function onSelected(c, d) {
                _this4.onSelected(c, d);
              },
              selected: selected.indexOf(dataItem) > -1,
              key: dataIdx,
              ref: refId,
              isHiglight: isHiglight,
              rowIndex: dataIdx,
              rowClassName: rowClassName,
              itemData: dataItem,
              columns: columns });
          })
        )
      );
    }
  }]);

  return TableBody;
}(_libs.Component);

var _default = TableBody;
exports.default = _default;


TableBody.contextTypes = {
  $owerTable: _react2.default.PropTypes.object
};

TableBody.propTypes = {
  columns: _libs.PropTypes.array.isRequired,
  data: _libs.PropTypes.array.isRequired
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(BodyItem, 'BodyItem', 'src/table/TableBody.jsx');

  __REACT_HOT_LOADER__.register(TableBody, 'TableBody', 'src/table/TableBody.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/table/TableBody.jsx');
}();

;