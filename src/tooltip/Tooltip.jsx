/* @flow */

import React from 'react';
import Popper from '../../libs/utils/popper';
import { Component, PropTypes, Transition, View } from '../../libs';

type State = {
  showPopper: boolean;
}

export default class Tooltip extends Component {
  state: State;

  static defaultProps = {
    effect: "dark",
    placement: "bottom",
    disabled: false,
    transition: "fade-in-linear",
    visibleArrow: true,
    openDelay: 0,
    manual: false
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      showPopper: false
    }
  }

  componentWillReceiveProps(props: Object) {
    if (props.visible != this.props.visible) {
      this.setState({
        showPopper: props.visible
      });
    }
  }

  showPopper(): void {
    if (!this.props.manual) {
      this.timeout = setTimeout(() => {
        this.setState({ showPopper: true });
      }, this.props.openDelay);
    }
  }

  hidePopper(): void {
    if (!this.props.manual) {
      clearTimeout(this.timeout);
      this.setState({ showPopper: false });
    }
  }

  onEnter(): void {
    const { popper, reference, arrow } = this.refs;

    if (arrow) {
      arrow.setAttribute('x-arrow', '');
    }

    this.popperJS = new Popper(reference, popper, {
      placement: this.props.placement,
      gpuAcceleration: false
    });
  }

  onAfterLeave(): void {
    this.popperJS.destroy();
  }

  render(): React.Element<any> {
    const { effect, content, disabled, transition, visibleArrow } = this.props;

    return (
      <div style={this.style()} className={this.className('el-tooltip')} onMouseEnter={this.showPopper.bind(this)} onMouseLeave={this.hidePopper.bind(this)}>
        <div ref="reference" className="el-tooltip__rel">
          <div>{ this.props.children }</div>
        </div>
        {
          !disabled && (
            <Transition name={transition} onEnter={this.onEnter.bind(this)} onAfterLeave={this.onAfterLeave.bind(this)}>
              <View show={this.state.showPopper} >
                <div ref="popper" className={ this.classNames("el-tooltip__popper", `is-${effect}`) }>
                  <div>{ content }</div>
                  { visibleArrow && <div ref="arrow" className="popper__arrow"></div> }
                </div>
              </View>
            </Transition>
          )
        }
      </div>
    )
  }
}

Tooltip.propTypes = {
  // 默认提供的主题: dark, light
  effect: PropTypes.string,
  // 显示的内容，也可以通过 slot#content 传入 DOM
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  // Tooltip 的出现位置 [top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end]
  placement: PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
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
