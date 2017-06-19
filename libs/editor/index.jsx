import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CodeMirror from 'codemirror'

import 'codemirror/lib/codemirror.css'
import './style.scss'

import { options, requireAddons } from './config'

export default class Editor extends Component {
  componentWillMount() {
    requireAddons()
  }
  
  componentDidMount() {
    const { onChange, readOnly, value } = this.props

    this.cm = CodeMirror(this.editor, Object.assign(options, { readOnly }))
    this.cm.setValue(value)
    this.cm.on('changes', cm => {
      onChange && onChange(cm.getValue())
    })
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
