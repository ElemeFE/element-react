import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss';
import '../../themes/default/index.css';

import Alert from './alert';
import Layout from './layout';
import Button from './button';
import Radio from './radio';
import Card from './card';

const pages = {
  layout: { title: 'Layout 布局', component: Layout },
  button: { title: 'Button 按钮', component: Button },
  radio: { title: 'Radio 单选框', component: Radio },
  alert: { title: 'Alert 警告', component: Alert },
  card: { title: 'Card 卡片', component: Card }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'card'
    };
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>Element-React</h1>
        </header>
        <div className="content">
          <nav className="menu">
            <ul>
              {
                Object.keys(pages).map(page => {
                  return (
                    <li key={page} className="menu-item" onClick={this.onSelect.bind(this, page)}>{pages[page].title}</li>
                  )
                })
              }
            </ul>
          </nav>
          <div className="demo">
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
