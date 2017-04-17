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

var _debounce = require('throttle-debounce/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _popper = require('../../libs/utils/popper');

var _popper2 = _interopRequireDefault(_popper);

var _libs = require('../../libs');

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cascader = function (_Component) {
  _inherits(Cascader, _Component);

  function Cascader(props) {
    _classCallCheck(this, Cascader);

    var _this = _possibleConstructorReturn(this, (Cascader.__proto__ || Object.getPrototypeOf(Cascader)).call(this, props));

    _this.state = {
      currentValue: props.value,
      menu: null,
      menuVisible: false,
      inputHover: false,
      inputValue: '',
      flatOptions: _this.flattenOptions(props.options)
    };

    _this.debouncedInputChange = (0, _debounce2.default)(props.debounce, function () {
      _this.handleInputChange(_this.state.inputValue);
    });
    return _this;
  }

  _createClass(Cascader, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.input = _reactDom2.default.findDOMNode(this.refs.input);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        currentValue: props.value,
        flatOptions: this.flattenOptions(props.options)
      });

      this.state.menu.setState({
        options: props.options
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      var menuVisible = this.state.menuVisible;


      if (menuVisible != state.menuVisible) {
        if (menuVisible) {
          this.showMenu();

          if (this.popperJS) {
            this.popperJS.update();
          } else {
            this.popperJS = new _popper2.default(this.input, this.refs.menu, {
              gpuAcceleration: false
            });
          }
        } else {
          this.hideMenu();

          if (this.popperJS) {
            this.popperJS.destroy();
          }

          delete this.popperJS;
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.popperJS) {
        this.popperJS.destroy();
      }
    }
  }, {
    key: 'placeholder',
    value: function placeholder() {
      return this.props.placeholder || _locale2.default.t('el.cascader.placeholder');
    }
  }, {
    key: 'updatePopper',
    value: function updatePopper() {
      if (this.popperJS) {
        this.popperJS.update();
      }
    }
  }, {
    key: 'initMenu',
    value: function initMenu(menu) {
      this.state.menu = menu;
    }
  }, {
    key: 'showMenu',
    value: function showMenu() {
      this.state.menu.setState({
        value: this.state.currentValue.slice(0),
        visible: true,
        options: this.props.options,
        inputWidth: this.input.offsetWidth - 2
      });
    }
  }, {
    key: 'hideMenu',
    value: function hideMenu() {
      this.setState({ inputValue: '' });

      if (this.state.menu) {
        this.state.menu.setState({ visible: false });
      }
    }
  }, {
    key: 'handleActiveItemChange',
    value: function handleActiveItemChange(value) {
      this.updatePopper();

      if (this.props.activeItemChange) {
        this.props.activeItemChange(value);
      }
    }
  }, {
    key: 'handlePick',
    value: function handlePick(value) {
      var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this.setState({
        currentValue: value
      });

      if (close) {
        this.setState({ menuVisible: false });
      }

      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(value) {
      var _this2 = this;

      if (!this.state.menuVisible) return;

      var flatOptions = this.state.flatOptions;

      if (!value) {
        this.state.menu.setState({
          options: this.props.options
        });
        return;
      }

      var filteredFlatOptions = flatOptions.filter(function (optionsStack) {
        return optionsStack.some(function (option) {
          return new RegExp(value, 'i').test(option[_this2.labelKey()]);
        });
      });

      if (filteredFlatOptions.length > 0) {
        filteredFlatOptions = filteredFlatOptions.map(function (optionStack) {
          return {
            __IS__FLAT__OPTIONS: true,
            value: optionStack.map(function (item) {
              return item[_this2.valueKey()];
            }),
            label: _this2.renderFilteredOptionLabel(value, optionStack)
          };
        });
      } else {
        filteredFlatOptions = [{
          __IS__FLAT__OPTIONS: true,
          label: _locale2.default.t('el.cascader.noMatch'),
          value: '',
          disabled: true
        }];
      }

      this.state.menu.setState({
        options: filteredFlatOptions
      });
    }
  }, {
    key: 'renderFilteredOptionLabel',
    value: function renderFilteredOptionLabel(inputValue, optionsStack) {
      var _this3 = this;

      return optionsStack.map(function (option, index) {
        var label = option[_this3.labelKey()];
        var keywordIndex = label.toLowerCase().indexOf(inputValue.toLowerCase());
        var labelPart = label.slice(keywordIndex, inputValue.length + keywordIndex);
        var node = keywordIndex > -1 ? _this3.highlightKeyword(label, labelPart) : label;
        return index === 0 ? node : [' / ', node];
      });
    }
  }, {
    key: 'highlightKeyword',
    value: function highlightKeyword(label, keyword) {
      return label.split(keyword).map(function (node, index) {
        return index === 0 ? node : [_react2.default.createElement(
          'span',
          { className: 'el-cascader-menu__item__keyword' },
          keyword
        ), node];
      });
    }
  }, {
    key: 'flattenOptions',
    value: function flattenOptions(options) {
      var _this4 = this;

      var ancestor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var flatOptions = [];

      options.forEach(function (option) {
        var optionsStack = ancestor.concat(option);
        if (!option[_this4.childrenKey()]) {
          flatOptions.push(optionsStack);
        } else {
          if (_this4.changeOnSelect) {
            flatOptions.push(optionsStack);
          }
          flatOptions = flatOptions.concat(_this4.flattenOptions(option[_this4.childrenKey()], optionsStack));
        }
      });

      return flatOptions;
    }
  }, {
    key: 'clearValue',
    value: function clearValue(e) {
      e.stopPropagation();

      this.handlePick([], true);
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      if (this.state.menuVisible) {
        this.setState({ menuVisible: false });
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      if (this.props.disabled) return;

      if (this.filterable) {
        this.setState({
          menuVisible: true
        });
        return;
      }

      this.setState({
        menuVisible: !this.state.menuVisible
      });
    }

    /* Computed Methods */

  }, {
    key: 'labelKey',
    value: function labelKey() {
      return this.props.props.label || 'label';
    }
  }, {
    key: 'valueKey',
    value: function valueKey() {
      return this.props.props.value || 'value';
    }
  }, {
    key: 'childrenKey',
    value: function childrenKey() {
      return this.props.props.children || 'children';
    }
  }, {
    key: 'currentLabels',
    value: function currentLabels() {
      var _this5 = this;

      var options = this.props.options;
      var labels = [];

      this.state.currentValue.forEach(function (value) {
        var targetOption = options && options.filter(function (option) {
          return option[_this5.valueKey()] === value;
        })[0];

        if (targetOption) {
          labels.push(targetOption[_this5.labelKey()]);
          options = targetOption[_this5.childrenKey()];
        }
      });

      return labels;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props = this.props,
          size = _props.size,
          disabled = _props.disabled,
          filterable = _props.filterable,
          clearable = _props.clearable,
          showAllLevels = _props.showAllLevels;
      var _state = this.state,
          menuVisible = _state.menuVisible,
          inputHover = _state.inputHover,
          inputValue = _state.inputValue;

      var currentLabels = this.currentLabels();

      return _react2.default.createElement(
        'span',
        { ref: 'reference', className: this.className('el-cascader', size ? 'el-cascader--' + size : '', {
            'is-opened': menuVisible,
            'is-disabled': disabled
          }) },
        _react2.default.createElement(
          'span',
          {
            onClick: this.handleClick.bind(this),
            onMouseEnter: function onMouseEnter() {
              _this6.setState({ inputHover: true });
            },
            onMouseLeave: function onMouseLeave() {
              _this6.setState({ inputHover: false });
            }
          },
          _react2.default.createElement(_input2.default, {
            ref: 'input',
            readOnly: !filterable,
            placeholder: currentLabels.length ? undefined : this.placeholder(),
            value: inputValue,
            onChange: function onChange(value) {
              _this6.setState({ inputValue: value });
            },
            onKeyUp: this.debouncedInputChange.bind(this),
            size: size,
            disabled: disabled,
            icon: clearable && inputHover && currentLabels.length ? _react2.default.createElement('i', {
              className: 'el-input__icon el-icon-circle-close el-cascader__clearIcon',
              onClick: this.clearValue.bind(this)
            }) : _react2.default.createElement('i', {
              className: this.classNames('el-input__icon el-icon-caret-bottom', {
                'is-reverse': menuVisible
              })
            })
          }),
          _react2.default.createElement(
            _libs.View,
            { show: inputValue === '' },
            _react2.default.createElement(
              'span',
              { className: 'el-cascader__label' },
              showAllLevels ? currentLabels.map(function (label, index) {
                return _react2.default.createElement(
                  'span',
                  { key: index },
                  label,
                  index < currentLabels.length - 1 && _react2.default.createElement(
                    'span',
                    null,
                    ' / '
                  )
                );
              }) : currentLabels[currentLabels.length - 1]
            )
          )
        ),
        _react2.default.createElement(_Menu2.default, { ref: 'menu' })
      );
    }
  }]);

  return Cascader;
}(_libs.Component);

Cascader.childContextTypes = {
  component: _libs.PropTypes.any
};

Cascader.propTypes = {
  options: _libs.PropTypes.array.isRequired,
  props: _libs.PropTypes.object,
  value: _libs.PropTypes.array,
  placeholder: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  clearable: _libs.PropTypes.bool,
  changeOnSelect: _libs.PropTypes.bool,
  popperClass: _libs.PropTypes.string,
  expandTrigger: _libs.PropTypes.string,
  filterable: _libs.PropTypes.bool,
  size: _libs.PropTypes.string,
  showAllLevels: _libs.PropTypes.bool,
  debounce: _libs.PropTypes.number,
  activeItemChange: _libs.PropTypes.func,
  onChange: _libs.PropTypes.func
};

Cascader.defaultProps = {
  value: [],
  clearable: false,
  expandTrigger: 'click',
  showAllLevels: true,
  debounce: 300,
  props: {
    children: 'children',
    label: 'label',
    value: 'value',
    disabled: 'disabled'
  }
};

var _default = (0, _reactClickOutside2.default)(Cascader);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Cascader, 'Cascader', 'src/cascader/Cascader.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/cascader/Cascader.jsx');
}();

;