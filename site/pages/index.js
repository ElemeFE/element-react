import React from 'react';
import ReactDOM from 'react-dom';

import '../../themes/default/index.css';
import './style/highlight.css';
import './style/base.scss';

import Alert from './alert';
import Layout from './layout';
import Button from './button';
import Radio from './radio';
import Card from './card';
import Message from './message';
import MessageBox from './message-box';
import Loading from './loading';
import Dialog from './dialog';
import Progress from './progress';
import Badge from './badge';
import Tree from './tree'

// pages是有序的Object, 会影响到左侧的菜单顺序.
const pages = {
  layout: { title: 'Layout 布局', component: Layout },
  button: { title: 'Button 按钮', component: Button },
  radio: { title: 'Radio 单选框', component: Radio },
  progress: { title: 'Progress 进度条', component: Progress },
  tree: { title: 'Tree 树形控件', component: Tree },
  badge: { title: 'Badge 标记', component: Badge },
  alert: { title: 'Alert 警告', component: Alert },
  loading: { title: 'Loading 加载', component: Loading },
  message: { title: 'Message 消息提示', component: Message },
  messageBox: { title: 'Message Box 弹框', component: MessageBox },
  dialog: { title: 'Dialog 对话框', component: Dialog },
  card: { title: 'Card 卡片', component: Card }
};

const HASH_OFFSET = 1
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: location.hash.substr(HASH_OFFSET) || 'layout' // Do not change this line
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", e => {
      this.setState({
        page: location.hash.substr(HASH_OFFSET)
      })
    }, false);
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>Element-React</h1>
        </header>
        <div className="main">
          <nav className="menu">
            <ul>
              {
                Object.keys(pages).map(page => {
                  return (
                    <li key={page} className="menu-item" onClick={this.onSelect.bind(this, page)}>
                      <a href={`#${page}`}>{pages[page].title}</a>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
          <div className="content">
            {
              React.createElement(pages[this.state.page].component)
            }
          </div>
        </div>
      </div>
    )
  }

  onSelect(page) {
    this.setState({ page })
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
