import './style.scss';

import React from 'react';
import { Button } from '../../../src';

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Button 按钮</h2>
            <p>常用的操作按钮。</p>
            <h3>基础用法</h3>
            <p>基础的按钮用法。</p>
          </div>
          <div className="demo-content demo-button">
            <Button>默认按钮</Button>
            <Button type="primary">主要按钮</Button>
            <Button type="text">文字按钮</Button>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>禁用状态</h3>
            <p>按钮不可用状态。</p>
          </div>
          <div className="demo-content demo-button">
            <Button plain={true} disabled={true}>主要按钮</Button>
            <Button type="primary" disabled={true}>主要按钮</Button>
            <Button type="text" disabled={true}>文字按钮</Button>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>有颜色倾向</h3>
            <p>不同的颜色倾向代表不同的提示</p>
          </div>
          <div className="demo-content demo-button">
            <div className="block">
              <span className="demonstration">默认显示颜色</span>
              <span className="wrapper">
                <Button type="success">成功按钮</Button>
                <Button type="warning">警告按钮</Button>
                <Button type="danger">危险按钮</Button>
                <Button type="info">信息按钮</Button>
              </span>
            </div>
            <div className="block">
              <span className="demonstration">hover 显示颜色</span>
              <span className="wrapper">
                <Button plain={true} type="success">成功按钮</Button>
                <Button plain={true} type="warning">警告按钮</Button>
                <Button plain={true} type="danger">危险按钮</Button>
                <Button plain={true} type="info">信息按钮</Button>
              </span>
            </div>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>图标按钮</h3>
            <p>带图标的按钮可增强辨识度(有文字)或节省空间(无文字)。</p>
          </div>
          <div className="demo-content demo-button">
            <Button type="primary" icon="edit"></Button>
            <Button type="primary" icon="share"></Button>
            <Button type="primary" icon="delete"></Button>
            <Button type="primary" icon="search">搜索</Button>
            <Button type="primary">上传<i className="el-icon-upload el-icon-right"></i></Button>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>按钮组</h3>
            <p>以按钮组的方式出现，常用于多项类似操作。</p>
          </div>
          <div className="demo-content demo-button">
            <Button.Group>
              <Button type="primary" icon="arrow-left">上一页</Button>
              <Button type="primary">下一页<i className="el-icon-arrow-right el-icon-right"></i></Button>
            </Button.Group>
            <Button.Group>
              <Button type="primary" icon="edit"></Button>
              <Button type="primary" icon="share"></Button>
              <Button type="primary" icon="delete"></Button>
            </Button.Group>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>加载中</h3>
            <p>点击按钮后进行数据加载操作，在按钮上显示加载状态。</p>
          </div>
          <div className="demo-content demo-button">
            <Button type="primary" loading={true}>加载中</Button>
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>不同尺寸</h3>
            <p>Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。</p>
          </div>
          <div className="demo-content demo-button">
            <Button type="primary" size="large">大型按钮</Button>
            <Button type="primary">正常按钮</Button>
            <Button type="primary" size="small">小型按钮</Button>
            <Button type="primary" size="mini">超小按钮</Button>
          </div>
        </section>
      </div>
    )
  }
}
