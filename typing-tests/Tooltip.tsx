import * as React from 'react'
import { Tooltip } from 'element-react'
import { Tooltip as TooltipNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Tooltip className="className" style={{ width: 100 }}>
          <div>内容</div>
        </Tooltip>
        <Tooltip effect="dark" placement="top">
          <div>内容</div>
        </Tooltip>
        <Tooltip placement="top-start">
          <div>内容</div>
        </Tooltip>
        <Tooltip placement="top-end">
          <div>内容</div>
        </Tooltip>
        <Tooltip placement="bottom">
          <div>内容</div>
        </Tooltip>
        <Tooltip placement="bottom-start">
          <div>内容</div>
        </Tooltip>
        <Tooltip placement="bottom-end">
          <div>内容</div>
        </Tooltip>
        <Tooltip placement="left">
          <div>内容</div>
        </Tooltip>
        <Tooltip placement="left-start">
          <div>内容</div>
        </Tooltip>
        <Tooltip placement="left-end">
          <div>内容</div>
        </Tooltip>
        <Tooltip placement="right">
          <div>内容</div>
        </Tooltip>
        <Tooltip placement="right-start">
          <div>内容</div>
        </Tooltip>
        <Tooltip effect="light" placement="right-end" disabled={true} transition="fade-in-linear" visibleArrow={true} openDelay={200} manual={false} visible={true}>
          <div>内容</div>
        </Tooltip>

        <TooltipNext className="className" style={{ width: 100 }}>
          <div>内容</div>
        </TooltipNext>
        <TooltipNext effect="dark" placement="top">
          <div>内容</div>
        </TooltipNext>
        <TooltipNext placement="top-start">
          <div>内容</div>
        </TooltipNext>
        <TooltipNext placement="top-end">
          <div>内容</div>
        </TooltipNext>
        <TooltipNext placement="bottom">
          <div>内容</div>
        </TooltipNext>
        <TooltipNext placement="bottom-start">
          <div>内容</div>
        </TooltipNext>
        <TooltipNext placement="bottom-end">
          <div>内容</div>
        </TooltipNext>
        <TooltipNext placement="left">
          <div>内容</div>
        </TooltipNext>
        <TooltipNext placement="left-start">
          <div>内容</div>
        </TooltipNext>
        <TooltipNext placement="left-end">
          <div>内容</div>
        </TooltipNext>
        <TooltipNext placement="right">
          <div>内容</div>
        </TooltipNext>
        <TooltipNext placement="right-start">
          <div>内容</div>
        </TooltipNext>
        <TooltipNext effect="light" placement="right-end" disabled={true} transition="fade-in-linear" visibleArrow={true} openDelay={200} manual={false} visible={true}>
          <div>内容</div>
        </TooltipNext>
      </div>
    )
  }
}
