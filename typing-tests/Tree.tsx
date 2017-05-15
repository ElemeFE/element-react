import * as React from 'react'
import { Tree } from 'element-react'
import { Tree as TreeNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  state = {
    data: [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]
  }
  filterNodeMethod = (value, data, node) => false
  renderContent = (nodeModel, data, store) => (<div>element</div>)
  load = (node, resolve) => { }
  onCheckChange = (data, checked, indeterminate) => { }
  onNodeClicked = (data, node) => { }
  onCurrentChange = (data, node) => { }
  onNodeExpand = (data, nodeModel, node) => { }
  onNodeCollapse = (data, nodeModel, node) => { }
  render() {
    return (
      <div>
        <Tree className="className" style={{ width: 100 }} />
        <Tree
          autoExpandParent={true}
          checkStrictly={false}
          currentNodeKey="12"
          defaultCheckedKeys={["12", "23"]}
          defaultExpandedKeys={["12", "23"]}
          defaultExpandAll={false}
          data={this.state.data}
          emptyText="无"
          expandOnClickNode={true}
          filterNodeMethod={this.filterNodeMethod}
          renderContent={this.renderContent}
          isShowCheckbox={true}
          accordion={true}
          indent={2}
          nodeKey={'key'}
          options={{ children: 'children', label: 'label', icon: 'icon' }}
          lazy={true}
          highlightCurrent={true}
          load={this.load}
          onCheckChange={this.onCheckChange}
          onNodeClicked={this.onNodeClicked}
          onCurrentChange={this.onCurrentChange}
          onNodeExpand={this.onNodeExpand}
          onNodeCollapse={this.onNodeCollapse}
        />

        <TreeNext className="className" style={{ width: 100 }} />
        <TreeNext
          autoExpandParent={true}
          checkStrictly={false}
          currentNodeKey="12"
          defaultCheckedKeys={["12", "23"]}
          defaultExpandedKeys={["12", "23"]}
          defaultExpandAll={false}
          data={this.state.data}
          emptyText="无"
          expandOnClickNode={true}
          filterNodeMethod={this.filterNodeMethod}
          renderContent={this.renderContent}
          isShowCheckbox={true}
          accordion={true}
          indent={2}
          nodeKey={'key'}
          options={{ children: 'children', label: 'label', icon: 'icon' }}
          lazy={true}
          highlightCurrent={true}
          load={this.load}
          onCheckChange={this.onCheckChange}
          onNodeClicked={this.onNodeClicked}
          onCurrentChange={this.onCurrentChange}
          onNodeExpand={this.onNodeExpand}
          onNodeCollapse={this.onNodeCollapse}
        />
      </div>
    )
  }
}


class TreeComponent extends Tree {
  componentDidmount() {
    this.className()
    this.classNames()
    this.style()

    this.filter('')
    this.getCheckedKeys()
    this.getCheckedKeys(true)

    this.setCheckedKeys(['a', 'b'])
    this.setCheckedKeys(['a', 'b'], true)

    this.getCheckedNodes()
    this.getCheckedNodes(true)

    this.setCheckedNodes(['a', 'b'])
    this.setCheckedNodes(['a', 'b'], true)

    this.setChecked('a', true)
    this.setChecked('a', true, true)
  }
}
