import React from 'react';
import ReactDOM from 'react-dom';

import Notification from './Notification';

export default function NotificationCenter(props = {}, type) {
  const div = document.createElement('div'), className = 'el-notification';

  document.body.appendChild(div);

  if (typeof props === 'string') {
    props = {
      message: props
    };
  }

  if (type) {
    props.type = type;
  }

  const instances = document.getElementsByClassName(className);

  props.top = props.offset || 0;

  for (let i = 0, len = instances.length; i < len; i++) {
    props.top += instances[i].offsetHeight + 16;
  }

  props.top += 16;

  const component = React.createElement(Notification, Object.assign({}, props, {
    willUnmount: () => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);

      setTimeout(() => {
        const instances = document.querySelectorAll('.el-notification');

        for (let i = 0, len = instances.length; i < len; i++) {
          const element = instances[i];

          if (element.offsetTop > props.offsetHeight) {
            element.style.top = `${element.offsetTop - props.offsetHeight - 16}px`;
          }
        }
      })

      if (props.onClose instanceof Function) {
        props.onClose();
      }
    }
  }));

  ReactDOM.render(component, div, () => {
    setTimeout(() => {
      props.offsetHeight = div.getElementsByClassName(className)[0].offsetHeight;
    });
  });
}

/* eslint-disable */
['success', 'warning', 'info', 'error'].forEach(type => {
  NotificationCenter[type] = (options = {}) => {
    return NotificationCenter(options, type);
  };
});
/* eslint-enable */
