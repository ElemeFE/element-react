import React from 'react';
import { findDOMNode } from 'react-dom';
import DebounceInput from 'react-debounce-input';
import { Component, PropTypes, Transition, View } from '../../libs';
import { addResizeListener, removeResizeListener } from '../../libs/utils/resize-event';

import Input from '../input';
import i18n from '../locale';

import Dropdown from './Dropdown';

export default class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: {},
      isSelect: true,
      inputLength: 20,
      inputWidth: 0,
      valueChangeBySelected: false,
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
      inputHovering: false,
      cachedPlaceHolder: props.placeholder,
      currentPlaceholder: props.placeholder
    };

    this.state.options = this.getOptions(props);
    this.state.optionsAllDisabled = this.getOptionsAllDisabled(this.state.options);

    if (props.multiple) {
      this.state.selectedInit = true;
      this.state.selected = [];
    }

    if (props.remote) {
      this.state.voidRemoteQuery = true;
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { remote, multiple, value } = this.props;

    this.findDOMNodes();

    if (remote && multiple && Array.isArray(value)) {
      this.setState({
        selected: this.state.options.reduce((prev, curr) => {
          return value.indexOf(curr.value) > -1 ? prev.concat(curr) : prev;
        }, [])
      }, () => {
        this.resetInputHeight();
      });
    }

    addResizeListener(this.root, this.resetInputWidth.bind(this));
  }

  componentDidUpdate(props, state) {
    this.findDOMNodes();

    if (this.refs.reference) {
      this.state.inputWidth = this.reference.getBoundingClientRect().width;
    }

    if (state.visible != this.state.visible) {
      this.updateVisible(state.visible);
    }

    if (state.query != this.state.query) {
      this.updateQuery(state.query);
    }

    if (state.selected != this.state.selected) {
      this.updateSelected(state.selected, this.state.selected);
    }
  }

  componentWillReceiveProps(props) {
    if (props.value != this.props.value) {
      this.updateValue(props.value);
    }

    if (props.placeholder != this.props.placeholder) {
      this.setState({
        currentPlaceholder: props.placeholder
      });
    }

    if (props.children != this.props.children) {
      const options = this.getOptions(props);

      this.setState({
        options: options,
        optionsAllDisabled: this.getOptions(options)
      });
    }
  }

  componentWillUnMount() {
    if (this.resetInputWidth()){
      removeResizeListener(this.root, this.resetInputWidth.bind(this));
    }
  }

  findDOMNodes() {
    this.reference = findDOMNode(this.refs.reference);
    this.popper = findDOMNode(this.refs.popper);
    this.root = findDOMNode(this);
  }

  updateValue(val) {
    const { multiple } = this.props;
    let { options, valueChangeBySelected, selectedInit, selected, selectedLabel, currentPlaceholder, cachedPlaceHolder } = this.state;

    if (valueChangeBySelected) {
      return this.setState({
        valueChangeBySelected: false
      });
    }

    if (multiple && Array.isArray(val)) {
      this.resetInputHeight();

      selectedInit = true;
      selected = [];
      currentPlaceholder = cachedPlaceHolder;

      val.forEach(item => {
        let option = this.options.filter(option => option.value === item)[0];
        if (option) {
          this.addOptionToValue(option);
        }
      });
    }

    if (!multiple) {
      let option = options.filter(option => option.value === val)[0];

      if (option) {
        this.addOptionToValue(option);
      } else {
        selected = {};
        selectedLabel = '';
      }
    }

    this.setState({ selectedInit, selected, currentPlaceholder, selectedLabel }, () => {
      this.resetHoverIndex();
    });
  }

  updateSelected(val, oldVal) {
    const { multiple, filterable } = this.props;
    let { query, hoverIndex, inputLength, selected, selectedInit, currentPlaceholder, cachedPlaceHolder, valueChangeBySelected } = this.state;

    if (multiple) {
      if (selected.length > 0) {
        currentPlaceholder = '';
      } else {
        currentPlaceholder = cachedPlaceHolder;
      }

      this.setState({ currentPlaceholder }, () => {
        this.resetInputHeight();
      });

      if (selectedInit) {
        return this.setState({
          selectedInit: false
        });
      }

      valueChangeBySelected = true;

      const result = val.map(item => item.value);

      // this.$emit('input', result);
      // this.$emit('change', result);
      // this.dispatch('form-item', 'el.form.change', val);

      if (filterable) {
        query = '';
        hoverIndex = -1;
        inputLength = 20;

        this.refs.input.focus();
      }

      this.setState({ valueChangeBySelected, query, hoverIndex, inputLength });
    } else {
      if (selectedInit) {
        return this.setState({
          selectedInit: false
        });
      }

      if (val.value === oldVal.value) return;

      // this.$emit('input', val.value);
      // this.$emit('change', val.value);
    }
  }

  updateQuery(query) {
    const { multiple, filterable, remote, remoteMethod, filterMethod } = this.props;
    let { voidRemoteQuery, hoverIndex, filteredOptionsCount, optionsCount } = this.state;

    // this.broadcast('select-dropdown', 'updatePopper');

    if (multiple && filterable) {
      this.resetInputHeight();
    }

    if (remote && typeof remoteMethod === 'function') {
      hoverIndex = -1;
      voidRemoteQuery = query === '';

      remoteMethod(query);

      // this.broadcast('option', 'resetIndex');
    } else if (typeof filterMethod === 'function') {
      filterMethod(query);
    } else {
      filteredOptionsCount = optionsCount;

      // this.broadcast('option', 'queryChange', val);
    }

    this.setState({ hoverIndex, voidRemoteQuery, filteredOptionsCount });
  }

  updateVisible(visible) {
    const { multiple, filterable } = this.props;
    let { query, dropdownUl, selected, selectedLabel, bottomOverflowBeforeHidden } = this.state;

    if (!visible) {
      this.reference.querySelector('input').blur();

      if (this.root.querySelector('.el-input__icon')) {
        const elements = this.root.querySelector('.el-input__icon');

        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.remove('is-reverse');
        }
      }

      // this.broadcast('select-dropdown', 'destroyPopper');

      if (this.refs.input) {
        this.refs.input.blur();
      }

      this.resetHoverIndex();

      if (!multiple) {
        if (dropdownUl && selected.component) {
          bottomOverflowBeforeHidden = findDOMNode(selected.component).getBoundingClientRect().bottom - this.popper.getBoundingClientRect().bottom;
        }
        if (selected && selected.value) {
          selectedLabel = selected.currentLabel;
        }

        this.setState({ bottomOverflowBeforeHidden, selectedLabel });
      }
    } else {
      let icon = this.root.querySelector('.el-input__icon');

      if (icon && !icon.classList.contains('el-icon-circle-close')) {
        const elements = this.root.querySelector('.el-input__icon');

        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.add('is-reverse');
        }
      }

      // this.broadcast('select-dropdown', 'updatePopper');

      if (filterable) {
        query = selectedLabel;

        if (multiple) {
          this.refs.input.focus();
        } else {
          // this.broadcast('input', 'inputSelect');
        }
      }

      if (!dropdownUl) {
        let dropdownChildNodes = this.popper.childNodes;
        dropdownUl = [].filter.call(dropdownChildNodes, item => item.tagName === 'UL')[0];
      }

      if (!multiple && dropdownUl) {
        if (bottomOverflowBeforeHidden > 0) {
          dropdownUl.scrollTop += bottomOverflowBeforeHidden;
        }
      }

      this.setState({ query, dropdownUl });
    }
  }

  getOptions(props) {
    return React.Children.map(props.children, el => {
      return Object.assign({ component: el }, el.props)
    })
  }

  getOptionsAllDisabled(options) {
     return options.length === options.filter(item => item.disabled === true).length;
  }

  getChildContext() {
    return {
      component: this,
      multiple: this.props.multiple,
      onOptionClick: this.handleOptionSelect.bind(this),
      onOptionDestroy: this.onOptionDestroy.bind(this)
    };
  }

  iconClass() {
    return this.showCloseIcon() ? 'circle-close' : (this.props.remote && this.props.filterable ? '' : 'caret-top');
  }

  showCloseIcon() {
    let criteria = this.props.clearable && this.state.inputHovering && !this.props.multiple && this.state.options.indexOf(this.state.selected) > -1;

    if (!this.root) return false;

    let icon = this.root.querySelector('.el-input__icon');

    if (icon) {
      if (criteria) {
        icon.addEventListener('click', this.deleteSelected.bind(this));
        icon.classList.add('is-show-close');
      } else {
        icon.removeEventListener('click', this.deleteSelected.bind(this));
        icon.classList.remove('is-show-close');
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
    this.refs.popper.doDestroy();
  }

  handleClose() {
    this.setState({ visible: false });
  }

  toggleLastOptionHitState(hit) {
    const { selected } = this.state;

    if (!Array.isArray(selected)) return;

    const option = selected[selected.length - 1];

    if (!option) return;

    if (hit === true || hit === false) {
      return option.hitState = hit;
    }

    option.hitState = !option.hitState;

    return option.hitState;
  }

  deletePrevTag(e) {
    if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
      const { selected } = this.state;

      selected.pop();

      this.setState({ selected });
    }
  }

  addOptionToValue(option, init) {
    const { multiple, remote, value } = this.props;
    let { selected, selectedLabel, hoverIndex } = this.state;

    if (multiple) {
      if (selected.indexOf(option) === -1 && (remote ? value.indexOf(option.value) === -1 : true)) {
        this.selectedInit = !!init;

        selected.push(option);

        this.resetHoverIndex();
      }
    } else {
      this.selectedInit = !!init;

      selected = option;
      selectedLabel = option.currentLabel;
      hoverIndex = option.index;
    }

    this.setState({ selected, selectedLabel, hoverIndex });
  }

  managePlaceholder() {
    let { currentPlaceholder, cachedPlaceHolder } = this.state;

    if (currentPlaceholder !== '') {
      currentPlaceholder = this.refs.input.value ? '' : cachedPlaceHolder;
    }

    this.setState({ currentPlaceholder });
  }

  resetInputState(e) {
    if (e.keyCode !== 8) {
      this.toggleLastOptionHitState(false);
    }

    this.state.inputLength = this.refs.input.value.length * 15 + 20;
  }

  resetInputHeight() {
    let inputChildNodes = this.reference.childNodes;
    let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0];

    input.style.height = Math.max(this.$refs.tags.clientHeight + 6, this.size === 'small' ? 28 : 36) + 'px';

    // this.broadcast('select-dropdown', 'updatePopper');
  }

  resetHoverIndex() {
    const { multiple } = this.props;
    let { hoverIndex, options, selected } = this.state;

    setTimeout(() => {
      if (!multiple) {
        hoverIndex = options.indexOf(selected);
      } else {
        if (selected.length > 0) {
          hoverIndex = Math.min.apply(null, selected.map(item => options.indexOf(item)));
        } else {
          hoverIndex = -1;
        }
      }

      this.setState({ hoverIndex });
    }, 300);
  }

  handleOptionSelect(option) {
    const { multiple } = this.props;
    let { visible, selected, selectedLabel } = this.state;

    if (!multiple) {
      selected = option;
      selectedLabel = option.currentLabel;
      visible = false;
    } else {
      let optionIndex = -1;

      selected.forEach((item, index) => {
        if (item === option || item.currentLabel === option.currentLabel) {
          optionIndex = index;
        }
      });

      if (optionIndex > -1) {
        selected.splice(optionIndex, 1);
      } else {
        selected.push(option);
      }
    }

    this.setState({ visible, selected, selectedLabel });
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
    let { visible, optionsAllDisabled, hoverIndex, options } = this.state;

    if (!visible) {
      return this.setState({
        visible: true
      });
    }

    if (!optionsAllDisabled) {
      if (direction === 'next') {
        hoverIndex++;

        if (hoverIndex === options.length) {
          hoverIndex = 0;
        }

        this.resetScrollTop();

        if (options[hoverIndex].disabled === true ||
          options[hoverIndex].groupDisabled === true ||
          !options[hoverIndex].visible) {
          this.navigateOptions('next');
        }
      }
      if (direction === 'prev') {
        hoverIndex--;

        if (hoverIndex < 0) {
          hoverIndex = options.length - 1;
        }

        this.resetScrollTop();

        if (options[hoverIndex].disabled === true ||
          options[hoverIndex].groupDisabled === true ||
          !options[hoverIndex].visible) {
          this.navigateOptions('prev');
        }
      }
    }

    this.setState({ hoverIndex, options });
  }

  resetScrollTop() {
    let { hoverIndex, options, dropdownUl } = this.state;

    let bottomOverflowDistance = findDOMNode(options[hoverIndex].component).getBoundingClientRect().bottom - this.popper.getBoundingClientRect().bottom;
    let topOverflowDistance = findDOMNode(options[hoverIndex].component).getBoundingClientRect().top - this.popper.getBoundingClientRect().top;

    if (bottomOverflowDistance > 0) {
      dropdownUl.scrollTop += bottomOverflowDistance;
    }
    if (topOverflowDistance < 0) {
      dropdownUl.scrollTop += topOverflowDistance;
    }

    this.setState({ dropdownUl });
  }

  selectOption() {
    let { hoverIndex, options } = this.state;

    if (options[hoverIndex]) {
      this.handleOptionSelect(options[hoverIndex]);
    }
  }

  deleteSelected(event) {
    event.stopPropagation();

    this.setState({
      selected: {},
      selectedLabel: '',
      visible: false
    });

    // this.$emit('input', '');
    // this.$emit('change', '');
  }

  deleteTag(event, tag) {
    let { selected } = this.state;
    let index = selected.indexOf(tag);

    if (index > -1) {
      selected.splice(index, 1);
    }

    this.setState({ selected });

    event.stopPropagation();
  }

  onInputChange() {
    if (this.props.filterable && this.state.selectedLabel !== this.props.value) {
      this.setState({
        query: this.state.selectedLabel
      })
    }
  }

  onOptionDestroy(option) {
    let { options, optionsCount, filteredOptionsCount } = this.state;

    optionsCount--;
    filteredOptionsCount--;

    let index = options.indexOf(option);

    if (index > -1) {
      options.splice(index, 1);
    }

    this.setState({ options, optionsCount, filteredOptionsCount });

    // this.broadcast('option', 'resetIndex');
  }

  resetInputWidth() {
    this.setState({
      inputWidth: this.reference.getBoundingClientRect().width
    })
  }

  render() {
    const { multiple, size, disabled, filterable, loading, remote } = this.props;
    const { inputWidth, inputLength, selectedLabel, visible, options, filteredOptionsCount, currentPlaceholder } = this.state;

    return (
      <div className={this.classNames('el-select', {
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
                    onChange={this.onInputChange.bind(this)}
                    style={{
                      width: inputLength,
                      maxWidth: inputWidth - 42
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
        <Transition name="md-fade-bottom" duration="200">
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
        </Transition>
      </div>
    )
  }
}

Select.childContextTypes = {
  component: PropTypes.any,
  multiple: PropTypes.bool,
  onOptionClick: PropTypes.func,
  onOptionDestroy: PropTypes.func
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
