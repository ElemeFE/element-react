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

var _internal = require('../../libs/internal');

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _constants = require('./constants');

var _utils = require('../../libs/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
todo:
  handle animation popup
*/

var idGen = new _utils.IDGenerator();
var haveTriggerType = function haveTriggerType(type) {
  return _constants.HAVE_TRIGGER_TYPES.indexOf(type) !== -1;
};

var isValidValue = function isValidValue(value) {
  if (value instanceof Date) return true;
  if (Array.isArray(value) && value.length !== 0 && value[0] instanceof Date) return true;
  return false;
};

var BasePicker = function (_Component) {
  _inherits(BasePicker, _Component);

  _createClass(BasePicker, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        align: _libs.PropTypes.oneOf(['left', 'center', 'right']),
        format: _libs.PropTypes.string,
        isShowTrigger: _libs.PropTypes.bool,
        isReadOnly: _libs.PropTypes.bool,
        isDisabled: _libs.PropTypes.bool,
        placeholder: _libs.PropTypes.string,
        onFocus: _libs.PropTypes.func,
        onBlur: _libs.PropTypes.func,
        // (Date|Date[]|null)=>(), null when click on clear icon
        onChange: _libs.PropTypes.func,
        // time select pannel:
        value: _libs.PropTypes.oneOfType([_libs.PropTypes.instanceOf(Date), _libs.PropTypes.arrayOf(_libs.PropTypes.instanceOf(Date))])
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        value: new Date(),
        // (thisReactElement)=>Unit
        onFocus: function onFocus() {},
        onBlur: function onBlur() {}
      };
    }
  }]);

  function BasePicker(props, type) {
    var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, BasePicker);

    (0, _utils.require_condition)(typeof type === 'string');

    var _this = _possibleConstructorReturn(this, (BasePicker.__proto__ || Object.getPrototypeOf(BasePicker)).call(this, props));

    _this.type = type; // type need to be set first
    _this.state = Object.assign({}, state, {
      pickerVisible: false
    }, _this.propsToState(props));

    _this.clickOutsideId = 'clickOutsideId_' + idGen.next();
    return _this;
  }

  _createClass(BasePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.propsToState(nextProps));
    }

    /**
     * onPicked should only be called from picker pannel instance
     * and should never return a null date instance
     *
     * @param value: Date|Date[]|null
     * @param isKeepPannel: boolean = false
     */

  }, {
    key: 'onPicked',
    value: function onPicked(value) {
      var isKeepPannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      //only change input value on picked triggered
      (0, _utils.require_condition)(isValidValue(value));
      this.setState({
        pickerVisible: isKeepPannel,
        value: value,
        text: this.dateToStr(value)
      });
      this.props.onChange(value);
    }

    // (date: Date|null)=>string

  }, {
    key: 'dateToStr',
    value: function dateToStr(date) {
      if (!date) return '';
      (0, _utils.require_condition)(isValidValue(date));

      var tdate = date;
      var formatter = (_constants.TYPE_VALUE_RESOLVER_MAP[this.type] || _constants.TYPE_VALUE_RESOLVER_MAP['default']).formatter;
      var result = formatter(tdate, this.getFormat());

      return result;
    }

    // (string) => Date | null

  }, {
    key: 'parseDate',
    value: function parseDate(dateStr) {
      if (!dateStr) return null;
      var type = this.type;
      var parser = (_constants.TYPE_VALUE_RESOLVER_MAP[type] || _constants.TYPE_VALUE_RESOLVER_MAP['default']).parser;
      return parser(dateStr, this.getFormat());
    }
  }, {
    key: 'getFormat',
    value: function getFormat() {
      return this.props.format || _constants.DEFAULT_FORMATS[this.type];
    }
  }, {
    key: 'propsToState',
    value: function propsToState(props) {
      var state = {};
      if (this.isDateValid(props.value)) {
        state.text = this.dateToStr(props.value);
        state.value = props.value;
      } else {
        state.text = '';
        state.value = null;
      }

      if (state.value == null) {
        state.value = new Date();
      }

      return state;
    }
  }, {
    key: 'triggerClass',
    value: function triggerClass() {
      return this.type.includes('time') ? 'el-icon-time' : 'el-icon-date';
    }
  }, {
    key: 'calcIsShowTrigger',
    value: function calcIsShowTrigger() {
      if (this.props.isShowTrigger != null) {
        return !!this.props.isShowTrigger;
      } else {
        return haveTriggerType(this.type);
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      var _this2 = this;

      this.isInputFocus = true;
      if (haveTriggerType(this.type) && !this.state.pickerVisible) {
        this.setState({ pickerVisible: true }, function () {
          _this2.props.onFocus(_this2);
        });
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.isInputFocus = false;
      this.props.onBlur(this);
    }
  }, {
    key: 'handleKeydown',
    value: function handleKeydown(evt) {
      var keyCode = evt.keyCode;
      // tab
      if (keyCode === 9) {
        this.setState({ pickerVisible: false });
      }
    }
  }, {
    key: 'togglePickerVisible',
    value: function togglePickerVisible() {
      this.setState({
        pickerVisible: !this.state.pickerVisible
      });
    }

    // (state, props)=>ReactElement

  }, {
    key: 'pickerPanel',
    value: function pickerPanel() {
      throw new _utils.Errors.MethodImplementationRequiredError();
    }

    // (Date|null)=>bool

  }, {
    key: 'isDateValid',
    value: function isDateValid(date) {
      return date == null || isValidValue(date);
    }

    // return true on condition
    //  * input is parsable to date
    //  * also meet your other condition

  }, {
    key: 'isInputValid',
    value: function isInputValid(value) {
      var parseable = this.parseDate(value);
      if (!parseable) {
        return false;
      }

      var isdatevalid = this.isDateValid(parseable);
      if (!isdatevalid) {
        return false;
      }
      return true;
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      var _state = this.state,
          value = _state.value,
          pickerVisible = _state.pickerVisible;

      if (!this.isInputFocus && !pickerVisible) {
        return;
      }

      if (this.isDateValid(value)) {
        this.setState({ pickerVisible: false });
        this.props.onChange(value);
      } else {
        this.setState({ pickerVisible: false, text: this.dateToStr(value) });
      }
    }
  }, {
    key: 'handleClickIcon',
    value: function handleClickIcon() {
      var _props = this.props,
          isReadOnly = _props.isReadOnly,
          isDisabled = _props.isDisabled;
      var text = this.state.text;


      if (isReadOnly || isDisabled) return;
      if (!text) {
        this.togglePickerVisible();
      } else {
        this.setState({ text: '', value: null, pickerVisible: false });
        this.props.onChange(null);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          isReadOnly = _props2.isReadOnly,
          placeholder = _props2.placeholder,
          isDisabled = _props2.isDisabled;
      var _state2 = this.state,
          pickerVisible = _state2.pickerVisible,
          value = _state2.value,
          text = _state2.text,
          isShowClose = _state2.isShowClose;


      var createIconSlot = function createIconSlot() {
        if (_this3.calcIsShowTrigger()) {
          var cls = isShowClose ? 'el-icon-close' : _this3.triggerClass();
          return _react2.default.createElement('i', {
            className: _this3.classNames('el-input__icon', cls),
            onClick: _this3.handleClickIcon.bind(_this3),
            onMouseEnter: function onMouseEnter() {
              if (isReadOnly || isDisabled) return;
              if (text) {
                _this3.setState({ isShowClose: true });
              }
            },
            onMouseLeave: function onMouseLeave() {
              _this3.setState({ isShowClose: false });
            }
          });
        } else {
          return null;
        }
      };

      var createPickerPanel = function createPickerPanel() {
        if (pickerVisible) {
          return _this3.pickerPanel(_this3.state, Object.assign({}, _this3.props, {
            getPopperRefElement: function getPopperRefElement() {
              return _reactDom2.default.findDOMNode(_this3.refs.inputRoot);
            },
            popperMixinOption: {
              placement: _constants.PLACEMENT_MAP[_this3.props.align] || _constants.PLACEMENT_MAP.left
            }
          }));
        } else {
          return null;
        }
      };

      return _react2.default.createElement(
        'span',
        {
          className: this.classNames('el-date-editor', {
            'is-have-trigger': this.calcIsShowTrigger(),
            'is-active': pickerVisible,
            'is-filled': !!value
          }),
          onClick: function onClick(evt) {
            evt.stopPropagation();
            evt.nativeEvent.stopImmediatePropagation();
            return false;
          }
        },
        _react2.default.createElement(_internal.EventRegister, {
          id: this.clickOutsideId,
          target: document,
          eventName: 'click',
          func: this.handleClickOutside.bind(this) }),
        _react2.default.createElement(_input2.default, {
          className: this.classNames('el-date-editor el-date-editor--' + this.type),
          readOnly: isReadOnly,
          disabled: isDisabled,
          type: 'text',
          placeholder: placeholder,
          onFocus: this.handleFocus.bind(this),
          onBlur: this.handleBlur.bind(this),
          onKeyDown: this.handleKeydown.bind(this),
          onChange: function onChange(evt) {
            var iptxt = evt.target.value;
            var nstate = { text: iptxt };
            if (iptxt.trim() === '') {
              nstate.value = null;
            } else if (_this3.isInputValid(iptxt)) {
              //only set value on a valid date input
              nstate.value = _this3.parseDate(iptxt);
            }
            _this3.setState(nstate);
          },
          ref: 'inputRoot',
          value: text,
          icon: createIconSlot()
        }),
        createPickerPanel()
      );
    }
  }]);

  return BasePicker;
}(_libs.Component);

var _default = BasePicker;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(idGen, 'idGen', 'src/date-picker/BasePicker.jsx');

  __REACT_HOT_LOADER__.register(haveTriggerType, 'haveTriggerType', 'src/date-picker/BasePicker.jsx');

  __REACT_HOT_LOADER__.register(isValidValue, 'isValidValue', 'src/date-picker/BasePicker.jsx');

  __REACT_HOT_LOADER__.register(BasePicker, 'BasePicker', 'src/date-picker/BasePicker.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/BasePicker.jsx');
}();

;