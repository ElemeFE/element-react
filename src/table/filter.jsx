// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import enhanceWithClickOutside from 'react-click-outside';
import { Component, PropTypes } from '../../libs';
import Popper from '../../libs/utils/popper';
import Checkbox from '../checkbox';

import type {
  FilterProps,
  FilterState,
  FilterDefaultProps
} from './Types';

class Filter extends Component{
  props: FilterProps;
  state: FilterState;

  static defaultProps: FilterDefaultProps;

  constructor(props, context){
    super(props, context);

    this.state = {
      visible: this.props.visible,
      defaultStyle: {
        position: 'absolute',
        transformOrigin: 'center top 0px',
        zIndex: 2000
      },
      checked: props.defaultCondi ? props.defaultCondi: []
    };
  }

  componentDidMount(){
    const root = this.refs.root;
    const { position } = this.props;
    const { style } = root;

    style.left = (position.x - root.offsetWidth) + 'px';
    style.top = position.y + 'px';
    var originClassName = root.className;

    root.className = this.classNames(
      originClassName,
      'el-zoom-in-top-enter'
    );

    root.clientHeight;//触发重新计算， 否则动画不会产生
    root.className = this.classNames(
      originClassName,
      'el-zoom-in-top-enter-active'
    );

    this.initPopper();
  }

  componentDidUpdate() {
    this.initPopper();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.visible != this.props.visible && !nextProps.visible){
      this.close();
    }
  }

  componentWillUnmount() {
    if (this.popperJS) {
      this.popperJS.destroy();
    }
  }

  initPopper() {
    const { visible } = this.state;

    if (visible) {
      if (this.popperJS) {
        this.popperJS.update();
      } else {
        this.popperJS = new Popper(this.props.popper, this.refs.root, {
          gpuAcceleration: false
        });
      }
    } else {
      if (this.popperJS) {
        this.popperJS.destroy();
      }

      delete this.popperJS;
    }
  }

  handleClickOutside(e){
    const className = e.target.className;
    if(className.indexOf('el-icon-arrow-down') > -1)return;
    this.close();
  }

  close(){
    const { ower, onClose } = this.props;
    const rootEl = this.refs.root;
    rootEl.className = this.classNames(
      'el-table-filter',
      'el-zoom-in-top-leave el-zoom-in-top-leave-active'
    );

    setTimeout(()=>{ ReactDOM.unmountComponentAtNode(ower.filterContainer); }, 300);
    onClose && onClose();
  }

  onFilterChange(checkedValues){
    this.setState({
      checked: checkedValues
    });
  }

  filterAction(){
    const { onFilter } = this.props;
    const { checked } = this.state;

    onFilter && onFilter(checked);
    this.close();
  }

  resetFilter(){
    const { onFilter } = this.props;

    this.setState({
      checked: []
    });

    onFilter && onFilter([]);
    this.close();
  }

  render(){
    const { filters, defaultCondi} = this.props;
    const { defaultStyle, checked } = this.state;

    return (
      <div
        ref="root"
        className={this.classNames('el-table-filter')}
        style={defaultStyle}>

        <div className="el-table-filter__content">
          <Checkbox.Group
            value={defaultCondi ? defaultCondi: checked}
            onChange={(opts)=>{this.onFilterChange(opts)}}
            className="el-table-filter__checkbox-group">
            {
              filters.map((item, idx)=>{
                return (
                  <Checkbox
                    key={idx}
                    value={item}
                    label={item.text}>
                  </Checkbox>
                )
              })
            }
          </Checkbox.Group>
        </div>

        <div className="el-table-filter__bottom">
          <button
            onClick={()=>{this.filterAction()}}
            disabled={!checked.length}
            className={!checked.length?'is-disabled':''}>
            筛选
          </button>
          <button onClick={()=>{this.resetFilter()}}>重置</button>
        </div>
      </div>
    )
  }
}

Filter.defaultProps = {
  filters: [],
  onFilter: ()=>{}
};

Filter.contextTypes = {
  $owerTable: PropTypes.object
};

export default enhanceWithClickOutside(Filter);
