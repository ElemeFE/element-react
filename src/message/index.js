import React from 'react';
import ReactDOM from 'react-dom';

import Toast from './toast';

export default function Message(props = {}, type) {
  const div = document.createElement('div');

  document.body.appendChild(div);

  if (typeof props === 'string') {
    props = {
      message: props
    };
  }

  if (type) {
    props.type = type;
  }

  const component = React.createElement(Toast, Object.assign(props, {
    onClose: (...args) => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);

      if (props.onClose instanceof Function) {
        props.onClose.apply(this, args);
      }
    }
  }));

  ReactDOM.render(component, div);
}

/* eslint-disable */
['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = (options = {}) => {
    return Message(options, type);
  };
});
/* eslint-enable */
