import React from 'react';
import { mount } from 'enzyme';

import { Badge, Button, Dropdown } from '../../../src';

test('Basic usage', () => {
  const badge1 = mount(
    <Badge value={ 12 }>
      <Button size="small">评论</Button>
    </Badge>
  )

  expect(badge1.find('.el-badge .el-badge__content').at(0).text()).toEqual('12');

  const badge2 = mount(
    <Dropdown trigger="click" menu={(
      <Dropdown.Menu>
        <Dropdown.Item className="clearfix">
          <span>评论</span><Badge className="mark" value={ 12 } />
        </Dropdown.Item>
        <Dropdown.Item className="clearfix">
          <span>回复</span><Badge className="mark" value={ 3 } />
        </Dropdown.Item>
      </Dropdown.Menu>
      )}
    >
      <span className="el-dropdown-link">
        点我查看<i className="el-icon-caret-bottom el-icon--right"></i>
      </span>
    </Dropdown>
  )

  expect(badge2.find('.el-dropdown .el-badge__content').at(0).text()).toEqual('12');
  expect(badge2.find('.el-dropdown .el-badge__content').at(1).text()).toEqual('3');
});

test('Max value', () => {
  const badge1 = mount(
    <Badge value={ 200 } max={ 99 }>
      <Button size="small">评论</Button>
    </Badge>
  );

  expect(badge1.find('.el-badge .el-badge__content').at(0).text()).toEqual('99+');

  const badge2 = mount(
    <Badge value={ 99 } max={ 99 }>
      <Button size="small">评论</Button>
    </Badge>
  );

  expect(badge2.find('.el-badge .el-badge__content').at(0).text()).toEqual('99');

  const badge3 = mount(
    <Badge value={ 1 } max={ 99 }>
      <Button size="small">评论</Button>
    </Badge>
  );

  expect(badge3.find('.el-badge .el-badge__content').at(0).text()).toEqual('1');
});

test('Custom content', () => {
  const component = mount(
    <Badge value={ 'new' }>
      <Button size="small">评论</Button>
    </Badge>
  );

  expect(component.find('.el-badge .el-badge__content').at(0).text()).toEqual('new');
});

test('Dot', () => {
  const component = mount(
    <Badge isDot>
      <Button className="share-button" icon="share" type="primary"></Button>
    </Badge>
  );

  expect(component.find('.el-badge .el-badge__content').hasClass('is-dot')).toBeTruthy();
});
