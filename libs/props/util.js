import { PropTypes } from 'react';

export function createPropType(propType) {
  // Chainable isRequired and more
  propType.isRequired = PropTypes.any.isRequired;

  return propType;
}
