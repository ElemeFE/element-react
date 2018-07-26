/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import debounce from 'throttle-debounce/debounce';
import StyleSheet from '../../libs/utils/style';
import Popper from '../../libs/utils/popper';
import { Component, PropTypes, Transition, View } from '../../libs';
import { addResizeListener, removeResizeListener } from '../../libs/utils/resize-event';

import { Scrollbar } from '../scrollbar';

import Tag from '../tag';
import Input from '../input';
import i18n from '../locale';

StyleSheet.reset(`
  .el-select-dropdown {
    position: absolute !important;
  }
`)

type State = {
  options: Array<Object>,
  isSelect: boolean,
  inputLength: number,
  inputWidth: number,
  inputHovering: boolean,
  filteredOptionsCount: number,
  optionsCount: number,
  hoverIndex: number,
  bottomOverflowBeforeHidden: number,
  cachedPlaceHolder: string,
  currentPlaceholder: string,
  selectedLabel: string,
  value: any,
  visible: boolean,
  query: string,
  selected: any,
  voidRemoteQuery: boolean,
  valueChangeBySelected: boolean,
  selectedInit: boolean,
  dropdownUl?: HTMLElement
};

const sizeMap: {[size: string]: number} = {
  'large': 42,
  'small': 30,
  'mini': 22
};

class Select extends Component {
  state: State;
  debouncedOnInputChange: Function;

  constructor(props: Object) {
    super(props);

    this.state = {
      options: [],
      isSelect: true,
      inputLength: 20,
      inputWidth: 0,
      inputHovering: false,
      filteredOptionsCount: 0,
      optionsCount: 0,
      hoverIndex: -1,
      bottomOverflowBeforeHidden: 0,
      cachedPlaceHolder: props.placeholder || i18n.t('el.select.placeholder'),
      currentPlaceholder: props.placeholder || i18n.t('el.select.placeholder'),
      selectedLabel: '',
      selectedInit: false,
      visible: false,
      selected: undefined,
      value: props.value,
      valueChangeBySelected: false,
      voidRemoteQuery: false,
      query: ''
    };

    if (props.multiple) {
      this.state.selectedInit = true;
      this.state.selected = [];
    }

    if (props.remote) {
      this.state.voidRemoteQuery = true;
    }

    this.debouncedOnInputChange = debounce(this.debounce(), () => {
      this.onInputChange();
    });

    this.resetInputWidth = this._resetInputWidth.bind(this) 
  }

  getChildContext(): Object {
    return {
      component: this
    };
  }

  componentDidMount() {
    this.reference = ReactDOM.findDOMNode(this.refs.reference);
    this.popper = ReactDOM.findDOMNode(this.refs.popper);

    this.handleValueChange();
    addResizeListener(this.refs.root, this.resetInputWidth);
  }

  componentWillReceiveProps(props: Object) {
    if (props.placeholder != this.props.placeholder) {
      this.setState({
        currentPlaceholder: props.placeholder
      });
    }

    if (props.value != this.props.value) {
      this.setState({
        value: props.value
      }, () => {
        this.handleValueChange();
      });
    }
  }

  componentWillUpdate(props: Object, state: Object) {
    if (state.value != this.state.value) {
      this.onValueChange(state.value);
    }

    if (state.visible != this.state.visible) {
      if (this.props.onVisibleChange) {
        this.props.onVisibleChange(state.visible);
      }

      this.onVisibleChange(state.visible);
    }

    if (state.query != this.state.query) {
      this.onQueryChange(state.query);
    }

    if (Array.isArray(state.selected)) {
      if (state.selected.length != this.state.selected.length) {
        this.onSelectedChange(state.selected);
      }
    }
  }

  componentDidUpdate() {
    this.state.inputWidth = this.reference.getBoundingClientRect().width;
  }

  componentWillUnmount() {
    removeResizeListener(this.refs.root, this.resetInputWidth);
  }

  debounce(): number {
    return this.props.remote ? 300 : 0;
  }

  handleClickOutside() {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  }

  handleValueChange() {
    const { multiple } = this.props;
    const { value, options } = this.state;

    if (multiple && Array.isArray(value)) {
      this.setState({
        selected: options.reduce((prev, curr) => {
          return value.indexOf(curr.props.value) > -1 ? prev.concat(curr) : prev;
        }, [])
      }, () => {
        this.onSelectedChange(this.state.selected, false);
      });
    } else {
      const selected = options.filter(option => {
         return option.props.value === value
       })[0];

       if (selected) {
         this.state.selectedLabel = selected.props.label || selected.props.value;
       }
    }
  }

  onVisibleChange(visible: boolean) {
    const { multiple, filterable } = this.props;
    let { query, dropdownUl, selected, selectedLabel, bottomOverflowBeforeHidden } = this.state;

    if (!visible) {
      this.reference.querySelector('input').blur();

      if (this.refs.root.querySelector('.el-input__icon')) {
        const elements = this.refs.root.querySelector('.el-input__icon');

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
        if (dropdownUl && selected) {
          const element: any = ReactDOM.findDOMNode(selected);
          bottomOverflowBeforeHidden = element.getBoundingClientRect().bottom - this.popper.getBoundingClientRect().bottom;
        }

        if (selected && selected.props) {
          if (selected.props.value) {
            selectedLabel = selected.currentLabel();
          }
        } else if (filterable) {
          selectedLabel = '';
        }

        this.setState({ bottomOverflowBeforeHidden, selectedLabel });
      }
    } else {
      let icon = this.refs.root.querySelector('.el-input__icon');

      if (icon && !icon.classList.contains('el-icon-circle-close')) {
        const elements = this.refs.root.querySelector('.el-input__icon');

        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.add('is-reverse');
        }
      }

      if (this.popperJS) {
        this.popperJS.update();
      }

      if (filterable) {
        query = selectedLabel;

        if (multiple) {
          this.refs.input.focus();
        } else {
          this.refs.reference.focus();

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

      this.setState({ query: query || '', dropdownUl });
    }
  }

  onValueChange(val: mixed) {
    const { multiple } = this.props;

    let {
      options,
      valueChangeBySelected,
      selectedInit,
      selected,
      selectedLabel,
      currentPlaceholder,
      cachedPlaceHolder
    } = this.state;

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
        let option = options.filter(option => option.props.value === item)[0];
        if (option) {
          this.addOptionToValue(option);
        }
      });

      this.forceUpdate();
    }

    if (!multiple) {
      let option = options.filter(option => option.props.value === val)[0];

      if (option) {
        this.addOptionToValue(option);
        this.setState({ selectedInit, currentPlaceholder });
      } else {
        selected = {};
        selectedLabel = '';
        this.setState({ selectedInit, selected, currentPlaceholder, selectedLabel }, () => {
          this.resetHoverIndex();
        });
      }
    }
  }

  onSelectedChange(val: any, bubble: boolean = true) {
    const { form } = this.context;
    const { multiple, filterable, onChange } = this.props;
    let { query, hoverIndex, inputLength, selectedInit, currentPlaceholder, cachedPlaceHolder, valueChangeBySelected } = this.state;

    if (multiple) {
      if (val.length > 0) {
        currentPlaceholder = '';
      } else {
        currentPlaceholder = cachedPlaceHolder;
      }

      this.setState({ currentPlaceholder }, () => {
        this.resetInputHeight();
      });

      valueChangeBySelected = true;

      if (bubble) {
        onChange && onChange(val.map(item => item.props.value), val);
        form && form.onFieldChange();
      }

      // this.dispatch('form-item', 'el.form.change', val);

      if (filterable) {
        query = '';
        hoverIndex = -1;
        inputLength = 20;

        this.refs.input.focus();
      }

      this.setState({ valueChangeBySelected, query, hoverIndex, inputLength }, () => {
        if (this.refs.input) {
          this.refs.input.value = '';
        }
      });
    } else {
      if (selectedInit) {
        return this.setState({
          selectedInit: false
        });
      }

      if (bubble) {
        onChange && onChange(val.props.value, val);
        form && form.onFieldChange();
      }
    }
  }

  onQueryChange(query: string) {
    const { multiple, filterable, remote, remoteMethod, filterMethod } = this.props;
    let { voidRemoteQuery, hoverIndex, options, optionsCount } = this.state;

    if (this.popperJS) {
      this.popperJS.update();
    }

    if (multiple && filterable) {
      this.resetInputHeight();
    }

    if (remote && typeof remoteMethod === 'function') {
      hoverIndex = -1;
      voidRemoteQuery = query === '';

      remoteMethod(query);

      options.forEach(option => {
        option.resetIndex();
      });
    } else if (typeof filterMethod === 'function') {
      filterMethod(query);
    } else {
      this.setState({
        filteredOptionsCount: optionsCount
      }, () => {
        options.forEach(option => {
          option.queryChange(query);
        });
      });
    }

    this.setState({ hoverIndex, voidRemoteQuery });
  }

  onEnter(): void {
    this.popperJS = new Popper(this.reference, this.popper, {
      gpuAcceleration: false
    });
  }

  onAfterLeave(): void {
    this.popperJS.destroy();
  }

  optionsAllDisabled(options: []): boolean {
     return options.length === (options.filter(item => item.props.disabled === true).length);
  }

  iconClass(): string {
    return this.showCloseIcon() ? 'circle-close' : (this.props.remote && this.props.filterable ? '' : `caret-top ${this.state.visible ? 'is-reverse' : ''}`);
  }

  showCloseIcon(): boolean {
    let criteria = this.props.clearable && this.state.inputHovering && !this.props.multiple && this.state.options.indexOf(this.state.selected) > -1;

    if (!this.refs.root) return false;

    let icon = this.refs.root.querySelector('.el-input__icon');

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

  emptyText(): mixed {
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

  toggleLastOptionHitState(hit?: boolean): any {
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

  deletePrevTag(e: Object) {
    if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
      const { selected } = this.state;

      selected.pop();

      this.setState({ selected });
    }
  }

  addOptionToValue(option: any, init?: boolean) {
    const { multiple, remote } = this.props;
    let { selected, selectedLabel, hoverIndex, value } = this.state;

    if (multiple) {
      if (selected.indexOf(option) === -1 && (remote ? value.indexOf(option.props.value) === -1 : true)) {
        this.selectedInit = !!init;

        selected.push(option);

        this.resetHoverIndex();
      }
    } else {
      this.selectedInit = !!init;

      selected = option;
      selectedLabel = option.currentLabel();
      hoverIndex = option.index;

      this.setState({ selected, selectedLabel, hoverIndex });
    }
  }

  managePlaceholder() {
    let { currentPlaceholder, cachedPlaceHolder } = this.state;

    if (currentPlaceholder !== '') {
      currentPlaceholder = this.refs.input.value ? '' : cachedPlaceHolder;
    }

    this.setState({ currentPlaceholder });
  }

  resetInputState(e: Object) {
    if (e.keyCode !== 8) {
      this.toggleLastOptionHitState(false);
    }

    this.setState({
      inputLength: this.refs.input.value.length * 15 + 20
    });
  }

  _resetInputWidth() {
    this.setState({
      inputWidth: this.reference.getBoundingClientRect().width
    })
  }

  resetInputHeight() {
    let inputChildNodes = this.reference.childNodes;
    let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0];

    input.style.height = Math.max(this.refs.tags.clientHeight + 6, sizeMap[this.props.size] || 36) + 'px';

    if (this.popperJS) {
      this.popperJS.update();
    }
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

  navigateOptions(direction: string) {
    let { visible, hoverIndex, options } = this.state;

    if (!visible) {
      return this.setState({
        visible: true
      });
    }

    let skip;

    if (options.length != options.filter(item => item.props.disabled === true).length) {
      if (direction === 'next') {
        hoverIndex++;

        if (hoverIndex === options.length) {
          hoverIndex = 0;
        }

        if (options[hoverIndex].props.disabled === true ||
            options[hoverIndex].props.groupDisabled === true ||
           !options[hoverIndex].state.visible ) {
          skip = 'next';
        }
      }

      if (direction === 'prev') {
        hoverIndex--;

        if (hoverIndex < 0) {
          hoverIndex = options.length - 1;
        }

        if (options[hoverIndex].props.disabled === true ||
            options[hoverIndex].props.groupDisabled === true ||
           !options[hoverIndex].state.visible ) {
          skip = 'prev';
        }
      }
    }

    this.setState({ hoverIndex, options }, () => {
      if (skip) {
        this.navigateOptions(skip);
      }

      this.resetScrollTop();
    });
  }

  resetScrollTop() {
    const element: any = ReactDOM.findDOMNode(this.state.options[this.state.hoverIndex]);
    const bottomOverflowDistance = element.getBoundingClientRect().bottom - this.popper.getBoundingClientRect().bottom;
    const topOverflowDistance = element.getBoundingClientRect().top - this.popper.getBoundingClientRect().top;

    if (this.state.dropdownUl) {
      if (bottomOverflowDistance > 0) {
        this.state.dropdownUl.scrollTop += bottomOverflowDistance;
      }
      if (topOverflowDistance < 0) {
        this.state.dropdownUl.scrollTop += topOverflowDistance;
      }
    }
  }

  selectOption() {
    let { hoverIndex, options } = this.state;

    if (options[hoverIndex]) {
      this.onOptionClick(options[hoverIndex]);
    }
  }

  deleteSelected(e: Object) {
    e.stopPropagation();

    if (this.state.selectedLabel != '') {
      this.setState({
        selected: {},
        selectedLabel: '',
        visible: false
      });

      this.context.form && this.context.form.onFieldChange();

      if (this.props.onChange) {
        this.props.onChange('');
      }

      if (this.props.onClear) {
        this.props.onClear();
      }
    }
  }

  deleteTag(tag: any) {
    const index = this.state.selected.indexOf(tag);

    if (index > -1 && !this.props.disabled) {
      const selected = this.state.selected.slice(0);

      selected.splice(index, 1);

      this.setState({ selected }, () => {
        if (this.props.onRemoveTag) {
          this.props.onRemoveTag(tag.props.value);
        }
      });
    }
  }

  handleIconClick(event) {
    if (this.iconClass().indexOf('circle-close') > -1) {
      this.deleteSelected(event);
    } else {
      this.toggleMenu();
    }
  }

  onInputChange() {
    if (this.props.filterable && this.state.selectedLabel !== this.state.value) {
      this.setState({
        query: this.state.selectedLabel
      });
    }
  }

  onOptionCreate(option: any) {
    this.state.options.push(option);
    this.state.optionsCount++;
    this.state.filteredOptionsCount++;

    this.forceUpdate();
    this.handleValueChange();
  }

  onOptionDestroy(option: any) {
    this.state.optionsCount--;
    this.state.filteredOptionsCount--;

    const index = this.state.options.indexOf(option);

    if (index > -1) {
      this.state.options.splice(index, 1);
    }

    this.state.options.forEach(el => {
      if (el != option) {
        el.resetIndex();
      }
    });

    this.forceUpdate();
    this.handleValueChange();
  }

  onOptionClick(option: any) {
    const { multiple } = this.props;
    let { visible, selected, selectedLabel } = this.state;

    if (!multiple) {
      selected = option;
      selectedLabel = option.currentLabel();
      visible = false;
    } else {
      let optionIndex = -1;

      selected = selected.slice(0);

      selected.forEach((item, index) => {
        if (item === option || item.props.value === option.props.value) {
          optionIndex = index;
        }
      });

      if (optionIndex > -1) {
        selected.splice(optionIndex, 1);
      } else {
        selected.push(option);
      }
    }

    this.setState({ selected, selectedLabel }, () => {
      if (!multiple) {
        this.onSelectedChange(this.state.selected);
      }

      this.setState({ visible });
    });
  }

  onMouseDown(event) {
    event.preventDefault();

    if (this.refs.input) {
      this.refs.input.focus();
    }

    this.toggleMenu();
  }

  onMouseEnter() {
    this.setState({
      inputHovering: true
    })
  }

  onMouseLeave() {
    this.setState({
      inputHovering: false
    })
  }

  render() {
    const { multiple, size, disabled, filterable, loading } = this.props;
    const { selected, inputWidth, inputLength, query, selectedLabel, visible, options, filteredOptionsCount, currentPlaceholder } = this.state;

    return (
      <div ref="root" style={this.style()} className={this.className('el-select')}>
        {
          multiple && (
            <div ref="tags" className="el-select__tags" onClick={this.toggleMenu.bind(this)} style={{
              maxWidth: inputWidth - 32
            }}>
              {
                selected.map(el => {
                  return (
                    <Tag
                      type="primary"
                      key={el.props.value}
                      hit={el.hitState}
                      closable={!disabled}
                      closeTransition={true}
                      onClose={this.deleteTag.bind(this, el)}
                    >
                      <span className="el-select__tags-text">{el.currentLabel()}</span>
                    </Tag>
                  )
                })
              }
              {
                filterable && (
                  <input
                    ref="input"
                    type="text"
                    className={this.classNames('el-select__input', size && `is-${size}`)}
                    style={{ width: inputLength, maxWidth: inputWidth - 42 }}
                    disabled={disabled}
                    defaultValue={query}
                    onKeyUp={this.managePlaceholder.bind(this)}
                    onKeyDown={e => {
                      this.resetInputState(e);

                      switch (e.keyCode) {
                        case 27:
                          this.setState({ visible: false }); e.preventDefault();
                          break;
                        case 8:
                          this.deletePrevTag(e);
                          break;
                        case 13:
                          this.selectOption(); e.preventDefault();
                          break;
                        case 38:
                          this.navigateOptions('prev'); e.preventDefault();
                          break;
                        case 40:
                          this.navigateOptions('next'); e.preventDefault();
                          break;
                        default:
                          break;
                      }
                    }}
                    onChange={e => {
                      clearTimeout(this.timeout);

                      this.timeout = setTimeout(() => {
                        this.setState({
                          query: this.state.value
                        });
                      }, this.debounce());

                      this.state.value = e.target.value;
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
          size={size}
          disabled={disabled}
          readOnly={!filterable || multiple}
          icon={this.iconClass() || undefined}
          onChange={value => this.setState({ selectedLabel: value })}
          onIconClick={this.handleIconClick.bind(this)}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
          onKeyUp={this.debouncedOnInputChange.bind(this)}
          onKeyDown={e => {
            switch (e.keyCode) {
              case 9:
              case 27:
                this.setState({ visible: false }); e.preventDefault();
                break;
              case 13:
                this.selectOption(); e.preventDefault();
                break;
              case 38:
                this.navigateOptions('prev'); e.preventDefault();
                break;
              case 40:
                this.navigateOptions('next'); e.preventDefault();
                break;
              default:
                break;
            }
          }}
        />
        <Transition name="el-zoom-in-top" onEnter={this.onEnter.bind(this)} onAfterLeave={this.onAfterLeave.bind(this)}>
          <View show={visible && this.emptyText() !== false}>
            <div ref="popper" className={this.classNames('el-select-dropdown', {
                'is-multiple': multiple
            })} style={{
              minWidth: inputWidth,
            }}>
              <View show={options.length > 0 && filteredOptionsCount > 0 && !loading}>
                <Scrollbar
                  viewComponent="ul"
                  wrapClass="el-select-dropdown__wrap"
                  viewClass="el-select-dropdown__list"
                >
                  {this.props.children}
                </Scrollbar>
              </View>
              { this.emptyText() && <p className="el-select-dropdown__empty">{this.emptyText()}</p> }
            </div>
          </View>
        </Transition>
      </div>
    )
  }
}

Select.childContextTypes = {
  component: PropTypes.any
};

Select.contextTypes = {
  form: PropTypes.any
};

Select.propTypes = {
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
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onVisibleChange: PropTypes.func,
  onRemoveTag: PropTypes.func,
  onClear: PropTypes.func
}

export default ClickOutside(Select);
