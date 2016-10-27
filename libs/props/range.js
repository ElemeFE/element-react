import { createPropType } from './util';

module.exports = (min, max) => {
  return createPropType((props, propName, componentName) => {
    const value = props[propName];

    if (value < min || value > max) {
      return new Error(`Invalid prop ${propName} of ${componentName}, should between ${min} and ${max}.`);
    }
  });
}
