/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

type State = {
  fields: Array<Component>,
};

export default class Form extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      fields: []
    }
  }

  getChildContext(): { component: Form } {
    return {
      component: this
    };
  }

  addField(field: Component): void {
    this.state.fields.push(field);
  }

  removeField(field: Component): void {
    if (field.props.prop) {
      this.state.fields.splice(this.state.fields.indexOf(field), 1);
    }
  }

  resetFields(): void {
    this.state.fields.forEach(field => {
      field.resetField();
    });
  }

  validate(callback: Function): void {
    let valid = true;
    let count = 0;

    // 如果需要验证的fields为空，调用验证时立刻返回callback
    if (this.state.fields.length === 0 && callback) {
      callback(true);
    }

    this.state.fields.forEach(field => {
      field.validate('', errors => {
        if (errors) {
          valid = false;
        }
        if (typeof callback === 'function' && ++count === this.state.fields.length) {
          callback(valid);
        }
      });
    });
  }

  validateField(prop: string, cb: Function): void {
    const field = this.state.fields.filter(field => field.props.prop === prop)[0];

    if (!field) { throw new Error('must call validateField with valid prop string!'); }

    field.validate('', cb);
  }

  render(): React.Element<any> {
    return (
      <form style={this.style()} className={this.className('el-form', this.props.labelPosition && `el-form--label-${this.props.labelPosition}`, {
        'el-form--inline': this.props.inline
      })} onSubmit={this.props.onSubmit}>{this.props.children}</form>
    )
  }
}

Form.childContextTypes = {
  component: PropTypes.any
};

Form.propTypes = {
  model: PropTypes.object,
  rules: PropTypes.object,
  labelPosition: PropTypes.oneOf(['right', 'left', 'top']),
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelSuffix: PropTypes.string,
  inline: PropTypes.bool,
  onSubmit: PropTypes.func
}

Form.defaultProps = {
  labelPosition: 'right',
  labelSuffix: ''
};
