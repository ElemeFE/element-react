import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class TabPane extends Component {
  render() {
    return (
      <div style={this.style()} className={this.className('el-tab-pane')}>
        { this.props.children }
      </div>
    );
  }
}

TabPane.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  disabled: PropTypes.bool,
  closable: PropTypes.bool,
}

TabPane.defaultProps = {
  disabled: false,
  closable: false,
}
