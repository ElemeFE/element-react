/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Cover extends Component {
  static defaultProps = {
    onFile: Function
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      dragOver: false
    };
  }

  handleDragover(e: SyntheticDragEvent): void {
    e.preventDefault();
    this.setState({ dragOver: true });
  }

  handleDragleave(e: SyntheticDragEvent): void {
    e.preventDefault();
    this.setState({ dragOver: false });
  }

  onDrop(e: SyntheticDragEvent): void {
    e.preventDefault();
    this.setState({ dragOver: false });
    this.props.onFile(e.dataTransfer.files);
  }

  render(): React.Element<any> {
    const { dragOver } = this.state;
    return (
      <div
        className={this.classNames({
          'el-upload-dragger': true,
          'is-dragover': dragOver
        })}
        onDrop={e => this.onDrop(e)}
        onDragOver={e => this.handleDragover(e)}
        onDragLeave={e => this.handleDragleave(e)}
      >
        {this.props.children}
      </div>
    );
  }
}

Cover.propTypes = {
  onFile: PropTypes.func
};
