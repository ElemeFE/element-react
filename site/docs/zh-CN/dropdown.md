## Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

### 基础用法

移动到下拉菜单上，展开更多操作。

:::demo 通过组件`slot`来设置下拉触发的元素以及需要通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单。

```js
const DropdownMenu = Dropdown.DropdownMenu;
const DropdownItem = Dropdown.DropdownItem;
<Dropdown
   overlay={
     <span className="el-dropdown-link">
       下拉菜单<i className="el-icon-caret-bottom el-icon--right"></i>
     </span>
   }
   trigger='click'
>
  <DropdownMenu slot="dropdown">
    <DropdownItem>黄金糕</DropdownItem>
    <DropdownItem>狮子头</DropdownItem>
    <DropdownItem>螺蛳粉</DropdownItem>
    <DropdownItem disabled>双皮奶</DropdownItem>
    <DropdownItem divided>蚵仔煎</DropdownItem>
  </DropdownMenu>
</Dropdown>
```
:::




### Dropdown Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type          | 菜单按钮类型，同 Button 组件(只在`split-button`为 true 的情况下有效)   | string  |          —             |    —     |
| size          | 菜单按钮尺寸，同 Button 组件(只在`split-button`为 true 的情况下有效)     | string          | — | — |
| split-button  | 下拉触发元素呈现为按钮组    | boolean  |    —  |  false |
| menu-align    | 菜单水平对齐方向     | string          | start, end  | end |
| trigger       | 触发下拉的行为     | string          | hover, click  | hover |

### Dropdown Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| click  | `split-button` 为 true 时，点击左侧按钮的回调 | — |
| command  | 点击菜单项触发的事件回调 | dropdown-item 的指令 |

### Dropdown Menu Item Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| command       | 指令     | string          | — | — |
| disabled      | 禁用     | boolean          | — | false |
| divided       | 显示分割线     | boolean          | — | false |
