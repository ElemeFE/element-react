## NavMenu

Menu that provides navigation for your website.

### Top bar

Top bar NavMenu can be used in a variety of scenarios.

::: demo By default Menu is vertical, but you can change it to horizontal by setting the mode prop to 'horizontal'. In addition, you can use the submenu component to create a second level menu.
```js
render() {
  return (
    <div>
      <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
        <Menu.Item index="1">Processing Center</Menu.Item>
        <Menu.SubMenu index="2" title="Workspace">
          <Menu.Item index="2-1">Option 1</Menu.Item>
          <Menu.Item index="2-2">Option 2</Menu.Item>
          <Menu.Item index="2-3">Option 3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index="3">Orders</Menu.Item>
      </Menu>
      <div className="line"></div>
      <Menu defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
        <Menu.Item index="1">Processing Center</Menu.Item>
        <Menu.SubMenu index="2" title="Workspace">
          <Menu.Item index="2-1">Option 1</Menu.Item>
          <Menu.Item index="2-2">Option 2</Menu.Item>
          <Menu.Item index="2-3">Option 3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index="3">Orders</Menu.Item>
      </Menu>
    </div>
  )
}

onSelect() {

}
```
:::

### Side bar

Vertical NavMenu with sub-menus.

::: demo You can use the el-menu-item-group component to create a menu group, and the name of the group is determined by the title prop or a named slot.
```js
render() {
  return (
    <Layout.Row className="tac">
      <Layout.Col span={8}>
        <h5>With icons</h5>
        <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
          <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>Navigator One</span>}>
            <Menu.ItemGroup title="Group One">
              <Menu.Item index="1-1">Option 1</Menu.Item>
              <Menu.Item index="1-2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Group Two">
              <Menu.Item index="1-3">Option 3</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
          <Menu.Item index="2"><i className="el-icon-menu"></i>Navigator Two</Menu.Item>
          <Menu.Item index="3"><i className="el-icon-setting"></i>Navigator Three</Menu.Item>
        </Menu>
      </Layout.Col>
      <Layout.Col span={8}>
      <h5>Without icons</h5>
      <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)} theme="dark">
        <Menu.SubMenu index="1" title="Navigator One">
          <Menu.ItemGroup title="Group One">
            <Menu.Item index="1-1">Option 1</Menu.Item>
            <Menu.Item index="1-2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Group Two">
            <Menu.Item index="1-3">Option 3</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item index="2">Navigator Two</Menu.Item>
        <Menu.Item index="3">Navigator Three</Menu.Item>
      </Menu>
      </Layout.Col>
      <Layout.Col span={8}>
      <h5>Groups</h5>
      <Menu mode="vertical" defaultActive="1" className="el-menu-vertical-demo">
        <Menu.ItemGroup title="Group One">
          <Menu.Item index="1"><i className="el-icon-message"></i>Navigator One</Menu.Item>
          <Menu.Item index="2"><i className="el-icon-message"></i>Navigator Two</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Group Two">
          <Menu.Item index="3"><i className="el-icon-message"></i>Navigator Three</Menu.Item>
          <Menu.Item index="4"><i className="el-icon-message"></i>Navigator Four</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
      </Layout.Col>
    </Layout.Row>
  )
}

onOpen() {

}

onClose() {

}
```
:::

### Menu Attribute
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| mode     | menu display mode   | string  |   horizontal/vertical   | vertical |
| theme     | theme color   | string    | light/dark | light |
| defaultActive | index of currently active menu | string    | — | — |
| defaultOpeneds | array that contains keys of currently active sub-menus  | Array    | — | — |
| uniqueOpened  |  whether only one sub-menu can be active  | boolean   | — | false   |
| menuTrigger | how sub-menus are triggered, only works when `mode` is 'horizontal' | string    | — | hover |


### Menu Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| onSelect  | callback function when menu is activated | index: index of activated menu, indexPath: index path of activated menu  |
| onOpen  | callback function when sub-menu expands | index: index of expanded sub-menu, indexPath: index path of expanded sub-menu |
| onClose  | callback function when sub-menu collapses | index: index of collapsed sub-menu, indexPath: index path of collapsed sub-menu |

### Menu-Item Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| onClick  | callback function when menu-item is clicked | el: menu-item instance  |

### SubMenu Attribute
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| index     | unique identification   | string  | — | — |

### Menu-Item Attribute
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| index     | unique identification   | string  | — | — |

### Menu-Group Attribute
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| title     | group title   | string  | — | — |
