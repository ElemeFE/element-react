import './style.scss';

import React from 'react';
import { Radio } from '../../../src';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alpha: 1,
      charlie: 3,
      delta: '北京'
    }
  }
  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Radio 单选框</h2>
            <p>在一组备选项中进行单选</p>
            <h3>基础用法</h3>
            <p>由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。</p>
          </div>
          <div className="demo-content demo-radio">
            <Radio value="1" checked={this.state.alpha === '1'} onChange={e => this.setState({ alpha: e.target.checked && '1' })}>备选项</Radio>
            <Radio value="2" checked={this.state.alpha === '2'} onChange={e => this.setState({ alpha: e.target.checked && '2' })}>备选项</Radio>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>禁用状态</h3>
            <p>单选框不可用的状态。</p>
          </div>
          <div className="demo-content demo-radio">
            <Radio value="1" disabled={true}>备选项</Radio>
            <Radio value="2" disabled={true}>备选项</Radio>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>单选框组</h3>
            <p>适用于在多个互斥的选项中选择的场景</p>
          </div>
          <div className="demo-content demo-radio">
            <Radio.Group value={this.state.charlie} onChange={e => this.setState({ charlie: e.target.value })}>
              <Radio value="3">备选项</Radio>
              <Radio value="6">备选项</Radio>
              <Radio value="9">备选项</Radio>
            </Radio.Group>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>按钮样式</h3>
            <p>按钮样式的单选组合。</p>
          </div>
          <div className="demo-content demo-radio">
            <Radio.Group value={this.state.delta} onChange={e => this.setState({ delta: e.target.value })}>
              <Radio.Button value="上海" />
              <Radio.Button value="北京" />
              <Radio.Button value="广州" disabled={true} />
              <Radio.Button value="深圳" />
            </Radio.Group>
          </div>
        </section>
      </div>
    )
  }
}
