import React from 'react';
import { Alert } from '../../src';

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Alert 警告</h2>
            <p>用于页面中展示重要的提示信息。</p>
            <h3>基本用法</h3>
            <p>页面中的非浮层元素，不会自动消失。</p>
          </div>
          <div className="demo-content demo-alert">
            <Alert title="成功提示的文案" type="success" />
            <Alert title="消息提示的文案" type="info" />
            <Alert title="警告提示的文案" type="warning" />
            <Alert title="错误提示的文案" type="error" />
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>自定义关闭按钮</h3>
            <p>自定义关闭按钮为文字或其他符号。</p>
          </div>
          <div className="demo-content demo-alert">
            <Alert title="不可关闭的 alert" type="success" closable={false} />
            <Alert title="自定义 close-text" type="info" closeText="知道了" />
            <Alert title="设置了回调的 alert" type="warning" onClose={() => alert('Hello World!')}/>
          </div>
        </section>
      </div>
    )
  }
}
