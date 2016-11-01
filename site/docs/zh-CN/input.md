## Input 输入框

通过鼠标或键盘输入字符

### 基础用法

::: demo 简简单单一个框
```html
<Input placeholder="请输入内容" />
```
:::


### 禁用状态

::: demo 通过 `disabled` 属性指定是否禁用 input 组件
```html
<Input disabled placeholder="请输入内容" />
```
:::

### 带 icon 的输入框

带有图标标记输入类型

::: demo 可以通过 `icon` 属性在 input 组件尾部增加显示图标。
```html
<Input
  icon="time"
  placeholder="请选择日期"
  onClick={e => this.handleIconClick(e)}
/>
```
:::

### 文本域

可调整大小，用于输入多行文本信息

::: demo 通过将 `type` 属性的值指定为 textarea。
```html
<Input
  type="textarea"
  autosize
  placeholder="请输入内容"
/>
```
:::

### 复合型输入框

可前置或后置元素，一般为标签或按钮

::: demo 可通过 prepend 和 append 来指定在 input 中前置或者后置内容。
```html
<Input placeholder="请输入内容" prepend="Http://" />
<Input placeholder="请输入内容" append=".com" />
```
:::

### 尺寸

::: demo 可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸。
```html
<div className="inline-input">
  <Input placeholder="请输入内容" size="large" />
  <Input placeholder="请输入内容" />
  <Input placeholder="请输入内容" size="small" />
  <Input placeholder="请输入内容" size="mini" />
</div>
```
:::

### 带输入建议(TODO)

根据输入内容提供对应的输入建议, 依赖autoComplete

::: demo autocomplete 是一个可带输入建议的输入框组件，
:::

### 自定义模板(TODO)

可自定义输入建议的显示，依赖autoComplete

::: demo autocomplete 是一个可带输入建议的输入框组件，
:::

### 远程搜索(TODO)

从服务端搜索数据，依赖autoComplete

::: demo autocomplete 是一个可带输入建议的输入框组件，
:::


### Input API

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text/textarea | text |
| value         | 绑定值           | string, number  | — | — |
| maxlength     | 最大输入长度      | number          |  —  | — |
| minlength     | 最小输入长度      | number          | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | large, small, mini  | — |
| icon          | 输入框尾部图标    | string          | — | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }  |  boolean/object | — |  false   |

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| handleIconClick | 点击 Input 内的图标时触发 | event |
| handleInput | input输入内容时触发 | event |
| handlePressEnter | enter键被按下时触发 | event |
| handleFocus | 输入框获得焦点时触发 | event |
| handleBlur | 输入框失去焦点时触发 | event |

### Autocomplete API

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| placeholder   | 输入框占位文本   | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| value         | 必填值输入绑定值   | string  | — | — |
| custom-item  | 通过该参数指定自定义的输入建议列表项的组件名 | string  | — | — |
| fetch-suggestions | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它  | Function(queryString, callback)  | — | — |

### Autocomplete Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| select | 点击选中建议项时触发 | 选中建议项 |