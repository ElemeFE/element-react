### 基础用法

可同时展开多个面板，面板之间不影响

:::demo
```js


render() {
  const activeName = "1";
  return (
    <Collapse value={activeName}>
      <Collapse.Item title="一致性 Consistency" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </Collapse.Item>
      <Collapse.Item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </Collapse.Item>
      <Collapse.Item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </Collapse.Item>
      <Collapse.Item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </Collapse.Item>
    </Collapse>
  )
}
```
:::

### 手风琴效果

每次只能展开一个面板

:::demo 通过 `accordion` 属性来设置是否以手风琴模式显示。
```js
constructor(props) {
  super(props)

  this.state = {
    activeName: '1'
  }
}

render() {
  return (
    <div>
      <Button
        type="primary"
        style={{marginBottom: '15px'}}
        onClick={() => this.setState({ activeName: '3' })}
      >
        打开第三个
      </Button>
      <Collapse value={this.state.activeName} accordion>
        <Collapse.Item title="一致性 Consistency" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </Collapse.Item>
        <Collapse.Item title="反馈 Feedback" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </Collapse.Item>
        <Collapse.Item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </Collapse.Item>
        <Collapse.Item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </Collapse.Item>
      </Collapse>
    </div>
  )
}
```
:::

### 自定义面板标题

可以通过 `title` 属性来实现自定义面板的标题内容，以实现增加图标等效果。

:::demo
```js
render() {
  return (
    <Collapse accordion>
      <Collapse.Item title={<span>一致性 Consistency<i className="header-icon el-icon-information"></i></span>}>
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </Collapse.Item>
      <Collapse.Item title="反馈 Feedback">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </Collapse.Item>
      <Collapse.Item title="效率 Efficiency">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </Collapse.Item>
      <Collapse.Item title="可控 Controllability">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </Collapse.Item>
    </Collapse>
  )
}
```
:::

### Collapse Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| accordion | 是否手风琴模式 | boolean | — | false |
| value | 当前激活的面板(如果是手风琴模式，绑定值类型需要为`string`，否则为`array`) | string/array | — | — |

### Collapse Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| onChange | 当前激活面板改变时触发(如果是手风琴模式，参数类型为`string`，否则为`array`) | (activeNames: array/string) |


### Collapse Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 唯一标志符 | string/number | — | — |
| title | 面板标题 | string/node | — | — |
