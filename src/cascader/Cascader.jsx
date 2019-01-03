/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import debounce from 'throttle-debounce/debounce';
import Popper from 'popper.js';
import { Component, PropTypes, View } from '../../libs';

import CascaderMenu from './Menu';
import Input from '../input';
import i18n from '../locale';

type State = {
  currentValue: [],
  menu: any,
  menuVisible: boolean,
  inputHover: boolean,
  inputValue: any,
  flatOptions: []
};

type Context = {
  component: any
};

class Cascader extends Component {
  state: State;
  input: any;
  debouncedInputChange: Function;

  constructor(props: Object) {
    super(props);

    this.state = {
      currentValue: props.value,
      menu: null,
      menuVisible: false,
      inputHover: false,
      inputValue: '',
      flatOptions: this.flattenOptions(props.options)
    }

    this.debouncedInputChange = debounce(props.debounce, () => {
      const value = this.state.inputValue;
      const before = this.props.beforeFilter(value);

      if (before && before.then) {
        this.state.menu.setState({
          options: [{
            __IS__FLAT__OPTIONS: true,
            label: i18n.t('el.cascader.loading'),
            value: '',
            disabled: true
          }]
        });

        before.then(() => {
          this.handleInputChange(value);
        });
      } else {
        this.handleInputChange(value);
      }
    });
  }

  getChildContext(): Context {
    return {
      component: this
    };
  }

  componentDidMount() {
    this.input = ReactDOM.findDOMNode(this.refs.input);
  }

  componentWillReceiveProps(props: Object) {
    this.setState({
      currentValue: props.value,
      flatOptions: this.flattenOptions(props.options),
    });

    this.state.menu.setState({
      options: props.options
    });
  }

  componentDidUpdate(props: Object, state: State) {
    const { menuVisible } = this.state;

    if (menuVisible !== state.menuVisible) {
      if (menuVisible) {
        this.showMenu();

        if (this.popperJS) {
          this.popperJS.update();
        } else {
          this.popperJS = new Popper(this.input, ReactDOM.findDOMNode(this.refs.menu), {
            placement: 'bottom-start',
            modifiers: {
              computeStyle: {
                gpuAcceleration: false
              }
            }
          });
        }
      } else {
        this.hideMenu();

        if (this.popperJS) {
          this.popperJS.destroy();
        }

        delete this.popperJS;
      }
    }
  }

  componentWillUnmount() {
    if (this.popperJS) {
      this.popperJS.destroy();
    }
  }

  placeholder(): string {
    return this.props.placeholder || i18n.t('el.cascader.placeholder');
  }

  updatePopper() {
    if (this.popperJS) {
      this.popperJS.update();
    }
  }

  initMenu(menu: any) {
    this.state.menu = menu;
  }

  showMenu() {
    this.state.menu.setState({
      value: this.state.currentValue.slice(0),
      visible: true,
      options: this.props.options,
      inputWidth: this.input.offsetWidth - 2
    });
  }

  hideMenu() {
    this.setState({ inputValue: '' });

    if (this.state.menu) {
      this.state.menu.setState({ visible: false });
    }
  }

  handleActiveItemChange(value: []) {
    this.updatePopper();

    if (this.props.activeItemChange) {
      this.props.activeItemChange(value);
    }
  }

  handlePick(value: [], close: boolean = true) {
    this.setState({
      currentValue: value
    });

    if (close) {
      this.setState({ menuVisible: false });
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleInputChange(value: any) {
    if (!this.state.menuVisible) return;

    const flatOptions = this.state.flatOptions;

    if (!value) {
      this.state.menu.setState({
        options: this.props.options
      });
      return;
    }

    let filteredFlatOptions = flatOptions.filter(optionsStack => {
      return optionsStack.some(option => new RegExp(value, 'i').test(option[this.labelKey()]));
    });

    if (filteredFlatOptions.length > 0) {
      filteredFlatOptions = filteredFlatOptions.map(optionStack => {
        return {
          __IS__FLAT__OPTIONS: true,
          value: optionStack.map(item => item[this.valueKey()]),
          label: this.renderFilteredOptionLabel(value, optionStack)
        };
      });
    } else {
      filteredFlatOptions = [{
        __IS__FLAT__OPTIONS: true,
        label: i18n.t('el.cascader.noMatch'),
        value: '',
        disabled: true
      }];
    }

    this.state.menu.setState({
      options: filteredFlatOptions
    });
  }

  renderFilteredOptionLabel(inputValue: any, optionsStack: any): [] {
    return optionsStack.map((option, index) => {
      const label = option[this.labelKey()];
      const keywordIndex = label.toLowerCase().indexOf(inputValue.toLowerCase());
      const labelPart = label.slice(keywordIndex, inputValue.length + keywordIndex);
      const node = keywordIndex > -1 ? this.highlightKeyword(label, labelPart) : label;
      return index === 0 ? node : [' / ', node];
    });
  }

  highlightKeyword(label: string, keyword: string): any {
    return label.split(keyword).map((node, index) => index === 0 ? node : [
      (<span className="el-cascader-menu__item__keyword">{keyword}</span>),
      node
    ]);
  }

  flattenOptions(options: any, ancestor: any = []): [] {
    let flatOptions = [];

    options.forEach((option) => {
      const optionsStack = ancestor.concat(option);
      if (!option[this.childrenKey()]) {
        flatOptions.push(optionsStack);
      } else {
        if (this.changeOnSelect) {
          flatOptions.push(optionsStack);
        }
        flatOptions = flatOptions.concat(this.flattenOptions(option[this.childrenKey()], optionsStack));
      }
    });

    return flatOptions;
  }

  clearValue(e: SyntheticEvent) {
    e.stopPropagation();

    this.handlePick([], true);
  }

  handleClickOutside() {
    if (this.state.menuVisible) {
      this.setState({ menuVisible: false });
    }
  }

  handleClick() {
    if (this.props.disabled) return;

    if (this.filterable) {
      this.setState({
        menuVisible: true
      });
      return;
    }

    this.setState({
      menuVisible: !this.state.menuVisible
    });
  }

  /* Computed Methods */

  labelKey(): string {
    return this.props.props.label || 'label';
  }

  valueKey(): string {
    return this.props.props.value || 'value';
  }

  childrenKey(): string {
    return this.props.props.children || 'children';
  }

  currentLabels(): [] {
    let options = this.props.options;
    let labels = [];

    this.state.currentValue.forEach(value => {
      const targetOption = options && options.filter(option => option[this.valueKey()] === value)[0];

      if (targetOption) {
        labels.push(targetOption[this.labelKey()]);
        options = targetOption[this.childrenKey()];
      }
    });

    return labels;
  }

  render() {
    const { size, disabled, filterable, clearable, showAllLevels } = this.props;
    const { menuVisible, inputHover, inputValue } = this.state;
    const currentLabels = this.currentLabels();

    return (
      <span ref="reference" className={this.className('el-cascader', size ? 'el-cascader--' + size : '', {
        'is-opened': menuVisible,
        'is-disabled': disabled
      })}>
        <span
          onClick={this.handleClick.bind(this)}
          onMouseEnter={() => { this.setState({ inputHover: true }) }}
          onMouseLeave={() => { this.setState({ inputHover: false }) }}
        >
          <Input
            ref="input"
            readOnly={!filterable}
            placeholder={currentLabels.length ? undefined : this.placeholder()}
            value={inputValue}
            onChange={value => { this.setState({ inputValue: value }) }}
            onKeyUp={this.debouncedInputChange.bind(this)}
            size={size}
            disabled={disabled}
            icon={
              clearable && inputHover && currentLabels.length ? (
                <i
                  className="el-input__icon el-icon-circle-close el-cascader__clearIcon"
                  onClick={this.clearValue.bind(this)}
                />
              ) : (
                <i
                    className={this.classNames('el-input__icon el-icon-caret-bottom', {
                      'is-reverse': menuVisible
                    })}
                  />
                )
            }
          />
          <View show={currentLabels.length}>
            <span className="el-cascader__label">
              {
                showAllLevels ? currentLabels.map((label, index) => {
                  return (
                    <label key={index}>
                      {label}
                      {index < currentLabels.length - 1 && <span> / </span>}
                    </label>
                  )
                }) : currentLabels[currentLabels.length - 1]
              }
            </span>
          </View>
        </span>
        <CascaderMenu ref="menu" />
      </span>
    )
  }
}

Cascader.childContextTypes = {
  component: PropTypes.any
};

Cascader.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string
  })).isRequired,
  props: PropTypes.object,
  value: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  changeOnSelect: PropTypes.bool,
  popperClass: PropTypes.string,
  expandTrigger: PropTypes.string,
  filterable: PropTypes.bool,
  size: PropTypes.string,
  showAllLevels: PropTypes.bool,
  debounce: PropTypes.number,
  activeItemChange: PropTypes.func,
  beforeFilter: PropTypes.func,
  onChange: PropTypes.func
}

Cascader.defaultProps = {
  value: [],
  clearable: false,
  expandTrigger: 'click',
  showAllLevels: true,
  debounce: 300,
  props: {
    children: 'children',
    label: 'label',
    value: 'value',
    disabled: 'disabled'
  },
  beforeFilter: () => (() => { })
}

export default ClickOutside(Cascader);
