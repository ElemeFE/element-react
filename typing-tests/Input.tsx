import * as React from 'react'
import { Input } from 'element-react'
import { Input as InputNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onClose = () => { }
  render() {
    return (
      <div>
        <Input className="className" style={{ width: 100 }} />
        <Input type="text" icon={(<div>icon</div>)} size="mini" />
        <Input size="small" />
        <Input
          type="textarea"
          icon="icon"
          disabled={true}
          name="name"
          placeholder="input"
          readOnly={true}
          autoFocus={true}
          maxLength={100}
          minLength={10}
          defaultValue="2"
          value="32"
          size="large"
          autosize={true}
          rows={2}
        />

        <InputNext className="className" style={{ width: 100 }} />
        <InputNext type="text" icon={(<div>icon</div>)} size="mini" />
        <InputNext size="small" />
        <InputNext
          type="textarea"
          icon="icon"
          disabled={true}
          name="name"
          placeholder="input"
          readOnly={true}
          autoFocus={true}
          maxLength={100}
          minLength={10}
          defaultValue="2"
          value="32"
          size="large"
          autosize={true}
          rows={2}
        />
      </div>
    )
  }
}

// TODO: 这里的测试没写完整
