import React from 'react';
import classnames from 'classnames';

export default class Component extends React.Component {
  classNames(...args) {
    return classnames(args);
  }
}
