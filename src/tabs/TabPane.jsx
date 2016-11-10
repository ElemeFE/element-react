import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class TabPane extends Component {
  render() {
    return (
      <div className="el-tab-pane">
        { this.props.children }
      </div>
    );
  }
}

TabPane.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool
}

TabPane.defaultProps = {

}
