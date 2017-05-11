'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransferPanel = function (_Component) {
  _inherits(TransferPanel, _Component);

  function TransferPanel(props) {
    _classCallCheck(this, TransferPanel);

    var _this = _possibleConstructorReturn(this, (TransferPanel.__proto__ || Object.getPrototypeOf(TransferPanel)).call(this, props));

    _this.handleMouseEnter = function () {
      return _this.__handleMouseEnter__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleMouseLeave = function () {
      return _this.__handleMouseLeave__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.clearQuery = function () {
      return _this.__clearQuery__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleAllCheckedChange = function () {
      return _this.__handleAllCheckedChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleCheckedChange = function () {
      return _this.__handleCheckedChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleInputChange = function () {
      return _this.__handleInputChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.state = {
      query: '',
      inputHover: false
    };
    return _this;
  }

  _createClass(TransferPanel, [{
    key: '__handleMouseEnter__REACT_HOT_LOADER__',
    value: function __handleMouseEnter__REACT_HOT_LOADER__() {
      return this.setState({ inputHover: true });
    }
  }, {
    key: '__handleMouseLeave__REACT_HOT_LOADER__',
    value: function __handleMouseLeave__REACT_HOT_LOADER__() {
      return this.setState({ inputHover: false });
    }
  }, {
    key: '__clearQuery__REACT_HOT_LOADER__',
    value: function __clearQuery__REACT_HOT_LOADER__() {
      if (this.inputIcon === 'circle-close') {
        this.setState({ query: '' });
      }
    }
  }, {
    key: '__handleAllCheckedChange__REACT_HOT_LOADER__',
    value: function __handleAllCheckedChange__REACT_HOT_LOADER__(ischecked) {
      var _this2 = this;

      var checked = ischecked ? this.checkableData.map(function (item) {
        return item[_this2.keyProp];
      }) : [];
      this.props.onChange(checked);
    }
  }, {
    key: '__handleCheckedChange__REACT_HOT_LOADER__',
    value: function __handleCheckedChange__REACT_HOT_LOADER__(value) {
      this.props.onChange(value);
    }
  }, {
    key: '__handleInputChange__REACT_HOT_LOADER__',
    value: function __handleInputChange__REACT_HOT_LOADER__(value) {
      this.setState({ query: value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          filterable = _props.filterable,
          title = _props.title,
          data = _props.data,
          renderContent = _props.renderContent,
          checked = _props.checked,
          placeholder = _props.placeholder;
      var query = this.state.query;

      return _react2.default.createElement(
        'div',
        { className: 'el-transfer-panel' },
        _react2.default.createElement(
          'p',
          { className: 'el-transfer-panel__header' },
          title
        ),
        _react2.default.createElement(
          'div',
          { className: 'el-transfer-panel__body' },
          filterable && _react2.default.createElement(_input2.default, {
            className: 'el-transfer-panel__filter',
            value: query,
            size: 'small',
            placeholder: placeholder,
            icon: this.inputIcon,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onIconClick: this.clearQuery,
            onChange: this.handleInputChange
          }),
          _react2.default.createElement(
            _libs.View,
            { show: !this.hasNoMatch && data.length > 0 },
            _react2.default.createElement(
              _checkbox2.default.Group,
              {
                value: checked,
                'v-show': '',
                className: this.classNames({
                  'is-filterable': filterable,
                  'el-transfer-panel__list': true
                }),
                onChange: this.handleCheckedChange
              },
              this.filteredData.map(function (item, index) {
                return _react2.default.createElement(
                  _checkbox2.default,
                  {
                    className: 'el-transfer-panel__item',
                    label: item[_this3.labelProp],
                    disabled: item[_this3.disabledProp],
                    value: item[_this3.keyProp],
                    key: index
                  },
                  _react2.default.createElement(OptionContent, {
                    option: item,
                    renderContent: renderContent,
                    labelProp: _this3.labelProp,
                    keyProp: _this3.keyProp
                  })
                );
              })
            )
          ),
          _react2.default.createElement(
            _libs.View,
            { show: this.hasNoMatch },
            _react2.default.createElement(
              'p',
              { className: 'el-transfer-panel__empty' },
              _locale2.default.t('el.transfer.noMatch')
            )
          ),
          _react2.default.createElement(
            _libs.View,
            { show: data.length === 0 && !this.hasNoMatch },
            _react2.default.createElement(
              'p',
              { className: 'el-transfer-panel__empty' },
              _locale2.default.t('el.transfer.noData')
            )
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'el-transfer-panel__footer' },
          _react2.default.createElement(
            _checkbox2.default,
            {
              checked: this.allChecked,
              onChange: this.handleAllCheckedChange,
              indeterminate: this.isIndeterminate
            },
            this.checkedSummary
          ),
          this.props.children
        )
      );
    }
  }, {
    key: 'allChecked',
    get: function get() {
      var _this4 = this;

      var checkableDataKeys = this.checkableData.map(function (item) {
        return item[_this4.keyProp];
      });
      return checkableDataKeys.length > 0 && checkableDataKeys.every(function (item) {
        return _this4.props.checked.includes(item);
      });
    }
  }, {
    key: 'filteredData',
    get: function get() {
      var _this5 = this;

      return this.props.data.filter(function (item) {
        if (typeof _this5.props.filterMethod === 'function') {
          return _this5.props.filterMethod(_this5.state.query, item);
        } else {
          var label = item[_this5.labelProp] || item[_this5.keyProp].toString();
          return label.toLowerCase().includes(_this5.state.query.toLowerCase());
        }
      });
    }
  }, {
    key: 'checkableData',
    get: function get() {
      var _this6 = this;

      return this.filteredData.filter(function (item) {
        return !item[_this6.disabledProp];
      });
    }
  }, {
    key: 'checkedSummary',
    get: function get() {
      var checkedLength = this.props.checked.length;
      var dataLength = this.props.data.length;
      var _props$footerFormat = this.props.footerFormat,
          noChecked = _props$footerFormat.noChecked,
          hasChecked = _props$footerFormat.hasChecked;

      if (noChecked && hasChecked) {
        return checkedLength > 0 ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength) : noChecked.replace(/\${total}/g, dataLength);
      } else {
        return checkedLength > 0 ? _locale2.default.t('el.transfer.hasCheckedFormat', {
          total: dataLength,
          checked: checkedLength
        }) : _locale2.default.t('el.transfer.noCheckedFormat', { total: dataLength });
      }
    }
  }, {
    key: 'isIndeterminate',
    get: function get() {
      var checkedLength = this.props.checked.length;
      return checkedLength > 0 && checkedLength < this.checkableData.length;
    }
  }, {
    key: 'hasNoMatch',
    get: function get() {
      var query = this.state.query;

      return query.length > 0 && this.filteredData.length === 0;
    }
  }, {
    key: 'inputIcon',
    get: function get() {
      var _state = this.state,
          query = _state.query,
          inputHover = _state.inputHover;

      return query.length > 0 && inputHover ? 'circle-close' : 'search';
    }
  }, {
    key: 'labelProp',
    get: function get() {
      return this.props.propsAlias.label;
    }
  }, {
    key: 'keyProp',
    get: function get() {
      return this.props.propsAlias.key;
    }
  }, {
    key: 'disabledProp',
    get: function get() {
      return this.props.propsAlias.disabled;
    }
  }]);

  return TransferPanel;
}(_libs.Component);

TransferPanel.propTypes = {
  data: _libs.PropTypes.array,
  renderContent: _libs.PropTypes.func,
  placeholder: _libs.PropTypes.string,
  title: _libs.PropTypes.string,
  filterable: _libs.PropTypes.bool,
  footerFormat: _libs.PropTypes.object,
  filterMethod: _libs.PropTypes.func,
  propsAlias: _libs.PropTypes.object,
  onChange: _libs.PropTypes.func,
  checked: _libs.PropTypes.array
};
TransferPanel.defaultProps = {
  data: [],
  footerFormat: {},
  propsAlias: {},
  onChange: function onChange() {}
};
var _default = TransferPanel;
exports.default = _default;


var OptionContent = function OptionContent(_ref) {
  var option = _ref.option,
      renderContent = _ref.renderContent,
      labelProp = _ref.labelProp,
      keyProp = _ref.keyProp;

  return renderContent ? renderContent(option) : _react2.default.createElement(
    'span',
    null,
    option[labelProp] || option[keyProp]
  );
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TransferPanel, 'TransferPanel', 'src/transfer/TransferPanel.jsx');

  __REACT_HOT_LOADER__.register(OptionContent, 'OptionContent', 'src/transfer/TransferPanel.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/transfer/TransferPanel.jsx');
}();

;