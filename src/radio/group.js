import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

export default class RadioGroup extends Component {
  render() {
    return (
      <div ref="RadioGroup" className="el-radio-group">
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

  onChange(value) {
    if (this.props.onChange) {
      this.props.onChange({
        target: Object.assign(this.refs.RadioGroup, { value })
      })
    }
  }
}

RadioGroup.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  onChange: PropTypes.func
}
