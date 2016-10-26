import './style.scss';

import React from 'react';
import { Loading, Button } from '../../../src';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullscreen: false
    }
  }

  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Loading 加载</h2>
            <p>加载数据时显示动效。</p>
            <h3>区域加载</h3>
            <p>在表格等容器中加载数据时显示。</p>
          </div>
          <div className="demo-content demo-loading">
            <div className="el-loading-demo">
              <Loading>
                <div className="el-loading-mask" />
              </Loading>
            </div>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>整页加载</h3>
            <p>页面数据加载时显示。</p>
          </div>
          <div className="demo-content demo-loading">
            <Button type="primary" onClick={this.onClick.bind(this)}>显示整页加载，3 秒后消失</Button>
            {
              this.state.fullscreen && <Loading fullscreen={true} />
            }
          </div>
        </section>
      </div>
    )
  }

  onClick() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.setState({
        fullscreen: false
      });
    }, 3000);

    this.setState({
      fullscreen: true
    });
  }
}
