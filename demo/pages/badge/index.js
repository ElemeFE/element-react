import React from 'react';
import { Button, Badge } from '../../../src';

import './style.scss';

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Badge 标记</h2>
            <p>出现在按钮、图标旁的数字或状态标记。</p>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>基础用法</h3>
            <p>展示新消息数量。</p>
          </div>
          <div className="demo-content">
            <Badge value={ 12 } className="demo-badge">
              <Button size="small">评论</Button>
            </Badge>
            <Badge value={ 3 } className="demo-badge">
              <Button size="small">回复</Button>
            </Badge>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>最大值</h3>
            <p>可自定义最大值。</p>
          </div>
          <div className="demo-content">
            <Badge value={ 200 } max={ 99 } className="demo-badge">
              <Button size="small">评论</Button>
            </Badge>
            <Badge value={ 100 } max={ 10 } className="demo-badge">
              <Button size="small">回复</Button>
            </Badge>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>自定义内容</h3>
            <p>可以显示数字以外的文本内容。</p>
          </div>
          <div className="demo-content">
            <Badge value={ 'new' } className="demo-badge">
              <Button size="small">评论</Button>
            </Badge>
            <Badge value={ 'hot' } className="demo-badge">
              <Button size="small">回复</Button>
            </Badge>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>小红点</h3>
            <p>以红点的形式标注需要关注的内容。</p>
          </div>
          <div className="demo-content">
            <Badge isDot className="demo-badge">
              数据查询
            </Badge>
            <Badge isDot className="demo-badge">
              <Button icon="share" type="primary"></Button>
            </Badge>
          </div>
        </section>
      </div>
    )
  }
}
