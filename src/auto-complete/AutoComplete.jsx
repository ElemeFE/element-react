import React from 'react';
import ClickOutside from 'react-click-outside';
import { Component, PropTypes, Transition } from '../../libs';

import Input from '../input';

class AutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      suggestions: [],
      suggestionVisible: false,
      loading: false,
      highlightedIndex: -1
    };
  }

  onKeyDown(e) {
    const { highlightedIndex } = this.state;

    switch (e.keyCode) {
      case 13:
        this.select(highlightedIndex);
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

  handleChange(e) {
    this.setState({
      value: e.target.value
    }, () => {
      this.showSuggestions(this.state.value);
    });
  }

  handleFocus() {
    if (this.props.triggerOnFocus) {
      this.showSuggestions(this.state.value);
    }
  }

  handleClickOutside() {
    this.hideSuggestions();
  }

  select(index) {
    const { suggestions } = this.state;

    if (suggestions && suggestions[index]) {
      const item = suggestions[index];

      this.setState({ value: item.value }, () => {
        if (this.props.onSelect) {
          this.props.onSelect(item);
        }

        this.hideSuggestions();
      });
    }
  }

  hideSuggestions() {
    this.setState({
      suggestionVisible: false,
      suggestions: [],
      loading: false
    });
  }

  showSuggestions(value) {
    this.setState({
      suggestionVisible: true,
      loading: true
    }, () => {
      this.props.fetchSuggestions(value, result => {
        let { suggestions, loading } = this.state;

        loading = false;

        if (Array.isArray(result) && result.length > 0) {
          suggestions = result;
        } else {
          this.hideSuggestions();
        }

        this.setState({ suggestions, loading });
      });
    });
  }

  highlight(index) {
    const { suggestions, suggestionVisible, loading } = this.state;

    if (!suggestionVisible || loading) { return; }

    if (index < 0) {
      index = 0;
    } else if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }

    var elSuggestions = this.refs.suggestions;
    var elSelect = elSuggestions.children[index];
    var scrollTop = elSuggestions.scrollTop;
    var offsetTop = elSelect.offsetTop;
    if (offsetTop + elSelect.scrollHeight > (scrollTop + elSuggestions.clientHeight)) {
      elSuggestions.scrollTop += elSelect.scrollHeight;
    }
    if (offsetTop < scrollTop) {
      elSuggestions.scrollTop -= elSelect.scrollHeight;
    }

    this.setState({
      highlightedIndex: index
    });
  }

  render() {
    const { disabled, placeholder, name, size, customItem, popperClass } = this.props;
    const { value, suggestions, suggestionVisible, loading, highlightedIndex } = this.state;

    return (
      <div style={this.style()} className={this.className('el-autocomplete')}>
        <Input
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          size={size}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
        />
        <Transition name="md-fade-bottom">
          {
            suggestionVisible && (
              <ul ref="suggestions" className={this.classNames('el-autocomplete__suggestions', popperClass, {
                  'is-loading': loading
              })}>
                { loading && <li><i className="el-icon-loading"></i></li> }
                {
                  suggestions.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={this.classNames({'highlighted': highlightedIndex === index})}
                        onClick={this.select.bind(this, index)}>
                        {
                          !customItem ? item.value : React.createElement(customItem, {
                            index,
                            item
                          })
                        }
                      </li>
                    )
                  })
                }
              </ul>
            )
          }
        </Transition>
      </div>
    )
  }
}

AutoComplete.propTypes = {
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  size: PropTypes.string,
  value: PropTypes.string,
  popperClass: PropTypes.string,
  fetchSuggestions: PropTypes.func,
  triggerOnFocus: PropTypes.bool,
  customItem: PropTypes.any,
  onSelect: PropTypes.func
}

AutoComplete.defaultProps = {
  triggerOnFocus: true
};

export default ClickOutside(AutoComplete);
