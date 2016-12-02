import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class RadioGroup extends Component {
  onChange(value) {
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

RadioGroup.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  onChange: PropTypes.func
}
