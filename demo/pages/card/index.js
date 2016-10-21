/**
 * Created by elemelyn on 16/10/21.
 */

import './style.scss';

import React from 'react';
import { Button, Card, Layout } from '../../../src';

const Row = Layout.Row;
const Col = Layout.Col;

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Card 卡片</h2>
            <p>将信息聚合在卡片容器中展示。</p>
            <h3>基础用法</h3>
            <p>包含标题，内容和操作。</p>
          </div>
          <div className="demo-content demo-card">
            <Card className="box-card"
                  header={
                    <div className="clearfix">
                      <span style={{ "lineHeight": "36px" }}>卡片名称</span>
                      <Button style={{ "float": "right" }} type="primary">操作按钮</Button>
                    </div>
                  }
            >
              <div className="text item">列表内容 0</div>
              <div className="text item">列表内容 1</div>
              <div className="text item">列表内容 2</div>
              <div className="text item">列表内容 3</div>
            </Card>
          </div>
        </section>

        <section className="demo-section">
          <div className="demo-header">
            <h3>简单卡片</h3>
            <p>卡片可以只有内容区域。</p>
          </div>
          <div className="demo-content demo-card">
            <Card className="box-card">
              <div className="text item">列表内容 0</div>
              <div className="text item">列表内容 1</div>
              <div className="text item">列表内容 2</div>
              <div className="text item">列表内容 3</div>
            </Card>
          </div>
        </section>

        <section className="demo-section">
          <div className="demo-header">
            <h3>带图片</h3>
            <p>可配置定义更丰富的内容展示。</p>
          </div>
          <div className="demo-content demo-card">
            <Row>
              <Col span={ 8 } offset={ 0 }>
                <Card bodyStyle={{ padding: 0 }}>
                  <img src={require('./hamburger.png')} className="image" />
                  <div style={{ padding: 14 }}>
                    <span>好吃的汉堡</span>
                    <div className="bottom clearfix">
                      <time className="time">2016-10-21 16:19</time>
                      <Button type="text" className="button">操作按钮</Button>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col span={ 8 } offset={ 2 }>
                <Card bodyStyle={{ padding: 0 }}>
                  <img src={require('./hamburger.png')} className="image" />
                  <div style={{ padding: 14 }}>
                    <span>好吃的汉堡</span>
                    <div className="bottom clearfix">
                      <time className="time">2016-10-21 16:19</time>
                      <Button type="text" className="button">操作按钮</Button>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    )
  }
}
