## Upload 上传

通过点击或者拖拽上传文件

### 点击上传多个文件

::: demo 通过 tip属性 你可以传入自定义的上传按钮类型和文字提示。
```js
render() {
  return (
    <Upload
      action="//jsonplaceholder.typicode.com/posts/"
      onPreview={() => this.handlePreview()}
      onRemove={() => this.handleRemove()}
      tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
    >
      <Button size="small" type="primary">点击上传</Button>
    </Upload>
  )
}

handlePreview() {
  console.log('preview');
}

handleRemove() {
  console.log('remove');
}
```
:::

### 拖拽上传

可将文件拖入指定区域进行上传。

::: demo 将 `type` 属性指定为 'drag' 可以将上传控件变为支持拖拽的形式，并且你可以通过 `multiple` 属性来控制是否支持多选，`onPreview` 和 `onRemove` 是一个钩子函数，分别在点击上传后的文件链接和点击移除上传后的文件后被调用。
```js
render() {
  return (
    <Upload
      action="//jsonplaceholder.typicode.com/posts/"
      type="drag"
      multiple={true}
      onPreview={() => this.handlePreview()}
      onRemove={() => this.handleRemove()}
      onSuccess={() => this.handleSuccess()}
      onError={() => this.handleError()}
      tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
    >
      <i className="el-icon-upload"></i>
      <div className="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
    </Upload>
  )
}

handlePreview() {
  console.log('preview');
}

handleRemove() {
  console.log('remove');
}

handleSuccess() {
  console.log('success');
}

handleError() {
  console.log('error');
}
```
:::

### 上传单个图片

专门针对图片类型文件的上传，上传后在原位置显示缩略图。

::: demo `thumbnailMode` 属性允许你将上传组件强制只允许图片上传，并支持展示上传文件的缩略图。
```js
render() {
  return (
    <Upload
      action="//jsonplaceholder.typicode.com/posts/"
      type="drag"
      thumbnailMode={true}
      onPreview={() => this.handlePreview()}
      onRemove={() => this.handleRemove()}
      tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
    >
      <i className="el-icon-upload"></i>
      <div className="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
    </Upload>
  )
}

handlePreview() {
  console.log('preview');
}

handleRemove() {
  console.log('remove');
}
```
:::

### Upload Attribute

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| action | 必选参数, 上传的地址 | string | — | — |
| headers | 可选参数, 设置上传的请求头部 | object | — | — |
| multiple | 可选参数, 是否支持多选文件 | boolean | — | — |
| data | 可选参数, 上传时附带的额外参数 | object | — | — |
| name | 可选参数, 上传的文件字段名 | string | — | file |
| withCredentials | 支持发送 cookie 凭证信息 | boolean | — | false |
| showUploadList | 是否显示已上传文件列表 | boolean | — | true |
| type | 上传控件类型 | string | select/drag | select |
| accept | 可选参数, 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnailMode 模式下此参数无效）| string | — | — |
| onPreview | 可选参数, 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据 | function(file) | — | — |
| onRemove | 可选参数, 文件列表移除文件时的钩子 | function(file, fileList) | — | — |
| onSuccess | 可选参数, 文件上传成功时的钩子 | function(response, file, fileList) | — | — |
| onError | 可选参数, 文件上传失败时的钩子 | function(err, response, file) | — | — |
| onProgress | 可选参数, 文件上传时的钩子 | function(event, file, fileList) | — | — |
| beforeUpload | 可选参数, 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 | function(file) | — | — |
| thumbnailMode | 是否设置为图片模式，该模式下会显示图片缩略图 | boolean | — | false |
