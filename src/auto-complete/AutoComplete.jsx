/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import { Component, PropTypes } from '../../libs';
import Input from '../input';
import Suggestions from './Suggestions';

type State = {
  inputValue: string,
  isFocus: boolean,
  suggestions: Array<any>,
  loading: boolean,
  highlightedIndex: number,
}

type Props = {
  popperClass: string,
  placeholder: string,
  disabled: boolean,
  name: string,
  size: string,
  value: string,
  triggerOnFocus: boolean,
  fetchSuggestions: Function,
  onSelect: Function,
  onChange: Function,
  onIconClick: Function,
  icon: Element | string,
  append: Element,
  prepend: Element,
  onFocus: Function,
  onBlur: Function
}

type AutoCompleteDefaultProps = {
  triggerOnFocus: boolean,
};

class AutoComplete extends Component {
  props: Props;
  state: State;

  static defaultProps: AutoCompleteDefaultProps = {
    triggerOnFocus: true,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      inputValue: props.value,
      isFocus: false,
      suggestions: [],
      loading: false,
      highlightedIndex: -1
    };
  }

  getChildContext() {
    return {
      component: this
    };
  }

  componentWillReceiveProps(props: Props): void {
    this.setState({ inputValue: props.value });
  }

  componentDidUpdate(): void {
    const visible = this.suggestionVisible();
    const reference = ReactDOM.findDOMNode(this.inputNode);

    if (reference instanceof HTMLElement) {
      setTimeout(() => {
        this.suggestionsNode.onVisibleChange(visible, reference.offsetWidth);
      })
    }
  }

  getData(queryString: string): void {
    this.setState({ loading: true });

    this.props.fetchSuggestions(queryString, (suggestions: Array<any>) => {
      this.setState({ loading: false });

      if (Array.isArray(suggestions)) {
        this.setState({ suggestions });
      }
    });
  }

  handleChange(value: string): void {
    this.setState({ inputValue: value });

    if (!this.props.triggerOnFocus && !value) {
      this.setState({ suggestions: [] }); return;
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.getData(value);
  }

  handleFocus(e): void {
    this.setState({ isFocus: true });
    if (this.props.onFocus) this.props.onFocus(e);
    if (this.props.triggerOnFocus) {
      this.getData(this.state.inputValue);
    }
  }

  handleKeyEnter(highlightedIndex: number): void {
    if (this.suggestionVisible() && highlightedIndex >= 0 && highlightedIndex < this.state.suggestions.length) {
      this.select(this.state.suggestions[highlightedIndex]);
    }
  }

  handleClickOutside(): void {
    if (this.state.isFocus) {
      this.setState({ isFocus: false });
    }
  }

  select(item: Object): void {
    this.setState({ inputValue: item.value }, () => {
      this.setState({ suggestions: [] });
    });

    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  }

  highlight(index: number): void {
    if (!this.suggestionVisible() || this.state.loading) return;
    if (index < 0) index = 0;
    if (index >= this.state.suggestions.length) {
      index = this.state.suggestions.length - 1;
    }
    const reference = ReactDOM.findDOMNode(this.suggestionsNode);
    if (reference instanceof HTMLElement) {
      const suggestion = document.querySelector('.el-autocomplete-suggestion__wrap');
      const suggestionList = document.querySelectorAll('.el-autocomplete-suggestion__list li');
      if (suggestion instanceof HTMLElement && suggestionList instanceof NodeList) {
        let highlightItem = suggestionList[index];
        let scrollTop = suggestion.scrollTop;
        let offsetTop = highlightItem.offsetTop;

        if (offsetTop + highlightItem.scrollHeight > (scrollTop + suggestion.clientHeight)) {
          suggestion.scrollTop += highlightItem.scrollHeight;
        }

        if (offsetTop < scrollTop) {
          suggestion.scrollTop -= highlightItem.scrollHeight;
        }

        this.setState({ highlightedIndex: index });
      }
    }
  }

  /* Computed Methods */

  suggestionVisible(): boolean {
    const suggestions = this.state.suggestions;
    const isValidData = Array.isArray(suggestions) && suggestions.length > 0;

    return (isValidData || this.state.loading) && this.state.isFocus;
  }

  onKeyDown(e: SyntheticKeyboardEvent): void {
    const { highlightedIndex } = this.state;

    switch (e.keyCode) {
      case 13:
        this.handleKeyEnter(highlightedIndex);
        break;
      case 38:
        this.highlight(highlightedIndex - 1)
        break;
      case 40:
        this.highlight(highlightedIndex + 1);
        break;
      default:
        break;
    }
  }

  render(): React.Element<any> {
    const { disabled, placeholder, name, size, icon, append, prepend, onIconClick, popperClass } = this.props;
    const { inputValue, suggestions } = this.state;

    return (
      <div style={this.style()} className={this.className('el-autocomplete')}>
        <Input
          ref={node => this.inputNode = node}
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          size={size}
          icon={icon}
          prepend={prepend}
          append={append}
          onIconClick={onIconClick}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.props.onBlur}
          onKeyDown={this.onKeyDown.bind(this)}
        />
        <Suggestions
          ref={node => this.suggestionsNode = node}
          className={this.classNames(popperClass)}
          suggestions={suggestions}
        />
      </div>
    )
  }
}

AutoComplete.childContextTypes = {
  component: PropTypes.any
};

export default ClickOutside(AutoComplete);
