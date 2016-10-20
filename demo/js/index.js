import React from 'react';
import ReactDOM from 'react-dom';

import '../css/style.scss';
import '../../themes/default/index.css';

import Alert from './alert';
import Layout from './layout';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'layout'
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
      default:
        break;
    }
  }

  onSelect(type) {
    this.setState({ type })
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
