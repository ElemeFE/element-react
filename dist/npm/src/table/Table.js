'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _libs = require('../../libs');

var _mixins = require('./mixins');

var _utils = require('./utils');

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tableIdSeed = 1;

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props, context) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props, context));

    _this.tableId = tableIdSeed++;

    var _this$props = _this.props,
        columns = _this$props.columns,
        data = _this$props.data;

    var enhCols = (0, _mixins.enhanceColumns)(columns, _this.tableId);

    _this.state = {
      columns: columns, //用户原始columns配置
      _columns: enhCols.columns, //补充后的列配置
      fixedLeftColumns: enhCols.fixedLeftColumns,
      fixedRightColumns: enhCols.fixedRightColumns,
      data: data,
      sortList: null,
      filterList: null,

      bodyWidth: '',
      bodyHeight: '',
      headerHeight: '',
      realTableHeaderHeight: '',
      realTableHeight: '',
      resizeProxyVisible: false,

      scrollY: false, //表格竖Y轴是否有滚动条,
      scrollX: false
    };
    return _this;
  }

  _createClass(Table, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        $owerTable: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initLayout();

      Object.defineProperty(this, 'filterContainer', {
        get: this._filterContainer.bind(this)
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._filterContainer instanceof HTMLElement) {
        _reactDom2.default.unmountComponentAtNode(this._filterContainer);
        document.body.removeChild(this._filterContainer);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data != this.props.data) {
        this.setState({ data: nextProps.data });
      }
    }
  }, {
    key: '_filterContainer',
    value: function _filterContainer() {
      if (!this._filterCon) {
        this._filterCon = document.createElement('div');
        this._filterCon.style = "position:absolute;left:0;top:0";
        this._filterCon.id = "__filter__" + Math.random(32).toString().slice(2);
        document.body.appendChild(this._filterCon);
      }

      return this._filterCon;
    }
  }, {
    key: 'initLayout',
    value: function initLayout() {
      var _this2 = this;

      var _props = this.props,
          height = _props.height,
          fit = _props.fit;

      var rootComputedStyle = window.getComputedStyle(this.refs.root);
      var headerComputedStyle = window.getComputedStyle(this.refs.headerWrapper);
      var thisTableWidth = parseFloat(headerComputedStyle.getPropertyValue('width'));
      var realTableHeight = parseFloat(rootComputedStyle.getPropertyValue('height'));
      var bodyWidth = (0, _mixins.scheduleLayout)(this.state._columns, thisTableWidth, undefined, fit).bodyWidth;
      var headerHeight = this.refs.headerWrapper.offsetHeight;
      var bodyHeight = height ? height - headerHeight : this.state.headerHeight;

      this.setState({
        bodyWidth: bodyWidth,
        bodyHeight: bodyHeight,
        headerHeight: headerHeight,
        realTableHeaderHeight: headerHeight,
        realTableWidth: thisTableWidth,
        realTableHeight: this.props.height || realTableHeight || 'auto'
      }, function () {
        _this2.adjustScrollState();
      });
    }
  }, {
    key: 'scheduleLayout',
    value: function scheduleLayout() {
      var _this3 = this;

      var _state = this.state,
          _columns = _state._columns,
          realTableWidth = _state.realTableWidth,
          scrollY = _state.scrollY;


      var layout = (0, _mixins.scheduleLayout)(_columns, realTableWidth, scrollY, this.props.fit);
      this.setState({
        bodyWidth: layout.bodyWidth
      }, function () {
        _this3.onScrollBodyWrapper();
        _this3.adjustScrollState();
      });
    }
  }, {
    key: 'adjustScrollState',
    value: function adjustScrollState() {
      var scrollY = this.refs.mainBody.isScrollY();
      this.setState({
        scrollX: this.refs.mainBody.isScrollX(),
        scrollY: scrollY,
        bodyWidth: (0, _mixins.scheduleLayout)(this.state._columns, this.state.realTableWidth, scrollY, this.props.fit).bodyWidth
      });
    }
  }, {
    key: 'getBodyWrapperStyle',
    value: function getBodyWrapperStyle() {
      var bodyHeight = this.state.bodyHeight;
      var height = this.props.height;

      var style = {};

      style.height = bodyHeight;
      return style;
    }
  }, {
    key: 'onScrollBodyWrapper',
    value: function onScrollBodyWrapper(e) {
      var target = e ? e.target : this.refs.bodyWrapper;
      var headerWrapper = this.refs.headerWrapper;
      var fixedBodyWrapper = this.refs.fixedBodyWrapper;
      var rightFixedBodyWrapper = this.refs.rightFixedBodyWrapper;

      headerWrapper.scrollLeft = target.scrollLeft;
      fixedBodyWrapper && (fixedBodyWrapper.scrollTop = target.scrollTop);
      rightFixedBodyWrapper && (rightFixedBodyWrapper.scrollTop = target.scrollTop);
    }
  }, {
    key: 'sortBy',
    value: function sortBy(sort, prop, compare) {
      var data = this.state.filterList || this.state.data;
      var sortList = data.slice(0);

      if (sort === 0) {
        this.setState({ sortList: null });
      } else {
        var defaultCompare = function defaultCompare(a, b) {
          if (sort == 2) {
            var t = b;b = a;a = t;
          }
          return a[prop] > b[prop] ? 1 : -1;
        };
        sortList.sort(compare ? compare : defaultCompare);
        this.setState({ sortList: sortList });
      }
    }
  }, {
    key: 'filterBy',
    value: function filterBy(column, filteCondi) {
      var data = this.state.sortList || this.state.data;

      var filterList = data.filter(function (d) {
        var defaultFilterMethod = function defaultFilterMethod(c) {
          return d[column.property] == c.value;
        };
        return !!filteCondi.filter(column.filterMethod || defaultFilterMethod).length;
      });

      this.setState({
        filterList: filteCondi && filteCondi.length ? filterList : data
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          fit = _props2.fit,
          stripe = _props2.stripe,
          border = _props2.border,
          highlightCurrentRow = _props2.highlightCurrentRow;
      var _state2 = this.state,
          bodyWidth = _state2.bodyWidth,
          bodyHeight = _state2.bodyHeight,
          _columns = _state2._columns,
          data = _state2.data,
          fixedLeftColumns = _state2.fixedLeftColumns,
          fixedRightColumns = _state2.fixedRightColumns,
          realTableHeight = _state2.realTableHeight,
          realTableHeaderHeight = _state2.realTableHeaderHeight,
          scrollY = _state2.scrollY,
          scrollX = _state2.scrollX,
          sortList = _state2.sortList,
          filterList = _state2.filterList;


      var rootClassName = this.classNames('el-table', {
        'el-table--fit': fit,
        'el-table--striped': stripe,
        'el-table--border': border
      });

      var scrollYWiddth = scrollX ? (0, _utils.getScrollBarWidth)() : 0;

      data = filterList || sortList || data;

      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          style: this.style(),
          className: this.className(rootClassName) },
        _react2.default.createElement(
          'div',
          {
            ref: 'headerWrapper',
            className: 'el-table__header-wrapper' },
          _react2.default.createElement(_TableHeader2.default, {
            ref: 'header',
            isScrollY: scrollY,
            style: { width: bodyWidth },
            columns: _columns })
        ),
        _react2.default.createElement(
          'div',
          {
            style: this.getBodyWrapperStyle(),
            className: 'el-table__body-wrapper',
            onScroll: function onScroll(e) {
              _this4.onScrollBodyWrapper(e);
            },
            ref: 'bodyWrapper' },
          _react2.default.createElement(_TableBody2.default, {
            ref: 'mainBody',
            style: { width: bodyWidth },
            rowClassName: this.props.rowClassName,
            columns: _columns,
            highlightCurrentRow: highlightCurrentRow,
            data: data })
        ),
        !!fixedLeftColumns.length && _react2.default.createElement(
          'div',
          {
            className: 'el-table__fixed',
            ref: 'fixedWrapper',
            style: { width: (0, _mixins.calculateFixedWidth)(fixedLeftColumns), height: realTableHeight ? realTableHeight - scrollYWiddth : '' } },
          _react2.default.createElement(
            'div',
            { className: 'el-table__fixed-header-wrapper', ref: 'fixedHeaderWrapper' },
            _react2.default.createElement(_TableHeader2.default, {
              fixed: 'left',
              border: 'border',
              columns: _columns,
              style: { width: '100%', height: '100%' } })
          ),
          _react2.default.createElement(
            'div',
            {
              className: 'el-table__fixed-body-wrapper',
              ref: 'fixedBodyWrapper',
              style: { top: realTableHeaderHeight, height: bodyHeight ? bodyHeight - scrollYWiddth : '' } },
            _react2.default.createElement(_TableBody2.default, {
              ref: 'fixedLeftBody',
              fixed: 'left',
              rowClassName: this.props.rowClassName,
              columns: _columns,
              data: data,
              highlightCurrentRow: highlightCurrentRow,
              style: { width: bodyWidth } })
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'el-table__fixed-right',
            ref: 'rightFixedWrapper',
            style: { width: (0, _mixins.calculateFixedWidth)(fixedRightColumns), height: realTableHeight ? realTableHeight - scrollYWiddth : '', right: scrollY ? (0, _utils.getScrollBarWidth)() : 0 } },
          _react2.default.createElement(
            'div',
            {
              className: 'el-table__fixed-header-wrapper',
              ref: 'rightFixedHeaderWrapper' },
            _react2.default.createElement(_TableHeader2.default, {
              fixed: 'right',
              border: 'border',
              columns: _columns,
              style: { width: '100%', height: '100%' } })
          ),
          _react2.default.createElement(
            'div',
            {
              className: 'el-table__fixed-body-wrapper',
              ref: 'rightFixedBodyWrapper',
              style: { top: realTableHeaderHeight, height: bodyHeight ? bodyHeight - scrollYWiddth : '' } },
            _react2.default.createElement(_TableBody2.default, {
              ref: 'fixedRightBody',
              fixed: 'right',
              rowClassName: this.props.rowClassName,
              columns: _columns,
              data: data,
              highlightCurrentRow: highlightCurrentRow,
              style: { width: bodyWidth } })
          )
        ),
        _react2.default.createElement('div', {
          style: { display: this.state.resizeProxyVisible ? "block" : "none" },
          className: 'el-table__column-resize-proxy',
          ref: 'resizeProxy' }),
        _react2.default.createElement(
          'div',
          { className: 'el-table__body-scroller' },
          _react2.default.createElement('div', null)
        )
      );
    }
  }]);

  return Table;
}(_libs.Component);

var _default = Table;
exports.default = _default;


Table.childContextTypes = {
  $owerTable: _react2.default.PropTypes.object
};

Table.propTypes = {
  columns: _libs.PropTypes.array.isRequired,
  data: _libs.PropTypes.array.isRequired,
  height: _libs.PropTypes.number,
  stripe: _libs.PropTypes.bool,
  border: _libs.PropTypes.bool,
  fit: _libs.PropTypes.bool,
  rowClassName: _libs.PropTypes.func,
  style: _libs.PropTypes.object,
  highlightCurrentRow: _libs.PropTypes.bool,

  //Event
  onCurrentChange: _libs.PropTypes.func,
  onSelectAll: _libs.PropTypes.func,
  onSelectChange: _libs.PropTypes.func
};

Table.defaultProps = {
  columns: [],
  data: [],
  stripe: false,
  border: false,
  fit: true,
  highlightCurrentRow: false
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(tableIdSeed, 'tableIdSeed', 'src/table/Table.jsx');

  __REACT_HOT_LOADER__.register(Table, 'Table', 'src/table/Table.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/table/Table.jsx');
}();

;