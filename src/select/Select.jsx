/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import debounce from 'throttle-debounce/debounce';
import Popper from '../../libs/utils/popper';
import { Component, PropTypes, Transition, View } from '../../libs';
import { addResizeListener, removeResizeListener } from '../../libs/utils/resize-event';

import Tag from '../tag';
import Input from '../input';
import i18n from '../locale';

type State = {
  options: Array<Object>,
  isSelect: boolean,
  inputLength: number,
  inputWidth: number,
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
      filteredOptionsCount: 0,
      optionsCount: 0,
      hoverIndex: -1,
      bottomOverflowBeforeHidden: 0,
      cachedPlaceHolder: props.placeholder,
      currentPlaceholder: props.placeholder,
      selectedLabel: '',
      selectedInit: false,
      visible: false,
      value: props.value,
      selected: props.multiple ? [] : {},
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
  }

  getChildContext(): Object {
    return {
      component: this
    };
  }

  componentDidMount() {
    addResizeListener(this.refs.root, this.resetInputWidth.bind(this));

    this.reference = ReactDOM.findDOMNode(this.refs.reference);
    this.popper = ReactDOM.findDOMNode(this.refs.popper);

    this.handleValueChange();
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
      this.onVisibleChange(state.visible);
    }

    if (state.query != this.state.query) {
      this.onQueryChange(state.query);
    }

    if (Array.isArray(state.selected)) {
      if (state.selected.length != this.state.selected.length) {
        this.onSelectedChange(state.selected);
      }
    } else {
      if (state.selected != this.state.selected) {
        this.onSelectedChange(state.selected);
      }
    }
  }

  componentDidUpdate() {
    const { visible } = this.state;

    if (visible) {
      if (this.popperJS) {
        this.popperJS.update();
      } else {
        this.popperJS = new Popper(this.reference, this.popper, {
          gpuAcceleration: false
        });
      }
    } else {
      if (this.popperJS) {
        this.popperJS.destroy();
      }

      delete this.popperJS;
    }

    this.state.inputWidth = this.reference.getBoundingClientRect().width;
  }

  componentWillUnmount() {
    if (this.resetInputWidth()){
      removeResizeListener(this.refs.root, this.resetInputWidth.bind(this));
    }

    if (this.popperJS) {
      this.popperJS.destroy();
    }
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
    const { remote, multiple } = this.props;
    const { value, options, selected } = this.state;

    if (remote && multiple && Array.isArray(value)) {
      this.setState({
        selected: options.reduce((prev, curr) => {
          return value.indexOf(curr.props.value) > -1 ? prev.concat(curr) : prev;
        }, [])
      }, () => {
        this.resetInputHeight();
      });
    } else {
      const selected = options.filter(option => {
         return option.props.value === value
       })[0];

       if (selected) {
         this.state.selectedLabel = selected.props.label;
       }
    }

    if (selected) {
      this.onSelectedChange(selected);
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
          bottomOverflowBeforeHidden = ReactDOM.findDOMNode(selected).getBoundingClientRect().bottom - this.popper.getBoundingClientRect().bottom;
        }

        if (selected && selected.props.value) {
          selectedLabel = selected.currentLabel();
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
        let option = this.options.filter(option => option.props.value === item)[0];
        if (option) {
          this.addOptionToValue(option);
        }
      });
    }

    if (!multiple) {
      let option = options.filter(option => option.props.value === val)[0];

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

  onSelectedChange(val: any) {
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

      if (selectedInit) {
        return this.setState({
          selectedInit: false
        });
      }

      valueChangeBySelected = true;

      onChange && onChange(val.map(item => item.props.value));

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

      onChange && onChange(val.props.value);
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

  resetInputState(e: Object) {
    if (e.keyCode !== 8) {
      this.toggleLastOptionHitState(false);
    }

    this.setState({
      inputLength: this.refs.input.value.length * 15 + 20
    });
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
    const element = ReactDOM.findDOMNode(this.state.options[this.state.hoverIndex]);
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

    this.setState({
      selected: {},
      selectedLabel: '',
      visible: false
    });

    if (this.props.onChange) {
      this.props.onChange('');
    }
  }

  deleteTag(tag: any) {
    let selected = this.state.selected.slice(0);
    let index = selected.indexOf(tag);

    if (index > -1) {
      selected.splice(index, 1);
    }

    this.setState({ selected });
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

    this.setState(this.state);
  }

  onOptionDestroy(option: any) {
    this.state.optionsCount--;
    this.state.filteredOptionsCount--;

    let index = this.state.options.indexOf(option);

    if (index > -1) {
      this.state.options.splice(index, 1);
    }

    this.setState(this.state, () => {
      this.state.options.forEach(el => {
        if (el != option) {
          el.resetIndex();
        }
      });
    });
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

      selected.forEach((item, index) => {
        if (item === option || item.currentLabel() === option.currentLabel()) {
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
      this.onSelectedChange(this.state.selected);
      this.setState({ visible });
    });
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

  resetInputWidth() {
    this.setState({
      inputWidth: this.reference.getBoundingClientRect().width
    })
  }

  render() {
    const { multiple, size, disabled, filterable, loading } = this.props;
    const { selected, inputWidth, inputLength, query, selectedLabel, visible, options, filteredOptionsCount, currentPlaceholder } = this.state;

    return (
      <div ref="root" style={this.style()} className={this.className('el-select', {
          'is-multiple': multiple,
          'is-small': size === 'small'
        })}>
        {
          multiple && (
            <div ref="tags" className="el-select__tags" onClick={this.toggleMenu.bind(this)} style={{
              maxWidth: inputWidth - 32 + 'px'
            }}>
              {
                selected.map(el => {
                  return (
                    <Tag
                      type="primary"
                      key={el.props.value}
                      hit={el.hitState}
                      closable={true}
                      closeTransition={true}
                      onClose={this.deleteTag.bind(this, el)}
                    >{el.currentLabel()}</Tag>
                  )
                })
              }
              {
                filterable && (
                  <input
                    ref="input"
                    type="text"
                    className="el-select__input"
                    style={{ width: inputLength, maxWidth: inputWidth - 42 }}
                    defaultValue={query}
                    onKeyUp={this.managePlaceholder.bind(this)}
                    onChange={e => {
                      clearTimeout(this.timeout);

                      this.timeout = setTimeout(() => {
                        this.setState({
                          query: this.state.value
                        });
                      }, this.debounce());

                      this.state.value = e.target.value;
                    }}
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
          onChange={e => this.setState({ selectedLabel: e.target.value })}
          onClick={this.toggleMenu.bind(this)}
          onIconClick={this.toggleMenu.bind(this)}
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
        <Transition name="md-fade-bottom" duration="200">
          <View show={visible && this.emptyText() !== false}>
            <div ref="popper" className={this.classNames('el-select-dropdown', {
                'is-multiple': multiple
            })} style={{
              minWidth: inputWidth,
            }}>
              <View show={options.length > 0 && filteredOptionsCount > 0 && !loading}>
                <ul className="el-select-dropdown__list">
                  {this.props.children}
                </ul>
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
  onChange: PropTypes.func
}

Select.defaultProps = {
  placeholder: i18n.t('el.select.placeholder')
}

export default ClickOutside(Select);
