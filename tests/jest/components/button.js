import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../../../src';

test('Basic usage', () => {
  const component = renderer.create(
    <div>
      <Button>Default Button</Button>
      <Button type="primary">Primary Button</Button>
      <Button type="text">Text Button</Button>
    </div>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Disabled Button', () => {
  const component = renderer.create(
    <div>
      <Button plain={true} disabled={true}>Default Button</Button>
      <Button type="primary" disabled={true}>Primary Button</Button>
      <Button type="text" disabled={true}>Text Button</Button>
    </div>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Color Indication', () => {
  const component = renderer.create(
    <div className="intro-block">
      <div className="block">
        <span className="demonstration">Default</span>
        <span className="wrapper">
          <Button type="success">Success</Button>
          <Button type="warning">Warning</Button>
          <Button type="danger">Danger</Button>
          <Button type="info">Info</Button>
        </span>
      </div>
      <div className="block">
        <span className="demonstration">Hover to display color</span>
        <span className="wrapper">
          <Button plain={true} type="success">Success</Button>
          <Button plain={true} type="warning">Warning</Button>
          <Button plain={true} type="danger">Danger</Button>
          <Button plain={true} type="info">Info</Button>
        </span>
      </div>
    </div>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Icon Button', () => {
  const component = renderer.create(
    <div>
      <Button type="primary" icon="edit"></Button>
      <Button type="primary" icon="share"></Button>
      <Button type="primary" icon="delete"></Button>
      <Button type="primary" icon="search">Search</Button>
      <Button type="primary">Upload<i className="el-icon-upload el-icon-right"></i></Button>
    </div>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Button Group', () => {
  const component = renderer.create(
    <div>
      <Button.Group>
          <Button type="primary" icon="arrow-left">Previous Page</Button>
          <Button type="primary">Next Page<i className="el-icon-arrow-right el-icon-right"></i></Button>
      </Button.Group>
      <Button.Group>
          <Button type="primary" icon="edit"></Button>
          <Button type="primary" icon="share"></Button>
          <Button type="primary" icon="delete"></Button>
      </Button.Group>
    </div>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Loading Button', () => {
  const component = renderer.create(
    <Button type="primary" loading={true}>Loading</Button>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Sizes', () => {
  const component = renderer.create(
    <div>
      <Button type="primary" size="large">Large Button</Button>
      <Button type="primary">Default Button</Button>
      <Button type="primary" size="small">Small Button</Button>
      <Button type="primary" size="mini">Mini Button</Button>
    </div>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
