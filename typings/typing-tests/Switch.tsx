import * as React from 'react'
import { Switch } from 'element-react'
import { Switch as SwitchNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onChange = (value) => { }
  render() {
    return (
      <div>
        <Switch className="className" style={{ width: 100 }} />
        <Switch value={1} onValue={0} offValue={2} />
        <Switch value={true} onValue={true} offValue={false} />
        <Switch value="1" disabled={true} width={100} onIconClass="el" offIconClass="el" onText="" offText="" onColor="red" offColor="blue" onValue="0" offValue="2" name="name" onChange={this.onChange} />

        <SwitchNext className="className" style={{ width: 100 }} />
        <SwitchNext value={1} onValue={0} offValue={2} />
        <SwitchNext value={true} onValue={true} offValue={false} />
        <SwitchNext value="1" disabled={true} width={100} onIconClass="el" offIconClass="el" onText="" offText="" onColor="red" offColor="blue" onValue="0" offValue="2" name="name" onChange={this.onChange} />
      </div>
    )
  }
}
