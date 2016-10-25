import React from 'react';
import ReactDOM from 'react-dom';

import Notification from './notification';

export default function Message(props = {}, type) {
  const div = document.createElement('div');

  if (typeof props === 'string') {
    props = {
      message: props
    };
  }

  if (type) {
    props.type = type;
  }

  ReactDOM.render(<Notification onClose={(...args) => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);

    if (props.onClose instanceof Function) {
      props.onClose.apply(this, args);
    }
  }} {...props} />, div);

  document.body.appendChild(div);
}

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = (options = {}) => {
    return Message(options, type);
  };
});
