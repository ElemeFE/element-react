import * as React from 'react'
import { Progress } from 'element-react'
import { Progress as ProgressNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Progress percentage={10} className="className" style={{ width: 100 }} />
        <Progress percentage={10} type="line" />
        <Progress percentage={10} status="success" />
        <Progress percentage={10} type="circle" status="exception" strokeWidth={2} width={120} textInside={true} showText={false} />

        <ProgressNext percentage={10} className="className" style={{ width: 100 }} />
        <ProgressNext percentage={10} type="line" />
        <ProgressNext percentage={10} status="success" />
        <ProgressNext percentage={10} type="circle" status="exception" strokeWidth={2} width={120} textInside={true} showText={false} />
      </div>
    )
  }
}
