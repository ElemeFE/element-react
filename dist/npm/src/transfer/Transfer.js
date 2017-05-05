'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _TransferPanel = require('./TransferPanel');

var _TransferPanel2 = _interopRequireDefault(_TransferPanel);

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transfer = function (_Component) {
  _inherits(Transfer, _Component);

  function Transfer(props) {
    _classCallCheck(this, Transfer);

    var _this = _possibleConstructorReturn(this, (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).call(this, props));

    _this.onSourceCheckedChange = function () {
      return _this.__onSourceCheckedChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onTargetCheckedChange = function () {
      return _this.__onTargetCheckedChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.addToLeft = function () {
      return _this.__addToLeft__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.addToRight = function () {
      return _this.__addToRight__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.state = {
      leftChecked: [],
      rightChecked: []
    };
    return _this;
  }

  _createClass(Transfer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          leftDefaultChecked = _props.leftDefaultChecked,
          rightDefaultChecked = _props.rightDefaultChecked;

      if (leftDefaultChecked.length) {
        this.setState({ leftChecked: leftDefaultChecked });
      }
      if (rightDefaultChecked.length) {
        this.setState({ rightChecked: rightDefaultChecked });
      }
    }
  }, {
    key: '__onSourceCheckedChange__REACT_HOT_LOADER__',
    value: function __onSourceCheckedChange__REACT_HOT_LOADER__(val) {
      this.setState({ leftChecked: val });
    }
  }, {
    key: '__onTargetCheckedChange__REACT_HOT_LOADER__',
    value: function __onTargetCheckedChange__REACT_HOT_LOADER__(val) {
      this.setState({ rightChecked: val });
    }
  }, {
    key: '__addToLeft__REACT_HOT_LOADER__',
    value: function __addToLeft__REACT_HOT_LOADER__() {
      var _this2 = this;

      var value = this.props.value;
      var rightChecked = this.state.rightChecked;

      var currentValue = value.slice();
      rightChecked.forEach(function (item) {
        var index = currentValue.indexOf(item);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });
      this.setState({ rightChecked: [] }, function () {
        return _this2.props.onChange(currentValue, 'left', rightChecked);
      });
    }
  }, {
    key: '__addToRight__REACT_HOT_LOADER__',
    value: function __addToRight__REACT_HOT_LOADER__() {
      var _this3 = this;

      var value = this.props.value;
      var leftChecked = this.state.leftChecked;

      var currentValue = value.slice();
      leftChecked.forEach(function (item) {
        if (!value.includes(item)) {
          currentValue = currentValue.concat(item);
        }
      });
      this.setState({ leftChecked: [] }, function () {
        return _this3.props.onChange(currentValue, 'right', leftChecked);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          filterPlaceholder = _props2.filterPlaceholder,
          titles = _props2.titles,
          buttonTexts = _props2.buttonTexts,
          propsAlias = _props2.propsAlias,
          filterable = _props2.filterable,
          filterMethod = _props2.filterMethod,
          footerFormat = _props2.footerFormat,
          leftFooter = _props2.leftFooter,
          rightFooter = _props2.rightFooter,
          renderContent = _props2.renderContent;
      var _state = this.state,
          leftChecked = _state.leftChecked,
          rightChecked = _state.rightChecked;


      return _react2.default.createElement(
        'div',
        { className: 'el-transfer' },
        _react2.default.createElement(
          _TransferPanel2.default,
          {
            propsAlias: propsAlias,
            data: this.sourceData,
            title: titles[0] || _locale2.default.t('el.transfer.titles.0'),
            checked: leftChecked,
            filterable: filterable,
            filterMethod: filterMethod,
            footerFormat: footerFormat,
            renderContent: renderContent,
            placeholder: filterPlaceholder || _locale2.default.t('el.transfer.filterPlaceholder'),
            onChange: this.onSourceCheckedChange
          },
          leftFooter
        ),
        _react2.default.createElement(
          'div',
          { className: 'el-transfer__buttons' },
          _react2.default.createElement(
            _button2.default,
            {
              type: 'primary',
              size: 'small',
              onClick: this.addToLeft,
              disabled: rightChecked.length === 0
            },
            _react2.default.createElement('i', { className: 'el-icon-arrow-left' }),
            buttonTexts[0] !== undefined && _react2.default.createElement(
              'span',
              null,
              buttonTexts[0]
            )
          ),
          _react2.default.createElement(
            _button2.default,
            {
              type: 'primary',
              size: 'small',
              onClick: this.addToRight,
              disabled: leftChecked.length === 0
            },
            buttonTexts[1] !== undefined && _react2.default.createElement(
              'span',
              null,
              buttonTexts[1]
            ),
            _react2.default.createElement('i', { className: 'el-icon-arrow-right' })
          )
        ),
        _react2.default.createElement(
          _TransferPanel2.default,
          {
            propsAlias: propsAlias,
            data: this.targetData,
            title: titles[1] || _locale2.default.t('el.transfer.titles.1'),
            checked: rightChecked,
            filterable: filterable,
            filterMethod: filterMethod,
            footerFormat: footerFormat,
            renderContent: renderContent,
            placeholder: filterPlaceholder || _locale2.default.t('el.transfer.filterPlaceholder'),
            onChange: this.onTargetCheckedChange
          },
          rightFooter
        )
      );
    }
  }, {
    key: 'sourceData',
    get: function get() {
      var _props3 = this.props,
          data = _props3.data,
          value = _props3.value,
          propsAlias = _props3.propsAlias;

      return data.filter(function (item) {
        return !value.includes(item[propsAlias.key]);
      });
    }
  }, {
    key: 'targetData',
    get: function get() {
      var _props4 = this.props,
          data = _props4.data,
          value = _props4.value,
          propsAlias = _props4.propsAlias;

      return data.filter(function (item) {
        return value.includes(item[propsAlias.key]);
      });
    }
  }]);

  return Transfer;
}(_libs.Component);

Transfer.propTypes = {
  data: _libs.PropTypes.array,
  titles: _libs.PropTypes.array,
  buttonTexts: _libs.PropTypes.array,
  filterPlaceholder: _libs.PropTypes.string,
  filterMethod: _libs.PropTypes.func,
  leftDefaultChecked: _libs.PropTypes.array,
  rightDefaultChecked: _libs.PropTypes.array,
  renderContent: _libs.PropTypes.func,
  value: _libs.PropTypes.array,
  footerFormat: _libs.PropTypes.object,
  filterable: _libs.PropTypes.bool,
  propsAlias: _libs.PropTypes.object,
  onChange: _libs.PropTypes.func,
  leftFooter: _libs.PropTypes.node,
  rightFooter: _libs.PropTypes.node
};
Transfer.defaultProps = {
  data: [],
  titles: [],
  buttonTexts: [],
  filterPlaceholder: '',
  leftDefaultChecked: [],
  rightDefaultChecked: [],
  value: [],
  footerFormat: {},
  propsAlias: {
    label: 'label',
    key: 'key',
    disabled: 'disabled'
  },
  onChange: function onChange() {}
};
var _default = Transfer;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Transfer, 'Transfer', 'src/transfer/Transfer.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/transfer/Transfer.jsx');
}();

;