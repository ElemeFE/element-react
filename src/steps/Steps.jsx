import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Steps extends Component {
  calcProgress(status, index) {
    let step = 100;
    const style = {};
    style.transitionDelay = 150 * index + 'ms';

    const nextStatus = this.calStatus(index + 1);
    // 前后状态不一致时，并且当前status为完成，statusLine的长度才为50%
    if (nextStatus !== status) {
      if (status === this.props.finishStatus) {
        step = 50;
      } else if (status === 'wait') {
        step = 0;
        style.transitionDelay = (-150 * index) + 'ms';
      }
    }

    this.props.direction === 'vertical'
      ? style.height = step + '%'
      : style.width = step + '%';
    return style;
  }
  calStatus(index) {
    const { active, finishStatus, processStatus } = this.props;
    let status = 'wait';

    if (active > index) {
      status = finishStatus;
    } else if (active === index) {
      status = processStatus;
    }

    return status;
  }
  render() {
    const { children, space, direction } = this.props;

    return (
      <div className="el-steps">
        {
          React.Children.map(children, (child, index) => {
            const computedSpace = space ? `${space}px` : `${100 / children.length}%`;
            const style = direction === 'horizontal' ? { width: computedSpace } : { height: computedSpace };
            const status = this.calStatus(index);
            const lineStyle = this.calcProgress(status, index);
            return React.cloneElement(child, {
              style,
              lineStyle,
              direction,
              status,
              index: index + 1,
            })
          })
        }
      </div>
    )
  }
}

const statusMap = ['wait', 'process', 'finish', 'error', 'success'];

Steps.propTypes = {
  space: PropTypes.number,
  active: PropTypes.number,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  finishStatus: PropTypes.oneOf(statusMap),
  processStatus: PropTypes.oneOf(statusMap),
}

Steps.defaultProps = {
  direction: 'horizontal',
  finishStatus: 'finish',
  processStatus: 'process',
  active: 0,
}
