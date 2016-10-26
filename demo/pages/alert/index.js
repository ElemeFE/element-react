import './style.scss';

import React from 'react';
import { Alert } from '../../../src';

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
        <section className="demo-section">
          <div className="demo-header">
            <h3>带有 icon</h3>
            <p>表示某种状态时提升可读性。</p>
          </div>
          <div className="demo-content demo-alert">
            <Alert title="成功提示的文案" type="success" showIcon={true} />
            <Alert title="消息提示的文案" type="info" showIcon={true} />
            <Alert title="警告提示的文案" type="warning" showIcon={true} />
            <Alert title="错误提示的文案" type="error" showIcon={true} />
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>带有辅助性文字介绍</h3>
            <p>包含标题和内容，解释更详细的警告。</p>
          </div>
          <div className="demo-content demo-alert">
            <Alert title="带辅助性文字介绍" type="success" description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……" />
          </div>
        </section>
        <section className="demo-section">
          <div className="demo-header">
            <h3>带有 icon 和辅助性文字介绍</h3>
          </div>
          <div className="demo-content demo-alert">
            <Alert title="成功提示的文案" type="success" description="文字说明文字说明文字说明文字说明文字说明文字说明" showIcon={true} />
            <Alert title="消息提示的文案" type="info" description="文字说明文字说明文字说明文字说明文字说明文字说明" showIcon={true} />
            <Alert title="警告提示的文案" type="warning" description="文字说明文字说明文字说明文字说明文字说明文字说明" showIcon={true} />
            <Alert title="错误提示的文案" type="error" description="文字说明文字说明文字说明文字说明文字说明文字说明" showIcon={true} />
          </div>
        </section>
      </div>
    )
  }
}
