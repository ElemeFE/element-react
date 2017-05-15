import * as React from 'react'
import { Checkbox } from 'element-react'
import { Checkbox as CheckboxNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  state = {
    value: []
  }
  onChange = (value) => { }
  render() {
    return (
      <div>
        <Checkbox.Group className="className" style={{ width: 100 }}>
          <Checkbox className="className" style={{ width: 100 }} />
          <Checkbox.Button className="className" style={{ width: 100 }}>Button</Checkbox.Button>
        </Checkbox.Group>
        <Checkbox.Group min="2" max="5" size="large">
          <Checkbox trueLabel="1" falseLabel="2" />
          <Checkbox.Button>Button</Checkbox.Button>
        </Checkbox.Group>
        <Checkbox.Group min={2} max={5} size="small" fill="red" textColor="red" value={this.state.value} onChange={this.onChange}>
          <Checkbox label="label" trueLabel={1} falseLabel={2} disabled={true} checked={false} indeterminate={true} focus={true} onChange={this.onChange} />
          <Checkbox.Button>Button</Checkbox.Button>
        </Checkbox.Group>

        <CheckboxNext.Group className="className" style={{ width: 100 }}>
          <CheckboxNext className="className" style={{ width: 100 }} />
          <CheckboxNext.Button className="className" style={{ width: 100 }}>Button</CheckboxNext.Button>
        </CheckboxNext.Group>
        <CheckboxNext.Group min="2" max="5" size="large">
          <CheckboxNext trueLabel="1" falseLabel="2" />
          <CheckboxNext.Button>Button</CheckboxNext.Button>
        </CheckboxNext.Group>
        <CheckboxNext.Group min={2} max={5} size="small" fill="red" textColor="red" value={this.state.value} onChange={this.onChange}>
          <CheckboxNext label="label" trueLabel={1} falseLabel={2} disabled={true} checked={false} indeterminate={true} focus={true} onChange={this.onChange} />
          <CheckboxNext.Button>Button</CheckboxNext.Button>
        </CheckboxNext.Group>
      </div>
    )
  }
}
