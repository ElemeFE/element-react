import React from 'react';
import renderer from 'react-test-renderer';

import { View } from '../../../libs'


test('View with one child', () => {
  const component = renderer.create(
    <View>
      <div style={{color: 'white'}} className="white">Children</div>
    </View>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('View with one child not show', () => {
  const component = renderer.create(
    <View show={false}>
       <div style={{color: 'white'}} className="white">Children</div>
    </View>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('View with more than one children', () => {
  const component = renderer.create(
    <View>
      <span
        style={{color: 'white'}}
        className="white"
      >
        <div>Children 1</div>
        <div>Children 2</div>
      </span>
    </View>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('View with more than one children not show', () => {
  const component = renderer.create(
    <View show={false}>
      <span
        style={{color: 'white'}}
        className="white"
      >
        <div>Children 1</div>
        <div>Children 2</div>
      </span>
    </View>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('View with custom wrap component div', () => {
  const component = renderer.create(
    <View>
      <div
        style={{color: 'white'}}
        className="white"
      >
        <div>Children 1</div>
        <div>Children 2</div>
      </div>
    </View>
  );
  expect(component.toJSON()).toMatchSnapshot();
});