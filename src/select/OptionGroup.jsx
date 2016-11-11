import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class OptionGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minWidth: ''
    }
  }

  componentDidMount() {
    // if (this.disabled) {
    //     this.broadcast('option', 'handleGroupDisabled', this.disabled);
    //   }
  }

  render() {
    return (
      <ul className="el-select-group__wrap">
        <li className="el-select-group__title">{this.props.label}</li>
        <li>
          <ul className="el-select-group">
            {this.props.children}
          </ul>
        </li>
      </ul>
    )
  }
}

OptionGroup.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool
};
