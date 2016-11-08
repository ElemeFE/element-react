import React from 'react';
import { Component, PropTypes } from '../../libs';
import ajax from './ajax';
import Cover from './Cover';

export default class AjaxUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragOver: false,
    }
  }

  onDrop(e) {
    e.preventDefault();
    this.setState({ dragOver: false });
    this.uploadFiles(e.dataTransfer.files);
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
    const { multiple, thumbnailMode } = this.props;
    let postFiles = Array.prototype.slice.call(files);
    if (postFiles.length === 0) { return; }
    if (!multiple) { postFiles = postFiles.slice(0, 1); }

    postFiles.forEach(file => {
      const isImage = this.isImage(file.type);
      if (thumbnailMode && !isImage) {
        return;
      } else {
        this.upload(file);
      }
    });
  }

  upload(file) {
    const { beforeUpload } = this.props;
    if (!beforeUpload) {
      return this.post(file);
    }
    const before = beforeUpload(file);
    if (before && before.then) {
      before.then(processedFile => {
        if (Object.prototype.toString.call(processedFile) === '[object File]') {
          this.post(processedFile);
        } else {
          this.post(file);
        }
      });
    } else if (before !== false) {
      this.post(file);
    }
  }

  post(file) {
    const { name: filename, headers, withCredentials, data, action, onStart, onProgress, onSuccess, onError } = this.props;
    onStart && onStart(file);
    let formData = new FormData();
    formData.append(filename, file);
    ajax({
      headers,
      withCredentials,
      file,
      data,
      filename,
      action,
      onProgress: e => onProgress(e, file),
      onSuccess: res => onSuccess(res, file),
      onError: (err, response) => onError(err, response, file)
    });
  }

  handleClick() {
    this.refs.input.click();
  }

  render() {
    const { dragOver } = this.state;
    const { type, multiple, accept, showCover } = this.props;
    return (
      <div
        className={this.classNames({
          'el-upload__inner': true,
          'el-dragger': type === 'drag',
          'is-dragOver': dragOver,
          'is-showCover': showCover,
        })}
        onClick={() => this.handleClick()}
        onDrop={e => this.onDrop(e)}
        onDragOver={e => {
          e.preventDefault();
          this.setState({ dragOver: true });
        }}
        onDragLeave={e => {
          e.preventDefault();
          this.setState({ dragOver: false })
        }}
      >
        {showCover ? <Cover onClick={() => this.handleClick()} /> : React.Children.map(this.props.children, child => React.cloneElement(child))}
        <input className="el-upload__input" type="file" ref="input" onChange={e => this.handleChange(e)} multiple={multiple} accept={accept} />
      </div>
    )
  }
}


AjaxUpload.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  action: PropTypes.string.isRequired,
  name: PropTypes.string,
  accept: PropTypes.string,
  headers: PropTypes.object,
  withCredentials: PropTypes.bool,
  multiple: PropTypes.bool,
  thumbnailMode: PropTypes.bool,
  onStart: PropTypes.func,
  onProgress: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  beforeUpload: PropTypes.func,
  showCover: PropTypes.bool,
}

AjaxUpload.defaultProps = {
  name: 'file',
}
