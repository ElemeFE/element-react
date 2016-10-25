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
              <Loading />
            </div>
          </div>
        </section>
      </div>
    )
  }
}
