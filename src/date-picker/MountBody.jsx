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

  contains(evt){
    let parent = this.tnode.childNodes[0]
    let rect = parent.getBoundingClientRect()
    let isContain = (evt.clientX >= rect.left && evt.clientX <= rect.right) && (evt.clientY >= rect.top && evt.clientY <= rect.bottom )
    return isContain
  }

  render(){
    return null
  }
}