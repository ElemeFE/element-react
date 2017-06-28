/* @flow */

import React, { Children } from 'react';
import { Component, PropTypes } from '../../libs'

import Checkbox from './CheckBox';
import CheckboxButton from './CheckBoxButton';

type State = {
  options: Array<string>,
}

export default class CheckboxGroup extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      options: this.props.value || []
    };
  }

  componentWillReceiveProps(nextProps: Object): void {
    if (nextProps.value !== this.props.value) {
      this.setState({
        options: nextProps.value
      });
    }
  }

  getChildContext(): { ElCheckboxGroup: CheckboxGroup } {
    return {
      ElCheckboxGroup: this
    };
  }

  onChange(value: string, checked: boolean): void {
    const index = this.state.options.indexOf(value);

    if (checked) {
      if (index === -1) {
        this.state.options.push(value);
      }
    } else {
      this.state.options.splice(index, 1);
    }

    this.forceUpdate();

    if (this.props.onChange) {
      this.props.onChange(this.state.options);
    }
  }

  render(): React.Element<any> {
    const { options } = this.state;

    const children = Children.map(this.props.children, (child, index) => {
      if (!child) {
        return null;
      }
      if (child.type !== Checkbox || child.type !== CheckboxButton) {
        throw new Error(`"CheckboxGroup's children must be Checkbox or CheckboxButton, but received '${child.type}'"`)
      }
      return React.cloneElement(
        child,
        Object.assign({}, child.props, {
          key: index,
          checked: child.props.checked || options.indexOf(child.props.value) >= 0 || options.indexOf(child.props.label) >= 0 ,
          onChange: this.onChange.bind(this, child.props.value || child.props.label),
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

CheckboxGroup.childContextTypes = {
  ElCheckboxGroup: PropTypes.any
};

CheckboxGroup.propTypes = {
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  fill: PropTypes.string,
  textColor: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
}
