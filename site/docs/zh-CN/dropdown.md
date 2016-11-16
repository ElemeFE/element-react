## Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

### 基础用法

移动到下拉菜单上，展开更多操作。

:::demo 通过组件`slot`来设置下拉触发的元素以及需要通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单。

```html
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
```
:::

### 触发对象

可使用按钮触发下拉菜单。

:::demo 设置`split-button`属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为`true`即可。

```html
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
)}>
  更多菜单
</Dropdown>

```
:::

### 触发方式

可以配置 click 激活或者 hover 激活。

:::demo 在`trigger`属性设置为`click`即可。
```html
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
```
:::

### Dropdown Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type          | 菜单按钮类型，同 Button 组件(只在`split-button`为 true 的情况下有效)   | string  |          —             |    —     |
| size          | 菜单按钮尺寸，同 Button 组件(只在`split-button`为 true 的情况下有效)     | string          | — | — |
| splitButton  | 下拉触发元素呈现为按钮组    | boolean  |    —  |  false |
| menuAlign    | 菜单水平对齐方向     | string          | start, end  | end |
| trigger       | 触发下拉的行为     | string          | hover, click  | hover |

### Dropdown Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onClick  | `splitButton` 为 true 时，点击左侧按钮的回调 | — |
| onCommand  | 点击菜单项触发的事件回调 | dropdown-item 的指令 |

### Dropdown Menu Item Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| command       | 指令     | string          | — | — |
| disabled      | 禁用     | boolean          | — | false |
| divided       | 显示分割线     | boolean          | — | false |
