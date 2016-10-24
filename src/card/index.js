import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

export default class Card extends Component {
  render() {
    return (
      <div className="el-card">
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

// TODO: 该样式在 css 中有定义, 是否不应该统一由 default/themes 控制?
Card.defaultProps = {
  bodyStyle: {
    padding: '20px'
  }
};
