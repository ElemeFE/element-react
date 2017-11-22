/* eslint react/prop-types: ["off"] */

import React from 'react';
import { shallow, mount } from 'enzyme';
// import sinon from 'sinon'

import Tree from '../'
import { treedata1, treedata2 } from './data'

const treeoption = {
  children: 'children',
  label: 'label'
}

describe('DatePicker tests', function () {
  let minProps = {
    data: treedata1,
    options: treeoption,
    highlightCurrent: true,
    isShowCheckbox: true,
    nodeKey: 'id',
    /* eslint-disable */
    onCheckChange: function (data, checked, indeterminate) {
    },
    onNodeClicked: function (data, reactElement) {
    }
    /* eslint-enable */
  }

  function mountDefault(props = {}) {
    let merged = { ...minProps, ...props }
    return mount(
      <Tree
        {...merged}
      />
    )
  }

  it('should render without exploding', () => {
    let w = shallow(
      <Tree
        {...minProps}
      />
    )
    expect(w.exists()).toBeTruthy();
    w.unmount()
  })

  it('should properly reload different treedata', async () => {
    let w = mountDefault({
      defaultExpandedKeys: [1, 2],
      defaultCheckedKeys: [5, 6]
    });
    expect(w.contains(<span className="el-tree-node__label">lvl2#2-1</span>)).toBeTruthy()
    expect(w.contains(<span className="el-tree-node__label">lvl2@2-1</span>)).toBeFalsy()

    w.setProps({ data: treedata2 });
    expect(w.contains(<span className="el-tree-node__label">treedata2_2@1-1</span>)).toBeTruthy()
    w.unmount()
  })

  it('should properly reload different treedata with checked status', async () => {
    let w = mountDefault({
      defaultExpandedKeys: [1, 2],
      defaultCheckedKeys: [5, 9]
    });
    let checked = w.find('span.is-checked')
    expect(checked.length).toBe(2)
    w.setProps({ data: treedata2, defaultCheckedKeys: [0x15] });
    checked = w.find('span.is-checked')
    expect(checked.length).toBe(1)
  })

  it('should correctly add and remove nodes', async () => {
    let w = mount(<AddRemoveDemo />)
    let checkbox = w.find('label.el-checkbox')
    expect(checkbox.length).toBe(4)
    w.find(`button#append_${4}`).simulate('click')
    checkbox = w.find('label.el-checkbox')
    expect(checkbox.length).toBe(5)
    w.find(`button#remove_${4}`).simulate('click')
    checkbox = w.find('label.el-checkbox')
    expect(checkbox.length).toBe(1)
  })
})

class AddRemoveDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      }],
      options: {
        children: 'children',
        label: 'label'
      }
    }
    this.id = 100;
  }

  append(store, data) {
    store.append({ id: this.id++, label: `testtest_${this.id}`, children: [] }, data);
    store.syncView()
  }

  remove(store, data) {
    store.remove(data);
    store.syncView()
  }

  renderContent(nodeModel, data, store) {
    return (
      <span>
        <span>
          <span>{data.label}</span>
        </span>
        <span style={{ float: 'right', marginRight: '20px' }}>
          <button size="mini" id={`append_${data.id}`} onClick={() => this.append(store, data)}>Append</button>
          <button size="mini" id={`remove_${data.id}`} onClick={() => this.remove(store, data)}>remove</button>
        </span>
      </span>);
  }

  render() {
    const { data, options } = this.state

    return (
      <Tree
        data={data}
        options={options}
        isShowCheckbox={true}
        nodeKey="id"
        defaultExpandAll={true}
        expandOnClickNode={false}
        renderContent={(...args) => this.renderContent(...args)}
      />
    )
  }
}


