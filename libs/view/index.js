import React, { PropTypes } from 'react';
import Component from '../component';

export default class Element extends Component {
  render() {
    if (this.props.if) {
        const element = React.Children.only(this.props.children);

        return React.cloneElement(element, !this.props.show && {
            style: Object.assign({}, element.props.style, {
              display: 'none'
            })
        });
    } else {
      return <span />
    }
  }
}

Element.propTypes = {
  show: PropTypes.bool,
  if: PropTypes.any
};

Element.defaultProps = {
  show: true,
  if: true
};
