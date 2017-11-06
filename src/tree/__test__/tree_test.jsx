/* eslint react/prop-types: ["off"] */

import React from 'react';
import { shallow, mount } from 'enzyme';
// import sinon from 'sinon'

import Tree from '../'
import {treedata1, treedata2} from './data'

const treeoption = {
  children: 'children',
  label: 'label'
}

describe('DatePicker tests', function () {

  describe('DatePicker test', function () {
    let minProps = {
      data: treedata1,
      options: treeoption,
      highlightCurrent: true,
      isShowCheckbox: true,
      nodeKey: 'id',
      /* eslint-disable */
      onCheckChange: function(data, checked, indeterminate){
      },
      onNodeClicked: function(data, reactElement){
      }
      /* eslint-enable */
    }

    function mountDefault(props = {}) {
      let merged = {...minProps, ...props}
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

    it('should properly reload different treedata', async ()=>{
      let w = mountDefault({
        defaultExpandedKeys:[1, 2],
        defaultCheckedKeys:[5, 6]
      });
      expect(w.contains(<span className="el-tree-node__label">lvl2#2-1</span>)).toBeTruthy()
      expect(w.contains(<span className="el-tree-node__label">lvl2@2-1</span>)).toBeFalsy()

      w.setProps({ data: treedata2 });
      expect(w.contains(<span className="el-tree-node__label">treedata2_2@1-1</span>)).toBeTruthy()
      w.unmount()
    })

    it('should properly reload different treedata with checked status', async ()=>{
      let w = mountDefault({
        defaultExpandedKeys:[1, 2],
        defaultCheckedKeys:[5, 9]
      });
      let checked = w.find('span.is-checked')
      expect(checked.length).toBe(2)
      w.setProps({ data: treedata2, defaultCheckedKeys: [0x15] });
      checked = w.find('span.is-checked')
      expect(checked.length).toBe(1)
    })
  })
})


