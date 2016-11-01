import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { Component, View } from '../../libs';
import PopperJS from './utils/popper';

export default class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopper: false
    }
  }

  componentDidUpdate() {
    const popper = this.refs.popper;
    if (popper) popper.setAttribute('x-placement', this.props.placement);

    const arrow = this.refs.arrow;
    if (arrow) arrow.setAttribute('x-arrow', "");

    const { placement } = this.props;
    if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(placement)) {
      return;
    }

    if (popper) {
      const reference = this.refs.reference;
      const options = { placement };

      popper.setAttribute('x-placement', placement);
      this.popperJS = new PopperJS(reference, popper, options);
    }
  }

  handleShowPopper() {
    if (this.props.manual) return ;

    this.setState({
      timeout: setTimeout(() => {
        this.setState({ showPopper: true })
      }, this.props.openDelay)
    });
  }

  handleClosePopper() {
    if (this.props.manual) return ;

    clearTimeout(this.state.timeout);
    this.setState({ showPopper: false});
  }

  render() {
    const { showPopper } = this.state;
    const { effect, content, disabled, transition, visibleArrow } = this.props;

    return (
      <div
        className="el-tooltip"
        onMouseEnter={ e => this.handleShowPopper(e) }
        onMouseLeave={ e => this.handleClosePopper(e) }
      >
        <div className="el-tooltip__rel" ref="reference">
          <div>{ this.props.children }</div>
        </div>

        <View
          show={ !disabled && showPopper }
          transition={ transition }
          transitionKey={ `tooltip-${transition}`}
        >
          <div ref="popper" className={ classnames("el-tooltip__popper", `is-${effect}`) }>
            <div>{ content }</div>
            { visibleArrow ? <div ref="arrow" className="popper__arrow"></div> : null }
          </div>
        </View>
      </div>
    )
  }
}

Tooltip.propTypes = {
  // 默认提供的主题: dark, light
  effect: PropTypes.string,
  // 显示的内容，也可以通过 slot#content 传入 DOM
  content: PropTypes.node,
  // Tooltip 的出现位置 [top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end]
  placement: PropTypes.string,
  // 状态是否可用
  disabled: PropTypes.bool,
  // 渐变动画定义
  transition: PropTypes.string,
  // 是否显示 Tooltip 箭头
  visibleArrow: PropTypes.bool,
  // 延迟出现(单位: 毫秒)
  openDelay: PropTypes.number,
  // 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效
  manual: PropTypes.bool,

  // TODO: 作用什么是什么？
  value: PropTypes.bool
};

Tooltip.defaultProps = {
  effect: "dark",
  // placement: "bottom",
  placement: "top",
  visible: false,
  disabled: false,
  transition: "fade-in-linear",
  visibleArrow: true,
  openDelay: 0,
  manual: false
};
