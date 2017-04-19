/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import AsyncValidator from 'async-validator';
import { Component, PropTypes, Transition } from '../../libs';

type State = {
  error: string,
  valid: boolean,
  validating: boolean,
  isRequired: boolean
};

export default class FormItem extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      error: '',
      valid: false,
      validating: false,
      isRequired: false
    }
  }

  componentDidMount() {
    const { prop } = this.props;

    if (prop) {
      this.parent().addField(this);

      this.initialValue = this.getInitialValue();

      let rules = this.getRules();

      if (rules.length) {
        rules.every(rule => {
          if (rule.required) {
            this.state.isRequired = true;

            return false;
          }
        });
      }
    }
  }

  componentWillUnmount(): void {
    this.parent().removeField(this);
  }

  parent(): Component {
    return this.context.component;
  }

  onFieldBlur(): void {
    this.validate('blur');
  }

  onFieldChange(): void {
    if (this.validateDisabled) {
      this.validateDisabled = false;

      return;
    }

    this.validate('change');
  }

  validate(trigger: string, cb?: Function): boolean | void {
    let { validating, valid, error } = this.state;

    const rules = this.getFilteredRule(trigger);

    if (!rules || rules.length === 0) {
      cb && cb();
      return true;
    }

    validating = true;

    const descriptor = { [this.props.prop]: rules };
    const validator = new AsyncValidator(descriptor);
    const model = { [this.props.prop]: this.fieldValue() };

    validator.validate(model, { firstFields: true }, errors => {
      valid = !errors;
      error = errors ? errors[0].message : '';
      cb && cb(errors);
      validating = false;
    });

    this.setState({ validating, valid, error });
  }

  getInitialValue(): string | void {
    const value = this.parent().props.model[this.props.prop];

    if (value === undefined) {
      return value;
    } else {
      return JSON.parse(JSON.stringify(value));
    }
  }

  resetField(): void {
    let { valid, error } = this.state;

    valid = true;
    error = '';

    this.setState({ valid, error });

    let value = this.fieldValue();

    if (Array.isArray(value) && value.length > 0) {
      this.validateDisabled = true;
      this.parent().props.model[this.props.prop] = [];
    } else if (value) {
      this.validateDisabled = true;
      this.parent().props.model[this.props.prop] = this.initialValue;
    }
  }

  getRules(): Array<any> {
    let formRules = this.parent().props.rules;
    let selfRuels = this.props.rules;

    formRules = formRules ? formRules[this.props.prop] : [];
    return [].concat(selfRuels || formRules || []);
  }

  getFilteredRule(trigger: string): Array<any> {
    const rules = this.getRules();

    return rules.filter(rule => {
      return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
    });
  }

  labelStyle(): { width?: number } {
    const ret = {};

    if (this.parent().props.labelPosition === 'top') return ret;

    const labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

    if (labelWidth) {
      ret.width = Number(labelWidth);
    }

    return ret;
  }

  contentStyle(): { marginLeft?: number } {
    const ret = {};

    if (this.parent().props.labelPosition === 'top' || this.parent().props.inline) return ret;

    const labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

    if (labelWidth) {
      ret.marginLeft = Number(labelWidth);
    }

    return ret;
  }

  fieldValue(): mixed {
    const model = this.parent().props.model;
    if (!model || !this.props.prop) { return; }
    const temp = this.props.prop.split(':');
    return temp.length > 1 ? model[temp[0]][temp[1]] : model[this.props.prop];
  }

  render(): React.Element<any> {
    const { error, validating, isRequired } = this.state;
    const { label, required } = this.props;

    return (
      <div style={this.style()} className={this.className('el-form-item', {
        'is-error': error !== '',
        'is-validating': validating,
        'is-required': isRequired || required
      })} onBlur={this.onFieldBlur.bind(this)} onChange={this.onFieldChange.bind(this)}>
        {
          label && (
            <label className="el-form-item__label" style={this.labelStyle()}>
              {label + this.parent().props.labelSuffix}
            </label>
          )
        }
        <div className="el-form-item__content" style={this.contentStyle()}>
          {this.props.children}
          <Transition name="md-fade-bottom">
            {
              error && <div className="el-form-item__error">{error}</div>
            }
          </Transition>
        </div>
      </div>
    )
  }
}

FormItem.contextTypes = {
  component: PropTypes.any
};

FormItem.propTypes = {
  label: PropTypes.string,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prop: PropTypes.string,
  required: PropTypes.bool,
  rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
