import React from 'react';
import ReactDOM from 'react-dom';

import Toast from './Toast';

export default function Message(props = {}, type) {
  const div = document.createElement('div');
  const messageBox = document.getElementsByClassName('el-message-content')[0];
  if (messageBox) {
    messageBox.appendChild(div);
    document.body.appendChild(messageBox);
  } else {
    const messageBox = document.createElement('div');
    messageBox.className = "el-message-content";
    messageBox.appendChild(div);
    document.body.appendChild(messageBox);
  }

  if (typeof props === 'string' || React.isValidElement(props)) {
    props = {
      message: props
    };
  }

  if (type) {
    props.type = type;
  }

  const component = React.createElement(Toast, Object.assign(props, {
    willUnmount: () => {
      const messageBox = document.getElementsByClassName('el-message-content')[0];
      ReactDOM.unmountComponentAtNode(div);
      messageBox.removeChild(div);

      if (props.onClose instanceof Function) {
        props.onClose();
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
