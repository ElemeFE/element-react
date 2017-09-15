import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export class MountBody extends Component {
  componentWillMount() {
    let c = React.cloneElement(this.props.children)
    this.tnode = document.createElement('div')
    document.body.appendChild(this.tnode)
    ReactDOM.render(c, this.tnode)
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.tnode)
    document.body.removeChild(this.tnode)
  }

  getMountNode(){
    return this.tnode 
  }

  render(){
    return null
  }
}