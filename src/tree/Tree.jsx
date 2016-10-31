import React from 'react';
import { PropTypes, Component } from '../../libs';
import { require_condition } from '../utils'
import Node from './Node'
import TreeModel from './model/tree'
/*
todo:
  when checkbox is added, do:
    optimize `onCheckChange` implementation
    check `getCheckedNodes`
*/
export default class Tree extends Component {
  constructor(props) {
    super(props)
    const {data, lazy, options, load} = this.props
    this.state = {
      treeModel: new TreeModel({ data, lazy, props: options, load: load }),
      currentNode: null
    }
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps)

    if (nextProps.data instanceof Array) {
      this.state.treeModel.root.setData(nextProps.data)
      this.setState({})//force update
    }
  }

  getCheckedNodes(leafOnly) {
    this.state.treeModel.getCheckedNodes(leafOnly)
  }

  /**
   * node: Node
   */
  getCurrentNode() {
    return this.state.currentNode
  }
  setCurrentNode(node) {
    require_condition(node != null)

    this.setState({
      currentNode: node
    })
  }


  render() {
    const {treeModel} = this.state
    const {options, renderContent, highlightCurrent, showCheckbox, onCheckChange, onNodeClicked} = this.props

    return (
      <div className={this.classNames('el-tree', { 'el-tree--highlight-current': highlightCurrent })}>
        {
          treeModel.root.childNodes.map((e, idx) => {
            return (
              <Node
                key={idx}
                nodeModel={e}
                options={options}
                renderContent={renderContent}
                treeNode={this}
                showCheckbox={showCheckbox}
                onCheckChange={onCheckChange}
                onNodeClicked={onNodeClicked}
                ></Node>
            )
          })
        }
      </div>
    )
  }
}

Tree.propTypes = {
  data: PropTypes.array,
  renderContent: PropTypes.func,
  showCheckbox: PropTypes.bool,
  options: PropTypes.shape({
    children: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
  }),//equal to props in vue element
  lazy: PropTypes.bool,
  highlightCurrent: PropTypes.bool,
  // (f:(resolve, reject)=>Unit)=>Unit
  load: PropTypes.func,
  // 
  onCheckChange: PropTypes.func,
  // (nodeModel.data, nodeModel, this)=>Unit
  onNodeClicked: PropTypes.func,
}

Tree.defaultProps = {
  data: [],
  options: { children: 'children', label: 'label', icon: 'icon' },
  onCheckChange(){},
  onNodeClicked(){},
}
