import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import Canvas from './canvas';

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
      const div = document.getElementById(id);

      if (div instanceof HTMLElement) {
        ReactDOM.unmountComponentAtNode(div);
        ReactDOM.render(component, div);
      }
    }
  }

  render() {
    if (typeof this.props.children === 'string') {
      this.components.clear();

      const html = marked(this.props.children.replace(/:::\s?demo\s?([^]+?):::/g, (match, p1, offset) => {
        const id = offset.toString(36);

        this.components.set(id, React.createElement(Canvas, this.props, p1));

        return `<div id=${id}></div>`;
      }));

      /* eslint-disable */
      return (
        <div dangerouslySetInnerHTML={{
          __html: html
        }} />
      )
      /* eslint-enable */
    } else {
      return <span />
    }
  }
}

/* eslint-disable */
Markdown.propTypes = {
  component: PropTypes.string.isRequired,
  context: PropTypes.any
}
/* eslint-enable */
