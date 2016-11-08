import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';
import { Progress } from '../../src';
import i18n from '../locale';

export default class UploadList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fileList, onPreview, onRemove } = this.context;

    const isFinished = (status) => status === 'finished';
    return (
      <div tag="ul" className="el-upload__files" name="list">
        {
          fileList.map((file, index) =>
            <li
              className={this.classNames({
                'el-upload__file': true,
                'is-finished': isFinished(file.status),
              })}
              key={index}
            >
              <a className="el-upload__file__name" onClick={() => onPreview(file)}>
                <i className="el-icon-document"></i>{file.name}
              </a>
              <View show={isFinished(file.status)}>
                <span className="el-upload__btn-delete" onClick={() => onRemove(file)}>{i18n.t('el.upload.delete')}</span>
              </View>
              {
                file.showProgress &&
                  <Progress
                    strokeWidth={2}
                    percentage={parseInt(file.percentage, 10)}
                    status={isFinished(file.status) && file.showProgress ? 'success' : ''}
                  />
              }
            </li>
          )
        }
      </div>
    );
  }
}

UploadList.contextTypes = {
  onPreview: PropTypes.func,
  onRemove: PropTypes.func,
  fileList: PropTypes.array
}
