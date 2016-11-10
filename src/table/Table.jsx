import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes } from '../../libs';
import TableHeader from './TableHeader'
import TableBody from './TableBody'

export default class Table extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      bodyWidth: 'auto',
      bodyHeight: 'auto',
      headerHeight: 'auto',
      resizeProxyVisible: false
    }
  }

  getChildContext(){
    return {
      $parent: this
    }
  }

  componentDidMount(){
    this.initLayout();
  }

  initLayout(){
    const { height } = this.props;
    const rootDom = ReactDOM.findDOMNode(this);
    const bodyWidth = parseFloat(window.getComputedStyle(rootDom).getPropertyValue("width"));
    const headerHeight = this.refs.headerWrapper.offsetHeight;
    const bodyHeight = height ? height - headerHeight : this.state.headerHeight;

    this.setState({
      bodyWidth,
      bodyHeight,
      headerHeight,
    });
  }

  render() {
    const {
      fit,
      stripe,
      border,
      columns,
      data } = this.props;

    const { 
      bodyWidth, 
      bodyHeight } = this.state;

    const rootClassName = this.classNames(
      'el-table',
      {
        'el-table--fit':fit,
        'el-table--striped': stripe,
        'el-table--border': border
      }
    );


    return (
      <div className={rootClassName}>
        <div
          ref="headerWrapper"
          className="el-table__header-wrapper">
          <TableHeader style={{width: bodyWidth}} {...this.props}/>
        </div>
        <div
          style={{height: bodyHeight}}
          className="el-table__body-wrapper"
          ref="bodyWrapper">
          <TableBody
            style={{width: bodyWidth}} {...this.props} />
        </div>

        <div
          style={{display: this.state.resizeProxyVisible?"block":"none"}}
          className="el-table__column-resize-proxy" 
          ref="resizeProxy">
        </div>
      </div>
    )
  }
}

Table.childContextTypes = {
  $parent: React.PropTypes.object
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  stripe: PropTypes.bool,
  border: PropTypes.bool,
  fit: PropTypes.bool,
  rowClassName: PropTypes.func,
  style: PropTypes.object
};

Table.defaultProps = {
  stripe: false,
  border: false,
  fit: true
};
