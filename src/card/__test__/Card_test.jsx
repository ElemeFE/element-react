import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Card from '../';

describe('Card test', () => {
  it('render header', () => {
    const w = shallow(
      <Card header="HEADER" />
    );
    expect(w.find('.el-card__header').at(0).text()).toBe('HEADER');
  });

  it('render body', () => {
    const w = shallow(
      <Card>BODY</Card>
    );
    expect(w.find('.el-card__body').at(0).text()).toBe('BODY');
  });

  it('use bodyStyle', () => {
    const bodyStyle = {
      padding: '5px',
      border: '1px solid blue',
    };
    const w = shallow(
      <Card bodyStyle={bodyStyle} />
    );
    expect(w.find('.el-card__body').at(0).prop('style')).toEqual(bodyStyle);
  });
});