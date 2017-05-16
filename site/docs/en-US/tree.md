
## Tree

Display a set of data with hierarchies.

### Basic usage

Basic tree structure.


::: demo
```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      label: 'level one 1',
      children: [{
        label: 'level two 1-1',
        children: [{
          label: 'level three 1-1-1'
        }]
      }]
    }, {
      label: 'level one 2',
      children: [{
        label: 'level two 2-1',
        children: [{
          label: 'level three 2-1-1'
        }]
      }, {
        label: 'level two 2-2',
        children: [{
          label: 'level three 2-2-1'
        }]
      }]
    }, {
      label: 'level one 3',
      children: [{
        label: 'level two 3-1',
        children: [{
          label: 'level three 3-1-1'
        }]
      }, {
        label: 'level two 3-2',
        children: [{
          label: 'level three 3-2-1'
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


### Selectable

Used for node selection. In the following example, data for each layer is acquired after being clicked. If there is no child data, the expanding icon will disappear.

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

### Default expanded and default checked
Tree nodes can be initially expanded or checked

::: demo Use `defaultExpandedKeys` and `defaultCheckedKeys` to set initially expanded and initially checked nodes respectively. Note that for them to work, `nodeKey` is required. Its value is the name of a key in the data object, and the value of that key should be unique across the whole tree.

```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      id: 1,
      label: 'level one 1',
      children: [{
        id: 4,
        label: 'level two 1-1',
        children: [{
          id: 9,
          label: 'level three 1-1-1'
        }, {
          id: 10,
          label: 'level three 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: 'level one 2',
      children: [{
        id: 5,
        label: 'level two 2-1'
      }, {
        id: 6,
        label: 'level two 2-2'
      }]
    }, {
      id: 3,
      label: 'level one 3',
      children: [{
        id: 7,
        label: 'level two 3-1'
      }, {
        id: 8,
        label: 'level two 3-2'
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

### Checking tree nodes

::: demo This example shows how to get and set checked nodes. They both can be done in two approaches: node and key. If you are taking the key approach, `nodeKey` is required.

```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      id: 1,
      label: 'level one 1',
      children: [{
        id: 4,
        label: 'level two 1-1',
        children: [{
          id: 9,
          label: 'level three 1-1-1'
        }, {
          id: 10,
          label: 'level three 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: 'level one 2',
      children: [{
        id: 5,
        label: 'level two 2-1'
      }, {
        id: 6,
        label: 'level two 2-2'
      }]
    }, {
      id: 3,
      label: 'level one 3',
      children: [{
        id: 7,
        label: 'level two 3-1'
      }, {
        id: 8,
        label: 'level two 3-2'
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
    label: 'level two 2-1'
  }, {
    id: 9,
    label: 'level three 1-1-1'
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
        <Button onClick={()=>this.getCheckedNodes()}>get by node</Button>
        <Button onClick={()=>this.getCheckedKeys()}>get by key</Button>
        <Button onClick={()=>this.setCheckedNodes()}>set by node</Button>
        <Button onClick={()=>this.setCheckedKeys()}>set by key</Button>
        <Button onClick={()=>this.resetChecked()}>clear</Button>
      </div>
    </div>
  )
}
```
:::

### Custom node content
The content of tree nodes can be customized, so you can add icons or buttons as you will

::: demo Use `renderContent` to assign a render function that returns the content of tree nodes.

```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      id: 1,
      label: 'level one 1',
      children: [{
        id: 4,
        label: 'level two 1-1',
        children: [{
          id: 9,
          label: 'level three 1-1-1'
        }, {
          id: 10,
          label: 'level three 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: 'level one 2',
      children: [{
        id: 5,
        label: 'level two 2-1'
      }, {
        id: 6,
        label: 'level two 2-2'
      }]
    }, {
      id: 3,
      label: 'level one 3',
      children: [{
        id: 7,
        label: 'level two 3-1'
      }, {
        id: 8,
        label: 'level two 3-2'
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




### Tree node filtering
Tree nodes can be filtered

::: demo Invoke the `filter` method of the Tree instance to filter tree nodes. Its parameter is the filtering keyword. Note that for it to work, `filterNodeMethod` is required, and its value is the filtering method.
```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      id: 1,
      label: 'level one 1',
      children: [{
        id: 4,
        label: 'level two 1-1',
        children: [{
          id: 9,
          label: 'level three 1-1-1'
        }, {
          id: 10,
          label: 'level three 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: 'level one 2',
      children: [{
        id: 5,
        label: 'level two 2-1'
      }, {
        id: 6,
        label: 'level two 2-2'
      }]
    }, {
      id: 3,
      label: 'level one 3',
      children: [{
        id: 7,
        label: 'level two 3-1'
      }, {
        id: 8,
        label: 'level two 3-2'
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
      <Input placeholder="filter" onChange={text=> this.tree.filter(text)} />
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


### Accordion

Only one node among the same level can be expanded at one time.

::: demo

```js
constructor(props) {
  super(props);

  this.state = {
    data: [{
      label: 'level one 1',
      children: [{
        label: 'level two 1-1',
        children: [{
          label: 'level three 1-1-1'
        }]
      }]
    }, {
      label: 'level one 2',
      children: [{
        label: 'level two 2-1',
        children: [{
          label: 'level three 2-1-1'
        }]
      }, {
        label: 'level two 2-2',
        children: [{
          label: 'level three 2-2-1'
        }]
      }]
    }, {
      label: 'level one 3',
      children: [{
        label: 'level two 3-1',
        children: [{
          label: 'level three 3-1-1'
        }]
      }, {
        label: 'level two 3-2',
        children: [{
          label: 'level three 3-2-1'
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

| Attribute             | Description                              | Type                        | Accepted Values | Default |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data                  | tree data                                     | array                       | —    | —     |
| emptyText            | text displayed when data is void                             | String                      | —    | —     |
| nodeKey              | unique identity key name for nodes, its value should be unique across the whole tree               | String                      | —    | —     |
| options                 |  configuration options, see the following table                               | object                      | —    | —     |
| load                  | method for loading subtree data                                | function(node, resolve)     | —    | —     |
| renderContent        | render function for tree node                       | (nodeModel, data, store)=>ReactElement      | —    | —     |
| highlightCurrent     | whether current node is highlighted, default false                   | boolean                     | —    | false |
| currentNodeKey      | key of current node                         | string, number              | —    | —     |
| defaultExpandAll    | whether to expand all nodes by default                              | boolean                     | —    | false |
| expandOnClickNode  | whether to expand or collapse node when clicking on the node, if false, then expand or collapse node only when clicking on the arrow icon. | boolean                     | —    | true  |
| autoExpandParent   |  whether to expand father node when a child node is expanded                        | boolean                     | —    | true  |
| defaultExpandedKeys | array of keys of initially expanded nodes                         | array                       | —    | —     |
| isShowCheckbox        |  whether node is selectable                                  | boolean                     | —    | false |
| checkedKeyStrictly        |whether checked state of a node not affects its father and child nodes when `isShowCheckbox` is `true`   | boolean                     | —    | false |
| defaultCheckedKeys  | array of keys of initially checked nodes                         | array                       | —    | —     |
| filterNodeMethod    | this function will be executed on each node when use filter method. if return `false`, tree node will be hidden. | Function(value, data, node) | —    | —     |
| accordion             | whether only one node among the same level can be expanded at one time                         | boolean                     | —    | false |
| indent                |horizontal indentation of nodes in adjacent levels in pixels                        | number                     | —    | 16 |


### options
| Attribute | Description                              | Type   | Accepted Values | Default |
| --------- | ---------------------------------------- | ------ | --------------- | ------- |
| label     | specify which key of node object is used as the node's label | string | —               | —       |
| children  | specify which key of node object is used as the node's subtree | string | —               | —       |

### Method
`Tree` has the following method, which returns the currently selected array of nodes.

| Method          | Description                              | Parameters                               |
| --------------- | ---------------------------------------- | ---------------------------------------- |
| filter          | filter all tree nodes, filtered nodes will be hidden | Accept a parameter which will be used as first parameter for filterNodeMethod |
| getCheckedNodes | If the node can be selected (`isShowCheckbox` is `true`), it returns the currently selected array of nodes | Accept a boolean type parameter whose default value is `false`. If the parameter is `true`, it only returns the currently selected array of sub-nodes. |
| setCheckedNodes | set certain nodes to be checked, only works when `nodeKey` is assigned | an array of nodes to be checked          |
| getCheckedKeys  | If the node can be selected (`isShowCheckbox` is `true`), it returns the currently selected array of node's keys | (leafOnly) Accept a boolean type parameter whose default value is `false`. If the parameter is `true`, it only returns the currently selected array of sub-nodes. |
| setCheckedKeys  | set certain nodes to be checked, only works when `nodeKey` is assigned | (keys, leafOnly) Accept two parameters: 1. an array of node's keys to be checked 2. a boolean type parameter whose default value is `false`. If the parameter is `true`, it only returns the currently selected array of sub-nodes. |
| setChecked      | set node to be checked or not, only works when `nodeKey` is assigned | (key/data, checked, deep) Accept three parameters: 1. node's key or data to be checked 2. a boolean typed parameter indicating checked or not. 3. a boolean typed parameter indicating deep or not. |



### Events
| Event Name     | Description                              | Parameters                               |
| -------------- | ---------------------------------------- | ---------------------------------------- |
| onNodeClicked  | triggers when a node is clicked |  onNodeClicked(nodeModel.data, node)  |
| onCheckChange  | triggers when the selected state of the node changes  | onCheckChange(nodeModel.data, checked, indeterminate)|
| onCurrentChange | triggers when current node changes | onCurrentChange(nodeModel.data, node) |
| onNodeExpand    | triggers when current node open    | onNodeExpand(nodeModel.data, nodeModel, node) |
| onNodeCollapse  | triggers when current node close    | onNodeCollapse(nodeModel.data, nodeModel, node) |


### Supplementary Explaination

| argument name | description
|------|--------|------|
| nodeModel  | the logical model of a tree node|
| nodeModel.data  | corresponding data that passed into tree component|
| node  | the view model of a tree node, a react component instance |
