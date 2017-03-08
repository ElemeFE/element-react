/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

type Props = {
  children: React.Element<any>,
  label: string | React.Element<any>,
  name: string,
  disabled: boolean,
  closable: boolean,
}

export default class TabPane extends Component {
  props: Props;

  render(): React.Element<any> {
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
