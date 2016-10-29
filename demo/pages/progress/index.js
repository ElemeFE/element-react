import './style.scss';

import React from 'react';
import { Progress } from '../../../src';

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Progress 进度条</h2>
            <p>用于展示操作进度，告知用户当前状态和预期。</p>
            <h3>线形进度条 — 百分比外显</h3>
          </div>
          <div className="demo-content demo-progress">
            <Progress percentage={0} />
            <Progress percentage={70} />
            <Progress percentage={100} status="success" />
            <Progress percentage={50} status="exception" />
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>线形进度条 — 百分比外显</h3>
            <p>百分比不占用额外控件，适用于文件上传等场景。</p>
          </div>
          <div className="demo-content demo-progress">
            <Progress strokeWidth={18} percentage={0} textInside />
            <Progress strokeWidth={18} percentage={70} textInside />
            <Progress strokeWidth={18}  status="success" textInside />
            <Progress strokeWidth={18} percentage={50} status="exception" textInside />
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>环形进度条</h3>
          </div>
          <div className="demo-content demo-progress">
            <Progress type="circle" percentage={0} />
            <Progress type="circle" percentage={25} />
            <Progress type="circle" percentage={100} status="success" />
            <Progress type="circle" percentage={50} status="exception" />
          </div>
        </section>
      </div>
    )
  }
}
