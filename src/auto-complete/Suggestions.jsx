/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Popper from 'popper.js';
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

  onVisibleChange(visible: boolean, inputWidth: string): void {
    this.setState({
      dropdownWidth: inputWidth,
      showPopper: visible
    });
  }

  parent(): Component {
    return this.context.component;
  }

  onSelect(item: Object): void {
    this.parent().select(item);
  }

  onEnter(): void {
    const reference = ReactDOM.findDOMNode(this.parent().inputNode);

    this.popperJS = new Popper(reference, this.refs.popper, {
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        }
      }
    });
  }

  onAfterLeave(): void {
    this.popperJS.destroy();
  }

  render(): React.Element<any> {
    const { customItem } = this.parent().props;
    const { loading, highlightedIndex } = this.parent().state;
    const { suggestions } = this.props;
    const { showPopper, dropdownWidth } = this.state;

    return (
      <Transition name="el-zoom-in-top" onEnter={this.onEnter.bind(this)} onAfterLeave={this.onAfterLeave.bind(this)}>
        <View show={showPopper}>
          <div
            ref="popper"
            className={this.classNames('el-autocomplete-suggestion', 'el-popper', {
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
