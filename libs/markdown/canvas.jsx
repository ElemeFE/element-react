import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import { transform } from 'babel-standalone'
import Editor from '../editor'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.playerId = `player-${parseInt(Math.random() * 1e9)}`
    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/)
    this.description = marked(this.document[1])
    this.source = this.document[2].match(/```(.*)\n([^]+)```/)

    this.state = {
      showBlock: false
    }
  }

  componentDidMount() {
    this.renderSource(this.source[2])
  }

  get height() {
    return Math.max(
      this.refs.editor.offsetHeight,
      (this.refs.description && this.refs.description.offsetHeight) || 0
    )
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock
    })
  }

  renderSource(value) {
    import('../../src')
      .then(Element => {
        const args = ['context', 'React', 'ReactDOM']
        const argv = [this, React, ReactDOM]

        for (const key in Element) {
          args.push(key)
          argv.push(Element[key])
        }

        return {
          args,
          argv
        }
      })
      .then(({ args, argv }) => {
        const code = transform(
          `
        class Demo extends React.Component {
          ${value}
        }
        ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.playerId}'))
      `,
          {
            presets: ['es2015', 'react']
          }
        ).code

        args.push(code)

        new Function(...args).apply(null, argv)

        this.source[2] = value
      })
      .catch(e => console.log(e))
  }

  render() {
    return (
      <div className={`demo-block demo-box demo-${this.props.name}`}>
        <div className="source" id={this.playerId} />
        <div
          className="meta"
          style={{
            height: this.state.showBlock ? this.height : 0
          }}
        >
          {this.description &&
            <div
              ref="description"
              className="description"
              dangerouslySetInnerHTML={{ __html: this.description }}
            />}
          <div ref="editor">
            <Editor
              value={this.source[2]}
              onChange={code => this.renderSource(code)}
            />
          </div>

        </div>
        {this.state.showBlock
          ? <div
              className="demo-block-control"
              onClick={this.blockControl.bind(this)}
            >
              <i className="el-icon-caret-top" />
              <span>{this.props.locale.hide}</span>
            </div>
          : <div
              className="demo-block-control"
              onClick={this.blockControl.bind(this)}
            >
              <i className="el-icon-caret-bottom" />
              <span>{this.props.locale.show}</span>
            </div>}
      </div>
    )
  }
}

Canvas.propTypes = {
  locale: PropTypes.object
}

Canvas.defaultProps = {
  locale: {}
}
