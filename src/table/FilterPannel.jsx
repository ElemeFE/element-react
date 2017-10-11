import * as React from 'react';
import ReactDOM from 'react-dom';
import { Component } from '../../libs';
import Popper from '../../libs/utils/popper';
import Checkbox from '../checkbox';

import { FilterProps, FilterState } from './Types'

function getPopupContainer() {
  const container = document.createElement('div');
  container.className = 'el-table-poper';
  container.style.zIndex = 999;
  document.body.appendChild(container);
  return container;
}

export default class FilterPannel extends Component<FilterProps, FilterState> {
  constructor(props) {
    super(props);

    this.container = getPopupContainer();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      filteredValue: props.filteredValue,
    }
  }

  componentDidMount() {
    this.renderPortal(this.renderContent(), this.container);
    setTimeout(() => {
      this.poperIns = new Popper(this.refer, this.container);
    });

    document.addEventListener('click', this.handleClickOutside)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filteredValue !== nextProps.filteredValue) {
      this.setState({ filteredValue: nextProps.filteredValue })
    }
  }

  componentDidUpdate(preProps) {
    this.renderPortal(this.renderContent(), this.container);

    if (!preProps.visible && this.props.visible) {
      const transitionEndHandler = () => {
        this.poper.classList.remove('el-zoom-in-top-enter-active', 'el-zoom-in-top-enter-to');
        this.poper.removeEventListener('transitionend', transitionEndHandler);
      };
      this.poper.addEventListener('transitionend', transitionEndHandler);

      requestAnimationFrame(() => {
        this.poper.classList.remove('el-zoom-in-top-leave-active', 'el-zoom-in-top-leave-to');
        this.poper.classList.add('el-zoom-in-top-enter');
        this.poper.style.display = '';
        requestAnimationFrame(() => {
          this.poperIns.update();
          this.poper.classList.remove('el-zoom-in-top-enter');
          this.poper.classList.add('el-zoom-in-top-enter-active');
          this.poper.classList.add('el-zoom-in-top-enter-to');
        })
      })
    }

    if (preProps.visible && !this.props.visible) {
      const transitionEndHandler = () => {
        this.poper.classList.remove('el-zoom-in-top-leave-active', 'el-zoom-in-top-leave-to');
        this.poper.style.display = 'none';
        this.poper.removeEventListener('transitionend', transitionEndHandler);
      };
      this.poper.addEventListener('transitionend', transitionEndHandler);

      requestAnimationFrame(() => {
        this.poper.classList.remove('el-zoom-in-top-enter-active', 'el-zoom-in-top-enter-to');
        this.poper.classList.add('el-zoom-in-top-leave');
        this.poper.classList.add('el-zoom-in-top-leave-active');
        requestAnimationFrame(() => {
          this.poper.classList.remove('el-zoom-in-top-leave');
          this.poper.classList.add('el-zoom-in-top-leave-to');
        })
      })
    }
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.container);
    document.removeEventListener('click', this.handleClickOutside);
    document.body.removeChild(this.container);
  }

  handleFiltersChange(value) {
    this.setState({
      filteredValue: value
    })
  }

  changeFilteredValue(value)  {
    this.props.toggleFilter();
    this.props.onFilterChange(value)
  }

  handleClickOutside() {
    if (this.props.visible) {
      this.props.toggleFilter();
    }
  }

  renderPortal(element, container) {
    ReactDOM.unstable_renderSubtreeIntoContainer(this, element, container);
  }

  renderContent() {
    const { multiple, filters } = this.props;
    const { filteredValue } = this.state;

    let content;
    if (multiple) {
      content = [(
        <div className="el-table-filter__content" key="content">
          <Checkbox.Group value={filteredValue} onChange={this.handleFiltersChange.bind(this)} className="el-table-filter__checkbox-group">
            {filters && filters.map(filter => (
              <Checkbox value={filter.value} label={filter.text} key={filter.value} />
            ))}
          </Checkbox.Group>
        </div>
      ), (
        <div className="el-table-filter__bottom" key="bottom">
          <button
            className={this.classNames({ 'is-disabled': !filteredValue || !filteredValue.length })}
            disabled={!filteredValue || !filteredValue.length}
            onClick={this.changeFilteredValue.bind(this, filteredValue)}
          >
            筛选
          </button>
          <button onClick={this.changeFilteredValue.bind(this, null)}>重置</button>
        </div>
      )]
    } else {
      content = (
        <ul className="el-table-filter__list">
          <li
            className={this.classNames('el-table-filter__list-item', { 'is-active': !filteredValue })}
            onClick={this.changeFilteredValue.bind(this, null)}
          >
            全部
          </li>
          {filters && filters.map(filter => (
            <li
              key={filter.value}
              className={this.classNames('el-table-filter__list-item', { 'is-active': filteredValue === filter.value })}
              onClick={this.changeFilteredValue.bind(this, filter.value)}
            >
              {filter.text}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div
        className={'el-table-filter'}
        style={!this.isMounted && { display: 'none' }} // 仅首次渲染设置display属性
        ref={(dom) => { this.poper = dom; }}
        onClick={(e) => { e.nativeEvent.stopImmediatePropagation() }}  // 防止触发document click事件回调
      >
        {content}
      </div>
    )
  }
  render() {
    return React.cloneElement(this.props.children, {
      ref: (dom) => { this.refer = dom; }
    });
  }
}
