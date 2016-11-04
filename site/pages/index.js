import React from 'react';
import ReactDOM from 'react-dom';

import pages from '../locales/zh-CN/nav';

import 'element-ui/lib/theme-default/index.css';

import './style/highlight.css';
import './style/base.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.getPage() || 'layout'
    };
  }

  componentWillMount() {
    this.renderPage();
  }

  componentDidMount() {
    window.addEventListener("hashchange", e => {
      window.scrollTo(0, 0);

      this.setState({
        page: this.getPage()
      }, () => {
        this.renderPage();
      });
    }, false);
  }

  getPage() {
    return location.hash.substr(1);
  }

  setComponent(component) {
    this.setState({ component });
  }

  renderPage() {
    switch (this.state.page) {
      case 'layout':
        require([`./layout`], this.setComponent.bind(this))
        break;
      case 'color':
        require([`./color`], this.setComponent.bind(this));
        break;
      case 'typography':
        require([`./typography`], this.setComponent.bind(this));
        break;
      case 'icon':
        require([`./icon`], this.setComponent.bind(this));
        break;
      case 'button':
        require([`./button`], this.setComponent.bind(this));
        break;
      case 'radio':
        require([`./radio`], this.setComponent.bind(this));
        break;
      case 'checkbox':
        require([`./checkbox`], this.setComponent.bind(this));
        break;
      case 'input':
        require([`./input`], this.setComponent.bind(this));
        break;
      case 'input-number':
        require([`./input-number`], this.setComponent.bind(this));
        break;
      case 'slider':
        require([`./slider`], this.setComponent.bind(this));
        break;
      case 'form':
        require([`./form`], this.setComponent.bind(this))
        break;
      case 'progress':
        require([`./progress`], this.setComponent.bind(this));
        break;
      case 'tree':
        require([`./tree`], this.setComponent.bind(this));
        break;
      case 'badge':
        require([`./badge`], this.setComponent.bind(this));
        break;
      case 'alert':
        require([`./alert`], this.setComponent.bind(this));
        break;
      case 'loading':
        require([`./loading`], this.setComponent.bind(this));
        break;
      case 'message':
        require([`./message`], this.setComponent.bind(this));
        break;
      case 'message-box':
        require([`./message-box`], this.setComponent.bind(this));
        break;
      case 'notification':
        require([`./notification`], this.setComponent.bind(this));
        break;
      case 'menu':
        require([`./menu`], this.setComponent.bind(this));
        break;
      case 'breadcrumb':
        require([`./breadcrumb`], this.setComponent.bind(this));
        break;
      case 'steps':
        require([`./steps`], this.setComponent.bind(this));
        break;
      case 'dialog':
        require([`./dialog`], this.setComponent.bind(this));
        break;
      case 'tooltip':
        require([`./tooltip`], this.setComponent.bind(this));
        break;
      case 'card':
        require([`./card`], this.setComponent.bind(this));
        break;
      default:
        break;
    }
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
              this.state.component && React.createElement(this.state.component.default)
            }
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
