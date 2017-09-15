## Upload 上传

通过点击或者拖拽上传文件

### 点击上传

::: demo 通过 tip属性 你可以传入自定义的上传按钮类型和文字提示。
```js
render() {
  const fileList = [
    {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'}
  ];
  return (
    <Upload
      className="upload-demo"
      action="//jsonplaceholder.typicode.com/posts/"
      onPreview={file => this.handlePreview(file)}
      onRemove={(file, fileList) => this.handleRemove(file, fileList)}
      fileList={fileList}
      tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
    >
      <Button size="small" type="primary">点击上传</Button>
    </Upload>
  )
}

handlePreview(file) {
  console.log('preview');
}

handleRemove(file, fileList) {
  console.log('remove');
}
```
:::

### 用户头像上传

使用 `beforeUpload` 限制用户上传的图片格式和大小。

::: demo
```js
constructor(props) {
  super(props);

  this.state = {
    imageUrl: '',
  };
}

render() {
  const { imageUrl } = this.state;
  return (
    <Upload
      className="avatar-uploader"
      action="//jsonplaceholder.typicode.com/posts/"
      showFileList={false}
      onSuccess={(res, file) => this.handleAvatarScucess(res, file)}
      beforeUpload={file => this.beforeAvatarUpload(file)}
    >
      { imageUrl ? <img src={imageUrl} className="avatar" /> : <i className="el-icon-plus avatar-uploader-icon"></i> }
    </Upload>
  )
}

handleAvatarScucess(res, file) {
  this.setState({ imageUrl: URL.createObjectURL(file.raw) });
}

beforeAvatarUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    Message('上传头像图片只能是 JPG 格式!');
  }
  if (!isLt2M) {
    Message('上传头像图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
}
```
:::

### 照片墙

使用 `listType` 属性来设置文件列表的样式。

::: demo
```js
constructor(props) {
  super(props);

  this.state = {
    dialogImageUrl: '',
    dialogVisible: false,
  };
}

render() {
  const { dialogImageUrl, dialogVisible } = this.state;
  return (
    <div>
      <Upload
        action="//jsonplaceholder.typicode.com/posts/"
        listType="picture-card"
        onPreview={file => this.handlePictureCardPreview(file)}
        onRemove={(file, fileList) => this.handleRemove(file, fileList)}
      >
        <i className="el-icon-plus"></i>
      </Upload>
      <Dialog
        visible={dialogVisible}
        size="tiny"
        onCancel={() => this.setState({ dialogVisible: false })}
      >
        <img width="100%" src={dialogImageUrl} alt="" />
      </Dialog>
    </div>
  )
}

handleRemove(file, fileList) {
  console.log(file, fileList);
}

handlePictureCardPreview(file) {
  this.setState({
    dialogImageUrl: file.url,
    dialogVisible: true,
  })
}

```
:::

### 图片列表缩略图

::: demo
```js
render() {
  const fileList2 = [
    {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'}
  ]
  return (
    <Upload
      className="upload-demo"
      action="//jsonplaceholder.typicode.com/posts/"
      onPreview={file => this.handlePreview(file)}
      onRemove={(file, fileList) => this.handleRemove(file, fileList)}
      fileList={fileList2}
      listType="picture"
      tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
    >
      <Button size="small" type="primary">点击上传</Button>
    </Upload>
  )
}

handleRemove(file, fileList) {
  console.log(file, fileList);
}

handlePreview(file) {
  console.log(file);
}

```
:::

### 上传文件列表控制

通过 `onChange` 钩子函数来对列表进行控制

::: demo
```js
constructor(props) {
  super(props);

  this.state = {
    fileList: [{
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg',
      status: 'finished'
    }, {
      name: 'food2.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg',
      status: 'finished'
    }]
  };
}

render() {
  const { fileList } = this.state;
  return (
    <Upload
      className="upload-demo"
      action="//jsonplaceholder.typicode.com/posts/"
      onChange={(file, fileList) => this.handleChange(file, fileList)}
      fileList={fileList}
      tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
    >
      <Button size="small" type="primary">点击上传</Button>
    </Upload>
  )
}

handleChange(file, fileList) {
  this.setState({ fileList: fileList.slice(-3) });
}
```
:::

### 拖拽上传

可将文件拖入指定区域进行上传。

::: demo 通过 `drag` 属性可以将上传控件变为支持拖拽的形式，并且你可以通过 `multiple` 属性来控制是否支持多选，`onPreview` 和 `onRemove` 是一个钩子函数，分别在点击上传后的文件链接和点击移除上传后的文件后被调用。
```js
render() {
  return (
    <Upload
      className="upload-demo"
      drag
      action="//jsonplaceholder.typicode.com/posts/"
      multiple
      tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
    >
      <i className="el-icon-upload"></i>
      <div className="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </Upload>
  )
}
```
:::

### 手动上传

::: demo
```js
render() {
  const fileList = [
    {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'}
  ];
  return (
    <Upload
      className="upload-demo"
      ref="upload"
      action="//jsonplaceholder.typicode.com/posts/"
      onPreview={file => this.handlePreview(file)}
      onRemove={(file, fileList) => this.handleRemove(file, fileList)}
      fileList={fileList}
      autoUpload={false}
      tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
      trigger={<Button size="small" type="primary">选取文件</Button>}
    >
      <Button style={{ marginLeft: '10px'}} size="small" type="success" onClick={() => this.submitUpload()}>上传到服务器</Button>
    </Upload>
  )
}

handleRemove(file, fileList) {
  console.log(file, fileList);
}

handlePreview(file) {
  console.log(file);
}

submitUpload() {
  this.refs.upload.submit();
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
| showFileList | 是否显示已上传文件列表 | boolean | — | true |
| drag | 可选参数，是否支持拖拽 | boolean | - | - |
| accept | 可选参数, 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnailMode 模式下此参数无效）| string | — | — |
| onPreview | 可选参数, 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据 | function(file) | — | — |
| onRemove | 可选参数, 文件列表移除文件时的钩子 | function(file, fileList) | — | — |
| onSuccess | 可选参数, 文件上传成功时的钩子 | function(response, file, fileList) | — | — |
| onError | 可选参数, 文件上传失败时的钩子 | function(err, file, fileList) | — | — |
| onProgress | 可选参数, 文件上传时的钩子 | function(event, file, fileList) | — | — |
| onChange | 可选参数, 文件状态改变时的钩子，上传成功或者失败时都会被调用 | function(file, fileList) | — | — |
| beforeUpload | 可选参数, 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 | function(file) | — | — |
| listType | 文件列表的类型 | string | text/picture/picture-card | text |
| autoUpload | 是否在选取文件后立即进行上传 | boolean | — | true |
| fileList | 上传的文件列表, 例如: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'}] | array | — | [] |

### Methods
| 方法名      | 说明          | 参数 |
|---------- |-------------- | -- |
| clearFiles | 清空已上传的文件列表 | — |
