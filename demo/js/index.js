import React from 'react';
import ReactDOM from 'react-dom';

import '../css/style.scss';
import '../../themes/default/index.css';

import Alert from './alert';
import Layout from './layout';
import Button from './button';
import Radio from './radio';
import Card from './card';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'alert'
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
              <li className="menu-item" onClick={this.onSelect.bind(this, 'alert')}>Alert 警告</li>
              <li className="menu-item" onClick={this.onSelect.bind(this, 'layout')}>Layout 布局</li>
              <li className="menu-item" onClick={this.onSelect.bind(this, 'button')}>Button 按钮</li>
              <li className="menu-item" onClick={this.onSelect.bind(this, 'radio')}>Radio 单选框</li>
              <li className="menu-item" onClick={this.onSelect.bind(this, 'card')}>Card 卡片</li>
            </ul>
          </nav>
          <div className="demo">{this.getDemo()}</div>
        </div>
      </div>
    )
  }

  getDemo() {
    switch (this.state.type) {
      case 'alert':
        return <Alert />
      case 'layout':
        return <Layout />
      case 'button':
        return <Button />
      case 'radio':
        return <Radio />
      case 'card':
        return <Card />
      default:
        break;
    }
  }

  onSelect(type) {
    this.setState({ type })
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
