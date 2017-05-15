import * as React from 'react'
import { Breadcrumb } from 'element-react'
import { Breadcrumb as BreadcrumbNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Breadcrumb className="className" style={{ width: 100 }}>
          <Breadcrumb.Item className="className" style={{ width: 100 }}>首页</Breadcrumb.Item>
        </Breadcrumb>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>首页</Breadcrumb.Item>
        </Breadcrumb>

        <BreadcrumbNext className="className" style={{ width: 100 }}>
          <BreadcrumbNext.Item className="className" style={{ width: 100 }}>首页</BreadcrumbNext.Item>
        </BreadcrumbNext>
        <BreadcrumbNext separator="/">
          <BreadcrumbNext.Item>首页</BreadcrumbNext.Item>
        </BreadcrumbNext>
      </div>
    )
  }
}
