import * as React from 'react'
import { Alert } from 'element-react'
import { Alert as AlertNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onClose = () => { }
  render() {
    return (
      <div>
        <Alert title="title" className="className" style={{ width: 100 }} />
        <Alert title="title" />
        <Alert title="title" type="success" />
        <Alert title="title" type="info" />
        <Alert title="title" type="warning" />
        <Alert title="title" type="error" />
        <Alert title="title" description="desc" />
        <Alert title="title" closable={true} />
        <Alert title="title" closeText="closeText" />
        <Alert title="title" showIcon={false} />
        <Alert title="title" onClose={this.onClose} />

        <AlertNext title="title" className="className" style={{ width: 100 }} />
        <AlertNext title="title" type="success" />
        <AlertNext title="title" type="info" />
        <AlertNext title="title" type="warning" />
        <AlertNext title="title" type="error" />
        <AlertNext title="title" description="desc" />
        <AlertNext title="title" closable={true} />
        <AlertNext title="title" closeText="closeText" />
        <AlertNext title="title" showIcon={false} />
        <AlertNext title="title" onClose={this.onClose} />
      </div>
    )
  }
}
