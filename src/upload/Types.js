/* @flow */

// 自定义file类型
export type _File = {
  status: string,
  name: string,
  size?: number,
  percentage?: number,
  uid: number,
  raw?: RawFile,
  url?: string,
  response?: Object
};

export type UploadState = {
  fileList: Array<_File>,
  tempIndex: number
};

export type IframeUploadState = {
  dragOver: boolean,
  file: ?File,
  disabled: false,
  frameName: string
};

export class RawFile extends File {
  uid: number;
}

export class _ProgressEvent extends ProgressEvent {
  percent: number;
}
