/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';
import ajax from './ajax';
import Cover from './Cover';
import type { RawFile, _File } from './Types';

export default class AjaxUpload extends Component {
  static defaultProps = {
    name: 'file'
  };

  constructor(props: Object) {
    super(props);
  }

  isImage(str: string): boolean {
    return str.indexOf('image') !== -1;
  }

  handleChange(e: SyntheticEvent): void {
    if (e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      if (!files) {
        return;
      }
      this.uploadFiles(files);
      this.refs.input.value = null;
    }
  }

  uploadFiles(files: FileList): void {
    const { multiple } = this.props;
    let postFiles = Array.prototype.slice.call(files);
    if (postFiles.length === 0) {
      return;
    }
    if (!multiple) {
      postFiles = postFiles.slice(0, 1);
    }
    postFiles.forEach(file => {
      this.props.onStart(file);
      if (this.props.autoUpload) this.upload(file);
    });
  }

  upload(rawFile: RawFile, file?: _File): void {
    const { beforeUpload } = this.props;
    if (!beforeUpload) {
      return this.post(rawFile);
    }
    const before = beforeUpload(rawFile);
    if (before && before.then) {
      before.then(
        processedFile => {
          if (
            Object.prototype.toString.call(processedFile) === '[object File]'
          ) {
            this.post(processedFile);
          } else {
            this.post(rawFile);
          }
        },
        () => {
          if (file && typeof this.props.onRemove === 'function') this.props.onRemove(file);
        }
      );
    } else if (before !== false) {
      this.post(rawFile);
    } else {
      if (file && typeof this.props.onRemove === 'function') this.props.onRemove(file);
    }
  }

  post(file: RawFile): void {
    const {
      name: filename,
      headers,
      withCredentials,
      data,
      action,
      onProgress,
      onSuccess,
      onError
    } = this.props;
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

  handleClick(): void {
    this.refs.input.click();
  }

  render(): React.Element<any> {
    const { drag, multiple, accept, listType } = this.props;
    return (
      <div
        className={this.classNames({
          'el-upload': true,
          [`el-upload--${listType}`]: true
        })}
        onClick={() => this.handleClick()}
      >
        {drag
          ? <Cover onFile={file => this.uploadFiles(file)}>
              {this.props.children}
            </Cover>
          : this.props.children}
        <input
          className="el-upload__input"
          type="file"
          ref="input"
          onChange={e => this.handleChange(e)}
          multiple={multiple}
          accept={accept}
        />
      </div>
    );
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
  fileList: PropTypes.array
};
