import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'codemirror/lib/codemirror.css'
import { options, requireAddons } from './codemirrorConfig'
import './style.scss'

export default class Editor extends Component {
  componentDidMount() {
    const { onChange, readOnly, value } = this.props

    requireAddons()
    const Codemirror = require('codemirror')
    this.cm = Codemirror(this.editor, Object.assign(options, { readOnly }))
    this.cm.on('changes', cm => {
      onChange && onChange(cm.getValue())
    })
    this.cm.setValue(value)
  }

  render() {
    return <div className="editor" ref={ref => (this.editor = ref)} />
  }
}

Editor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  readOnly: PropTypes.bool
}
