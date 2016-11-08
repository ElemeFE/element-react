import React from 'react';
import AsyncValidator from 'async-validator';
import { Component, PropTypes, Transition } from '../../libs';

export default class FormItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      validating: false,
      isRequired: false
    }
  }

  componentDidMount() {
    if (this.props.prop) {
      this.context.addField(this);
      this.initialValue = this.getInitialValue();

      let rules = this.getRules();

      if (rules.length) {
        rules.every(rule => {
          if (rule.required) {
            this.isRequired = true;
            return false;
          }
        });

        // this.$on('el.form.blur', this.onFieldBlur);
        // this.$on('el.form.change', this.onFieldChange);
      }
    }
  }

  componentWillUnMount() {
    this.context.removeField(this);
  }

  onFieldBlur() {
    this.validate('blur');
  }

  onFieldChange() {
    if (this.validateDisabled) {
      this.validateDisabled = false;
      return;
    }
    this.validate('change');
  }

  validate(trigger, cb) {
    let { validating, valid, error } = this.state;

    var rules = this.getFilteredRule(trigger);
    if (!rules || rules.length === 0) {
      cb && cb();
      return true;
    }

    validating = true;

    var descriptor = { [this.props.prop]: rules };
    var validator = new AsyncValidator(descriptor);
    var model = { [this.props.prop]: this.fieldValue() };

    validator.validate(model, { firstFields: true }, errors => {
      valid = !errors;
      error = errors ? errors[0].message : '';
      cb && cb(errors);
      validating = false;
    });

    this.setState({ validating, valid, error });
  }

  getInitialValue() {
    var value = this.context.model[this.props.prop];
    if (value === undefined) {
      return value;
    } else {
      return JSON.parse(JSON.stringify(value));
    }
  }

  resetField() {
    let { valid, error } = this.state;

    valid = true;
    error = '';

    this.setState({ valid, error });

    let value = this.fieldValue();

    if (Array.isArray(value) && value.length > 0) {
      this.validateDisabled = true;
      this.context.model[this.props.prop] = [];
    } else if (value) {
      this.validateDisabled = true;
      this.context.model[this.props.prop] = this.initialValue;
    }
  }

  getRules() {
    var formRules = this.context.rules;
    var selfRuels = this.rules;

    formRules = formRules ? formRules[this.props.prop] : [];
    return [].concat(selfRuels || formRules || []);
  }

  getFilteredRule(trigger) {
    var rules = this.getRules();
    return rules.filter(rule => {
      return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
    });
  }

  labelStyle() {
    var ret = {};
    var labelWidth = this.props.labelWidth || this.context.labelWidth;
    if (labelWidth) {
      ret.width = labelWidth;
    }
    return ret;
  }

  contentStyle() {
    var ret = {};
    var labelWidth = this.props.labelWidth || this.context.labelWidth;
    if (labelWidth) {
      ret.marginLeft = labelWidth;
    }
    return ret;
  }

  form() {
    var parent = this.$parent;
    while (parent.$options.componentName !== 'form') {
      parent = parent.$parent;
    }
    return parent;
  }

  fieldValue() {
    var model = this.context.model;
    if (!model || !this.props.prop) { return; }
    var temp = this.props.prop.split(':');
    return temp.length > 1 ? model[temp[0]][temp[1]] : model[this.props.prop];
  }

  render() {
    return (
      <div className={this.classNames('el-form-item', {
        'is-error': this.state.error !== '',
        'is-validating': this.state.validating,
        'is-required': this.state.isRequired || this.props.required
      })}>
        {
          this.props.label && (
            <label className="el-form-item__label" style={this.labelStyle()}>
              {this.props.label + this.context.labelSuffix}
            </label>
          )
        }
        <div className="el-form-item__content" style={this.contentStyle()}>
          {this.props.children}
          <Transition name="md-fade-bottom">
            {
              this.state.error !== '' && <div className="el-form-item__error">{this.state.error}</div>
            }
          </Transition>
        </div>
      </div>
    )
  }
}

FormItem.contextTypes = {
  labelSuffix: PropTypes.string,
  labelWidth: PropTypes.string,
  rules: PropTypes.object,
  model: PropTypes.object,
  addField: PropTypes.func,
  removeField: PropTypes.func
};

FormItem.propTypes = {
  label: PropTypes.string,
  labelWidth: PropTypes.string,
  prop: PropTypes.string,
  required: PropTypes.bool,
  rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

FormItem.defaultProps = {

};
