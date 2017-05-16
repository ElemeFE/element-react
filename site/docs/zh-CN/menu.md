## NavMenu 导航菜单

为网站提供导航功能的菜单。

### 顶栏

适用广泛的基础用法。

::: demo
```js
render() {
  return (
    <div>
      <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
        <Menu.Item index="1">处理中心</Menu.Item>
        <Menu.SubMenu index="2" title="我的工作台">
          <Menu.Item index="2-1">选项1</Menu.Item>
          <Menu.Item index="2-2">选项2</Menu.Item>
          <Menu.Item index="2-3">选项3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index="3">订单管理</Menu.Item>
      </Menu>
      <div className="line"></div>
      <Menu defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
        <Menu.Item index="1">处理中心</Menu.Item>
        <Menu.SubMenu index="2" title="我的工作台">
          <Menu.Item index="2-1">选项1</Menu.Item>
          <Menu.Item index="2-2">选项2</Menu.Item>
          <Menu.Item index="2-3">选项3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index="3">订单管理</Menu.Item>
      </Menu>
    </div>
  )
}

onSelect() {

}
```
:::

### 侧栏

垂直菜单，可内嵌子菜单。

::: demo
```js
render() {
  return (
    <Layout.Row className="tac">
      <Layout.Col span={8}>
        <h5>带 icon</h5>
        <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
          <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>导航一</span>}>
            <Menu.ItemGroup title="分组一">
              <Menu.Item index="1-1">选项1</Menu.Item>
              <Menu.Item index="1-2">选项2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="分组2">
              <Menu.Item index="1-3">选项3</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
          <Menu.Item index="2"><i className="el-icon-menu"></i>导航二</Menu.Item>
          <Menu.Item index="3"><i className="el-icon-setting"></i>导航三</Menu.Item>
        </Menu>
      </Layout.Col>
      <Layout.Col span={8}>
      <h5>不带 icon</h5>
      <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)} theme="dark">
        <Menu.SubMenu index="1" title="导航一">
          <Menu.ItemGroup title="分组一">
            <Menu.Item index="1-1">选项1</Menu.Item>
            <Menu.Item index="1-2">选项2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="分组2">
            <Menu.Item index="1-3">选项3</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item index="2">导航二</Menu.Item>
        <Menu.Item index="3">导航三</Menu.Item>
      </Menu>
      </Layout.Col>
      <Layout.Col span={8}>
      <h5>分组</h5>
      <Menu mode="vertical" defaultActive="1" className="el-menu-vertical-demo">
        <Menu.ItemGroup title="分组一">
          <Menu.Item index="1"><i className="el-icon-message"></i>导航一</Menu.Item>
          <Menu.Item index="2"><i className="el-icon-message"></i>导航二</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="分组二">
          <Menu.Item index="3"><i className="el-icon-message"></i>导航三</Menu.Item>
          <Menu.Item index="4"><i className="el-icon-message"></i>导航四</Menu.Item>
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
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| mode     | 模式   | string  |   horizontal,vertical   | vertical |
| theme     | 主题色   | string    | light,dark | light |
| defaultActive | 当前激活菜单的 index | string    | — | — |
| defaultOpeneds | 当前打开的submenu的 key 数组 | Array    | — | — |
| uniqueOpened  | 是否只保持一个子菜单的展开 | boolean   | — | false   |
| menuTrigger  | 子菜单打开的触发方式(只在 mode 为 horizontal 时有效) | string   | — | hover   |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onSelect  | 菜单激活回调 | index: 选中菜单项的 indexPath: 选中菜单项的 index path  |
| onOpen  | SubMenu 展开的回调 | index: 打开的 subMenu 的 index， indexPath: 打开的 subMenu 的 index path  |
| onClose  | SubMenu 收起的回调 | index: 收起的 subMenu 的 index， indexPath: 收起的 subMenu 的 index path  |

### SubMenu Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| index     | 唯一标志   | string  | — | — |

### MenuItem Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| index     | 唯一标志   | string  | — | — |

### MenuGroup Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title     | 分组标题   | string  | — | — |
