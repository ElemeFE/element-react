import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

export default class Card extends Component {
  render() {
    return (
      <div className={ this.classNames("el-card", this.props.className) }>
        <View if={ this.props.header }>
          <div className="el-card__header">
            { this.props.header }
          </div>
        </View>

        <div className="el-card__body" style={ this.props.bodyStyle }>
          { this.props.children }
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  header: PropTypes.node,
  bodyStyle: PropTypes.object
};
