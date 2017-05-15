import * as React from 'react'
import { Select } from 'element-react'
import { Select as SelectNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onChange = (value) => { }
  remoteMethod = () => { }
  filterMethod = () => { }
  render() {
    return (
      <div>
        <Select className="className" style={{ width: 100 }}>
          <Select.OptionGroup className="className" style={{ width: 100 }}>
            <Select.Option value="1" className="className" style={{ width: 100 }}>haha</Select.Option>
          </Select.OptionGroup>
        </Select>
        <Select value="2" size="large" disabled={true} clearable={true} filterable={true} loading={true} remote={true} remoteMethod={this.remoteMethod} filterMethod={this.filterMethod} multiple={true} placeholder={'placeholder'} onChange={this.onChange}>
          <Select.OptionGroup label="label">
            <Select.Option value="1" label={true ? "label" : 2} selected={true} disabled={true}>haha</Select.Option>
          </Select.OptionGroup>
        </Select>

        <SelectNext className="className" style={{ width: 100 }}>
          <SelectNext.OptionGroup className="className" style={{ width: 100 }}>
            <SelectNext.Option value="1" className="className" style={{ width: 100 }}>haha</SelectNext.Option>
          </SelectNext.OptionGroup>
        </SelectNext>
        <SelectNext value="2" size="large" disabled={true} clearable={true} filterable={true} loading={true} remote={true} remoteMethod={this.remoteMethod} filterMethod={this.filterMethod} multiple={true} placeholder={'placeholder'} onChange={this.onChange}>
          <SelectNext.OptionGroup label="label">
            <SelectNext.Option value="1" label={true ? "label" : 2} selected={true} disabled={true}>haha</SelectNext.Option>
          </SelectNext.OptionGroup>
        </SelectNext>
      </div>
    )
  }
}
