import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

export default class Card extends Component {
  render() {
    return (
      <div className="el-card">
        {
          this.props.header && (
            <div className="el-card__header">
              { this.props.header }
            </div>
          )
        }
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

Card.defaultProps = {
  bodyStyle: {
    padding: '20px'
  }
};
