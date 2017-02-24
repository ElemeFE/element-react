import React from 'react';
import { Component, PropTypes } from '../../libs';
import Cover from './Cover';

export default class IframeUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragOver: false,
      file: null,
      disabled: false,
      frameName: 'frame-' + Date.now(),
    }
  }

  componentDidMount() {
    const { action, onSuccess, onError } = this.props;
    const { file } = this.state;
    window.addEventListener('message', event => {
      const { origin } = new URL(action);
      if (event.origin !== origin) return false;
      const response = event.data;
      if (response.result === 'success') {
        onSuccess(response, file);
      } else if (response.result === 'failed') {
        onError(response, file);
      }
    }, false);
  }

  onload() {
    this.setState({ disabled: false });
  }

  onDrop(e) {
    e.preventDefault();
    this.setState({ dragOver: false });
    this.uploadFiles(e.dataTransfer.files); // TODO
  }

  handleChange(e) {
    const file = e.target.value;
    if (file) {
      this.uploadFiles(file);
    }
  }

  uploadFiles(file) {
    if (this.state.disabled) return;
    this.setState({ disabled: false, file });
    this.props.onStart && this.props.onStart(file);
    const formNode = this.refs.form;
    const dataSpan = this.refs.data;
    let data = this.props.data;
    if (typeof data === 'function') {
      data = data(file);
    }
    const inputs = Object.keys(data).map(key => `<input name="${key}" value="${data[key]}"/>`);

    dataSpan.innerHTML = inputs.join('');
    formNode.submit();
    dataSpan.innerHTML = '';
  }

  handleClick() {
    if (!this.state.disabled) {
      this.refs.input.click();
    }
  }

  handleDragover(e) {
    e.preventDefault();
    this.setState({ onDrop: true });
  }

  handleDragleave(e) {
    e.preventDefault();
    this.setState({ onDrop: false });
  }

  render() {
    const { drag, action, name, accept, listType } = this.props;
    const { frameName } = this.state;
    const classes = this.classNames({
      'el-upload': true,
      [`el-upload--${listType}`]: true,
    });
    return (
      <div
        className={classes}
        onClick={() => this.handleClick()}
        onDrop={e => this.onDrop(e)}
        onDragOver={e => this.handleDragover(e)}
        onDragLeave={e => this.handleDragleave(e)}
      >
        <iframe
          onLoad={() => this.onload()}
          ref="iframe"
          name={frameName}
        >
        </iframe>
        <form ref="form" action={action} target={frameName} encType="multipart/form-data" method="POST">
          <input
            className="el-upload__input"
            type="file"
            ref="input"
            name={name}
            onChange={e => this.handleChange(e)}
            accept={accept}>
          </input>
          <input type="hidden" name="documentDomain" value={document.domain} />
          <span ref="data"></span>
        </form>
        {drag ? <Cover onFile={file => this.uploadFiles(file)}>{this.props.children}</Cover> : this.props.children}
      </div>
    );
  }
}

IframeUpload.propTypes = {
  drag: PropTypes.bool,
  data: PropTypes.object,
  action: PropTypes.string.isRequired,
  name: PropTypes.string,
  accept: PropTypes.string,
  onStart: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  listType: PropTypes.string,
}

IframeUpload.defaultProps = {
  name: 'file',
}
