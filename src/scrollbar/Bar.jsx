import React from 'react';
import { PropTypes, Component } from '../../libs';
import { BAR_MAP, renderThumbStyle} from './util';
import {on, off} from '../../libs/utils/dom';

export class Bar extends Component {

  constructor(props) {
    super(props);
  }

  get bar() {
    return BAR_MAP[this.props.vertical ? 'vertical' : 'horizontal'];
  }

  get wrap() {
    return this.props.getParentWrap();
  }

  clickThumbHandler(e) {
    this.startDrag(e);
    this[this.bar.axis] = (e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]));
  }

  clickTrackHandler(e) {
    const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
    const thumbHalf = (this.refs.thumb[this.bar.offset] / 2);
    const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.root[this.bar.offset]);

    this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
  }

  startDrag(e) {
    e.stopImmediatePropagation();
    this.cursorDown = true;

    on(document, 'mousemove', this.mouseMoveDocumentHandler);
    on(document, 'mouseup', this.mouseUpDocumentHandler);
    document.onselectstart = () => false;
  }

  mouseMoveDocumentHandler(e) {
    if (this.cursorDown === false) return;
    const prevPage = this[this.bar.axis];

    if (!prevPage) return;

    const offset = (e[this.bar.client] - this.root.getBoundingClientRect()[this.bar.direction]);
    const thumbClickPosition = (this.refs.thumb[this.bar.offset] - prevPage);
    const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.root[this.bar.offset]);

    this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
  }

  mouseUpDocumentHandler() {
    this.cursorDown = false;
    this[this.bar.axis] = 0;
    off(document, 'mousemove', this.mouseMoveDocumentHandler);
    document.onselectstart = null;
  }

  render() {
    const { size, move } = this.props;

    return (
      <div
        ref="root"
        className={this.classNames('el-scrollbar__bar', `is-${this.bar.key}`)}
        onMouseDown={ this.clickTrackHandler.bind(this) } >
        <div
          ref="thumb"
          className="el-scrollbar__thumb"
          onMouseDown={ this.clickThumbHandler.bind(this) }
          style={ renderThumbStyle({ size, move, bar: this.bar }) }>
        </div>
      </div>
    );
  }
}

Bar.propTypes = {
  vertical: PropTypes.bool,
  size: PropTypes.string,
  move: PropTypes.number,
  getParentWrap: PropTypes.func.isRequired

}
