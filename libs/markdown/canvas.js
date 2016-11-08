import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';
import marked from 'marked';

import highlight from '../../vendor/highlight';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBlock: false,
    };
  }

  componentWillMount() {
    marked.setOptions({
      highlight: code => {
        return highlight.highlightAuto(code).value;
      }
    });
  }

  componentDidMount() {
    this.renderSource();
  }

  componentDidUpdate() {
    this.renderSource();
  }

  getHeight() {
    return Math.max(this.refs.highlight.offsetHeight, this.refs.description && this.refs.description.offsetHeight || 0);
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock
    });
  }

  renderSource() {
    if (this.shouldUpdate) {
      const div = this.refs.source;

      if (div instanceof HTMLElement) {
        require(['../../src'], Element => {
          const args = ['context', 'React'], argv = [this.props.context, React];

          for (const key in Element) {
            args.push(key);
            argv.push(Element[key]);
          }

          args.push(this.component);

          ReactDOM.unmountComponentAtNode(div);
          ReactDOM.render(new Function(...args).apply(null, argv), div);
        });
      }
    }

    delete this.shouldUpdate;
  }

  render() {
    const name = this.props.component.toLowerCase();
    const document = this.props.children.match(/([^]*)\n?(```[^]+```)/);
    const source = document[2].match(/```(.*)\n([^]+)```/);
    const description = marked(document[1]);
    const highlight = marked(document[2]);

    let code = source[2];

    if (!/^(js|javascript|jsfunc)/i.test(source[1])) {
      code = `<div>${source[2]}</div>`
    }
    let component
    // hacking through restrictions, so i can create React class in markdown.
    // see time-picker.md demo
    if (/^jsfunc/i.test(source[1])){
      code = `
        __rtn = (function() {
          ${code}
        })();
      `
      component = transform(code, {
        presets: ['es2015', 'react']
      }).code.replace('__rtn = ', 'return ')
    }else{
      component = transform(code.replace(/this/g, 'context'), {
        presets: ['es2015', 'react']
      }).code.replace(/React.createElement/, 'return React.createElement');
    }

    this.shouldUpdate = component != this.component || this.component === undefined;
    this.component = component;

    return (
      <div className={`demo-block demo-box demo-${name}`}>
        <div className="source" ref="source"></div>
        <div className="meta" style={{
          height: this.state.showBlock ? this.getHeight() : 0
        }}>
          {description && <div ref="description" className="description" dangerouslySetInnerHTML={{ __html: description }}></div>}
          <div ref="highlight" className="highlight" dangerouslySetInnerHTML={{ __html: highlight }}></div>
        </div>
        {
          this.state.showBlock ?
            <div className="demo-block-control" onClick={this.blockControl.bind(this)}>
              <i className="el-icon-caret-top"></i><span>隐藏代码</span>
            </div>
          :
          <div className="demo-block-control" onClick={this.blockControl.bind(this)}>
            <i className="el-icon-caret-bottom"></i><span>显示代码</span>
          </div>
        }
      </div>
    )
  }
}

/* eslint-disable */
Canvas.propTypes = {
  component: PropTypes.string.isRequired,
  context: PropTypes.any
}
/* eslint-enable */
