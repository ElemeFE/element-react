import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';
import highlight from 'highlight.js';
import marked from 'marked';

export default class Document extends Component {
  constructor(props) {
    super(props);

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

  renderSource() {
    const Element = require('../../src');

    const div = this.refs.source;
    const args = ['context', 'React'], argv = [this.props.context, React];

    for (const key in Element) {
      args.push(key);
      argv.push(Element[key]);
    }

    args.push(this.component);

    if (div instanceof HTMLElement) {
      ReactDOM.unmountComponentAtNode(div);
    }

    ReactDOM.render(new Function(...args).apply(null, argv), div);
  }

  render() {
    const document = this.props.text.match(/([^]*)\n?(```[^]+```)/);
    const source = document[2].match(/```.*\n([^]+)```/);
    const description = marked(document[1]);
    const highlight = marked(document[2]);

    this.component = transform(`<div>${source[1].replace(/this/g, 'context')}</div>`, {
      presets: ['es2015', 'react']
    }).code.replace(/React.createElement/, 'return React.createElement');

    return (
      <div className={`demo-block demo-box demo-${this.props.component.toLowerCase()}`}>
        <div className="source" ref="source"></div>
        <div className="meta">
          <div className="highlight" dangerouslySetInnerHTML={{ __html: highlight }}></div>
          { description && <div className="description" dangerouslySetInnerHTML={{ __html: description }}></div> }
        </div>
      </div>
    )
  }
}

/* eslint-disable */
Document.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  context: PropTypes.any
}
/* eslint-enable */
