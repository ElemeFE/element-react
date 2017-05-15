import * as React from 'react'
import { Tag } from 'element-react'
import { Tag as TagNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onClose = () => { }
  render() {
    return (
      <div>
        <Tag className="className" style={{ width: 100 }}>tag</Tag>
        <Tag type="primary">tag</Tag>
        <Tag type="gray">tag</Tag>
        <Tag type="success">tag</Tag>
        <Tag type="warning">tag</Tag>
        <Tag closable={true} type="danger" hit={true} closeTransition={true} onClose={this.onClose}>tag</Tag>

        <TagNext className="className" style={{ width: 100 }}>TagNext</TagNext>
        <TagNext type="primary">TagNext</TagNext>
        <TagNext type="gray">TagNext</TagNext>
        <TagNext type="success">TagNext</TagNext>
        <TagNext type="warning">TagNext</TagNext>
        <TagNext closable={true} type="danger" hit={true} closeTransition={true} onClose={this.onClose}>TagNext</TagNext>
      </div>
    )
  }
}
