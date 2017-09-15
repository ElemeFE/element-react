## Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

### 基础用法

移动到下拉菜单上，展开更多操作。

:::demo 显示下拉菜单，默认情况下，下拉按钮只要`hover`即可，无需点击。

```js
render() {
  return (
    <Dropdown menu={(
      <Dropdown.Menu>
        <Dropdown.Item>黄金糕</Dropdown.Item>
        <Dropdown.Item>狮子头</Dropdown.Item>
        <Dropdown.Item>螺蛳粉</Dropdown.Item>
        <Dropdown.Item disabled>双皮奶</Dropdown.Item>
        <Dropdown.Item divided>蚵仔煎</Dropdown.Item>
      </Dropdown.Menu>
      )}
    >
      <span className="el-dropdown-link">
        下拉菜单<i className="el-icon-caret-bottom el-icon--right"></i>
      </span>
    </Dropdown>
  )
}
```
:::

### 触发对象

可使用按钮触发下拉菜单。

:::demo 设置`splitButton`属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为`true`即可。

```js
render() {
  return (
    <div>
      <Dropdown menu={(
        <Dropdown.Menu>
          <Dropdown.Item>黄金糕</Dropdown.Item>
          <Dropdown.Item>狮子头</Dropdown.Item>
          <Dropdown.Item>螺蛳粉</Dropdown.Item>
          <Dropdown.Item>双皮奶</Dropdown.Item>
          <Dropdown.Item>蚵仔煎</Dropdown.Item>
        </Dropdown.Menu>
      )}>
        <Button type="primary">
          更多菜单<i className="el-icon-caret-bottom el-icon--right"></i>
        </Button>
      </Dropdown>
      <Dropdown splitButton={true} type="primary" onClick={this.handleClick.bind(this)} menu={(
        <Dropdown.Menu>
          <Dropdown.Item>黄金糕</Dropdown.Item>
          <Dropdown.Item>狮子头</Dropdown.Item>
          <Dropdown.Item>螺蛳粉</Dropdown.Item>
          <Dropdown.Item>双皮奶</Dropdown.Item>
          <Dropdown.Item>蚵仔煎</Dropdown.Item>
        </Dropdown.Menu>
      )}>更多菜单</Dropdown>
    </div>
  )
}

handleClick() {
  alert('button click');
}
```
:::

### 触发方式

可以配置 click 激活或者 hover 激活。

:::demo 在`trigger`属性设置为`click`即可。
```js
render() {
  return (
    <Layout.Row className="block-col-2">
      <Layout.Col span="12">
        <span className="demonstration">hover 激活</span>
        <Dropdown menu={(
          <Dropdown.Menu>
            <Dropdown.Item>黄金糕</Dropdown.Item>
            <Dropdown.Item>狮子头</Dropdown.Item>
            <Dropdown.Item>螺蛳粉</Dropdown.Item>
            <Dropdown.Item>双皮奶</Dropdown.Item>
            <Dropdown.Item>蚵仔煎</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <span className="el-dropdown-link">
            下拉菜单<i className="el-icon-caret-bottom el-icon--right"></i>
          </span>
        </Dropdown>
      </Layout.Col>
      <Layout.Col span="12">
        <span className="demonstration">click 激活</span>
        <Dropdown trigger="click" menu={(
          <Dropdown.Menu>
            <Dropdown.Item>黄金糕</Dropdown.Item>
            <Dropdown.Item>狮子头</Dropdown.Item>
            <Dropdown.Item>螺蛳粉</Dropdown.Item>
            <Dropdown.Item>双皮奶</Dropdown.Item>
            <Dropdown.Item>蚵仔煎</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <span className="el-dropdown-link">
            下拉菜单<i className="el-icon-caret-bottom el-icon--right"></i>
          </span>
        </Dropdown>
      </Layout.Col>
    </Layout.Row>
  )
}
```
:::

### 菜单隐藏方式

可以`hideOnClick`属性来配置。

:::demo 下拉菜单默认在点击菜单项后会被隐藏，将`hideOnClick`属性默认为`false`可以关闭此功能。
```js
render() {
  return (
    <Dropdown hideOnClick={false} menu={(
      <Dropdown.Menu>
        <Dropdown.Item>黄金糕</Dropdown.Item>
        <Dropdown.Item>狮子头</Dropdown.Item>
        <Dropdown.Item>螺蛳粉</Dropdown.Item>
        <Dropdown.Item disabled>双皮奶</Dropdown.Item>
        <Dropdown.Item divided>蚵仔煎</Dropdown.Item>
      </Dropdown.Menu>
    )}>
      <span className="el-dropdown-link">
        下拉菜单<i className="el-icon-caret-bottom el-icon--right"></i>
      </span>
    </Dropdown>
  )
}
```
:::

### 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作

:::demo
```js
handleCommand(command) {
  Message('click on item ' + command);
}

render() {
  return (
    <Dropdown onCommand={this.handleCommand.bind(this)} menu={(
      <Dropdown.Menu>
        <Dropdown.Item command="a">黄金糕</Dropdown.Item>
        <Dropdown.Item command="b">狮子头</Dropdown.Item>
        <Dropdown.Item command="c">螺蛳粉</Dropdown.Item>
        <Dropdown.Item command="d" disabled>双皮奶</Dropdown.Item>
        <Dropdown.Item command="e" divided>蚵仔煎</Dropdown.Item>
      </Dropdown.Menu>
    )}>
      <span className="el-dropdown-link">
        下拉菜单<i className="el-icon-caret-bottom el-icon--right"></i>
      </span>
    </Dropdown>
  )
}
```
:::

### Dropdown Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type          | 菜单按钮类型，同 Button 组件(只在`splitButton`为 true 的情况下有效)   | string  |          —             |    —     |
| size          | 菜单按钮尺寸，同 Button 组件(只在`splitButton`为 true 的情况下有效)     | string          | — | — |
| splitButton  | 下拉触发元素呈现为按钮组    | boolean  |    —  |  false |
| menuAlign    | 菜单水平对齐方向     | string          | start, end  | end |
| trigger       | 触发下拉的行为     | string          | hover, click  | hover |
| hideOnClick | 是否在点击菜单项后隐藏菜单     | boolean          | — | true |

### Dropdown Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onClick  | `splitButton` 为 true 时，点击左侧按钮的回调 | — |
| onCommand  | 点击菜单项触发的事件回调 | Dropdown.Item 的指令 |
| onVisibleChange | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |

### Dropdown Menu Item Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| command       | 指令     | string          | — | — |
| disabled      | 禁用     | boolean          | — | false |
| divided       | 显示分割线     | boolean          | — | false |
