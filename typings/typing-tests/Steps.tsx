import * as React from 'react'
import { Steps } from 'element-react'
import { Steps as StepsNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Steps className="className" style={{ width: 100 }}>
          <Steps.Step className="className" style={{ width: 100 }} />
        </Steps>
        <Steps finishStatus="finish" processStatus="finish">
          <Steps.Step status="finish" />
        </Steps>
        <Steps finishStatus="error" processStatus="error">
          <Steps.Step status="error" />
        </Steps>
        <Steps finishStatus="success" processStatus="success">
          <Steps.Step status="success" />
        </Steps>
        <Steps direction="horizontal" finishStatus="process" processStatus="process">
          <Steps.Step description={(<div>啥</div>)} status="process" direction="horizontal" />
        </Steps>
        <Steps space={100} active={1} direction="vertical" finishStatus="wait" processStatus="wait">
          <Steps.Step title="步骤 1" description="啥" status="wait" direction="vertical" style={{ padding: '10px' }} lineStyle={{ padding: '10px' }} stepNumber={2} />
        </Steps>

        <StepsNext className="className" style={{ width: 100 }}>
          <StepsNext.Step className="className" style={{ width: 100 }} />
        </StepsNext>
        <StepsNext finishStatus="finish" processStatus="finish">
          <StepsNext.Step status="finish" />
        </StepsNext>
        <StepsNext finishStatus="error" processStatus="error">
          <StepsNext.Step status="error" />
        </StepsNext>
        <StepsNext finishStatus="success" processStatus="success">
          <StepsNext.Step status="success" />
        </StepsNext>
        <StepsNext direction="horizontal" finishStatus="process" processStatus="process">
          <StepsNext.Step description={(<div>啥</div>)} status="process" direction="horizontal" />
        </StepsNext>
        <StepsNext space={100} active={1} direction="vertical" finishStatus="wait" processStatus="wait">
          <StepsNext.Step title="步骤 1" description="啥" status="wait" direction="vertical" style={{ padding: '10px' }} lineStyle={{ padding: '10px' }} stepNumber={2} />
        </StepsNext>
      </div>
    )
  }
}
