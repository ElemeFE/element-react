'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _libs = require('../../libs');

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter(props, context) {
    _classCallCheck(this, Filter);

    var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props, context));

    _this.state = {
      visible: _this.props.visible,
      defaultStyle: { position: 'absolute', transformOrigin: 'center top 0px', zIndex: 2000 },
      checked: props.defaultCondi ? props.defaultCondi : []
    };
    return _this;
  }

  _createClass(Filter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var rootEl = this.refs.root;
      var position = this.props.position;
      var style = rootEl.style;


      style.left = position.x - this.refs.root.offsetWidth + 'px';
      style.top = position.y + 'px';
      rootEl.className = this.classNames(rootEl.className, 'md-fade-center-enter');
      setTimeout(function () {
        rootEl.className = _this2.classNames(rootEl.className, 'md-fade-bottom-enter-active');
      }, 0);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.visible != this.props.visible && !nextProps.visible) {
        this.close();
      }
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(e) {
      if (e.target.className.indexOf('el-icon-arrow-down') > -1) return;
      this.close();
    }
  }, {
    key: 'close',
    value: function close() {
      var _props = this.props,
          ower = _props.ower,
          onClose = _props.onClose;

      var rootEl = this.refs.root;
      rootEl.className = this.classNames('el-table-filter', 'md-fade-bottom-leave-active');
      setTimeout(function () {
        _reactDom2.default.unmountComponentAtNode(ower.filterContainer);
      }, 300);

      onClose && onClose();
    }
  }, {
    key: 'onFilterChange',
    value: function onFilterChange(checkedValues) {
      this.setState({
        checked: checkedValues
      });
    }
  }, {
    key: 'filterAction',
    value: function filterAction() {
      var onFilter = this.props.onFilter;
      var checked = this.state.checked;


      onFilter && onFilter(checked);
      this.close();
    }
  }, {
    key: 'resetFilter',
    value: function resetFilter() {
      var onFilter = this.props.onFilter;


      this.setState({
        checked: []
      });

      onFilter && onFilter([]);
      this.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          filters = _props2.filters,
          defaultCondi = _props2.defaultCondi;
      var _state = this.state,
          defaultStyle = _state.defaultStyle,
          checked = _state.checked;


      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: this.classNames('el-table-filter'),
          style: defaultStyle },
        _react2.default.createElement(
          'div',
          { className: 'el-table-filter__content' },
          _react2.default.createElement(
            _checkbox2.default.Group,
            {
              options: defaultCondi ? defaultCondi : [],
              onChange: function onChange(opts) {
                _this3.onFilterChange(opts);
              },
              className: 'el-table-filter__checkbox-group' },
            filters.map(function (item, idx) {
              return _react2.default.createElement(_checkbox2.default, {
                value: item,
                key: idx,
                label: item.text });
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'el-table-filter__bottom' },
          _react2.default.createElement(
            'button',
            {
              onClick: function onClick() {
                _this3.filterAction();
              },
              disabled: !checked.length,
              className: !checked.length ? 'is-disabled' : '' },
            '\u7B5B\u9009'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                _this3.resetFilter();
              } },
            '\u91CD\u7F6E'
          )
        )
      );
    }
  }]);

  return Filter;
}(_libs.Component);

;

Filter.propTypes = {
  filters: _libs.PropTypes.array,
  onFilter: _libs.PropTypes.func
};

Filter.defaultProps = {
  filters: [],
  onFilter: function onFilter() {}
};

Filter.contextTypes = {
  $owerTable: _libs.PropTypes.object
};

var _default = (0, _reactClickOutside2.default)(Filter);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Filter, 'Filter', 'src/table/filter.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/table/filter.jsx');
}();

;