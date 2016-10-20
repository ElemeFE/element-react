import React from 'react';

export default class Component extends React.Component {
  computedClassName(...args) {
    return args.filter(className => {
      return typeof className === 'string';
    }).join(' ');
  }
}
