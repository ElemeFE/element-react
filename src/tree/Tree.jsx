/* @flow */

import React from 'react';
import { PropTypes, Component } from '../../libs';
import { require_condition } from '../../libs/utils';
import Node from './Node';
import TreeModel from './model/tree';

type State = {
  treeModel: TreeModel,
  currentNode: ?Object
};

export default class Tree extends Component {
  state: State;

  constructor(props: Object) {
    super(props);
    const { data, lazy, options, load } = this.props;
    this.state = {
      treeModel: new TreeModel({ data, lazy, props: options, load: load }),
      currentNode: null
    };
  }

  componentWillReceiveProps(nextProps: Object): void {
    if (nextProps.data instanceof Array) {
      this.state.treeModel.root.setData(nextProps.data);
      this.setState({}); //force update
    }
  }

  getCheckedNodes(leafOnly: boolean): void {
    this.state.treeModel.getCheckedNodes(leafOnly);
  }

  /**
   * node: Node
   */
  getCurrentNode(): ?Object {
    return this.state.currentNode;
  }

  setCurrentNode(node: ?Object): void {
    require_condition(node != null);

    this.setState({
      currentNode: node
    });
  }

  render(): React.Element<any> {
    const { treeModel } = this.state;
    const {
      options,
      renderContent,
      highlightCurrent,
      isShowCheckbox,
      onCheckChange,
      onNodeClicked
    } = this.props;

    return (
      <div
        style={this.style()}
        className={this.className('el-tree', {
          'el-tree--highlight-current': highlightCurrent
        })}
      >
        {treeModel.root.childNodes.map((e, idx) => {
          return (
            <Node
              key={idx}
              nodeModel={e}
              options={options}
              renderContent={renderContent}
              treeNode={this}
              isShowCheckbox={isShowCheckbox}
              onCheckChange={onCheckChange}
              onNodeClicked={onNodeClicked}
            />
          );
        })}
      </div>
    );
  }
}

Tree.propTypes = {
  data: PropTypes.array,
  renderContent: PropTypes.func,
  isShowCheckbox: PropTypes.bool,
  options: PropTypes.shape({
    children: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string
  }), //equal to props in vue element
  lazy: PropTypes.bool, //todo: check this
  highlightCurrent: PropTypes.bool,
  // (f:(resolve, reject)=>Unit)=>Unit
  load: PropTypes.func,
  //
  onCheckChange: PropTypes.func,
  // (nodeModel.data, nodeModel, this)=>Unit
  onNodeClicked: PropTypes.func
};

Tree.defaultProps = {
  data: [],
  options: { children: 'children', label: 'label', icon: 'icon' },
  onCheckChange() {},
  onNodeClicked() {}
};
