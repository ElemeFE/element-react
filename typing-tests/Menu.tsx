import * as React from 'react'
import { Menu } from 'element-react'
import { Menu as MenuNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onSelect = (index, indexPath) => { }
  onOpen = (index, indexPath) => { }
  onClose = (index, indexPath) => { }
  render() {
    return (
      <div>
        <Menu className="className" style={{ width: 100 }}>
          <Menu.SubMenu index="1" className="className" style={{ width: 100 }}>
            <Menu.ItemGroup title="group" className="className" style={{ width: 100 }}>
              <Menu.Item index="2" className="className" style={{ width: 100 }}>导航二</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        </Menu>
        <Menu mode="vertical" theme="dark" />
        <Menu mode="horizontal" defaultActive="1" defaultOpeneds={['1', '2']} theme="light" uniqueOpened={true} menuTrigger="hover" onSelect={this.onSelect} onOpen={this.onOpen} onClose={this.onClose}>
          <Menu.SubMenu index="1">
            <Menu.ItemGroup title="group">
              <Menu.Item index="2" disabled={true}>导航二</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        </Menu>

        <MenuNext className="className" style={{ width: 100 }}>
          <MenuNext.SubMenu index="1" className="className" style={{ width: 100 }}>
            <MenuNext.ItemGroup title="group" className="className" style={{ width: 100 }}>
              <MenuNext.Item index="2" className="className" style={{ width: 100 }}>导航二</MenuNext.Item>
            </MenuNext.ItemGroup>
          </MenuNext.SubMenu>
        </MenuNext>
        <MenuNext mode="vertical" theme="dark" />
        <MenuNext mode="horizontal" defaultActive="1" defaultOpeneds={['1', '2']} theme="light" uniqueOpened={true} menuTrigger="hover" onSelect={this.onSelect} onOpen={this.onOpen} onClose={this.onClose}>
          <MenuNext.SubMenu index="1">
            <MenuNext.ItemGroup title="group">
              <MenuNext.Item index="2" disabled={true}>导航二</MenuNext.Item>
            </MenuNext.ItemGroup>
          </MenuNext.SubMenu>
        </MenuNext>
      </div>
    )
  }
}
