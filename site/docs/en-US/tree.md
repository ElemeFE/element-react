
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
      label: 'Level one 1',
      children: [{
        label: 'Level two 1-1',
        children: [{
          label: 'Level three 1-1-1'
        }]
      }]
    }, {
      label: 'Level one 2',
      children: [{
        label: 'Level two 2-1',
        children: [{
          label: 'Level three 2-1-1'
        }]
      }, {
        label: 'Level two 2-2',
        children: [{
          label: 'Level three 2-2-1'
        }]
      }]
    }, {
      label: 'Level one 3',
      children: [{
        label: 'Level two 3-1',
        children: [{
          label: 'Level three 3-1-1'
        }]
      }, {
        label: 'Level two 3-2',
        children: [{
          label: 'Level three 3-2-1'
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
      onNodeClicked={(data, nodeModel, reactElement, treeNode)=>{
        console.debug('onNodeClicked: ', data, nodeModel, reactElement)
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
  if (node.level === -1) {
    return resolve([{ name: 'region1' }, { name: 'region2' }]);
  }
  if (node.level > 4) return resolve([]);

  let hasChild;
  if (node.data.name === 'region1') {
    hasChild = true;
  } else if (node.data.name === 'region2') {
    hasChild = false;
  } else {
    hasChild = node.level <= 2
  }

  setTimeout(()=> {
    let data;
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

### Attributes

| Attribute      | Description          | Type      | Accepted Values                       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data     | tree data | array | — | — |
| options | configuration options, see the following table | object | — | — |
| load | method for loading subtree data | function(node, resolve) | — | — |
| isShowCheckbox | whether node is selectable | boolean | — | false |
| renderContent | render function for tree node | Function | - | - |
| highlightCurrent | whether current node is highlighted | boolean | - | false |

### options

| Attribute      | Description          | Type      | Accepted Values                | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | specify which key of node object is used as the node's label | string | — | — |
| children | specify which key of node object is used as the node's subtree | string | — | — |

### Method
Tree` has the following method, which returns the currently selected array of nodes.

| Method | Description | Parameters |
|------|--------|------|
| getCheckedNodes | If the node can be selected (`show-checkbox` is `true`), it returns the currently selected array of nodes | Accept a boolean type parameter whose default value is `false`. If the parameter is `true`, it only returns the currently selected array of sub-nodes.|

### Events
| Event Name      | Description    | Parameters      |
|---------- |-------- |---------- |
| onNodeClicked  | triggers when a node is clicked | three parameters: node object corresponding to the node clicked, `node` property of TreeNode, TreeNode itself |
| onCheckChange  | triggers when the selected state of the node changes | three parameters: node object corresponding to the node whose selected state is changed, whether the node is selected, whether node's subtree has selected nodes |
