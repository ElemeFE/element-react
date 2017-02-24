import React from 'react';
import { Component, PropTypes } from '../../libs';
import ajax from './ajax';
import Cover from './Cover';

export default class AjaxUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  isImage(str) {
    return str.indexOf('image') !== -1;
  }

  handleChange(e) {
    const files = e.target.files;
    if (!files) {
      return;
    }
    this.uploadFiles(files);
    this.refs.input.value = null;
  }

  uploadFiles(files) {
    const { multiple } = this.props;
    let postFiles = Array.prototype.slice.call(files);
    if (postFiles.length === 0) { return; }
    if (!multiple) { postFiles = postFiles.slice(0, 1); }
    postFiles.forEach(file => {
      this.props.onStart(file);
      if (this.props.autoUpload) this.upload(file);
    });
  }

  upload(rawFile, file) {
    const { beforeUpload } = this.props;
    if (!beforeUpload) {
      return this.post(rawFile);
    }
    const before = beforeUpload(rawFile);
    if (before && before.then) {
      before.then(processedFile => {
        if (Object.prototype.toString.call(processedFile) === '[object File]') {
          this.post(processedFile);
        } else {
          this.post(rawFile);
        }
      }, () => {
        if (file) this.onRemove(file);
      });
    } else if (before !== false) {
      this.post(rawFile);
    } else {
      if (file) this.onRemove(file);
    }
  }

  post(file) {
    const { name: filename, headers, withCredentials, data, action, onProgress, onSuccess, onError } = this.props;
    ajax({
      headers,
      withCredentials,
      file,
      data,
      filename,
      action,
      onProgress: e => onProgress(e, file),
      onSuccess: res => onSuccess(res, file),
      onError: err => onError(err, file)
    });
  }

  handleClick() {
    this.refs.input.click();
  }

  render() {
    const { drag, multiple, accept, listType } = this.props;
    return (
      <div
        className={this.classNames({
          'el-upload': true,
          [`el-upload--${listType}`]: true,
        })}
        onClick={() => this.handleClick()}
      >
        {drag ? <Cover onFile={file => this.uploadFiles(file)}>{this.props.children}</Cover> : this.props.children}
        <input className="el-upload__input" type="file" ref="input" onChange={e => this.handleChange(e)} multiple={multiple} accept={accept} />
      </div>
    )
  }
}


AjaxUpload.propTypes = {
  drag: PropTypes.bool,
  data: PropTypes.object,
  action: PropTypes.string.isRequired,
  name: PropTypes.string,
  accept: PropTypes.string,
  headers: PropTypes.object,
  withCredentials: PropTypes.bool,
  multiple: PropTypes.bool,
  onStart: PropTypes.func,
  onProgress: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  beforeUpload: PropTypes.func,
  autoUpload: PropTypes.bool,
  listType: PropTypes.string,
  fileList: PropTypes.array,
}

AjaxUpload.defaultProps = {
  name: 'file',
}
