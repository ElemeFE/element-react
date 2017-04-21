## Tabs

Divide data collections which are related yet belong to different types.

### Basic usage

Basic and concise tabs.

:::demo Tabs provide a selective card functionality. By default the first tab is selected as active, and you can activate any tab by setting the `value` attribute.

```js
render() {
  return (
    <Tabs activeName="2" onTabClick={ (tab) => console.log(tab.props.name) }>
      <Tabs.Pane label="User" name="1">User</Tabs.Pane>
      <Tabs.Pane label="Config" name="2">Config</Tabs.Pane>
      <Tabs.Pane label="Role" name="3">Role</Tabs.Pane>
      <Tabs.Pane label="Task" name="4">Task</Tabs.Pane>
    </Tabs>
  )
}
```
:::

### Card Style

Tabs styled as cards.

:::demo Set `type` to `card` can get a card-styled tab.

```js
render() {
  return (
    <Tabs type="card" value="1">
      <Tabs.Pane label="User" name="1">User</Tabs.Pane>
      <Tabs.Pane label="Config" name="2">Config</Tabs.Pane>
      <Tabs.Pane label="Role" name="3">Role</Tabs.Pane>
      <Tabs.Pane label="Task" name="4">Task</Tabs.Pane>
    </Tabs>
  )
}
```
:::

### Border card

Border card tabs.

:::demo Set `type` to `borderCard`.

```js
render() {
  return (
    <Tabs type="border-card" activeName="1">
      <Tabs.Pane label="User" name="1">User</Tabs.Pane>
      <Tabs.Pane label="Config" name="2">Config</Tabs.Pane>
      <Tabs.Pane label="Role" name="3">Role</Tabs.Pane>
      <Tabs.Pane label="Task" name="4">Task</Tabs.Pane>
    </Tabs>
  )
}
```
:::

### Custom Tab

You can use `label` to customize the tab label content.

:::demo

```js
render() {
  const label = <span><Icon name="date" />User</span>

  return (
    <Tabs type="border-card" activeName="1">
      <Tabs.Pane label={label} name="1">User</Tabs.Pane>
      <Tabs.Pane label="Config" name="2">Config</Tabs.Pane>
      <Tabs.Pane label="Role" name="3">Role</Tabs.Pane>
      <Tabs.Pane label="Task" name="4">Task</Tabs.Pane>
    </Tabs>
  )
}
```
:::

### Add & close tab

Only card type Tabs support addable & closeable.

:::demo

```js
constructor() {
  super();
  this.state = {
    tabs: [{
      title: 'Tab 1',
      name: 'Tab 1',
      content: 'Tab 1 content',
    }, {
      title: 'Tab 2',
      name: 'Tab 2',
      content: 'Tab 2 content',
    }],
    tabIndex: 2,
  }
}

editTab(action, tab) {
  if (action === 'add') {
    const { tabs, tabIndex } = this.state;
    const index = tabIndex + 1;

    tabs.push({
      title: 'new Tab',
      name: 'Tab ' + index,
      content: 'new Tab content',
    });
    this.setState({
      tabs,
      tabIndex: index,
    });
  }

  if (action === 'remove') {
    const { tabs } = this.state;

    console.log(action, tab);
    tabs.splice(tab.key.replace(/^\.\$/, ''), 1);
    this.setState({
      tabs,
    });
  }
}

render() {
  return (
    <Tabs type="card" value="Tab 2" editable onTabEdit={(action, tab) => this.editTab(action, tab)}>
      {
        this.state.tabs.map((item, index) => {
          return <Tabs.Pane key={index} closable label={item.title} name={item.name}>{item.content}</Tabs.Pane>
        })
      }
    </Tabs>
  )
}
```
:::

### Customized trigger button of new tab

:::demo

```js
constructor() {
  super();
  this.state = {
    tabs: [{
      title: 'Tab 1',
      name: 'Tab 1',
      content: 'Tab 1 content',
    }, {
      title: 'Tab 2',
      name: 'Tab 2',
      content: 'Tab 2 content',
    }],
    tabIndex: 2,
  }
}

addTab() {
  const { tabs, tabIndex } = this.state;
  const index = tabIndex + 1;

  tabs.push({
    title: 'new Tab',
    name: 'Tab ' + index,
    content: 'new Tab content',
  });
  this.setState({
    tabs,
    tabIndex: index,
  });
}

removeTab(tab) {
  const { tabs, tabIndex } = this.state;

  tabs.splice(tab.key.replace(/^\.\$/, ''), 1);
  this.setState({
    tabs,
  });
}

render() {
  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        <Button size="small" onClick={() => this.addTab()}>add tab</Button>
      </div>
      <Tabs type="card" value="Tab 2" onTabRemove={(tab) => this.removeTab(tab)}>
        {
          this.state.tabs.map((item, index) => {
            return <Tabs.Pane key={index} closable label={item.title} name={item.name}>{item.content}</Tabs.Pane>
          })
        }
      </Tabs>
    </div>
  )
}
```
:::

### Tabs Attributes
| Attribute          | Description            | Type            | Accepted Values                 | Default   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type          | type of Tab      | string         |   card, border-card            |    —     |
| closable          |  whether Tab is closable    | boolean  |  -             |     false    |
| addable          |  whether Tab is addable    | boolean  |  -             |     false    |
| editable          |  whether Tab is addable and closable    | boolean  |  -             |     false    |
| activeName       | name of the selected tab   | string  |  —  |  name of first tab |
| value       | name of the selected tab   | string  |  —  |  name of first tab |

### Tabs Events
| Event Name          | Description            | Attribute            |
|-------------  |---------------- |---------------- |
| onTabClick          |  triggers when a tab is clicked      | clicked tab      |
| onTabRemove          |    triggers when tab-remove button is clicked    | name of the removed tab  |
| onTabAdd          |    triggers when tab-add button is clicked    | -  |
| onTabEdit          |    triggers when tab-add button or tab-remove is clicked    | (targetName, action)  |

### Tabs.Pane Attributes
| Attribute          | Description            | Type            | Accepted Values                 | Default   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| label          |  title of the tab      | string,node          |          —             |    —     |
| disabled       | whether Tab is disabled    | boolean  |  —  |  false |
| name          |  identifier corresponding to the activeName of Tabs, representing the alias of the tab-pane    | string  |         —              |   ordinal number of the tab-pane in the sequence, i.e. the first tab-pane is '1'    |
| closable       | whether Tab is closable    | boolean  |  —  |  false |
