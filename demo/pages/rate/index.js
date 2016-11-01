/**
 * Created by elemelyn on 16/10/25.
 */

import './style.scss';

import React from 'react';
import { Rate } from '../../../src';
// import classnames from 'classnames';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible1: false,
    };
  }

  handleDialogClose(index) {
    this.setState({
      [`dialogVisible${index}`]: false
    });
  }

  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Rate 评分</h2>
            <p>评分组件</p>
            <h3>基本用法</h3>
            <p>默认不区分颜色</p>
          </div>

          <div className="demo-content demo-rate">
            <Rate />
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <p>区分颜色</p>
          </div>

          <div className="demo-content demo-rate">
            <Rate colors={['#99A9BF', '#F7BA2A', '#FF9900']} />
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>辅助文字</h3>
            <p>用辅助文字直接地表达对应分数</p>
          </div>

          <div className="demo-content demo-rate">
            <Rate show-text={true} />
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>只读</h3>
            <p>只读的评分用来展示分数，允许出现半星</p>
          </div>

          <div className="demo-content demo-rate">
            <Rate disabled={true} value={3.9} text-template={true} />
          </div>
        </section>
      </div>
    )
  }
}