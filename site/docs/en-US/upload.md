## Upload

Upload files by clicking or drag-and-drop

### Click to upload files

::: demo Customize upload button type and text using `tip`
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
      tip={<div className="el-upload__tip">jpg/png files with a size less than 500kb</div>}
    >
      <Button size="small" type="primary">Click to upload</Button>
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

### User avatar upload

Use `beforeUpload` hook to limit the upload file format and size.

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
    Message('Avatar picture must be JPG format!');
  }
  if (!isLt2M) {
    Message('Avatar picture size can not exceed 2MB!');
  }
  return isJPG && isLt2M;
}
```
:::

### Photo Wall

Use `listType` to change the fileList style.

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

### FileList with thumbnail

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
      tip={<div className="el-upload__tip">jpg/png files with a size less than 500kb</div>}
    >
      <Button size="small" type="primary">Click to upload</Button>
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

### File list control

Use `onChange` hook function to control upload file list

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
      tip={<div className="el-upload__tip">jpg/png files with a size less than 500kb</div>}
    >
      <Button size="small" type="primary">Click to upload</Button>
    </Upload>
  )
}

handleChange(file, fileList) {
  this.setState({ fileList: fileList.slice(-3) });
}
```
:::

### Drag to upload

You can drag your file to a certain area to upload it.

::: demo
```js
render() {
  return (
    <Upload
      className="upload-demo"
      drag
      action="//jsonplaceholder.typicode.com/posts/"
      multiple
      tip={<div className="el-upload__tip">jpg/png files with a size less than 500kb</div>}
    >
      <i className="el-icon-upload"></i>
      <div className="el-upload__text">Drop file here or<em>click to upload</em></div>
    </Upload>
  )
}
```
:::

### Manual upload

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
      tip={<div className="el-upload__tip">jpg/png files with a size less than 500kb</div>}
      trigger={<Button size="small" type="primary">select file</Button>}
    >
      <Button style={{ marginLeft: '10px'}} size="small" type="success" onClick={() => this.submitUpload()}>upload to server</Button>
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

| Attribute      | Description          | Type      | Accepted Values                | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| action | required, request URL | string | — | — |
| headers | request headers | object | — | — |
| multiple | whether uploading multiple files is permitted | boolean | — | — |
| data | additions options of request | object | — | — |
| name | key name for uploaded file | string | — | file |
| withCredentials | whether cookies are sent | boolean | — | false |
| showFileList | whether to show the uploaded file list | boolean | — | true |
| drag | whether to activate drag and drop mode | boolean | - | - |
| accept | accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)| string | — | — |
| onPreview | hook function when clicking the uploaded files | function(file) | — | — |
| onRemove | hook function when files are removed | function(file, fileList) | — | — |
| onSuccess | hook function when uploaded successfully | function(response, file, fileList) | — | — |
| onError | hook function when some errors occurs | function(err, file, fileList) | — | — |
| onProgress | hook function when some progress occurs | function(event, file, fileList) | — | — |
| onChange | hook function when file status change | function(file, fileList) | — | — |
| beforeUpload | hook function before uploading with the file to be uploaded as its parameter. If `false` or a `Promise` is returned, uploading will be aborted | function(file) | — | — |
| listType | type of fileList | string | text/picture/picture-card | text |
| autoUpload | whether to auto upload file | boolean | — | true |
| fileList | default uploaded files, i.e: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'}] | array | — | [] |

### Methods
| Event Name      | Description       | Parameters |
|---------- |-------------- | -- |
| clearFiles | clear the uploaded file list | — |
