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
      const div = document.getElementById(id);

      ReactDOM.unmountComponentAtNode(div);
      ReactDOM.render(new Function('React', this.props.component, component).call(this.props.scope, React, Element[this.props.component]), div);
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

    const html = marked(this.props.children.replace(/:::\s?demo ([^:::]+):::/g, (match, p1, offset) => {
      return p1.replace(/(.+)\n([^]+)/, (match, p1, p2) => {
        const id = offset.toString(36), code = p2.match(/```.*\n([^]+)```/)[1], component = transform(`<div>${code}</div>`, {
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
  scope: PropTypes.any
}
/* eslint-enable */
