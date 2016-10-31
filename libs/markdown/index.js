import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';
import highlight from 'highlight.js';
import marked from 'marked';

export default class Markdown extends Component {
  constructor(props) {
    super(props);

    this.components = new Map;
  }

  componentDidMount() {
    this.renderSource();
  }

  componentDidUpdate() {
    this.renderSource();
  }

  renderSource() {
    const Element = require('../../src');

    for (const [id, component] of this.components) {
      const div = document.getElementById(id), args = ['context', 'React'], argv = [this.props.context, React];

      for (const key in Element) {
        args.push(key);
        argv.push(Element[key]);
      }

      args.push(component);

      if (div instanceof HTMLElement) {
        ReactDOM.unmountComponentAtNode(div);
      }

      ReactDOM.render(new Function(...args).apply(null, argv), div);
    }
  }

  render() {
    const renderer = new marked.Renderer();

    renderer.code = (text) => {
      return text
    }

    marked.setOptions({
      highlight: code => {
        return highlight.highlightAuto(code).value
      }
    });

    const html = marked(this.props.children.replace(/:::\s?demo ([^]+?):::/g, (match, p1, offset) => {
      return p1.replace(/(.+)\n([^]+)/, (match, p1, p2) => {
        const id = offset.toString(36);
        const matched = p2.match(/```(.*)\n([^]+)```/);
        const lang = matched[1], code = matched[2].replace(/this/g, 'context');

        let transformTarget = null
        if (lang === 'javascript'){
          transformTarget = code
        }else{
          transformTarget = `<div>${code}</div>`
        }

        const component = transform(transformTarget, {
          presets: ['es2015', 'react']
        }).code.replace(/React.createElement/, 'return React.createElement');

        this.components.set(id, component);

        return `
          <div class="demo-block demo-box demo-${this.props.component.toLowerCase()}">
            <div class="source" id="${id}"></div>
            <div class="meta">
              <div class="description">${marked(p1)}</div>
              <div class="highlight">${marked(p2)}</div>
            </div>
          </div>
        `
      })
    }), { renderer });

    /* eslint-disable */
    return (
      <div dangerouslySetInnerHTML={{
        __html: html
      }} />
    )
    /* eslint-enable */
  }
}

/* eslint-disable */
Markdown.propTypes = {
  component: PropTypes.string.isRequired,
  context: PropTypes.any
}
/* eslint-enable */
