import React from 'react';
import { Component, PropTypes } from '../../libs';

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
      component: this
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
      <form className={this.classNames('el-form', this.props.labelPosition && `el-form--label-${this.props.labelPosition}`, {
        'el-form--inline': this.props.inline
      })}>{this.props.children}</form>
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
  inline: PropTypes.bool
}

Form.defaultProps = {
  labelPosition: 'right',
  labelSuffix: ''
};
