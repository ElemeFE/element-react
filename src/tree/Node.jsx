/* @flow */

import React from 'react';

import { PropTypes, Component, CollapseTransition } from '../../libs';
import { watchPropertyChange, IDGenerator } from '../../libs/utils';
import Checkbox from '../checkbox';


function NodeContent({context, renderContent}) {
  const {nodeModel, treeNode} = context.props;

  if (typeof renderContent === 'function') {
    return renderContent(nodeModel, nodeModel.data, treeNode.store);
  } else {
    return <span className="el-tree-node__label">{nodeModel.label}</span>;
  }
}

NodeContent.propTypes = {
  renderContent: PropTypes.func,
  context: PropTypes.object.isRequired
};

type State = {
  childNodeRendered: boolean,
};


export default class Node extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      childNodeRendered: false,
    }
    this.idGen = new IDGenerator()
    this.mapProps(props)
  }

  mapProps(props: Object): void{
    let {nodeModel} = props
    this.oldChecked = nodeModel.checked
    this.oldIndeterminate = nodeModel.indeterminate
  }

  componentDidMount(){
    this.registerEvents(this.props)
  }
  
  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.nodeModel !== this.props.nodeModel || nextProps.options !== this.props.options || nextProps.nodeKey !== this.props.nodeKey){
      this.dispose()
      this.mapProps(nextProps)
      this.registerEvents(nextProps)
    }
  }

  registerEvents(props: Object){
    let {nodeModel, options: {children: childrenKey}} = props
    
    const triggerChange = (...args)=>{
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        this.handleSelectChange(...args)
      }, 20)
    }
    
    this.restoreEnhancedLoad = this.enhanceLoad(nodeModel);
    this.watchers = {
      [this.idGen.next()]: watchPropertyChange( nodeModel, 'indeterminate', value => {
          triggerChange(nodeModel.checked, value);
      }),
      [this.idGen.next()]: watchPropertyChange(nodeModel, 'checked', value => {
        triggerChange(value, nodeModel.indeterminate);
      }),
      [this.idGen.next()]: watchPropertyChange(nodeModel, 'loading', () => {
        this.refresh();
      }),
    };
  
    if (nodeModel.data != null) {
      this.watchers[this.idGen.next()] = watchPropertyChange(nodeModel.data, childrenKey, () => {
        nodeModel.updateChildren();
        this.refresh(); //force update view
      });
    }
  }
  
  dispose(){
    this.timer && clearTimeout(this.timer)
    this.restoreEnhancedLoad();
    // clear watchs
    for (let w in this.watchers) {
      if (this.watchers[w]) {
        this.watchers[w]();
      }
    }
    this.watchers = null
  }

  componentWillUnmount(): void {
    this.dispose()
  }

  enhanceLoad(nodeModel: Object): Function {
    const load = nodeModel.load;
    const enhanced = (...args) => {
      load.apply(undefined, args);
      this.refresh();
    };
    nodeModel.load = enhanced;
    return () => { // deconstruct
      nodeModel.load = load;
    };
  }

  handleSelectChange(checked: boolean, indeterminate: boolean): void {
    const { onCheckChange, nodeModel } = this.props;

    // !NOTE: 原码是 && 的关系，感觉有bug
    if (
      this.oldChecked !== checked || this.oldIndeterminate !== indeterminate
    ) {
      onCheckChange(nodeModel.data, checked, indeterminate);
      this.refresh(); //force update
    }

    this.oldChecked = checked;
    this.oldIndeterminate = indeterminate;
  }

  getNodeKey(node: any, otherwise: number) {
    const nodeKey = this.props.nodeKey;
    if (nodeKey && node && node.data[nodeKey]) {
      return node.data[nodeKey];
    }
    return otherwise;
  }


  handleClick(evt: ?SyntheticEvent): void {
    if (evt) evt.stopPropagation();
    const { treeNode } = this.props;

    treeNode.setCurrentNode(this);
    if (treeNode.props.expandOnClickNode){
      this.handleExpandIconClick()
    }
  }

  handleExpandIconClick(evt: ?SyntheticEvent): void {
    if (evt) evt.stopPropagation();

    const { nodeModel, parent } = this.props;
    const {onNodeCollapse, onNodeExpand} = this.props.treeNode.props;

    if (nodeModel.isLeaf) return;

    if (nodeModel.expanded) {
      nodeModel.collapse()
      this.refresh()
      onNodeCollapse(nodeModel.data, nodeModel, this)
    } else {
      nodeModel.expand(() => {
        this.setState({childNodeRendered: true }, () => {
          onNodeExpand(nodeModel.data, nodeModel, this)
        });
        parent.closeSiblings(nodeModel)
      });
    }
  }

  closeSiblings(exclude: any){
    const {treeNode, nodeModel} = this.props;
    if (!treeNode.props.accordion) return;
    if (nodeModel.isLeaf || !nodeModel.childNodes || !nodeModel.childNodes.length) return;

    nodeModel.childNodes.filter(e=> e !== exclude).forEach(e=>e.collapse());
    this.refresh();
  }

  refresh(){
    this.setState({})
  }

  handleUserClick(): void {
    let {nodeModel, checkStrictly} = this.props.treeNode;
    if (nodeModel.indeterminate) {
      nodeModel.setChecked(nodeModel.checked, !checkStrictly);
    }
  }

  handleCheckChange(checked: boolean): void {
    this.props.nodeModel.setChecked(checked, true);
  }

  render(): React.Element<any> {
    const { childNodeRendered } = this.state;
    const { treeNode, nodeModel, isShowCheckbox } = this.props;

    let expanded = nodeModel.expanded;

    return (
      <div
        onClick={this.handleClick.bind(this)}
        className={this.classNames('el-tree-node', {
          expanded: childNodeRendered && expanded,
          'is-current': treeNode.getCurrentNode() === this,
          'is-hidden': !nodeModel.visible
        })}
        style={{display: nodeModel.visible ? '': 'none'}}
      >
        <div
          className="el-tree-node__content"
          style={{ paddingLeft: `${(nodeModel.level - 1) * treeNode.props.indent}px` }}
        >
          <span
            className={this.classNames('el-tree-node__expand-icon', {
              'is-leaf': nodeModel.isLeaf,
              expanded: !nodeModel.isLeaf && expanded
            })}
            onClick={this.handleExpandIconClick.bind(this)}
          />
          {isShowCheckbox &&
            <Checkbox
              checked={nodeModel.checked}
              onChange={this.handleCheckChange.bind(this)}
              indeterminate={nodeModel.indeterminate}
              onClick={this.handleUserClick.bind(this)}
            />}
          {nodeModel.loading &&
            <span className="el-tree-node__loading-icon el-icon-loading"> </span>}
          <NodeContent
            nodeModel={nodeModel}
            renderContent={treeNode.props.renderContent}
            context={this}
          />
        </div>
        <CollapseTransition isShow={expanded} ref="collapse">
          <div className="el-tree-node__children">
            {nodeModel.childNodes.map((e, idx) => {
              let props = Object.assign({}, this.props, { nodeModel: e, parent: this });
              return <Node {...props} key={this.getNodeKey(e, idx)} />;
            })}
          </div>
        </CollapseTransition>
      </div>
    );
  }
}

Node.propTypes = {
  nodeModel: PropTypes.object,
  options: PropTypes.object,
  treeNode: PropTypes.object.isRequired,
  isShowCheckbox: PropTypes.bool,
  onCheckChange: PropTypes.func,
  parent: PropTypes.any,
  nodeKey: PropTypes.string,
  onNodeCollapse: PropTypes.func,
  onNodeExpand: PropTypes.func
};

Node.defaultProps = {
  nodeModel: {},
  options: {},
  onCheckChange() {},
};
