import React from 'react';
import ReactDOM from 'react-dom';

import MessageBox from './MessageBox';

function next(props) {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div');

    document.body.appendChild(div);

    if (props.lockScroll != false) {
      document.body.style.setProperty('overflow', 'hidden');
    }

    ReactDOM.render(<MessageBox onClose={() => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
      document.body.style.removeProperty('overflow');

      if (props.onClose instanceof Function) {
        props.onClose();
      }
    }} promise={{ resolve, reject }} {...props} />, div);
  });
}

function alert(message, title, props) {
  if (typeof title === 'object') {
    props = title;
  }

  props = Object.assign({ title, message,
    modal: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, props);

  return next(props);
}

function confirm(message, title, props) {
  if (typeof title === 'object') {
    props = title;
  }

  props = Object.assign({ title, message,
    modal: 'confirm',
    showCancelButton: true
  }, props);

  return next(props);
}

function prompt() {

}

function msgbox(props) {
  return next(props);
}

export default {
  alert,
  confirm,
  prompt,
  msgbox
}
