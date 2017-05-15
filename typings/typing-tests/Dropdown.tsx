import * as React from 'react'
import { Dropdown } from 'element-react'
import { Dropdown as DropdownNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {

  onClick = () => { }
  onCommand = (commond, instance) => { }
  render() {
    return (
      <div>
        <Dropdown menu={(
          <Dropdown.Menu className="className" style={{ width: 100 }}>
            <Dropdown.Item className="className" style={{ width: 100 }}>黄金糕</Dropdown.Item>
          </Dropdown.Menu>
        )} className="className" style={{ width: 100 }}>
          <div>点我</div>
        </Dropdown>
        <Dropdown type="success" size="large" trigger="hover" menuAlign="start" menu={(
          <Dropdown.Menu>
            <Dropdown.Item>黄金糕</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <div>点我</div>
        </Dropdown>
        <Dropdown type="info" size="small" menu={(
          <Dropdown.Menu>
            <Dropdown.Item>黄金糕</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <div>点我</div>
        </Dropdown>
        <Dropdown type="warning" menu={(
          <Dropdown.Menu>
            <Dropdown.Item>黄金糕</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <div>点我</div>
        </Dropdown>
        <Dropdown type="danger" menu={(
          <Dropdown.Menu>
            <Dropdown.Item>黄金糕</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <div>点我</div>
        </Dropdown>
        <Dropdown type="primary" menu={(
          <Dropdown.Menu>
            <Dropdown.Item>黄金糕</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <div>点我</div>
        </Dropdown>
        <Dropdown type="text" size="mini" trigger="click" menuAlign="end" splitButton={true} hideOnClick={true} onClick={this.onClick} onCommand={this.onCommand} menu={(
          <Dropdown.Menu>
            <Dropdown.Item command="com" disabled={true} divided={true}>黄金糕</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <div>点我</div>
        </Dropdown>
      </div>
    )
  }
}
