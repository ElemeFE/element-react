import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import Document from './document';

export default class Markdown extends Component {
  constructor(props) {
    super(props);

    this.components = new Map;
  }

  componentDidMount() {
    this.renderDOM();
  }

  componentDidUpdate() {
    this.renderDOM();
  }

  renderDOM() {
    for (const [id, component] of this.components) {
      ReactDOM.render(component, document.getElementById(id))
    }
  }

  render() {
    const html = marked(this.props.children.replace(/:::\s?demo\s?([^]+?):::/g, (match, p1, offset) => {
      const id = offset.toString(36);

      this.components.set(id, React.createElement(Document, Object.assign({
        text: p1
      }, this.props)));

      return `<div id=${id}></div>`;
    }));

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
