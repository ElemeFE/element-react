'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _asyncValidator = require('async-validator');

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = function (_Component) {
  _inherits(FormItem, _Component);

  function FormItem(props) {
    _classCallCheck(this, FormItem);

    var _this = _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call(this, props));

    _this.state = {
      error: '',
      valid: false,
      validating: false,
      isRequired: false
    };
    return _this;
  }

  _createClass(FormItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var prop = this.props.prop;


      if (prop) {
        this.parent().addField(this);

        this.initialValue = this.getInitialValue();

        var rules = this.getRules();

        if (rules.length) {
          rules.every(function (rule) {
            if (rule.required) {
              _this2.state.isRequired = true;

              return false;
            }
          });

          var parent = _reactDom2.default.findDOMNode(this.parent());
          if (parent) {
            parent.addEventListener('blur', this.onFieldBlur.bind(this));
            parent.addEventListener('change', this.onFieldChange.bind(this));
          }
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.parent().removeField(this);
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'onFieldBlur',
    value: function onFieldBlur() {
      this.validate('blur');
    }
  }, {
    key: 'onFieldChange',
    value: function onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;

        return;
      }

      this.validate('change');
    }
  }, {
    key: 'validate',
    value: function validate(trigger, cb) {
      var _state = this.state,
          validating = _state.validating,
          valid = _state.valid,
          error = _state.error;


      var rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        cb && cb();
        return true;
      }

      validating = true;

      var descriptor = _defineProperty({}, this.props.prop, rules);
      var validator = new _asyncValidator2.default(descriptor);
      var model = _defineProperty({}, this.props.prop, this.fieldValue());

      validator.validate(model, { firstFields: true }, function (errors) {
        valid = !errors;
        error = errors ? errors[0].message : '';
        cb && cb(errors);
        validating = false;
      });

      this.setState({ validating: validating, valid: valid, error: error });
    }
  }, {
    key: 'getInitialValue',
    value: function getInitialValue() {
      var value = this.parent().props.model[this.props.prop];

      if (value === undefined) {
        return value;
      } else {
        return JSON.parse(JSON.stringify(value));
      }
    }
  }, {
    key: 'resetField',
    value: function resetField() {
      var _state2 = this.state,
          valid = _state2.valid,
          error = _state2.error;


      valid = true;
      error = '';

      this.setState({ valid: valid, error: error });

      var value = this.fieldValue();

      if (Array.isArray(value) && value.length > 0) {
        this.validateDisabled = true;
        this.parent().props.model[this.props.prop] = [];
      } else if (value) {
        this.validateDisabled = true;
        this.parent().props.model[this.props.prop] = this.initialValue;
      }
    }
  }, {
    key: 'getRules',
    value: function getRules() {
      var formRules = this.parent().props.rules;
      var selfRuels = this.props.rules;

      formRules = formRules ? formRules[this.props.prop] : [];
      return [].concat(selfRuels || formRules || []);
    }
  }, {
    key: 'getFilteredRule',
    value: function getFilteredRule(trigger) {
      var rules = this.getRules();

      return rules.filter(function (rule) {
        return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
      });
    }
  }, {
    key: 'labelStyle',
    value: function labelStyle() {
      var ret = {};

      if (this.parent().props.labelPosition === 'top') return ret;

      var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.width = Number(labelWidth);
      }

      return ret;
    }
  }, {
    key: 'contentStyle',
    value: function contentStyle() {
      var ret = {};

      if (this.parent().props.labelPosition === 'top' || this.parent().props.inline) return ret;

      var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.marginLeft = Number(labelWidth);
      }

      return ret;
    }
  }, {
    key: 'fieldValue',
    value: function fieldValue() {
      var model = this.parent().props.model;
      if (!model || !this.props.prop) {
        return;
      }
      var temp = this.props.prop.split(':');
      return temp.length > 1 ? model[temp[0]][temp[1]] : model[this.props.prop];
    }
  }, {
    key: 'render',
    value: function render() {
      var _state3 = this.state,
          error = _state3.error,
          validating = _state3.validating,
          isRequired = _state3.isRequired;
      var _props = this.props,
          label = _props.label,
          required = _props.required;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-form-item', {
            'is-error': error !== '',
            'is-validating': validating,
            'is-required': isRequired || required
          }) },
        label && _react2.default.createElement(
          'label',
          { className: 'el-form-item__label', style: this.labelStyle() },
          label + this.parent().props.labelSuffix
        ),
        _react2.default.createElement(
          'div',
          { className: 'el-form-item__content', style: this.contentStyle() },
          this.props.children,
          _react2.default.createElement(
            _libs.Transition,
            { name: 'md-fade-bottom' },
            error && _react2.default.createElement(
              'div',
              { className: 'el-form-item__error' },
              error
            )
          )
        )
      );
    }
  }]);

  return FormItem;
}(_libs.Component);

var _default = FormItem;
exports.default = _default;


FormItem.contextTypes = {
  component: _libs.PropTypes.any
};

FormItem.propTypes = {
  label: _libs.PropTypes.string,
  labelWidth: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  prop: _libs.PropTypes.string,
  required: _libs.PropTypes.bool,
  rules: _libs.PropTypes.oneOfType([_libs.PropTypes.object, _libs.PropTypes.array])
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FormItem, 'FormItem', 'src/form/FormItem.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/form/FormItem.jsx');
}();

;