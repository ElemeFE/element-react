/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Popper from '../../libs/utils/popper';
import { Component, PropTypes, Transition, View } from '../../libs';

import { Scrollbar } from '../scrollbar';

type Props = {
  suggestions: Array<any>,
}

type State = {
  showPopper: boolean,
  dropdownWidth: string,
}

export default class Suggestions extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      showPopper: false,
      dropdownWidth: ''
    };
  }

  componentDidUpdate(): void {
    const reference = ReactDOM.findDOMNode(this.parent().inputNode);

    if (this.state.showPopper) {
      if (this.popperJS) {
        this.popperJS.update();
      } else {
        this.popperJS = new Popper(reference, this.refs.popper, {
          gpuAcceleration: false,
          forceAbsolute: true
        });
      }
    } else {
      if (this.popperJS) {
        this.popperJS.destroy();
      }

      delete this.popperJS;
    }
  }

  componentWillUnmount(): void {
    if (this.popperJS) {
      this.popperJS.destroy();
    }
  }

  onVisibleChange(visible: boolean, inputWidth: string): void {
    setTimeout(() => {
      this.setState({
        dropdownWidth: inputWidth,
        showPopper: visible
      })
    }, 30);
  }

  parent(): Component {
    return this.context.component;
  }

  onSelect(item: Object): void {
    this.parent().select(item);
  }

  render(): React.Element<any> {
    const { customItem } = this.parent().props;
    const { loading, highlightedIndex } = this.parent().state;
    const { suggestions } = this.props;
    const { showPopper, dropdownWidth } = this.state;

    return (
      <Transition name="el-zoom-in-top">
        <View show={showPopper}>
          <div
            ref="popper"
            className={this.classNames('el-autocomplete-suggestion', {
              'is-loading': loading
            })}
            style={{
              width: dropdownWidth,
              zIndex: 1
            }}
          >
            <Scrollbar
              viewComponent="ul"
              wrapClass="el-autocomplete-suggestion__wrap"
              viewClass="el-autocomplete-suggestion__list"
            >
              {
                loading ? (
                  <li><i className="el-icon-loading"></i></li>
                ) : suggestions.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={this.classNames({'highlighted': highlightedIndex === index})}
                      onClick={this.onSelect.bind(this, item)}>
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
