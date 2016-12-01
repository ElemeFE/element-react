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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pager = function (_Component) {
  _inherits(Pager, _Component);

  function Pager(props, context) {
    _classCallCheck(this, Pager);

    var _this = _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).call(this, props, context));

    _this.state = {
      internalCurrentPage: 1,
      internalPageSize: 0,

      quickprevIconClass: 'el-icon-more',
      quicknextIconClass: 'el-icon-more',
      showPrevMore: false,
      showNextMore: false
    };
    return _this;
  }

  _createClass(Pager, [{
    key: 'onPagerClick',
    value: function onPagerClick(e) {
      var target = e.target;

      if (target.tagName === 'UL') {
        return;
      }
      var newPage = Number(e.target.textContent);
      var pageCount = this.props.pageCount;
      var currentPage = this.props.currentPage;

      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quickprev') !== -1) {
          newPage = currentPage - 5;
        } else if (target.className.indexOf('quicknext') !== -1) {
          newPage = currentPage + 5;
        }
      }
      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }
        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }

      if (newPage !== currentPage) {
        this.props.onChange(newPage);
      }
    }
  }, {
    key: 'getPages',
    value: function getPages() {

      var pagerCount = 7;
      var currentPage = Number(this.props.currentPage);
      var pageCount = Number(this.props.pageCount);

      var showPrevMore = false;
      var showNextMore = false;

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - 2) {
          showPrevMore = true;
        }
        if (currentPage < pageCount - 2) {
          showNextMore = true;
        }
      }

      var array = [];

      if (showPrevMore && !showNextMore) {
        var startPage = pageCount - (pagerCount - 2);
        for (var i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (var _i = 2; _i < pagerCount; _i++) {
          array.push(_i);
        }
      } else if (showPrevMore && showNextMore) {
        var offset = Math.floor(pagerCount / 2) - 1;
        for (var _i2 = currentPage - offset; _i2 <= currentPage + offset; _i2++) {
          array.push(_i2);
        }
      } else {
        for (var _i3 = 2; _i3 < pageCount; _i3++) {
          array.push(_i3);
        }
      }

      this.state.showPrevMore = showPrevMore;
      this.state.showNextMore = showNextMore;
      this.state.quickprevIconClass = showPrevMore ? this.state.quickprevIconClass : 'el-icon-more';
      this.state.quicknextIconClass = showNextMore ? this.state.quicknextIconClass : 'el-icon-more';

      return array;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          currentPage = _props.currentPage,
          pageCount = _props.pageCount;
      var _state = this.state,
          quickprevIconClass = _state.quickprevIconClass,
          quicknextIconClass = _state.quicknextIconClass,
          showPrevMore = _state.showPrevMore,
          showNextMore = _state.showNextMore;


      var pagers = this.getPages();

      return _react2.default.createElement(
        'ul',
        { onClick: this.onPagerClick.bind(this), className: 'el-pager' },
        pageCount > 0 && _react2.default.createElement(
          'li',
          { className: this.classNames('number', { active: currentPage === 1 }) },
          '1'
        ),
        showPrevMore && _react2.default.createElement('li', {
          className: this.classNames("el-icon more btn-quickprev", quickprevIconClass),
          onMouseEnter: function onMouseEnter() {
            _this2.setState({ quickprevIconClass: 'el-icon-d-arrow-left' });
          },
          onMouseLeave: function onMouseLeave() {
            _this2.setState({ quickprevIconClass: 'el-icon-more' });
          } }),
        pagers.map(function (pager, idx) {
          return _react2.default.createElement(
            'li',
            { key: idx, className: _this2.classNames('number', { active: currentPage === pager }) },
            pager
          );
        }),
        showNextMore && _react2.default.createElement('li', {
          className: this.classNames("el-icon more btn-quicknext", quicknextIconClass),
          onMouseEnter: function onMouseEnter() {
            _this2.setState({ quicknextIconClass: 'el-icon-d-arrow-right' });
          },
          onMouseLeave: function onMouseLeave() {
            _this2.setState({ quicknextIconClass: 'el-icon-more' });
          } }),
        pageCount > 1 && _react2.default.createElement(
          'li',
          { className: this.classNames('number', { active: currentPage === pageCount }) },
          pageCount
        )
      );
    }
  }]);

  return Pager;
}(_libs.Component);

var _default = Pager;
exports.default = _default;


Pager.propTypes = {
  currentPage: _libs.PropTypes.number,
  pageCount: _libs.PropTypes.number
};

Pager.defaultProps = {};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Pager, 'Pager', 'src/pagination/Pager.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/pagination/Pager.jsx');
}();

;