
## Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

### 基础用法

基础的树形结构展示。

::: demo 基础的树形结构展示
```javascript
let data = [{
  label: '一级 1',
  children: [{
    label: '二级 1-1'
  }]
}, {
  label: '一级 2',
  children: [{
    label: '二级 2-1'
  }, {
    label: '二级 2-2'
  }]
}, {
  label: '一级 3',
  children: [{
    label: '3.1',
    children:[
      {label: '3.1.1'},
      {label: '3.1.2'}
    ]
  }, {
    label: '3.2'
  }]
}];
let options = {
  children: 'children',
  label: 'label'
};
//todo - move onCheckChange 
<Tree 
    data={data} 
    options={options} 
    onCheckChange={(data, checked, indeterminate)=>{
        console.debug('onCheckChange: ', data, checked, indeterminate)}
    }
    onNodeClicked={(data, nodeModel, reactElement, treeNode)=>{
        console.debug('onNodeClicked: ', data, nodeModel, reactElement)
    }} 
    highlightCurrent={true}
    />
```
:::


### 可选择

适用于需要选择层级时使用。在下例中，由于在点击时才进行该层数据的获取，导致层级不可预知，如果没有下层数据，则点击后下拉按钮会消失。

::: demo
```javascript
//todo: add me
```
:::

### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data     | 展示数据 | array | — | — |
| options | 配置选项，具体看下表 | object | — | — |
| load | 加载子树数据的方法 | function(node, resolve) | — | — |
| showCheckbox | 节点是否可被选择 | boolean | — | false |
| renderContent | 树节点的内容区的渲染 Function: (context: NodeReactElement)=>ReactElement，会传入1个参数，NodeReactElement的实例| Function | - | - |
| highlightCurrent | 是否高亮当前选中节点，默认值是 false。| boolean | - | false |

### options

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 指定节点标签为节点对象的某个属性值 | string | — | — |
| children | 指定子树为节点对象的某个属性值 | string | — | — |

### 方法
`Tree` 拥有如下方法，返回目前被选中的节点数组：

| 方法名 | 说明 | 参数 |
|------|--------|------|
| getCheckedNodes | 若节点可被选择（即 `show-checkbox` 为 `true`），<br>则返回目前被选中的节点所组成的数组 | 接收一个 boolean 类型的参数，若为 `true` 则<br>仅返回被选中的叶子节点，默认值为 `false` |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onNodeClicked  | 节点被点击时的回调 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 |
| onCheckChange  | 节点选中状态发生变化时的回调 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、<br>节点本身是否被选中、节点的子树中是否有被选中的节点 |
