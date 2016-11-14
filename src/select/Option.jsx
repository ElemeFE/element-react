import React from 'react';
import { Component, PropTypes, View } from '../../libs';

export default class Option extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false
    }
  }

  currentLabel() {
    return this.props.label || ((typeof this.props.value === 'string' || typeof this.props.value === 'number') ? this.props.value : '');
  }

  parent() {
    // let result = this.$parent;
    // while (!result.isSelect) {
    //   result = result.$parent;
    // }
    // return result;
  }

  itemSelected() {
    if (Object.prototype.toString.call(this.parent.selected) === '[object Object]') {
      return this === this.parent.selected;
    } else if (Array.isArray(this.parent.selected)) {
      return this.parent.value.indexOf(this.value) > -1;
    }
  }

  currentSelected() {
    return this.props.selected || (this.context.multiple ? this.parent.value.indexOf(this.value) > -1 : this.parent.value === this.value);
  }

  handleGroupDisabled(val) {
    this.groupDisabled = val;
  }

  hoverItem() {
    if (!this.disabled && !this.groupDisabled) {
      this.parent.hoverIndex = this.parent.options.indexOf(this);
    }
  }

  selectOptionClick() {
    if (this.disabled !== true && this.groupDisabled !== true) {
      this.dispatch('select', 'handleOptionClick', this);
    }
  }

  queryChange(query) {
    // query 里如果有正则中的特殊字符，需要先将这些字符转义
    let parsedQuery = query.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
    this.visible = new RegExp(parsedQuery, 'i').test(this.currentLabel);
    if (!this.visible) {
      this.parent.filteredOptionsCount--;
    }
  }

  resetIndex() {
    this.$nextTick(() => {
      this.index = this.parent.options.indexOf(this);
    });
  }

  render() {
    const { visible, index, groupDisabled } = this.state;
    const { disabled } = this.props;

    return (
      <View show={visible}>
        <li
          className={this.classNames('el-select-dropdown__item', {
            'selected': this.itemSelected(), 'is-disabled': disabled || groupDisabled, 'hover': parent.hoverIndex === index
          })}
          onMouseEnter={this.hoverItem.bind(this)}
          onClick={this.selectOptionClick.bind(this)}
        >
          <slot>
            <span>{this.currentLabel()}</span>
          </slot>
        </li>
      </View>
    )
  }
}

Option.contextTypes = {
  component: PropTypes.any
};

Option.propTypes = {
  value: PropTypes.any.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool,
  disabled: PropTypes.bool
}
