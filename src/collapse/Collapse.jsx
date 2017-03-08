/* @flow */

import React from 'react';
import { Component } from '../../libs';

type Props = {
  accordion: boolean,
  value: string | Array<string>,
  children: React.Children,
}

type State = {
  activeNames: Array<string>,
}

export default class Collapse extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    value: []
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      activeNames: [].concat(this.props.value),
    }
  }

  setActiveNames(activeNames: string | Array<string>): void {
    activeNames = [].concat(activeNames);
    this.setState({ activeNames });
  }

  handleItemClick(name: string): void {
    const { activeNames } = this.state;

    if (this.props.accordion) {
      this.setActiveNames(
        activeNames[0] &&
        activeNames[0] === name
        ? '' : name
      );
    } else {
      if (activeNames.includes(name)) {
        this.setActiveNames(activeNames.filter(item => item !== name));
      } else {
        this.setActiveNames(activeNames.concat(name));
      }
    }
  }

  render(): React.Element<any> {
    const content = React.Children.map(this.props.children, (child, idx) => {
      const name = child.props.name || idx.toString();
      return React.cloneElement(child, {
        isActive: this.state.activeNames.includes(name),
        key: idx,
        name: name,
        onClick: item => this.handleItemClick(item),
      });
    });
    return (
      <div className="el-collapse">
        {content}
      </div>
    )
  }
}
