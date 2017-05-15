import * as React from 'react'
import { Collapse } from 'element-react'
import { Collapse as CollapseNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onChange = (activeNames) => { }
  onClick = (item) => { }
  render() {
    return (
      <div>
        <Collapse className="className" style={{ width: 100 }}>
          <Collapse.Item className="className" style={{ width: 100 }}>item</Collapse.Item>
        </Collapse>
        <Collapse accordion={true} value="32" onChange={this.onChange}>
          <Collapse.Item onClick={this.onClick} isActive={true} title={true ? 'title' : (<div>title</div>)} name="name">item</Collapse.Item>
        </Collapse>

        <CollapseNext className="className" style={{ width: 100 }}>
          <CollapseNext.Item className="className" style={{ width: 100 }}>item</CollapseNext.Item>
        </CollapseNext>
        <CollapseNext accordion={true} value="32" onChange={this.onChange}>
          <CollapseNext.Item onClick={this.onClick} isActive={true} title={true ? 'title' : (<div>title</div>)} name="name">item</CollapseNext.Item>
        </CollapseNext>
      </div>
    )
  }
}
