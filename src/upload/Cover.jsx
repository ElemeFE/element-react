import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';
import { Progress } from '../../src';
import i18n from '../locale';

export default class Cover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseover: false,
    }
  }

  render() {
    const { fileList, onPreview, onRemove } = this.context;
    const { mouseover } = this.state;
    const image = fileList[fileList.length - 1];
    return (
      image &&
      <div className="el-dragger__cover" onClick={e => e.stopPropagation()}>
        <Transition name="fade-in">
          {
            image.status === 'uploading' ?
              <Progress
                className="el-dragger__cover__progress"
                percentage={image.percentage}
                showText={false}
                status={image.status === 'finished' ? 'success' : ''}>
              </Progress>: <span></span>
          }
        </Transition>
        {
          image.status === 'finished' &&
            <div
              className="el-dragger__cover__content"
              onMouseEnter={() => this.setState({ mouseover: true })}
              onMouseLeave={() => this.setState({ mouseover: false })}
            >
              <img src={image.url} />
              <Transition name="fade-in">
                <View show={mouseover}>
                  <div className="el-dragger__cover__interact">
                    <div className="el-draggeer__cover__btns">
                      <span className="btn" onClick={() => this.props.onClick()}><i className="el-icon-upload2"></i><span>{i18n.t('el.upload.continue')}</span></span>
                      <span className="btn" onClick={() => onPreview(image)}><i className="el-icon-view"></i><span>{i18n.t('el.upload.preview')}</span></span>
                      <span className="btn" onClick={() => onRemove(image)}><i className="el-icon-delete2"></i><span>{i18n.t('el.upload.delete')}</span></span>
                    </div>
                  </div>
                </View>
              </Transition>
              <Transition name="md-fade-top">
                <View show={mouseover}>
                  <h4 className="el-dragger__cover__title">{image.name}</h4>
                </View>
              </Transition>
            </div>
        }
      </div>
    );
  }
}

Cover.contextTypes = {
  onPreview: PropTypes.func,
  onRemove: PropTypes.func,
  fileList: PropTypes.array
}

Cover.propTypes = {
  onClick: PropTypes.func,
}

Cover.defaultProps = {
  onClick() {},
}
