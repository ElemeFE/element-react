import React from 'react';
import { Component, PropTypes } from '../../libs';

import Input from './input';
import i18n from './locale';

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
      multiple: this.props.multiple
    };
  }

  iconClass() {
    return this.showCloseIcon() ? 'circle-close' : (this.props.remote && this.props.filterable ? '' : 'caret-top');
  }

  debounce() {
    return this.props.remote ? 300 : 0;
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
    if (this.props.loading) {
      return i18n.t('el.select.loading');
    } else {
      if (this.state.voidRemoteQuery) {
        this.state.voidRemoteQuery = false;

        return false;
      }
      if (this.props.filterable && this.state.filteredOptionsCount === 0) {
        return i18n.t('el.select.noMatch');
      }
      if (this.options.length === 0) {
        return i18n.t('el.select.noData');
      }
    }
    return null;
  }

  toggleMenu() {

  }

  render() {
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
                  <Input
                    ref="input"
                    type="text"
                    className="el-select__input"
                    debounce={this.debounce()}
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
          placeholder="currentPlaceholder"
          name="name"
          disabled={disabled}
          readonly={!filterable || multiple}
          icon={this.iconClass()}
        />
        <transition name="md-fade-bottom">
          <View show={visible && this.emptyText() !== false}>
            <Dropdown ref="popper">
              <View show={options.length > 0 && filteredOptionsCount > 0 && !loading}></View>
              <ul className="el-select-dropdown__list">
                {this.props.children}
              </ul>
              { this.emptyText() && <p className="el-select-dropdown__empty">{this.emptyText()}</p> }
            </Dropdown>
          </View>
        </transition>
      </div>
    )
  }
}

Select.childContextTypes = {
  multiple: PropTypes.bool
};

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.object,
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
