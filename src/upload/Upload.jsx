import React from 'react';
import { Component, PropTypes } from '../../libs';
import UploadList from './UploadList';
import iFrameUpload from './iFrameUpload';
import AjaxUpload from './AjaxUpload';

let fileStaged = [];

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      dragOver: false,
      draging: false,
      tempIndex: 1,
    }
  }

  getChildContext() {
    const { fileList } = this.state;
    return {
      onPreview: this.handlePreview.bind(this),
      onRemove: this.handleRemove.bind(this),
      fileList: fileList,
    }
  }

  getFile(file) {
    const { fileList } = this.state;
    const target = fileList.find(item => item.uid === file.uid);
    return target;
  }

  handleStart(file) {
    let { tempIndex } = this.state;
    file.uid = Date.now() + tempIndex++;
    let _file = {
      status: 'uploading',
      name: file.name,
      size: file.size,
      percentage: 0,
      uid: file.uid,
      showProgress: true
    };
    if (this.props.thumbnailMode) {
      try {
        _file.url = URL.createObjectURL(file);
      } catch (err) {
        throw err;
      }
    }
    fileStaged = fileStaged.concat(_file);
    this.setState({
      fileList: fileStaged,
      tempIndex,
    })
  }

  handleProgress(e, file) {
    const { fileList } = this.state;
    let _file = this.getFile(file);
    _file.percentage = e.percent || 0;
    this.setState({ fileList })
  }

  handleSuccess(res, file) {
    const { fileList } = this.state;
    let _file = this.getFile(file);
    if (_file) {
      _file.status = 'finished';
      _file.response = res;
      this.setState({ fileList });
      this.props.onSuccess(res, _file, this.fileList);
      setTimeout(() => {
        _file.showProgress = false;
        this.setState({ fileList });
      }, 1000);
    }
  }

  handleError(err, response, file) {
    let _file = this.getFile(file);
    const { fileList } = this.state;
    _file.status = 'fail';
    fileList.splice(fileList.indexOf(_file), 1);
    this.setState({ fileList }, () => this.props.onError(err, response, file));

  }

  handleRemove(file) {
    let _file = this.getFile(file);
    const { fileList } = this.state;
    fileList.splice(fileList.indexOf(_file), 1);
    this.setState({ fileList }, () => this.props.onRemove(file, fileList));
  }

  handlePreview(file) {
    if (file.status === 'finished') {
      this.props.onPreview(file);
    }
  }

  clearFiles() {
    this.setState({
      fileList: [],
    })
  }

  showCover() {
    const { fileList } = this.state;
    const file = fileList[fileList.length - 1];
    return this.props.thumbnailMode && file && file.status !== 'fail';
  }

  render() {
    const { fileList } = this.state;
    const {
      showUploadList,
      thumbnailMode,
      type,
      tip,
      action,
      multiple,
      beforeUpload,
      withCredentials,
      headers,
      name,
      data,
      accept,
    } = this.props;
    let uploadList;
    if (showUploadList && !thumbnailMode && fileList.length) {
      uploadList = <UploadList />;
    }
    const restProps = {
      type,
      action,
      multiple,
      beforeUpload,
      withCredentials,
      headers,
      name,
      data,
      accept: thumbnailMode ? 'image/*' : accept,
      onStart: file => this.handleStart(file),
      onProgress: (e, file) => this.handleProgress(e, file),
      onSuccess: (res, file) => this.handleSuccess(res, file),
      onError: (error, res, file) => this.handleError(error, res, file),
      onPreview: file => this.handlePreview(file),
      onRemove: file => this.handleRemove(file),
      ref: 'upload-inner',
      showCover: this.showCover(),
    };
    const children = React.Children.map(this.props.children, child => React.cloneElement(child));
    const uploadComponent = typeof FormData !== 'undefined'
     ? <AjaxUpload {...restProps}>{children}</AjaxUpload>
     : <iFrameUpload {...restProps}>{children}</iFrameUpload>;
    if (type === 'select') {
     return (
       <div className="el-upload">
         {uploadList}
         {uploadComponent}
         {tip}
       </div>
      );
    }
    if (type === 'drag') {
      return (
        <div style={this.style()} className={this.className('el-upload')}>
          {uploadComponent}
          {tip}
          {uploadList}
        </div>
      );
    }
  }
}

Upload.childContextTypes = {
  onPreview: PropTypes.func,
  onRemove: PropTypes.func,
  fileList: PropTypes.array,
}

Upload.propTypes = {
  action: PropTypes.string.isRequired,
  headers: PropTypes.object,
  data: PropTypes.object,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  withCredentials: PropTypes.bool,
  thumbnailMode: PropTypes.bool,
  showUploadList: PropTypes.bool,
  accept: PropTypes.string,
  type: PropTypes.oneOf(['select', 'drag']),
  tip: PropTypes.node,
  beforeUpload: PropTypes.func,
  onRemove: PropTypes.func,
  onPreview: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
}

Upload.defaultProps = {
  headers: {},
  name: 'file',
  type: 'select',
  showUploadList: true,
  onRemove() {},
  onPreview() {},
  onSuccess() {},
  onError() {},
}
