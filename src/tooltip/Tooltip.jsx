import React from 'react';
import Popper from '../../vendor/popper';
import { Component, View, PropTypes } from '../../libs';

export default class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopper: false
    }
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
    this.initialPopper();
  }

  componentDidUpdate() {
    this.initialPopper();
  }

  initialPopper() {
    const { popper, reference, arrow } = this.refs;
    const { placement } = this.props;
    const options = { placement };

    this.createPopper(popper, reference, arrow, options);
  }

  createPopper(popper, reference, arrow, options) {
    if (popper) {
      popper.setAttribute('x-placement', options.placement || "");
      this.popperJS = new Popper(reference, popper, options);
    }
    if (arrow) arrow.setAttribute('x-arrow', "");
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
    const { effect, content, disabled, transition, visibleArrow } = this.props;
    const showPopper = (this.props.visible !== undefined) ? this.props.visible : this.state.showPopper;

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
          <div ref="popper" className={ this.classNames("el-tooltip__popper", `is-${effect}`) }>
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
  // 手动控制状态的展示
  visible: PropTypes.bool
};

Tooltip.defaultProps = {
  effect: "dark",
  placement: "bottom",
  disabled: false,
  transition: "fade-in-linear",
  visibleArrow: true,
  openDelay: 0,
  manual: false
};
