import React from 'react';
import { Component, PropTypes, View } from '../../libs';

export default class Option extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: -1,
      visible: true,
      hitState: false
    }
  }

  componentWillMount() {
    this.parent().onOptionCreate(this);

    this.setState({
      index: this.parent().state.options.indexOf(this)
    });

    if (this.currentSelected() === true) {
      this.parent().addOptionToValue(this, true);
    }
  }

  componentWillUnmount() {
    this.parent().onOptionDestroy(this);
  }

  parent() {
    return this.context.component;
  }

  currentSelected() {
    return this.props.selected || (this.parent().props.multiple ?
      this.parent().state.value.indexOf(this.props.value) > -1 :
      this.parent().state.value === this.props.value);
  }

  currentLabel() {
    return this.props.label || ((typeof this.props.value === 'string' || typeof this.props.value === 'number') ? this.props.value : '');
  }

  itemSelected() {
    if (Object.prototype.toString.call(this.parent().state.selected) === '[object Object]') {
      return this === this.parent().state.selected;
    } else if (Array.isArray(this.parent().state.selected)) {
      return this.parent().state.selected.map(el => el.props.value).indexOf(this.props.value) > -1;
    }
  }

  hoverItem() {
    if (!this.props.disabled && !this.parent().props.disabled) {
      this.parent().setState({
        hoverIndex: this.parent().state.options.indexOf(this)
      });
    }
  }

  selectOptionClick() {
    if (this.props.disabled !== true && this.parent().props.disabled !== true) {
      this.parent().onOptionClick(this);
    }
  }

  queryChange(query) {
    // query 里如果有正则中的特殊字符，需要先将这些字符转义
    let parsedQuery = query.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');

    const visible = new RegExp(parsedQuery, 'i').test(this.currentLabel());

    if (!visible) {
      this.parent().setState({
        filteredOptionsCount: this.parent().state.filteredOptionsCount - 1
      });
    }

    this.setState({ visible });
  }

  resetIndex() {
    this.setState({
      index: this.parent().state.options.indexOf(this)
    });
  }

  render() {
    const { visible, index } = this.state;

    return (
      <View show={visible}>
        <li
          style={this.style()}
          className={this.className('el-select-dropdown__item', {
            'selected': this.itemSelected(),
            'is-disabled': this.props.disabled || this.parent().props.disabled,
            'hover': this.parent().state.hoverIndex === index
          })}
          onMouseEnter={this.hoverItem.bind(this)}
          onClick={this.selectOptionClick.bind(this)}
        >
          { this.props.children || <span>{this.currentLabel()}</span> }
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
