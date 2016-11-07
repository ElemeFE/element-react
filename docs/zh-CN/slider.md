## Slider 滑块

通过拖动滑块在一个固定区间内进行选择

### 基础用法

在拖动滑块时，显示当前值

:::demo 通过设置绑定值自定义滑块的初始值
```html
<div className="block">
  <span className="demonstration">默认</span>
  <Slider value={this.state.value1} />
</div>
<div className="block">
  <span className="demonstration">自定义初始值</span>
  <Slider value={this.state.value2} />
</div>
<div className="block">
  <span className="demonstration">禁用</span>
  <Slider value={this.state.value3} disabled={true} />
</div>
```
:::

### 离散值

选项可以是离散的

:::demo 改变`step`的值可以改变步长，通过设置`show-step`属性可以显示间断点
```html
<div className="block">
  <span className="demonstration">不显示间断点</span>
  <Slider value={this.state.value4} step="10" />
</div>
<div className="block">
  <span className="demonstration">显示间断点</span>
  <Slider value={this.state.value5} step="10" showStops={true} />
</div>
```
:::

### 带有输入框

通过输入框设置精确数值

:::demo 设置`show-input`属性会在右侧显示一个输入框
```html
<div className="block">
  <Slider value={this.state.value6} showInput={true} />
</div>
```
:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| min | 最小值 | number | — | 0 |
| max | 最大值 | number | — | 100 |
| disabled | 是否禁用 | boolean | — | false |
| step | 步长 | number | — | 1 |
| show-input | 是否显示输入框 | boolean | — | false |
| show-stops | 是否显示间断点 | boolean | — | false |

## Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 值改变时触发 | 改变后的值 |
