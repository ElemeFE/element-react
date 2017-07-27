## Tag

Used for marking and selection.

### Basic usage

:::demo Use the `type` attribute to define Tag's type. In addition, the `color` attribute can be used to set the background color of the Tag.

```js
render() {
  return (
    <div>
      <Tag>Tag One</Tag>
      <Tag type="gray">Tag Two</Tag>
      <Tag type="primary">Tag Three</Tag>
      <Tag type="success">Tag Four</Tag>
      <Tag type="warning">Tag Five</Tag>
      <Tag type="danger">Tag Six</Tag>
    </div>
  )
}
```
:::

### Removable Tag

:::demo `closable` attribute can be used to define a removable tag. It accepts a `Boolean`. By default the removal of Tag has a fading animation. If you don't want to use it, you can set the `closeTransition` attribute, which accepts a `Boolean`, to `true`. `close` event triggers when Tag is removed.

```js
constructor(props) {
  super(props);

  this.state = {
    tags: [
      { key: 1, name: 'Tag One', type: '' },
      { key: 2, name: 'Tag Two', type: 'gray' },
      { key: 5, name: 'Tag Three', type: 'primary' },
      { key: 3, name: 'Tag Four', type: 'success' },
      { key: 4, name: 'Tag Five', type: 'warning' },
      { key: 6, name: 'Tag Six', type: 'danger' }
    ]
  }
}

handleClose(tag) {
  const { tags } = this.state;

  tags.splice(tags.map(el => el.key).indexOf(tag.key), 1);

  this.setState({ tag });
}

render() {
  return (
    <div>
      {
        this.state.tags.map(tag => {
          return (
            <Tag
              key={tag.key}
              closable={true}
              type={tag.type}
              closeTransition={false}
              onClose={this.handleClose.bind(this, tag)}>{tag.name}</Tag>
          )
        })
      }
    </div>
  )
}
```
:::

### Edit Dynamically

You can use the `onClose` event to add and remove tag dynamically.

:::demo
```js
constructor(props) {
  super(props);

  this.state = {
    dynamicTags: ['Tag One', 'Tag Two', 'Tag Three'],
    inputVisible: false,
    inputValue: ''
  }
}

onKeyUp(e) {
  if (e.keyCode === 13) {
    this.handleInputConfirm();
  }
}

onChange(value) {
  this.setState({ inputValue: value });
}

handleClose(index) {
  this.state.dynamicTags.splice(index, 1);
  this.forceUpdate();
}

showInput() {
  this.setState({ inputVisible: true }, () => {
    this.refs.saveTagInput.focus();
  });
}

handleInputConfirm() {
  let inputValue = this.state.inputValue;

  if (inputValue) {
    this.state.dynamicTags.push(inputValue);
  }

  this.state.inputVisible = false;
  this.state.inputValue = '';

  this.forceUpdate();
}

render() {
  return (
    <div>
      {
        this.state.dynamicTags.map((tag, index) => {
          return (
            <Tag
              key={Math.random()}
              closable={true}
              closeTransition={false}
              onClose={this.handleClose.bind(this, index)}>{tag}</Tag>
          )
        })
      }
      {
        this.state.inputVisible ? (
          <Input
            className="input-new-tag"
            value={this.state.inputValue}
            ref="saveTagInput"
            size="mini"
            onChange={this.onChange.bind(this)}
            onKeyUp={this.onKeyUp.bind(this)}
            onBlur={this.handleInputConfirm.bind(this)}
          />
        ) : <Button className="button-new-tag" size="small" onClick={this.showInput.bind(this)}>+ New Tag</Button>
      }
    </div>
  )
}
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values      | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | theme | string | 'primary', 'gray', 'success', 'warning', 'danger' | — |
| closable | whether Tab can be removed | boolean | — | false |
| closeTransition |  whether the removal animation is disabled  | boolean | — | false |
| hit | whether Tag has a highlighted border | boolean | — | false |
| color | background color of the tag | string | — | — |

### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| onClose | triggers when Tab is removed | — |
