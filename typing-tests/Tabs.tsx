import * as React from 'react'
import { Tabs } from 'element-react'
import { Tabs as TabsNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onTabClick = (tab) => { }
  onTabRemove = (name) => { }
  onTabAdd = () => { }
  onTabEdit = (targetName, action) => { }
  render() {
    return (
      <div>
        <Tabs className="className" style={{ width: 100 }}>
          <Tabs.Pane className="className" style={{ width: 100 }}>管理</Tabs.Pane>
        </Tabs>
        <Tabs type="card">
          <Tabs.Pane label="label">管理</Tabs.Pane>
        </Tabs>
        <Tabs type="border-card" activeName="active" value="value" closable={true} addable={true} editable={true} onTabClick={this.onTabClick} onTabRemove={this.onTabRemove} onTabAdd={this.onTabAdd} onTabEdit={this.onTabEdit}>
          <Tabs.Pane label={<div>label</div>} name="pane" disabled={true} closable={true}>管理</Tabs.Pane>
        </Tabs>


        <TabsNext className="className" style={{ width: 100 }}>
          <TabsNext.Pane className="className" style={{ width: 100 }}>管理</TabsNext.Pane>
        </TabsNext>
        <TabsNext type="card">
          <TabsNext.Pane label="label">管理</TabsNext.Pane>
        </TabsNext>
        <TabsNext type="border-card" activeName="active" value="value" closable={true} addable={true} editable={true} onTabClick={this.onTabClick} onTabRemove={this.onTabRemove} onTabAdd={this.onTabAdd} onTabEdit={this.onTabEdit}>
          <TabsNext.Pane label={<div>label</div>} name="pane" disabled={true} closable={true}>管理</TabsNext.Pane>
        </TabsNext>
      </div>
    )
  }
}
