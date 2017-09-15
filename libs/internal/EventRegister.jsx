import PropTypes from 'prop-types';
import { Component } from 'react';
import { require_condition } from '../utils';

let windowKey = Symbol.for("er_register_map")
const registerMap = window[windowKey] = window[windowKey] || {
  ids: {},
}

const not_null = (t) => (t != null)

const hasRegistered = ({ id }) => {
  return not_null(registerMap.ids[id])
}

const cleanRegister = (props) => {
  const { target, eventName, func, isUseCapture, id } = props
  if (hasRegistered(props)) {
    target.removeEventListener(eventName, func, isUseCapture);
    delete registerMap.ids[id]
  }
}

const doRegister = (props) => {
  let { id, eventName, func, isUseCapture } = props
  registerMap.ids[id] = id
  document.addEventListener(eventName, func, isUseCapture)
}

/**
 * register events that hooked up react lifecycle
 */
export default class EventRegister extends Component {

  componentDidMount() {
    let { eventName, id } = this.props
    eventName = eventName.toLowerCase()
    eventName = /^on/.test(eventName) ? eventName.substring(2) : eventName
    this.cached = Object.assign({}, this.props, { eventName })

    require_condition(typeof id === 'string', 'id prop is required')
    require_condition(!hasRegistered(this.cached), `id: ${id} has been registered`)

    doRegister(this.cached)
  }

  componentWillUnmount() {
    cleanRegister(this.cached)
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
