import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      fieldLength: 0
    }
  }

  getChildContext() {
    return {
      labelSuffix: this.props.labelSuffix,
      labelWidth: this.props.labelWidth,
      rules: this.props.rules,
      model: this.props.model,
      addField: this.addField.bind(this)
      removeField: this.removeField.bind(this)
    };
  }

  addField(field) {
    this.state.fields[field.prop] = field;
    this.state.fieldLength++;
  }

  removeField(field) {
    delete this.state.fields[field.prop];
    this.state.fieldLength--;
  }

  resetFields() {
    const { fields } = this.state;

    for (let prop in fields) {
      fields[prop].resetField();
    }
  }

  validate(callback) {
    const { fields, fieldLength } = this.state;
    let count = 0, valid = true;

    for (let prop in fields) {
      fields[prop].validate('', errors => {
        if (errors) {
          valid = false;
        }

        if (++count === fieldLength) {
          callback(valid);
        }
      });
    }
  }

  validateField(prop, cb) {
    const { fields } = this.state;
    const field = fields[prop];

    if (!field) {
      throw new Error('must call validateField with valid prop string!');
    }

    field.validate('', cb);
  }

  render() {
    return (
      <form className={this.classNames('el-form', this.props. && `el-form--label-${this.props.labelPosition}`, {
        'el-form--inline': inline
      })}>{this.props.children}</form>
    )
  }
}

Form.childContextTypes = {
  labelSuffix: PropTypes.string,
  labelWidth: PropTypes.string,
  rules: PropTypes.object,
  model: PropTypes.object,
  addField: PropTypes.func,
  removeField: PropTypes.func
};

Form.propTypes = {
  model: PropTypes.object,
  rules: PropTypes.object,
  labelPosition: PropTypes.string,
  labelWidth: PropTypes.string,
  labelSuffix: PropTypes.string,
  inline: PropTypes.bool
}

Form.defaultProps = {
  labelSuffix: ''
};
