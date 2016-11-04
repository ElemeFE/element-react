// import React, { PropTypes } from 'react';
// import { Component } from '../../libs';

// export default class Rate extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       hoverIndex: -1, // hover索引
//       hoverColor: '', // hover颜色
//       value: this.props.value - 1, // value
//       formatValue: this.props.value - 1, // 处理后的value
//     };
//   }
//   componentDidMount() {
//     this.hoverStyle();
//     this.formatValue();
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.value && this.props.value !== nextProps.value) {
//       this.setState({
//         value: nextProps.value,
//       })
//     }
//   }

//   handleHover(k) {
//     if (this.props.disabled) return false;
//     this.setState({
//       hoverIndex: k,
//     }, () => this.hoverStyle());
//   }

//   handleClick(k) {
//     if (this.props.disabled) return false;
//     this.setState({
//       value: k,
//       formatValue: k,
//     }, () => this.hoverStyle());
//     if (this.props.change) this.props.change(k + 1);
//   }

//   hoverStyle() { // hover和click的样式
//     const { colors, low_threshold, high_threshold } = this.props;
//     const { hoverIndex, value } = this.state;
//     const setCurIndex = hoverIndex === -1 ? value : hoverIndex;
//     let hoverColor = '';
//     if (setCurIndex <= (low_threshold - 1)) hoverColor = colors[0];
//     else if (setCurIndex >= (high_threshold - 1)) hoverColor = colors[2];
//     else hoverColor = colors[1];
//     this.setState({
//       hoverColor,
//     });
//   }

//   formatValue() { // 格式化value，将value最多保留到.5
//     let { value } = this.state;
//     const pointSplit = value.toString().split('.');
//     if(!pointSplit[1]) return false;
//     value = Number(pointSplit[1].slice(0, 1)) >= 5 ? Number(`${pointSplit[0]}.5`) : Number(pointSplit[0]);
//     this.setState({
//       formatValue: value,
//     })
//     console.log(value)
//   }

//   showTextTemplate() { // 解析模版
//     let { text_template } = this.props;
//     if (!text_template) return false;
//     text_template = text_template.replace("{value}", this.state.value + 1);
//     return text_template;
//   }
 
//   render() {
//     const { hoverIndex, hoverColor, value, formatValue } = this.state;
//     const { texts, disabled, text_color, text_template, show_text } = this.props;
//     const rateHoverClassnames = 'el-rate__icon el-icon-star-on';
//     const setCurIndex = hoverIndex === -1 ? value : hoverIndex;
//     const formatValueSplit = formatValue.toString().split('.');
//     return (
//       <div className="el-rate">
//         {
//           Array(5).join(',').split(',').map((v, k) => 
//             <span className="el-rate__item" key={k}>
//               <i 
//                 style={{color: setCurIndex >= k ? hoverColor : ''}}
//                 className={hoverIndex === k ? `${rateHoverClassnames} hover` : rateHoverClassnames}
//                 onClick={() => this.handleClick(k)}
//                 onMouseLeave={() => this.handleHover(-1)} 
//                 onMouseEnter={() => this.handleHover(k)}>
//                 {
//                   formatValueSplit[1] && k === Number(formatValueSplit[0]) + 1 ? 
//                     <i 
//                       style={{color: hoverColor, width: '50%'}}
//                       className="el-rate__decimal el-icon-star-on">
//                     </i> : null
//                 }

//               </i>
//             </span>
//           )
//         }
//         {
//           (setCurIndex !== -1 && show_text) || disabled ?
//             <span 
//               className="el-rate__text" 
//               style={{color: text_color}}>
//               {disabled ? this.showTextTemplate() : texts[setCurIndex]}
//             </span> : null
//         }
        
//       </div>
//     )
//   }
// }

// Rate.propTypes = {
//   'colors': PropTypes.array,
//   'texts': PropTypes.array,
//   'show_text': PropTypes.bool,
//   'text_color': PropTypes.string,
//   'disabled': PropTypes.bool,
//   'value': PropTypes.number,
//   'change': PropTypes.func,
//   'text_template': PropTypes.string,
//   'low_threshold': PropTypes.number,
//   'high_threshold': PropTypes.number,
// }

// Rate.defaultProps = {
//   'colors': ['#F7BA2A', '#F7BA2A', '#F7BA2A'], // icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色
//   'texts': ['极差', '失望', '一般', '满意', '惊喜'], // 辅助文字数组
//   'show_text': false, // 是否显示辅助文字
//   'text_color': '#1F2D3D', //   辅助文字的颜色
//   'disabled': false, // 是否为只读
//   'value': 0, // 星级
//   'low_threshold': 2, // 低分和中等分数的界限值，值本身被划分在低分中
//   'high_threshold': 4, // 高分和中等分数的界限值，值本身被划分在高分中
// }


import React, { PropTypes } from 'react';
import { Component } from '../../libs';

export default class Rate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classMap: {},
      colorMap: {},
      classes: null,
      pointerAtLeftHalf: false,
      currentValue: this.props.value - 1,
      hoverIndex: -1
    };
    const { iconClasses, voidIconClass, disabledVoidIconClass, colors, voidColor, disabledVoidColor } = this.props;
    this.classMap = {
      lowClass: iconClasses[0],
      mediumClass: iconClasses[1],
      highClass: iconClasses[2],
      voidClass: voidIconClass,
      disabledVoidClass: disabledVoidIconClass
    };
    this.colorMap = {
      lowColor: colors[0],
      mediumColor: colors[1],
      highColor: colors[2],
      voidColor: voidColor,
      disabledVoidColor: disabledVoidColor
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  

  setCurrentValue(value) {
    const { disabled, allowHalf } = this.props;
    const { pointerAtLeftHalf, currentValue, hoverIndex } = this.state;
    if (disabled) {
      return;
    }
    /* istanbul ignore if */
    if (allowHalf) {
      // let target = window.event.target;
      // console.log(target)
      // if (hasClass(target, 'el-rate__item')) {
      //   target = target.querySelector('.el-rate__icon');
      // }
      // if (hasClass(target, 'el-rate__decimal')) {
      //   target = target.parentNode;
      // }
      // this.setState({
      //   pointerAtLeftHalf: event.offsetX * 2 <= target.clientWidth,
      //   currentValue: (event.offsetX * 2 <= target.clientWidth) ? value - 0.5 : value
      // })
    } else {
      this.setState({
        currentValue: value,
      })
    }
    this.setState({
      hoverIndex: value,
    })
  }


  // value(val) {
  //   // this.$emit('change', val);
  //   this.setState({
  //     currentValue: val,
  //   })
  // }

  getValueFromMap(value, map) {
    const { lowThreshold, highThreshold } = this.props;
    let result = '';
    if (value <= (lowThreshold - 1)) {
      result = map.lowColor || map.lowClass;
    } else if (value >= (highThreshold - 1)) {
      result = map.highColor || map.highClass;
    } else {
      result = map.mediumColor || map.mediumClass;
    }
    return result;
  }


  getIconStyle(item) {
    const { disabled } = this.props;
    const { currentValue } = this.state;
    const voidColor = disabled ? this.colorMap.disabledVoidColor : this.colorMap.voidColor;
    return {
      color: item <= currentValue ? this.activeColor() : voidColor
    };
  }

  showDecimalIcon(item) {
    const { disabled, allowHalf, value } = this.props;
    const { pointerAtLeftHalf, currentValue } = this.state;
    let showWhenDisabled = disabled && this.valueDecimal() > 0 && item - 1 < (value - 1) && item > (value - 1);
    /* istanbul ignore next */
    let showWhenAllowHalf = allowHalf && pointerAtLeftHalf && ((item - 0.5).toFixed(1) === currentValue.toFixed(1));
    return showWhenDisabled || showWhenAllowHalf;
  }
  classes() {
    const { currentValue } = this.state;
    const { allowHalf, max } = this.props;
    let result = [];
    let i = 0;
    let threshold = currentValue;
    if (allowHalf && currentValue !== Math.floor(currentValue)) {
      threshold--;
    }
    for (; i <= threshold; i++) {
      result.push(this.activeClass());
    }
    for (; i < max; i++) {
      result.push(this.voidClass());
    }
    return result;
  }

  valueDecimal() {
    const { value } = this.props;
    return value * 100 - Math.floor(value) * 100;
  }

  decimalIconClass() {
    return this.getValueFromMap(this.props.value, this.classMap);
  }

  voidClass() {
    return this.props.disabled ? this.classMap.disabledVoidClass : this.classMap.voidClass;
  }

  activeClass() {
    return this.getValueFromMap(this.state.currentValue, this.classMap);
  }

  activeColor() {
    return this.getValueFromMap(this.state.currentValue, this.colorMap);
  }

  selectValue(value) {
    const { disabled, allowHalf } = this.props;
    const { pointerAtLeftHalf, currentValue } = this.state;
    if (disabled) {
      return;
    }
    if (allowHalf && pointerAtLeftHalf) {
      // this.$emit('input', this.currentValue);
    } else {
      this.setState({
        currentValue: value,
        value,
      }, () => this.props.change(value + 1))
    }
  }

  decimalStyle() {
    const { disabled, allowHalf } = this.props;
    let width = '';
    if (disabled) {
      width = `${ this.valueDecimal() < 50 ? 0 : 50 }%`;
    }
    if (allowHalf) {
      width = '50%';
    }
    return {
      color: this.activeColor(),
      width
    };
  }

  showText() {
    const { disabled, texts, textTemplate, value } = this.props;
    const { currentValue } = this.state;
    let result = '';
    if (disabled) {
      result = textTemplate.replace(/\{\s*value\s*\}/, value);
    } else {
      result = texts[Math.ceil(currentValue)];
    }
    return result;
  }

  resetCurrentValue() {
    const { disabled, allowHalf } = this.props;
    const { value } = this.state;
    if (disabled) {
      return;
    }
    if (allowHalf) {
      this.setState({
        pointerAtLeftHalf: value !== Math.floor(value),
      })
    }
    this.setState({
      currentValue: value,
      hoverIndex: -1,
    })

  }
 
  render() {
    const { showText, textColor, disabled } = this.props;
    const { hoverIndex } = this.state;
    return (
      <div className="el-rate">
        {
          Array(5).join(',').split(',').map((v, k) => 
            <span 
              className="el-rate__item" 
              style={{ cursor: disabled ? 'auto' : 'pointer' }}
              onClick={() => this.selectValue(k)}
              onMouseMove={() => this.setCurrentValue(k)} 
              onMouseLeave={() => this.resetCurrentValue()}
              key={k}>
              <i
                style={this.getIconStyle(k)}
                className={hoverIndex === k ? `hover el-rate__icon ${this.classes()[k]}` : `el-rate__icon ${this.classes()[k]}`}>
                {
                  this.showDecimalIcon(k) ?
                    <i 
                      style={this.decimalStyle()}
                      className={`el-rate__decimal ${this.decimalIconClass()}`}>
                    </i> : null
                }

              </i>
            </span>
          )
        }
        {
          showText ? 
            <span className="el-rate__text" style={{ color: textColor }}>{ this.showText() }</span>
          : null
        }
        
      </div>
    )
  }
}

Rate.propTypes = {
  'colors': PropTypes.array,
  'texts': PropTypes.array,
  'showText': PropTypes.bool,
  'textColor': PropTypes.string,
  'disabled': PropTypes.bool,
  'value': PropTypes.number,
  'change': PropTypes.func,
  'textTemplate': PropTypes.string,
  'lowThreshold': PropTypes.number,
  'highThreshold': PropTypes.number,
  'max': PropTypes.number,
  'voidColor': PropTypes.string,
  'disabledVoidColor': PropTypes.string,
  'iconClasses': PropTypes.array,
  'voidIconClass': PropTypes.string,
  'disabledVoidIconClass': PropTypes.string,
  'allowHalf': PropTypes.bool,
}

Rate.defaultProps = {
  'colors': ['#F7BA2A', '#F7BA2A', '#F7BA2A'], // icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色
  'texts': ['极差', '失望', '一般', '满意', '惊喜'], // 辅助文字数组
  'showText': false, // 是否显示辅助文字
  'textColor': '#1F2D3D', //   辅助文字的颜色
  'disabled': false, // 是否为只读
  'value': 0, // 星级
  'lowThreshold': 2, // 低分和中等分数的界限值，值本身被划分在低分中
  'highThreshold': 4, // 高分和中等分数的界限值，值本身被划分在高分中
  'max': 5, 
  'voidColor': '#C6D1DE',
  'disabledVoidColor': '#EFF2F7',
  'iconClasses': ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
  'voidIconClass': 'el-icon-star-off',
  'disabledVoidIconClass': 'el-icon-star-on',
  'allowHalf': false,
  'textTemplate': '{value}',
  'change': (val) => { console.log(val) }
}

