import React from 'react';
import ReactDOM from 'react-dom';

import Notification from './Notification';

const className = '.el-notification';

export default function NotificationCenter(props = {}, type) {
  const div = document.createElement('div');

  document.body.appendChild(div);

  if (typeof props === 'string' || React.isValidElement(props)) {
    props = {
      message: props
    };
  }

  if (type) {
    props.type = type;
  }

  if (!props.offset) {
    props.offset = 0
  }

  const instances = document.querySelectorAll(className)

  const lastInstance = instances[instances.length - 1];

  props.top = (lastInstance ? (parseInt(lastInstance.style.top) + lastInstance.offsetHeight) : props.offset) + 16;

  const element = React.createElement(Notification, Object.assign({}, props, {
    willUnmount(height, top) {
      setTimeout(() => document.body.removeChild(div));
      requestAnimationFrame(() => {
        const instances = document.querySelectorAll(className);
        const len = instances.length;
        for (let i = 0; i < len; i++) {
          const element = instances[i];
          const elementTop = parseInt(element.style.top);
          if (elementTop > top) {
            element.style.top = `${elementTop - height - 16}px`;
          }
        }
      })
    }
  }));

  ReactDOM.render(element, div);
}

/* eslint-disable */
['success', 'warning', 'info', 'error'].forEach(type => {
  NotificationCenter[type] = (options = {}) => NotificationCenter(options, type);
});
/* eslint-enable */
