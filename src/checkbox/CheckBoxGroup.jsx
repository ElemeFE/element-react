import React from 'react';
import { Component, PropTypes } from '../../libs'

export default class CheckboxGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options || [],
    };
  }

  onChange(value) {
    //TODO
  }

  render() {
    const { options } = this.state;
    let children;
    if (options.length > 0) {
      children = React.Children.map(this.props.children, (child, index) => {
        return React.cloneElement(
          child,
          {
            key: index,
            checked: child.props.checked || this.props.options.indexOf(child.props.label) >= 0,
          }
        );
      });
    } else {
      children = this.props.children;
    }

    return (
      <div className="el-checkbox-group" ref="CheckBoxGroup">
        {children}
      </div>
    )
  }
}

CheckboxGroup.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
}