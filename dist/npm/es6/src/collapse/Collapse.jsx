/*       */

import React from 'react';
import { Component, PropTypes } from '../../libs';

              
                            
  

export default class Collapse extends Component {
               

  static defaultProps = {
    value: [],
    onChange() {}
  };

  constructor(props        ) {
    super(props);
    this.state = {
      activeNames: [].concat(this.props.value)
    };
  }

  setActiveNames(activeNames                        )       {
    activeNames = [].concat(activeNames);
    this.setState({ activeNames }, () => this.props.onChange(activeNames));
  }

  handleItemClick(name        )       {
    const { activeNames } = this.state;

    if (this.props.accordion) {
      this.setActiveNames(
        activeNames[0] && activeNames[0] === name ? '' : name
      );
    } else {
      if (activeNames.includes(name)) {
        this.setActiveNames(activeNames.filter(item => item !== name));
      } else {
        this.setActiveNames(activeNames.concat(name));
      }
    }
  }

  render()                     {
    const content = React.Children.map(this.props.children, (child, idx) => {
      const name = child.props.name || idx.toString();
      return React.cloneElement(child, {
        isActive: this.state.activeNames.includes(name),
        key: idx,
        name: name,
        onClick: item => this.handleItemClick(item)
      });
    });
    return (
      <div className="el-collapse">
        {content}
      </div>
    );
  }
}

Collapse.propTypes = {
  accordion: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  onChange: PropTypes.func
};
