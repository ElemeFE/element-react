/* @flow */

import React, { Children } from 'react';
import { Component, PropTypes } from '../../libs'

type State = {
  options: Array<string>,
}

export default class CheckboxGroup extends Component {
  state: State;

  constructor(props: Object) {
    super(props);
    this.state = {
      options: this.props.options || []
    };
  }

  componentWillReceiveProps(nextProps: Object): void {
    if (nextProps.options !== this.props.options) {
      this.setState({
        options: nextProps.options
      });
    }
  }

  getChildContext (): { isWrap: boolean } {
    return { isWrap: true };
  }

  onChange(e: SyntheticEvent, label: string, value: string): void {
    const { options } = this.state;
    let newOptions;
    if (e.target instanceof HTMLInputElement) {
      if (e.target.checked) {
        newOptions = options.concat(value || label);
      } else {
        newOptions = options.filter(v =>v !== value && v !== label);
      }

      this.setState({
        options: newOptions
      });

      if (this.props.onChange) {
        this.props.onChange(newOptions);
      }
    }
  }

  render(): React.Element<any> {
    const { options } = this.state;
    const children = Children.map(this.props.children, (child, index) => {
      return React.cloneElement(
        child,
        Object.assign({}, child.props, {
          key: index,
          checked: child.props.checked || options.indexOf(child.props.value) >= 0 || options.indexOf(child.props.label) >= 0 ,
          onChange: this.onChange.bind(this),
        }),
      );
    });

    return (
      <div style={this.style()} className={this.className('el-checkbox-group')}>
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
