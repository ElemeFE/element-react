import React from 'react';
import ReactDOM from 'react-dom';

import 'element-ui/lib/theme-default/index.css';

import './style/highlight.css';
import './style/base.scss';

import Alert from './alert';
import Layout from './layout';
import Button from './button';
import Radio from './radio';
import Card from './card';
import Message from './message';
import MessageBox from './message-box';
import Notification from './notification';
import Loading from './loading';
import Dialog from './dialog';
import Progress from './progress';
import Badge from './badge';
import Tree from './tree';
import Tooltip from './tooltip';
import Input from './input';
import Icon from './icon';
import Menu from './menu';
import Steps from './steps';
import Typography from './typography';
import Color from './color';
import Breadcrumb from './breadcrumb';
import InputNumber from './input-number';
import Checkbox from './checkbox';
import Slider from './slider';
import Tag from './tag';

// pages是有序的Object, 会影响到左侧的菜单顺序.
const pages = {
  'Basic': {
    'layout': { title: 'Layout 布局', component: Layout },
    'color': { title: 'Color 色彩', component: Color },
    'typography': { title: 'Typography 字体', component: Typography },
    'icon': { title: 'Icon 图标', component: Icon },
    'button': { title: 'Button 按钮', component: Button },
  },
  'Form': {
    'radio': { title: 'Radio 单选框', component: Radio },
    'checkbox': { title: 'Checkbox 多选框', component: Checkbox },
    'input': { title: 'Input 输入框', component: Input },
    'input-number': { title: 'Input Number 计数器', component: InputNumber },
    'slider': { title: 'Slider 滑块', component: Slider },
  },
  'Data': {
    'tag': { title: 'Tag 标签', component: Tag },
    'progress': { title: 'Progress 进度条', component: Progress },
    'tree': { title: 'Tree 树形控件', component: Tree },
    'badge': { title: 'Badge 标记', component: Badge },
  },
  'Notice': {
    'alert': { title: 'Alert 警告', component: Alert },
    'loading': { title: 'Loading 加载', component: Loading },
    'message': { title: 'Message 消息提示', component: Message },
    'message-box': { title: 'Message Box 弹框', component: MessageBox },
    'notification': { title: 'Notification 通知', component: Notification },
  },
  'Nav': {
    'menu': { title: 'NavMenu 导航菜单', component: Menu },
    'breadcrumb': { title: 'Breadcrumb 面包屑', component: Breadcrumb },
    'steps': { title: 'Steps 步骤', component: Steps },
  },
  'Others': {
    'dialog': { title: 'Dialog 对话框', component: Dialog },
    'tooltip': { title: 'Tooltip 文字提示', component: Tooltip },
    'card': { title: 'Card 卡片', component: Card }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.getPage() || 'layout' // Do not change this line
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", e => {
      this.setState({
        page: this.getPage()
      });

      window.scrollTo(0, 0);
    }, false);
  }

  getPage() {
    return location.hash.substr(1);
  }

  getComponent(page) {
    this.components = this.components || Object.assign.apply(this, [{}].concat(Object.keys(pages).map(group => {
      return pages[group]
    })));

    return this.components[page].component;
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>Element-React</h1>
        </header>
        <div className="main">
          <nav className="side-nav">
            <ul>
              <li className="nav-item">
                <a>基础组件</a>
                {
                  Object.keys(pages).map(group => {
                    return (
                      <div className="nav-group" key={group}>
                        <div className="nav-group__title">{group}</div>
                        <ul className="pure-menu-list">
                          {
                            Object.keys(pages[group]).map(page => {
                              return (
                                <li key={page} className="nav-item">
                                  <a href={`#${page}`}>{pages[group][page].title}</a>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  })
                }
              </li>
            </ul>
          </nav>
          <div className="content">
            {
              React.createElement(this.getComponent(this.state.page))
            }
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
