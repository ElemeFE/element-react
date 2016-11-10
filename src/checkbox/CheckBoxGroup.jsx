import React, { Children } from 'react';
import { Component, PropTypes } from '../../libs'

export default class CheckboxGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options || [],
    };
  }
  
  getChildContext () {
    return { isWrap: true };
  }

  onChange(e, value) {
    const { options } = this.state;
    let newOptions;

    if (e.target.checked) {
      newOptions = options.concat(value);
    } else {
      newOptions = options.filter(v => v !== value);
    }

    this.setState({
      options: newOptions
    });
    
    if (this.props.onChange) {
      this.props.onChange(newOptions);
    }
  }

  render() {
    const { options } = this.state;

    const children = Children.map(this.props.children, (child, index) => {
      return React.cloneElement(
        child,
        Object.assign({}, child.props, {
          key: index,
          checked: child.props.checked || options.indexOf(child.props.label) >= 0,
          onChange: this.onChange.bind(this),
        }),
      );
    });

    return (
      <div className="el-checkbox-group">
        {children}
      </div>
    )
  }
}

CheckboxGroup.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
}

CheckboxGroup.childContextTypes = {
  isWrap: PropTypes.bool
};