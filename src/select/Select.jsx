import React from 'react';
import { Component, PropTypes, View } from '../../libs';
import DebounceInput from 'react-debounce-input';

import Input from '../input';
import i18n from '../locale';

import Dropdown from './Dropdown';

export default class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      selected: {},
      isSelect: true,
      inputLength: 20,
      inputWidth: 0,
      valueChangeBySelected: false,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      dropdownUl: null,
      visible: false,
      selectedLabel: '',
      selectInit: false,
      hoverIndex: -1,
      query: '',
      voidRemoteQuery: false,
      bottomOverflowBeforeHidden: 0,
      optionsAllDisabled: false,
      inputHovering: false,
      currentPlaceholder: ''
    }
  }

  getChildContext() {
    return {
      component: this,
      multiple: this.props.multiple
    };
  }

  iconClass() {
    return this.showCloseIcon() ? 'circle-close' : (this.props.remote && this.props.filterable ? '' : 'caret-top');
  }

  showCloseIcon() {
    let criteria = this.props.clearable && this.state.inputHovering && !this.props.multiple && this.state.options.indexOf(this.state.selected) > -1;

    if (!this.$el) return false;

    let icon = this.$el.querySelector('.el-input__icon');

    if (icon) {
      if (criteria) {
        icon.addEventListener('click', this.deleteSelected);
        addClass(icon, 'is-show-close');
      } else {
        icon.removeEventListener('click', this.deleteSelected);
        removeClass(icon, 'is-show-close');
      }
    }

    return criteria;
  }

  emptyText() {
    const { loading, filterable } = this.props;
    const { voidRemoteQuery, options, filteredOptionsCount } = this.state;

    if (loading) {
      return i18n.t('el.select.loading');
    } else {
      if (voidRemoteQuery) {
        this.state.voidRemoteQuery = false;

        return false;
      }

      if (filterable && filteredOptionsCount === 0) {
        return i18n.t('el.select.noMatch');
      }

      if (options.length === 0) {
        return i18n.t('el.select.noData');
      }
    }

    return null;
  }

  doDestroy() {
    this.$refs.popper.doDestroy();
  }

  handleClose() {
    this.visible = false;
  }

  toggleLastOptionHitState(hit) {
    if (!Array.isArray(this.selected)) return;
    const option = this.selected[this.selected.length - 1];
    if (!option) return;
    if (hit === true || hit === false) {
      option.hitState = hit;
      return hit;
    }
    option.hitState = !option.hitState;
    return option.hitState;
  }

  deletePrevTag(e) {
    if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
      this.selected.pop();
    }
  }

  addOptionToValue(option, init) {
    if (this.multiple) {
      if (this.selected.indexOf(option) === -1 && (this.remote ? this.value.indexOf(option.value) === -1 : true)) {
        this.selectedInit = !!init;
        this.selected.push(option);
        this.resetHoverIndex();
      }
    } else {
      this.selectedInit = !!init;
      this.selected = option;
      this.selectedLabel = option.currentLabel;
      this.hoverIndex = option.index;
    }
  }

  managePlaceholder() {
    if (this.currentPlaceholder !== '') {
      this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
    }
  }

  resetInputState(e) {
    if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
    this.inputLength = this.$refs.input.value.length * 15 + 20;
  }

  resetInputHeight() {
    this.$nextTick(() => {
      let inputChildNodes = this.$refs.reference.$el.childNodes;
      let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0];
      input.style.height = Math.max(this.$refs.tags.clientHeight + 6, this.size === 'small' ? 28 : 36) + 'px';
      this.broadcast('select-dropdown', 'updatePopper');
    });
  }

  resetHoverIndex() {
    setTimeout(() => {
      if (!this.multiple) {
        this.hoverIndex = this.options.indexOf(this.selected);
      } else {
        if (this.selected.length > 0) {
          this.hoverIndex = Math.min.apply(null, this.selected.map(item => this.options.indexOf(item)));
        } else {
          this.hoverIndex = -1;
        }
      }
    }, 300);
  }

  handleOptionSelect(option) {
    if (!this.multiple) {
      this.selected = option;
      this.selectedLabel = option.currentLabel;
      this.visible = false;
    } else {
      let optionIndex = -1;
      this.selected.forEach((item, index) => {
        if (item === option || item.currentLabel === option.currentLabel) {
          optionIndex = index;
        }
      });
      if (optionIndex > -1) {
        this.selected.splice(optionIndex, 1);
      } else {
        this.selected.push(option);
      }
    }
  }

  toggleMenu() {
    const { filterable, disabled } = this.props;
    const { query, visible } = this.state;

    if (filterable && query === '' && visible) {
      return;
    }

    if (!disabled) {
      this.setState({
        visible: !visible
      });
    }
  }

  navigateOptions(direction) {
    if (!this.visible) {
      this.visible = true;
      return;
    }
    if (!this.optionsAllDisabled) {
      if (direction === 'next') {
        this.hoverIndex++;
        if (this.hoverIndex === this.options.length) {
          this.hoverIndex = 0;
        }
        this.resetScrollTop();
        if (this.options[this.hoverIndex].disabled === true ||
          this.options[this.hoverIndex].groupDisabled === true ||
          !this.options[this.hoverIndex].visible) {
          this.navigateOptions('next');
        }
      }
      if (direction === 'prev') {
        this.hoverIndex--;
        if (this.hoverIndex < 0) {
          this.hoverIndex = this.options.length - 1;
        }
        this.resetScrollTop();
        if (this.options[this.hoverIndex].disabled === true ||
          this.options[this.hoverIndex].groupDisabled === true ||
          !this.options[this.hoverIndex].visible) {
          this.navigateOptions('prev');
        }
      }
    }
  }

  resetScrollTop() {
    let bottomOverflowDistance = this.options[this.hoverIndex].$el.getBoundingClientRect().bottom - this.$refs.popper.$el.getBoundingClientRect().bottom;
    let topOverflowDistance = this.options[this.hoverIndex].$el.getBoundingClientRect().top - this.$refs.popper.$el.getBoundingClientRect().top;
    if (bottomOverflowDistance > 0) {
      this.dropdownUl.scrollTop += bottomOverflowDistance;
    }
    if (topOverflowDistance < 0) {
      this.dropdownUl.scrollTop += topOverflowDistance;
    }
  }

  selectOption() {
    if (this.options[this.hoverIndex]) {
      this.handleOptionSelect(this.options[this.hoverIndex]);
    }
  }

  deleteSelected(event) {
    event.stopPropagation();
    this.selected = {};
    this.selectedLabel = '';
    this.$emit('input', '');
    this.$emit('change', '');
    this.visible = false;
  }

  deleteTag(event, tag) {
    let index = this.selected.indexOf(tag);
    if (index > -1) {
      this.selected.splice(index, 1);
    }
    event.stopPropagation();
  }

  onInputChange() {
    if (this.filterable && this.selectedLabel !== this.value) {
      this.query = this.selectedLabel;
    }
  }

  onOptionDestroy(option) {
    this.optionsCount--;
    this.filteredOptionsCount--;
    let index = this.options.indexOf(option);
    if (index > -1) {
      this.options.splice(index, 1);
    }
    this.broadcast('option', 'resetIndex');
  }

  resetInputWidth() {
    this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
  }

  render() {
    const { multiple, size, disabled, filterable, loading, remote } = this.props;
    const { inputWidth, inputLength, selectedLabel, visible, options, filteredOptionsCount, currentPlaceholder } = this.state;

    return (
      <div
        className={this.classNames('el-select', {
          'is-multiple': multiple,
          'is-small': size === 'small'
        })}>
        {
          multiple && (
            <div ref="tags" className="el-select__tags" onClick={this.toggleMenu.bind(this)} style={{
              'max-width': inputWidth - 32 + 'px'
            }}>
              {
                filterable && (
                  <DebounceInput
                    ref="input"
                    type="text"
                    className="el-select__input"
                    debounceTimeout={remote ? 300 : 0}
                    style={{
                      width: inputLength + 'px',
                      'max-width': inputWidth - 42 + 'px'
                    }}
                  />
                )
              }
            </div>
          )
        }
        <Input
          ref="reference"
          value={selectedLabel}
          type="text"
          placeholder={currentPlaceholder}
          name="name"
          disabled={disabled}
          readOnly={!filterable || multiple}
          icon={this.iconClass()}
          onClick={this.toggleMenu.bind(this)}
        />
        <transition name="md-fade-bottom">
          <View show={visible && this.emptyText() !== false}>
            <Dropdown ref="popper">
              <View show={options.length > 0 && filteredOptionsCount > 0 && !loading}>
                <ul className="el-select-dropdown__list">
                  {this.props.children}
                </ul>
                { this.emptyText() && <p className="el-select-dropdown__empty">{this.emptyText()}</p> }
              </View>
            </Dropdown>
          </View>
        </transition>
      </div>
    )
  }
}

Select.childContextTypes = {
  component: PropTypes.any,
  multiple: PropTypes.bool
};

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  filterable: PropTypes.bool,
  loading: PropTypes.bool,
  remote: PropTypes.bool,
  remoteMethod: PropTypes.func,
  filterMethod: PropTypes.func,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string
}

Select.defaultProps = {
  placeholder: i18n.t('el.select.placeholder')
}
