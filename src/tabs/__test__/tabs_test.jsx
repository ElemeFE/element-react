import React from 'react';
import { mount } from 'enzyme';

import { Tabs, Icon, Button } from '../../../src';

test('Basic usage', () => {
  const state = {
    name: '',
  };

  const tabs = mount(
    <Tabs activeName="2" onTabClick={ (tab) => state.name = tab.props.name }>
      <Tabs.Pane label="用户管理" name="1">用户管理</Tabs.Pane>
      <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
      <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
      <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
    </Tabs>
  )

  expect(tabs.find('.el-tabs .el-tabs__item').at(0).text()).toEqual('用户管理');
  expect(tabs.find('.el-tabs .el-tab-pane').at(0).text()).toEqual('用户管理');
  expect(tabs.find('.el-tabs .el-tabs__item').at(1).text()).toEqual('配置管理');
  expect(tabs.find('.el-tabs .el-tab-pane').at(1).text()).toEqual('配置管理');
  expect(tabs.find('.el-tabs .el-tabs__item').at(2).text()).toEqual('角色管理');
  expect(tabs.find('.el-tabs .el-tab-pane').at(2).text()).toEqual('角色管理');
  expect(tabs.find('.el-tabs .el-tabs__item').at(3).text()).toEqual('定时补偿任务');
  expect(tabs.find('.el-tabs .el-tab-pane').at(3).text()).toEqual('定时补偿任务');

  tabs.mount();
  expect(tabs.find('.el-tabs .el-tabs__item').at(1).hasClass('is-active')).toBeTruthy();
  expect(tabs.find('.el-tabs .el-tab-pane').at(1).prop('style').display).toEqual(undefined);

  tabs.find('.el-tabs .el-tabs__item').at(0).simulate('click');
  expect(tabs.find('.el-tabs .el-tabs__item').at(0).hasClass('is-active')).toBeTruthy();
  expect(tabs.find('.el-tabs .el-tabs__item').at(1).hasClass('is-active')).toBeFalsy();
  expect(state.name).toBe('1');
});

test('Card Style', () => {
  const tabs = mount(
    <Tabs type="card" value="1">
      <Tabs.Pane label="用户管理" name="1">用户管理</Tabs.Pane>
      <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
      <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
      <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
    </Tabs>
  )

  expect(tabs.find('.el-tabs').hasClass('el-tabs--card')).toBeTruthy();
});

test('Border card', () => {
  const tabs = mount(
    <Tabs type="border-card" activeName="1">
      <Tabs.Pane label="用户管理" name="1">用户管理</Tabs.Pane>
      <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
      <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
      <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
    </Tabs>
  )

  expect(tabs.find('.el-tabs').hasClass('el-tabs--border-card')).toBeTruthy();
});

test('Custom Tab', () => {
  const label = <span><Icon name="date" /> 用户管理</span>;
  const tabs = mount(
    <Tabs type="border-card" activeName="1">
      <Tabs.Pane label={label} name="1">用户管理</Tabs.Pane>
      <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
      <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
      <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
    </Tabs>
  )

  expect(tabs.find('.el-tabs .el-tabs__header i').html()).toEqual('<i class="el-icon-date"></i>');
});

test('Add & Close tab', () => {
  const state = {
    tabs: [{
      title: 'Tab 1',
      name: 'Tab 1',
      content: 'Tab 1 content',
    }, {
      title: 'Tab 2',
      name: 'Tab 2',
      content: 'Tab 2 content',
    }],
    tabIndex: 2,
  };

  const editTab = (action, tab) => {
    if (action === 'add') {
      const { tabs, tabIndex } = state;
      const index = tabIndex + 1;

      tabs.push({
        title: 'new Tab',
        name: 'Tab ' + index,
        content: 'new Tab content',
      });
      state.tabs = tabs;
      state.tabIndex = index;
    }

    if (action === 'remove') {
      const { tabs } = state;

      tabs.splice(tab.key.replace(/^\.\$/, ''), 1);
      state.tabs = tabs;
    }
  };

  const tabs = mount(
    <Tabs type="card" value="Tab 2" editable onTabEdit={(action, tab) => editTab(action, tab)}>
      {
        state.tabs.map((item, index) => {
          return <Tabs.Pane key={index} closable label={item.title} name={item.name}>{item.content}</Tabs.Pane>
        })
      }
    </Tabs>
  );

  expect(tabs.find('.el-tabs__new-tab').length).toBe(1);
  expect(tabs.find('.el-tabs .el-tabs__item').at(0).hasClass('is-closable')).toBeTruthy();

  tabs.find('.el-tabs__new-tab').simulate('click');
  tabs.setProps({
    children: state.tabs.map((item, index) => {
      return <Tabs.Pane key={index} closable label={item.title} name={item.name}>{item.content}</Tabs.Pane>
    }),
  });
  expect(tabs.find('.el-tabs .el-tabs__item').length).toBe(3);

  tabs.find('.el-tabs .el-tabs__item').at(1).find('.el-icon-close').simulate('click');
  tabs.setProps({
    children: state.tabs.map((item, index) => {
      return <Tabs.Pane key={index} closable label={item.title} name={item.name}>{item.content}</Tabs.Pane>
    }),
  });
  expect(tabs.find('.el-tabs .el-tabs__item').length).toBe(2);
});

test('Customized trigger button of new tab', () => {
  const state = {
    tabs: [{
      title: 'Tab 1',
      name: 'Tab 1',
      content: 'Tab 1 content',
    }, {
      title: 'Tab 2',
      name: 'Tab 2',
      content: 'Tab 2 content',
    }],
    tabIndex: 2,
  };

  const addTab = () => {
    const { tabs, tabIndex } = state;
    const index = tabIndex + 1;

    tabs.push({
      title: 'new Tab',
      name: 'Tab ' + index,
      content: 'new Tab content',
    });
    state.tabs = tabs;
    state.tabIndex = index;
  }

  const removeTab = (tab) => {
    const { tabs } = state;

    tabs.splice(tab.key.replace(/^\.\$/, ''), 1);
    state.tabs = tabs;
  }

  const button = mount(
    <Button size="small" onClick={() => addTab()}>add tab</Button>
  );

  const tabs = mount(
    <Tabs type="card" value="Tab 2" onTabRemove={(tab) => removeTab(tab)}>
      {
        state.tabs.map((item, index) => {
          return <Tabs.Pane key={index} closable label={item.title} name={item.name}>{item.content}</Tabs.Pane>
        })
      }
    </Tabs>
  );

  button.simulate('click');
  tabs.setProps({
    children: state.tabs.map((item, index) => {
      return <Tabs.Pane key={index} closable label={item.title} name={item.name}>{item.content}</Tabs.Pane>
    }),
  });
  expect(tabs.find('.el-tabs .el-tabs__item').length).toBe(3);

  tabs.find('.el-tabs .el-tabs__item').at(1).find('.el-icon-close').simulate('click');
  tabs.setProps({
    children: state.tabs.map((item, index) => {
      return <Tabs.Pane key={index} closable label={item.title} name={item.name}>{item.content}</Tabs.Pane>
    }),
  });
  expect(tabs.find('.el-tabs .el-tabs__item').length).toBe(2);
});
