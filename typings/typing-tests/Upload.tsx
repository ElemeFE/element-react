import * as React from 'react'
import { Upload } from 'element-react'
import { Upload as UploadNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  state = {
    action: '//jsonplaceholder.typicode.com/posts/',
    fileList: [
      { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg' }
    ]
  }
  beforeUpload = (file) => false
  onRemove = (file, fileList) => { }
  onPreview = (file) => { }
  onProgress = (event, file, fileList) => { }
  onSuccess = (response, file, fileList) => { }
  onError = (err, response, file) => { }
  onChange = (file, fileList) => { }
  render() {
    const { action, fileList } = this.state
    return (
      <div>
        <Upload action={action} className="className" style={{ width: 100 }} />
        <Upload action={action} listType="text" />
        <Upload action={action} listType="picture" />
        <Upload action={action} headers={{ xAuth: 'jjdsa-dsad' }} data={{}} multiple={true} name="name" withCredentials={true} showFileList={true} autoUpload={true} accept="POST" drag={true} listType="picture-card" tip={(<div>tip</div>)} trigger={(<div>trigger</div>)} />

        <UploadNext action={action} className="className" style={{ width: 100 }} />
        <UploadNext action={action} listType="text" />
        <UploadNext action={action} listType="picture" />
        <UploadNext action={action} headers={{ xAuth: 'jjdsa-dsad' }} data={{}} multiple={true} name="name" withCredentials={true} showFileList={true} autoUpload={true} accept="POST" drag={true} listType="picture-card" tip={(<div>tip</div>)} trigger={(<div>trigger</div>)} />
      </div>
    )
  }
}
