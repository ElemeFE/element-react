/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class RadioGroup extends Component {
  getChildContext(): { component: RadioGroup } {
    return {
      component: this
    };
  }

  onChange(value: mixed) {
    if (this.props.onChange) {
      this.props.onChange({
        target: Object.assign(this.refs.RadioGroup, { value })
      })
    }
  }

  render() {
    return (
      <div ref="RadioGroup" style={this.style()} className={this.className('el-radio-group')}>
        {
          React.Children.map(this.props.children, element => {
            return React.cloneElement(element, Object.assign({}, element.props, {
              onChange: this.onChange.bind(this),
              model: this.props.value,
              size: this.props.size
            }))
          })
        }
      </div>
    )
  }
}

RadioGroup.childContextTypes = {
  component: PropTypes.any
};

RadioGroup.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  size: PropTypes.string,
  textColor: PropTypes.string,
  fill: PropTypes.string,
  onChange: PropTypes.func
}
