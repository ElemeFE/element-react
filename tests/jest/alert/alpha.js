import React from 'react';
import renderer from 'react-test-renderer';

import { Alert } from '../../../src';

test('success', () => {
  const component = renderer.create(
    <Alert title="成功提示的文案" type="success" />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('info', () => {
  const component = renderer.create(
    <Alert title="消息提示的文案" type="info" />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('warning', () => {
  const component = renderer.create(
    <Alert title="警告提示的文案" type="warning" />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('error', () => {
  const component = renderer.create(
    <Alert title="错误提示的文案" type="error" />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
