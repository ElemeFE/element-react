import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class TabPane extends Component {
  constructor(props) {
    super(props);

    let content = [];

    if (typeof this.props.children === 'object') {
      this.props.children.forEach(item => {
        if(typeof item === 'object' && item.props['data-solt'] === 'label') {
          return false;
        }

        content.push(item);
      });
    } else {
      content = this.props.children;
    }

    this.state = {
      content,
    };
  }

  render() {
    return (
      <div style={this.style()} className={this.className('el-tab-pane')}>
        { this.state.content }
      </div>
    );
  }
}

TabPane.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  closable: PropTypes.bool,
}

TabPane.defaultProps = {
  disabled: false,
  closable: false,
}
