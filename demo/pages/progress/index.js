import React from 'react';
import { Progress } from '../../../src';

export default class Playground extends React.Component {
  render() {
    return (
      <section className="demo-section">
        <h2>Progress 进度条</h2>
        <p>用于展示操作进度，告知用户当前状态和预期。</p>
        <h3>线形进度条 — 百分比外显</h3>
        <div className="demo-block demo-box demo-progress">
          <Progress percentage={0} />
          <Progress percentage={70} />
          <Progress percentage={100} status="success" />
          <Progress percentage={50} status="exception" />
          <Progress strokeWidth={18} percentage={0} textInside />
          <Progress strokeWidth={18} percentage={70} textInside />
          <Progress strokeWidth={18} percentage={100} status="success" textInside />
          <Progress strokeWidth={18} percentage={50} status="exception" textInside />
          <Progress type="circle" percentage={0} />
          <Progress type="circle" percentage={25} />
          <Progress type="circle" percentage={100} status="success" />
          <Progress type="circle" percentage={50} status="exception" />
        </div>
      </section>
    )
  }
}
