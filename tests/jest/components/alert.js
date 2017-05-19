import React from 'react';
import renderer from 'react-test-renderer';

import { Alert } from '../../../src';

test('Basic usage', () => {
  const component = renderer.create(
    <div>
      <Alert title="success alert" type="success" />
      <Alert title="info alert" type="info" />
      <Alert title="warning alert" type="warning" />
      <Alert title="error alert" type="error" />
    </div>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Customizable close button', () => {
  const component = renderer.create(
    <div>
      <Alert title="unclosable alert" type="success" closable={false} />
      <Alert title="customized close-text" type="info" closeText="Gotcha" />
      <Alert title="alert with callback" type="warning" onClose={() => alert('Hello World!')}/>
    </div>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('With icon', () => {
  const component = renderer.create(
    <div>
      <Alert title="success alert" type="success" showIcon={true} />
      <Alert title="info alert" type="info" showIcon={true} />
      <Alert title="warning alert" type="warning" showIcon={true} />
      <Alert title="error alert" type="error" showIcon={true} />
    </div>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('With description', () => {
  const component = renderer.create(
    <Alert title="with description" type="success" description="This is a description." />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('With icon and description', () => {
  const component = renderer.create(
    <div>
      <Alert title="success alert" type="success" description="more text description" showIcon={true} />
      <Alert title="info alert" type="info" description="more text description" showIcon={true} />
      <Alert title="warning alert" type="warning" description="more text description" showIcon={true} />
      <Alert title="error alert" type="error" description="more text description" showIcon={true} />
    </div>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
