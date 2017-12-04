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
      this.input.value = null;
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

    this.props.onStart(postFiles);

    postFiles.forEach(file => {
      if (this.props.autoUpload) {
        this.uploadQueue(file)
      }
    });
  }

  uploadQueue (rawFile: RawFile, file?: _File): void {
    this.props.queue.add(() => this.upload(rawFile))
  }

  upload(rawFile: RawFile, file?: _File): Promise<void> {
    return new Promise((resolve: Function, reject: Function) => {
      const { beforeUpload } = this.props;
      if (!beforeUpload) {
        return this.post(rawFile, resolve, reject)
      }
      const before = beforeUpload(rawFile);
      if (before && before.then) {
        before.then(
          processedFile => {
            if (
              Object.prototype.toString.call(processedFile) === '[object File]'
            ) {
              return this.post(processedFile, resolve, reject);
            } else {
              return this.post(rawFile, resolve, reject);
            }
          },
          () => {
            if (file) this.onRemove(file);
          }
        );
      } else if (before !== false) {
        this.post(rawFile, resolve, reject);
      } else {
        if (file) this.onRemove(file);
      }
    })
  }

  post(file: RawFile, resolve: Function, reject: Function): Promise<void> {
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

    return ajax({
      headers,
      withCredentials,
      file,
      data,
      filename,
      action,
      onProgress: e => onProgress(e, file)
    }).then(res => {
      onSuccess(res, file),
      resolve(res)
    })
    .catch(error => {
      onError(error, file)
      reject(error)
    });
  }

  handleClick(): void {
    this.input.click();
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
          ref={ref => { this.input = ref } }
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
