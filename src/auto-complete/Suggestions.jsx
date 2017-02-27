import React from 'react';
import ReactDOM from 'react-dom';
import Popper from '../../libs/utils/popper';
import { Component, PropTypes, Transition, View } from '../../libs';

import { Scrollbar } from '../scrollbar';

export default class Suggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopper: false,
      dropdownWidth: ''
    };
  }

  componentDidUpdate() {
    const { showPopper } = this.state;

    if (showPopper) {
      if (this.popperJS) {
        this.popperJS.update();
      } else {
        this.popperJS = new Popper(ReactDOM.findDOMNode(this.parent()), this.refs.popper, this.props.options);
      }
    } else {
      if (this.popperJS) {
        this.popperJS.destroy();
      }
    }
  }

  componentWillUnMount() {
    if (this.popperJS) {
      this.popperJS.destroy();
    }
  }

  onVisibleChange(visible, inputWidth) {
    console.log(visible, inputWidth);
    
    this.setState({
      dropdownWidth: inputWidth,
      showPopper: visible
    })
  }

  parent() {
    return this.context.component;
  }

  select(item) {
    this.parent().select(item);
  }

  render() {
    const { customItem } = this.parent().props;
    const { loading, highlightedIndex } = this.parent().state;
    const { suggestions } = this.props;
    const { showPopper, dropdownWidth } = this.state;

    return (
      <Transition name="el-zoom-in-top">
        <View show={showPopper}>
          <div ref="popper" className={this.classNames('el-autocomplete-suggestion', {
              'is-loading': loading
            })}
            style={{ width: dropdownWidth }}
          >
            <Scrollbar
              viewComponent="ul"
              wrapClass="el-autocomplete-suggestion__wrap"
              viewClass="el-autocomplete-suggestion__list"
            >
              {
                this.parent().state.loading ? (
                  <li><i className="el-icon-loading"></i></li>
                ) : suggestions.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={this.classNames({'highlighted': highlightedIndex === index})}
                      onClick={this.select.bind(this, item)}>
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
            </Scrollbar>
          </div>
        </View>
      </Transition>
    )
  }
}

Suggestions.contextTypes = {
  component: PropTypes.any
};

Suggestions.propTypes = {
  suggestions: PropTypes.array,
  options: PropTypes.object
}

Suggestions.defaultProps = {
  options: {
    forceAbsolute: true,
    gpuAcceleration: false
  }
};
