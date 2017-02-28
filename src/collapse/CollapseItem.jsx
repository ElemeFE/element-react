import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

export default class CollapseItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, isActive, onClick, name } = this.props;
    return (
      <div className={this.classNames({'el-collapse-item': true, 'is-active': isActive})}>
        <div className="el-collapse-item__header" onClick={() => onClick(name)}>
          <i className="el-collapse-item__header__arrow el-icon-arrow-right"></i>
          {title}
        </div>
        <Transition name="collapse-transition" duration="200">
          <View show={isActive} >
            <div className="el-collapse-item__wrap">
              <div className="el-collapse-item__content">
                {this.props.children}
              </div>
            </div>
          </View>
        </Transition>
      </div>
    )
  }
}

CollapseItem.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  title: PropTypes.node,
  name: PropTypes.string,
}

CollapseItem.defaultProps = {

}
