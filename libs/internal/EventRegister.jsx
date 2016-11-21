import { Component, PropTypes } from 'react';
import { require_condition } from '../utils';

const registerMap = window.__registerMap = window.__registerMap || {
  ids: {},
}

const not_null = (t) => (t != null)

const hasRegistered = ({id}) => {
  return not_null(registerMap.ids[id])
}

const cleanRegister = ({id}) => {
  delete registerMap.ids[id]
}

const doRegister = ({id}) => {
  registerMap.ids[id] = id
}

/**
 * register events that hooked up react lifecycle
 */
export default class EventRegister extends Component {

  componentDidMount() {
    let {target, eventName, func, isUseCapture, id} = this.props
    eventName = eventName.toLowerCase()
    eventName = /^on/.test(eventName) ? eventName.substring(2) : eventName
    this.cached = Object.assign({}, this.props, { eventName })

    require_condition(typeof id === 'string', 'id prop is required')
    require_condition(!hasRegistered(this.cached), `id: ${id} has been registered`)

    target.addEventListener(eventName, func, isUseCapture)
    doRegister(this.cached)
  }

  componentWillUnmount() {
    const {target, eventName, func, isUseCapture} = this.cached
    if (hasRegistered(this.cached)) {
      target.removeEventListener(eventName, func, isUseCapture)
      cleanRegister(this.cached)
    }
  }

  render() {
    return null
  }
}


EventRegister.propTypes = {
  id: PropTypes.string.isRequired,
  target: PropTypes.object.isRequired,
  eventName: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  isUseCapture: PropTypes.bool
};

