import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import Popover from '../popover';
import Checkbox from '../checkbox';

import { FilterProps, FilterState } from './Types'

export default class FilterPannel extends Component<FilterProps, FilterState> {
  static contextTypes = {
    store: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      filteredValue: props.filteredValue
    }
  }

  handleFiltersChange(value) {
    this.setState({
      filteredValue: value
    })
  }

  changeFilteredValue(value)  {
    this.props.onFilterChange(value)
  }

  renderContent() {
    const { multiple, filters } = this.props;
    const { filteredValue } = this.state;
    if (multiple) {
      return (
        <div className="el-table-filter">
          <div className="el-table-filter__content">
            <Checkbox.Group value={filteredValue} onChange={this.handleFiltersChange.bind(this)}>
              {filters && filters.map(filter => (
                <Checkbox value={filter.value} label={filter.text} />
              ))}
            </Checkbox.Group>
          </div>
          <div className="el-table-filter__bottom">
            <button
              className={this.classNames({ 'is-disabled': !filteredValue || !!filteredValue.length })}
              disabled={!filteredValue ||!!filteredValue.length}
              onClick={this.changeFilteredValue.bind(this, filteredValue)}
            >
              筛选
            </button>
            <button onClick={this.changeFilteredValue.bind(this, null)}>重置</button>
          </div>
        </div>
      )
    }

    return (
      <div className="className">
        <ul className="el-table-filter__list">
          <li
            className={this.classNames('el-table-filter__list-item', { 'is-active': !filteredValue })}
            onClick={this.changeFilteredValue.bind(this, null)}
          >
            全部
          </li>
          {filters.map(filter => (
            <li
              className={this.classNames('el-table-filter__list-item', { 'is-active': filteredValue === filter.value })}
              onClick={this.changeFilteredValue.bind(this, filter.value)}
            >
              {filter.text}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  render() {
    return (
      <Popover content={this.renderContent()} visible={this.props.visible} visibleArrow={false} placement={this.props.placement}>
        {this.props.children}
      </Popover>
    )
  }
}