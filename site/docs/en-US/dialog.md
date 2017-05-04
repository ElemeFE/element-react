## Dialog

Informs users while preserving the current page state.

### Basic usage

Dialog pops up a dialog box, and it's quite customizable.

:::demo Set the `visible` attribute with a `Boolean`, and Dialog shows when it is `true`. The Dialog has two parts: `Dialog.Body` and `Dialog.Footer`. The optional `title` attribute (empty by default) is for defining a title.

```js
constructor(props) {
  super(props);

  this.state = {
    dialogVisible: false
  };
}

render() {
  return (
    <div>
      <Button type="text" onClick={ () => this.setState({ dialogVisible: true }) }>Click to open the Dialog</Button>
      <Dialog
        title="Tips"
        size="tiny"
        visible={ this.state.dialogVisible }
        onCancel={ () => this.setState({ dialogVisible: false }) }
        lockScroll={ false }
      >
        <Dialog.Body>
          <span>This is a message</span>
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={ () => this.setState({ dialogVisible: false }) }>Cancel</Button>
          <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>Confirm</Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  )
}
```
:::

### Customizations

The content of Dialog can be anything, even a table or a form. This example shows how to use Element Table and Form with Dialog。

:::demo

```js
constructor(props) {
  super(props);

  this.state = {
    dialogVisible2: false,
    dialogVisible3: false,
    form: {
      name: '',
      region: ''
    }
  };

  this.table = {
    columns: [
      {
        label: "Date",
        prop: "date",
        width: 150
      },
      {
        label: "Name",
        prop: "name",
        width: 100
      },
      {
        label: "Address",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-02',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District'
    }, {
      date: '2016-05-04',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District'
    }, {
      date: '2016-05-01',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District'
    }, {
      date: '2016-05-03',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District'
    }]
  };
}

render() {
  return (
    <div>
      <Button type="text" onClick={ () => this.setState({ dialogVisible2: true }) } type="text">Open a Table nested Dialog</Button>
      <Dialog
        title="Shipping Address"
        visible={ this.state.dialogVisible2 }
        onCancel={ () => this.setState({ dialogVisible2: false }) }
      >
        <Dialog.Body>
          {this.state.dialogVisible2 && (
            <Table
             style={{width: '100%'}}
             stripe={true}
             columns={this.table.columns}
             data={this.table.data} />
          )}
        </Dialog.Body>
      </Dialog>
      <Button type="text" onClick={ () => this.setState({ dialogVisible3: true }) } type="text">Open a Form nested Dialog</Button>
      <Dialog
        title="Shipping Address"
        visible={ this.state.dialogVisible3 }
        onCancel={ () => this.setState({ dialogVisible3: false }) }
      >
        <Dialog.Body>
          <Form model={this.state.form}>
            <Form.Item label="Promotion name" labelWidth="120">
              <Input value={this.state.form.name}></Input>
            </Form.Item>
            <Form.Item label="Zones" labelWidth="120">
              <Select value={this.state.form.region} placeholder="Please select a zone">
                <Select.Option label="Zone No.1" value="shanghai"></Select.Option>
                <Select.Option label="Zone No.2" value="beijing"></Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Dialog.Body>

        <Dialog.Footer className="dialog-footer">
          <Button onClick={ () => this.setState({ dialogVisible3: false }) }>取 消</Button>
          <Button type="primary" onClick={ () => this.setState({ dialogVisible3: false }) }>确 定</Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  )
}
```
:::

### Attributes

| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | title of Dialog. Can also be passed with a named slot (see the following table) | string    | — | — |
| size      | size of Dialog | string    | tiny/small/large/full | small |
| top      | value for `top` of Dialog CSS, works when `size` is not `full` | string    | — | 15% |
| modal     | whether a mask is displayed | boolean   | — | true |
| modalAppendToBody     | whether to append modal to body element. If false, the modal will be appended to Dialog's parent element | boolean   | — | true |
| lockScroll     | whether scroll of body is disabled while Dialog is displayed | boolean   | — | true |
| customClass      | custom class names for Dialog | string    | — | — |
| closeOnClickModal | whether the Dialog can be closed by clicking the mask | boolean    | — | true |
| closeOnPressEscape | whether the Dialog can be closed by pressing ESC | boolean    | — | true |
| showClose | whether to show a close button | boolean    | — | true |

### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| onOpen | triggers when the Dialog opens | — |
| onClose | triggers when the Dialog closes | — |
