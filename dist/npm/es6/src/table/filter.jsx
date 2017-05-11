//      
import React from 'react';
import ReactDOM from 'react-dom';
import enhanceWithClickOutside from 'react-click-outside';
import { Component, PropTypes } from '../../libs';
import Checkbox from '../checkbox';
                                                                                   


class Filter extends Component{
                     
                     

                                          

  constructor(props, context){
    super(props, context);

    this.state = {
      visible: this.props.visible,
      defaultStyle: {position: 'absolute', transformOrigin: 'center top 0px', zIndex: 2000},
      checked: props.defaultCondi ? props.defaultCondi: []
    };
  }

  componentDidMount(){
    const rootEl = this.refs.root;
    const { position } = this.props;
    const { style } = rootEl;

    style.left = (position.x - this.refs.root.offsetWidth) + 'px';
    style.top = position.y + 'px';
    rootEl.className = this.classNames(rootEl.className, 'md-fade-center-enter');
    setTimeout(()=>{rootEl.className = this.classNames(rootEl.className, 'md-fade-bottom-enter-active')}, 0);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.visible != this.props.visible && !nextProps.visible){
      this.close();
    }
  }

  handleClickOutside(e){
    if(e.target.className.indexOf('el-icon-arrow-down') > -1)return;
    this.close();
  }

  close(){
    const { ower, onClose } = this.props;
    const rootEl = this.refs.root;
    rootEl.className = this.classNames('el-table-filter', 'md-fade-bottom-leave-active');
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
            options={defaultCondi ? defaultCondi: checked}
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
};

Filter.defaultProps = {
  filters: [],
  onFilter: ()=>{}
};

Filter.contextTypes = {
  $owerTable: PropTypes.object
};

export default enhanceWithClickOutside(Filter);