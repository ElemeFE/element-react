import React, { PropTypes } from 'react';
import { Component } from '../../libs';

export default class Rate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverIndex: -1, // hover索引
      hoverColor: '', // hover颜色
      value: this.props.value - 1, // value
      formatValue: this.props.value - 1, // 处理后的value
    };
  }
  componentDidMount() {
    this.hoverStyle();
    this.formatValue();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  handleHover(k) {
    if (this.props.disabled) return false;
    this.setState({
      hoverIndex: k,
    }, () => this.hoverStyle());
  }

  handleClick(k) {
    if (this.props.disabled) return false;
    this.setState({
      value: k,
      formatValue: k,
    }, () => this.hoverStyle());
    if (this.props.change) this.props.change(k + 1);
  }

  hoverStyle() {
    const { colors } = this.props;
    const { hoverIndex, value } = this.state;
    const setCurIndex = hoverIndex === -1 ? value : hoverIndex;
    let hoverColor = '';
    if (setCurIndex <= 1) hoverColor = colors[0];
    else if (setCurIndex === 2) hoverColor = colors[1];
    else hoverColor = colors[2];
    this.setState({
      hoverColor,
    });
  }

  formatValue() {
    let { value } = this.state;
    const pointSplit = value.toString().split('.');
    if(!pointSplit[1]) return false;
    value = Number(pointSplit[1].slice(0, 1)) >= 5 ? Number(`${pointSplit[0]}.5`) : Number(pointSplit[0]);
    this.setState({
      formatValue: value,
    })
    console.log(value)
  }
 
  render() {
    const { hoverIndex, hoverColor, value, formatValue } = this.state;
    const { texts, disabled } = this.props;
    const rateHoverClassnames = 'el-rate__icon el-icon-star-on';
    const setCurIndex = hoverIndex === -1 ? value : hoverIndex;
    const formatValueSplit = formatValue.toString().split('.');
    return (
      <div className="el-rate">
        {
          Array(5).join(',').split(',').map((v, k) => 
            <span className="el-rate__item" key={k}>
              <i 
                style={{color: setCurIndex >= k ? hoverColor : ''}}
                className={hoverIndex === k ? `${rateHoverClassnames} hover` : rateHoverClassnames}
                onClick={() => this.handleClick(k)}
                onMouseLeave={() => this.handleHover(-1)} 
                onMouseEnter={() => this.handleHover(k)}>
                {
                  formatValueSplit[1] && k === Number(formatValueSplit[0]) + 1 ? 
                    <i 
                      style={{color: hoverColor, width: '50%'}}
                      className="el-rate__decimal el-icon-star-on">
                    </i> : null
                }

              </i>
            </span>
          )
        }
        {
          (setCurIndex !== -1 && this.props['show-text']) || disabled ?
            <span 
              className="el-rate__text" 
              style={{color: this.props['text-color']}}>
              {disabled && this.props['text-template'] ? this.props.value : texts[setCurIndex]}
            </span> : null
        }
        
      </div>
    )
  }
}

Rate.propTypes = {
  'colors': PropTypes.array,
  'texts': PropTypes.array,
  'show-text': PropTypes.bool,
  'text-color': PropTypes.string,
  'disabled': PropTypes.bool,
  'value': PropTypes.number,
  'change': PropTypes.func,
  'text-template': PropTypes.bool,
}

Rate.defaultProps = {
  'colors': ['#F7BA2A', '#F7BA2A', '#F7BA2A'], // icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色
  'texts': ['极差', '失望', '一般', '满意', '惊喜'], // 辅助文字数组
  'show-text': false, // 是否显示辅助文字
  'text-color': '#1F2D3D', //   辅助文字的颜色
  'disabled': false, // 是否为只读
  'value': 0, // 星级
}
