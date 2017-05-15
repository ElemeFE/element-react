import * as React from 'react'
import { Radio } from 'element-react'
import { Radio as RadioNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  state = {
    value: 3
  }
  onChange = (value) => { }
  render() {
    const { value } = this.state
    return (
      <div>
        <Radio value="1" />
        <Radio value={1}>111</Radio>
        <Radio value={true} />
        <Radio value="1" onChange={this.onChange} disabled={true} checked={false} name="111" className="className" style={{ width: 100 }} />

        <Radio.Group>
          <Radio value="3">备选项</Radio>
        </Radio.Group>
        <Radio.Group size="small">
          <Radio value="3">备选项</Radio>
        </Radio.Group>
        <Radio.Group value={value} onChange={this.onChange} disabled={false} size="large" textColor="red" fill="blue" className="className" style={{ width: 100 }}>
          <Radio value="3">备选项</Radio>
        </Radio.Group>

        <Radio.Group value={value}>
          <Radio.Button value="3">备选项</Radio.Button>
          <Radio.Button value="3" disabled={true} name="121" className="className" style={{ width: 100 }}>备选项</Radio.Button>
          <Radio.Button value="6" />
        </Radio.Group>

        <RadioNext value="1" />
        <RadioNext value={1}>111</RadioNext>
        <RadioNext value={true} />
        <RadioNext value="1" onChange={this.onChange} disabled={true} checked={false} name="111" className="className" style={{ width: 100 }} />

        <RadioNext.Group>
          <RadioNext value="3">备选项</RadioNext>
        </RadioNext.Group>
        <RadioNext.Group size="small">
          <RadioNext value="3">备选项</RadioNext>
        </RadioNext.Group>
        <RadioNext.Group value={value} onChange={this.onChange} disabled={false} size="large" textColor="red" fill="blue" className="className" style={{ width: 100 }}>
          <RadioNext value="3">备选项</RadioNext>
        </RadioNext.Group>

        <RadioNext.Group value={value}>
          <RadioNext.Button value="3">备选项</RadioNext.Button>
          <RadioNext.Button value="3" disabled={true} name="121" className="className" style={{ width: 100 }}>备选项</RadioNext.Button>
          <RadioNext.Button value="6" />
        </RadioNext.Group>
      </div>
    )
  }
}
