
## Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

### 基础用法

基础的树形结构展示。

::: demo 基础的树形结构展示
```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      label: '一级 1',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    }, {
      label: '一级 2',
      children: [{
        label: '二级 2-1',
        children: [{
          label: '三级 2-1-1'
        }]
      }, {
        label: '二级 2-2',
        children: [{
          label: '三级 2-2-1'
        }]
      }]
    }, {
      label: '一级 3',
      children: [{
        label: '二级 3-1',
        children: [{
          label: '三级 3-1-1'
        }]
      }, {
        label: '二级 3-2',
        children: [{
          label: '三级 3-2-1'
        }]
      }]
    }],
    options: {
      children: 'children',
      label: 'label'
    }
  }
}

render() {
  return (
    <Tree
      data={this.state.data}
      options={this.state.options}
      highlightCurrent={true}
      onCheckChange={(data, checked, indeterminate)=>{
        console.debug('onCheckChange: ', data, checked, indeterminate)}
      }
      onNodeClicked={(data, reactElement,)=>{
        console.debug('onNodeClicked: ', data, reactElement)
      }}
    />
  )
}
```
:::



### 可选择

适用于需要选择层级时使用。在下例中，由于在点击时才进行该层数据的获取，导致层级不可预知，如果没有下层数据，则点击后下拉按钮会消失。

::: demo
```js
constructor(props) {
  super(props)
  this.state = {
    regions: [{
      'name': 'region1'
    }, {
      'name': 'region2'
    }]
  }

  this.options = {
    label: 'name',
    children: 'zones'
  }
  this.count = 1

}

handleCheckChange(data, checked, indeterminate) {
  console.log(data, checked, indeterminate);
}

loadNode(node, resolve) {

  if (node.level === 0) {
    return resolve([{ name: 'region1' }, { name: 'region2' }]);
  }
  if (node.level > 3) return resolve([]);

  var hasChild;
  if (node.data.name === 'region1') {
    hasChild = true;
  } else if (node.data.name === 'region2') {
    hasChild = false;
  } else {
    hasChild = Math.random() > 0.5;
  }

  setTimeout(() => {
    var data;
    if (hasChild) {
      data = [{
        name: 'zone' + this.count++
      }, {
        name: 'zone' + this.count++
      }];
    } else {
      data = [];
    }

    resolve(data);
  }, 500);
}

render() {
  const { regions } = this.state

  return (
    <Tree
      data={regions}
      options={this.options}
      isShowCheckbox={true}
      lazy={true}
      load={this.loadNode.bind(this)}
      onCheckChange={this.handleCheckChange.bind(this)}
      onNodeClicked={(data, nodeModel, reactElement, treeNode)=>{
        console.debug('onNodeClicked: ', data, nodeModel, reactElement)
      }}
    />
  )
}
```
:::


### 默认展开和默认选中
可将 Tree 的某些节点设置为默认展开或默认选中

::: demo 分别通过`defaultExpandedKeys`和`defaultCheckedKeys`设置默认展开和默认选中的节点。需要注意的是，此时必须设置`nodeKey`，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。

```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }],
    options: {
      children: 'children',
      label: 'label'
    }
  }
}

render() {
  const { data, options } = this.state

  return (
    <Tree
      data={data}
      options={options}
      isShowCheckbox={true}
      nodeKey="id"
      defaultExpandedKeys={[2, 3]}
      defaultCheckedKeys={[5]}
    />
  )
}
```
:::



### 树节点的选择

::: demo 本例展示如何获取和设置选中节点。获取和设置各有两种方式：通过 node 或通过 key。如果需要通过 key 来获取或设置，则必须设置`nodeKey`。


```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }],
    options: {
      children: 'children',
      label: 'label'
    }
  }
}

getCheckedNodes() {
  console.log(this.tree.getCheckedNodes());
}
getCheckedKeys() {
  console.log(this.tree.getCheckedKeys());
}
setCheckedNodes() {
  this.tree.setCheckedNodes([{
    id: 5,
    label: '二级 2-1'
  }, {
    id: 9,
    label: '三级 1-1-1'
  }]);
}
setCheckedKeys() {
  this.tree.setCheckedKeys([3]);
}
resetChecked() {
  this.tree.setCheckedKeys([]);
}

render() {
  const { data, options } = this.state

  return (
    <div>
      <Tree
        ref={e=>this.tree = e}
        data={data}
        options={options}
        isShowCheckbox={true}
        highlightCurrent={true}
        nodeKey="id"
        defaultExpandedKeys={[2, 3]}
        defaultCheckedKeys={[5]}
      />
      <div className="buttons">
        <Button onClick={()=>this.getCheckedNodes()}>通过 node 获取</Button>
        <Button onClick={()=>this.getCheckedKeys()}>通过 key 获取</Button>
        <Button onClick={()=>this.setCheckedNodes()}>通过 node 设置</Button>
        <Button onClick={()=>this.setCheckedKeys()}>通过 key 设置</Button>
        <Button onClick={()=>this.resetChecked()}>清空</Button>
      </div>
    </div>
  )
}
```
:::



### 自定义节点内容
节点的内容支持自定义，可以在节点区添加按钮或图标等内容

::: demo 使用`renderContent`指定渲染函数，该函数返回需要的节点区内容即可。渲染函数的用法请参考 Vue 文档。注意：由于 jsfiddle 不支持 JSX 语法，所以本例在 jsfiddle 中无法运行。但是在实际的项目中，只要正确地配置了相关依赖，就可以正常运行。


```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }],
    options: {
      children: 'children',
      label: 'label'
    }
  }
  this.id = 100;
}

append(store, data) {
  store.append({ id: this.id++, label: `testtest_${this.id}`, children: [] }, data);
}

remove(store, data) {
  store.remove(data);
}

renderContent(nodeModel, data, store) {
  return (
    <span>
      <span>
        <span>{data.label}</span>
      </span>
      <span style={{float: 'right', marginRight: '20px'}}>
        <Button size="mini" onClick={ () => this.append(store, data) }>Append</Button>
        <Button size="mini" onClick={ () => this.remove(store, data) }>Delete</Button>
      </span>
    </span>);
}

render() {
  const { data, options } = this.state

  return (
    <Tree
      data={data}
      options={options}
      isShowCheckbox={true}
      nodeKey="id"
      defaultExpandAll={true}
      expandOnClickNode={false}
      renderContent={(...args)=>this.renderContent(...args)}
    />
  )
}
```
:::





### 节点过滤
通过关键字过滤树节点

::: demo 在需要对节点进行过滤时，调用 Tree 实例的`filter`方法，参数为关键字。需要注意的是，此时需要设置`filterNodeMethod`，值为过滤函数。


```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }],
    options: {
      children: 'children',
      label: 'label'
    }
  }
}

render() {
  const { data, options } = this.state

  return (
    <div>
      <Input placeholder="输入关键字进行过滤" onChange={text=> this.tree.filter(text)} />
      <Tree
        ref={e=> this.tree = e}
        className="filter-tree"
        data={data}
        options={options}
        nodeKey="id"
        defaultExpandAll={true}
        filterNodeMethod={(value, data)=>{
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        }}
      />
    </div>

  )
}
```
:::



### 手风琴模式

对于同一级的节点，每次只能展开一个


::: demo

```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      label: '一级 1',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    }, {
      label: '一级 2',
      children: [{
        label: '二级 2-1',
        children: [{
          label: '三级 2-1-1'
        }]
      }, {
        label: '二级 2-2',
        children: [{
          label: '三级 2-2-1'
        }]
      }]
    }, {
      label: '一级 3',
      children: [{
        label: '二级 3-1',
        children: [{
          label: '三级 3-1-1'
        }]
      }, {
        label: '二级 3-2',
        children: [{
          label: '三级 3-2-1'
        }]
      }]
    }],
    options: {
      children: 'children',
      label: 'label'
    }
  }
}

render() {
  const { data, options } = this.state

  return (
    <Tree
      ref={e=> this.tree = e}
      data={data}
      options={options}
      accordion={true}
      onNodeClicked={node=>console.log(node)}
    />
  )
}
```
:::




### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data                  | 展示数据                                     | array                       | —    | —     |
| emptyText            | 内容为空的时候展示的文本                             | String                      | —    | —     |
| nodeKey              | 每个树节点用来作为唯一标识的属性，整颗树应该是唯一的               | String                      | —    | —     |
| options                 | 配置选项，具体看下表                               | object                      | —    | —     |
| load                  | 加载子树数据的方法                                | function(node, resolve)     | —    | —     |
| renderContent        | 树节点的内容区的渲染 Function                      | (nodeModel, data, store)=>ReactElement      | —    | —     |
| highlightCurrent     | 是否高亮当前选中节点，默认值是 false。                   | boolean                     | —    | false |
| currentNodeKey      | 当前选中节点的 key，只写属性                         | string, number              | —    | —     |
| defaultExpandAll    | 是否默认展开所有节点                               | boolean                     | —    | false |
| expandOnClickNode  | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 | boolean                     | —    | true  |
| autoExpandParent   | 展开子节点的时候是否自动展开父节点                        | boolean                     | —    | true  |
| defaultExpandedKeys | 默认展开的节点的 key 的数组                         | array                       | —    | —     |
| isShowCheckbox        | 节点是否可被选择                                 | boolean                     | —    | false |
| checkedKeyStrictly        | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false   | boolean                     | —    | false |
| defaultCheckedKeys  | 默认勾选的节点的 key 的数组                         | array                       | —    | —     |
| filterNodeMethod    | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏 | Function(value, data, node) | —    | —     |
| accordion             | 是否每次只打开一个同级树节点展开                         | boolean                     | —    | false |
| indent                | 相邻级节点间的水平缩进，单位为像素                        | number                     | —    | 16 |


### options

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 指定节点标签为节点对象的某个属性值 | string | — | — |
| children | 指定子树为节点对象的某个属性值 | string | — | — |

### 方法
`Tree` 拥有如下方法，返回目前被选中的节点数组：

| 方法名 | 说明 | 参数 |
|------|--------|------|
| filter          | 对树节点进行筛选操作                               | 接收一个任意类型的参数，该参数会在 filterNodeMethod 中作为第一个参数 |
| getCheckedNodes | 若节点可被选择（即 `isShowCheckbox` 为 `true`），则返回目前被选中的节点所组成的数组 | (leafOnly) 接收一个 boolean 类型的参数，若为 `true` 则仅返回被选中的叶子节点，默认值为 `false` |
| setCheckedNodes | 设置目前勾选的节点，使用此方法必须设置 nodeKey 属性          | (nodes) 接收勾选节点数据的数组                      |
| getCheckedKeys  | 若节点可被选择（即 `isShowCheckbox` 为 `true`），则返回目前被选中的节点所组成的数组 | (leafOnly) 接收一个 boolean 类型的参数，若为 `true` 则仅返回被选中的叶子节点的 keys，默认值为 `false` |
| setCheckedKeys  | 通过 keys 设置目前勾选的节点，使用此方法必须设置 nodeKey 属性  | (keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 `true` 则仅设置叶子节点的选中状态，默认值为 `false` |
| setChecked      | 通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 nodeKey 属性 | (key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否选中  3. boolean 类型，是否设置子节点 ，默认为 false |



### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onNodeClicked  | 节点被点击时的回调 |  onNodeClicked(nodeModel.data, node)  |
| onCheckChange  | 节点选中状态发生变化时的回调 | onCheckChange(nodeModel.data, checked, indeterminate)|
| onCurrentChange | 当前选中节点变化时触发的事件 | onCurrentChange(nodeModel.data, node) |
| onNodeExpand    | 节点被展开时触发的事件    | onNodeExpand(nodeModel.data, nodeModel, node) |
| onNodeCollapse  | 节点被关闭时触发的事件    | onNodeCollapse(nodeModel.data, nodeModel, node) |

### 参数说明

| 参数 | 说明
|------|--------|------|
| nodeModel  | tree node 的 model|
| nodeModel.data  | 对应的tree node节点的传入的data节点|
| node  | 实际的view层的react element节点|
