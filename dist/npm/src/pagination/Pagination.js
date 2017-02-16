'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _Pager = require('./Pager');

var _Pager2 = _interopRequireDefault(_Pager);

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pre = function Pre(props) {
  var disabled = props.internalCurrentPage <= 1 ? 'disabled' : '';
  return _react2.default.createElement(
    'button',
    { className: 'btn-prev ' + disabled,
      onClick: props.prev },
    _react2.default.createElement('i', { className: 'el-icon el-icon-arrow-left' })
  );
};

var Next = function Next(props) {
  var disabled = props.internalCurrentPage === props.internalPageCount || props.internalPageCount === 0 ? 'disabled' : '';

  return _react2.default.createElement(
    'button',
    { className: 'btn-next ' + disabled,
      onClick: props.next },
    _react2.default.createElement('i', { className: 'el-icon el-icon-arrow-right' })
  );
};

var Sizes = function (_Component) {
  _inherits(Sizes, _Component);

  function Sizes() {
    _classCallCheck(this, Sizes);

    return _possibleConstructorReturn(this, (Sizes.__proto__ || Object.getPrototypeOf(Sizes)).apply(this, arguments));
  }

  _createClass(Sizes, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onSizeChange = _props.onSizeChange,
          internalPageSize = _props.internalPageSize;


      return _react2.default.createElement(
        'span',
        { className: 'el-pagination__sizes' },
        _react2.default.createElement(
          _select2.default,
          {
            size: 'small',
            value: internalPageSize,
            onChange: onSizeChange,
            width: 110 },
          this.props.pageSizes.map(function (item, idx) {
            return _react2.default.createElement(_select2.default.Option, {
              key: idx,
              value: item,
              label: item + ' ' + _locale2.default.t('el.pagination.pagesize') });
          })
        )
      );
    }
  }]);

  return Sizes;
}(_libs.Component);

;

var Total = function Total(props) {
  return typeof props.total === 'number' ? _react2.default.createElement(
    'span',
    { className: 'el-pagination__total' },
    _locale2.default.t('el.pagination.total', { total: props.total })
  ) : '';
};

var Jumper = function (_Component2) {
  _inherits(Jumper, _Component2);

  function Jumper() {
    _classCallCheck(this, Jumper);

    return _possibleConstructorReturn(this, (Jumper.__proto__ || Object.getPrototypeOf(Jumper)).apply(this, arguments));
  }

  _createClass(Jumper, [{
    key: 'handleChange',
    value: function handleChange(_ref) {
      var target = _ref.target;
      var jumper = this.props.jumper;

      jumper(target.value);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {}
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'span',
        { className: 'el-pagination__jump' },
        _locale2.default.t('el.pagination.goto'),
        _react2.default.createElement('input', {
          className: 'el-pagination__editor',
          type: 'number',
          min: 1,
          max: this.props.internalPageCount,
          defaultValue: this.props.internalCurrentPage,
          onBlur: this.handleChange.bind(this),
          onKeyUp: function onKeyUp(e) {
            if (e.keyCode == 13) {
              _this3.handleChange(e);
            }
          },
          onFocus: this.handleFocus.bind(this),
          style: { width: '30px' } }),
        _locale2.default.t('el.pagination.pageClassifier')
      );
    }
  }]);

  return Jumper;
}(_libs.Component);

var Pagination = function (_Component3) {
  _inherits(Pagination, _Component3);

  function Pagination(props, context) {
    _classCallCheck(this, Pagination);

    var _this4 = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props, context));

    var _this4$props = _this4.props,
        currentPage = _this4$props.currentPage,
        pageSizes = _this4$props.pageSizes,
        pageSize = _this4$props.pageSize,
        total = _this4$props.total,
        pageCount = _this4$props.pageCount,
        layout = _this4$props.layout;

    var internalPageSize = 0;
    if (layout.split(',').indexOf('sizes') > -1 && Array.isArray(pageSizes)) {
      internalPageSize = pageSizes.indexOf(pageSize) > -1 ? pageSize : pageSizes[0];
    } else {
      internalPageSize = pageSize;
    }

    _this4.state = {
      internalPageSize: internalPageSize,
      total: total,
      pageCount: pageCount
    };
    _this4.state.internalCurrentPage = currentPage ? _this4.getValidCurrentPage(currentPage) : 1;
    return _this4;
  }

  _createClass(Pagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this5 = this;

      var _props2 = this.props,
          currentPage = _props2.currentPage,
          pageSizes = _props2.pageSizes,
          pageSize = _props2.pageSize,
          total = _props2.total,
          pageCount = _props2.pageCount;


      if (nextProps.currentPage != currentPage || nextProps.pageSizes != pageSizes || nextProps.pageSize != pageSize || nextProps.total != total || nextProps.pageCount != pageCount) {

        var internalPageSize = this.state.internalPageSize;
        if (nextProps.layout.split(',').indexOf('sizes') > -1 && Array.isArray(nextProps.pageSizes)) {
          internalPageSize = nextProps.pageSizes.indexOf(nextProps.pageSize) > -1 ? nextProps.pageSize : nextProps.pageSizes[0];
        }

        this.setState({
          internalPageSize: internalPageSize,
          total: nextProps.total,
          pageCount: nextProps.pageCount
        }, function () {
          _this5.setState({
            internalCurrentPage: nextProps.currentPage ? _this5.getValidCurrentPage(nextProps.currentPage) : 1
          });
        });
      }
    }
  }, {
    key: 'pre',
    value: function pre() {
      var _this6 = this;

      var oldPage = this.state.internalCurrentPage;
      var newVal = this.state.internalCurrentPage - 1;

      this.setState({
        internalCurrentPage: this.getValidCurrentPage(newVal)
      }, function () {
        if (_this6.state.internalCurrentPage !== oldPage) {
          var onCurrentChange = _this6.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this6.state.internalCurrentPage);
        }
      });
    }
  }, {
    key: 'next',
    value: function next() {
      var _this7 = this;

      var oldPage = this.state.internalCurrentPage;
      var newVal = this.state.internalCurrentPage + 1;

      this.setState({
        internalCurrentPage: this.getValidCurrentPage(newVal)
      }, function () {
        if (_this7.state.internalCurrentPage !== oldPage) {
          var onCurrentChange = _this7.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this7.state.internalCurrentPage);
        }
      });
    }
  }, {
    key: 'getValidCurrentPage',
    value: function getValidCurrentPage(value) {
      value = parseInt(value, 10);

      var internalPageCount = this.internalPageCount();

      var havePageCount = typeof internalPageCount === 'number';

      var resetValue = void 0;
      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1;
      } else {
        if (value < 1) {
          resetValue = 1;
        } else if (value > internalPageCount) {
          resetValue = internalPageCount;
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1;
      } else if (resetValue === 0) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    }
  }, {
    key: 'internalPageCount',
    value: function internalPageCount() {
      if (typeof this.state.total === 'number') {
        return Math.ceil(this.state.total / this.state.internalPageSize);
      } else if (typeof this.state.pageCount === 'number') {
        return this.state.pageCount;
      }
      return null;
    }
  }, {
    key: 'jumperToPage',
    value: function jumperToPage(page) {
      var _this8 = this;

      var oldPage = this.state.internalCurrentPage;
      this.setState({
        internalCurrentPage: this.getValidCurrentPage(page)
      }, function () {
        if (oldPage !== _this8.state.internalCurrentPage) {
          var onCurrentChange = _this8.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this8.state.internalCurrentPage);
        }
      });

      //this.oldValue = null;
    }
  }, {
    key: 'handleCurrentChange',
    value: function handleCurrentChange(val) {
      var _this9 = this;

      var oldPage = this.state.internalCurrentPage;
      this.setState({
        internalCurrentPage: this.getValidCurrentPage(val)
      }, function () {
        if (oldPage !== _this9.state.internalCurrentPage) {
          var onCurrentChange = _this9.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this9.state.internalCurrentPage);
        }
      });
    }
  }, {
    key: 'onSizeChange',
    value: function onSizeChange(val) {
      var _this10 = this;

      if (val !== this.state.internalPageSize) {
        val = parseInt(val, 10);

        this.setState({
          internalPageSize: val
        }, function () {
          _this10.setState({
            internalCurrentPage: _this10.getValidCurrentPage(_this10.state.internalCurrentPage)
          });
          var onSizeChange = _this10.props.onSizeChange;

          onSizeChange && onSizeChange(val);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          internalCurrentPage = _state.internalCurrentPage,
          internalPageSize = _state.internalPageSize;


      var className = this.classNames({
        'el-pagination': true,
        'el-pagination__rightwrapper': false,
        'el-pagination--small': this.props.small
      });

      var children = [];
      var layout = this.props.layout || '';

      if (!layout) return null;

      var components = layout.split(',').map(function (item) {
        return item.trim();
      });
      var TEMPLATE_MAP = {
        prev: _react2.default.createElement(Pre, { key: 'pre', internalCurrentPage: internalCurrentPage, prev: this.pre.bind(this) }),
        jumper: _react2.default.createElement(Jumper, {
          key: 'jumper',
          jumper: this.jumperToPage.bind(this),
          internalPageCount: this.internalPageCount(),
          internalCurrentPage: internalCurrentPage }),
        pager: _react2.default.createElement(_Pager2.default, {
          key: 'pager',
          currentPage: internalCurrentPage,
          pageCount: this.internalPageCount(),
          onChange: this.handleCurrentChange.bind(this) }),
        next: _react2.default.createElement(Next, {
          key: 'next',
          internalCurrentPage: internalCurrentPage,
          internalPageCount: this.internalPageCount(),
          next: this.next.bind(this) }),
        sizes: _react2.default.createElement(Sizes, {
          key: 'sizes',
          internalPageSize: internalPageSize,
          pageSizes: this.props.pageSizes,
          onSizeChange: this.onSizeChange.bind(this) }),
        total: _react2.default.createElement(Total, { key: 'total', total: this.state.total })
      };

      components.forEach(function (compo) {
        if (compo !== '->') {
          children.push(TEMPLATE_MAP[compo]);
        }
      });

      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className(className) },
        children
      );
    }
  }]);

  return Pagination;
}(_libs.Component);

var _default = Pagination;
exports.default = _default;


Pagination.propTypes = {
  pageSize: _libs.PropTypes.number,
  small: _libs.PropTypes.bool,
  total: _libs.PropTypes.number,
  pageCount: _libs.PropTypes.number,
  currentPage: _libs.PropTypes.number,
  layout: _libs.PropTypes.string,
  pageSizes: _libs.PropTypes.array,

  //Event
  onCurrentChange: _libs.PropTypes.func,
  onSizeChange: _libs.PropTypes.func
};

Pagination.defaultProps = {
  small: false,
  pageSize: 10,
  currentPage: 1,
  layout: 'prev, pager, next, jumper, ->, total',
  pageSizes: [10, 20, 30, 40, 50, 100]
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Pre, 'Pre', 'src/pagination/Pagination.jsx');

  __REACT_HOT_LOADER__.register(Next, 'Next', 'src/pagination/Pagination.jsx');

  __REACT_HOT_LOADER__.register(Sizes, 'Sizes', 'src/pagination/Pagination.jsx');

  __REACT_HOT_LOADER__.register(Total, 'Total', 'src/pagination/Pagination.jsx');

  __REACT_HOT_LOADER__.register(Jumper, 'Jumper', 'src/pagination/Pagination.jsx');

  __REACT_HOT_LOADER__.register(Pagination, 'Pagination', 'src/pagination/Pagination.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/pagination/Pagination.jsx');
}();

;