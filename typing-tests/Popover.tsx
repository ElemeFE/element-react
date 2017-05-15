import * as React from 'react'
import { Popover } from 'element-react'
import { Popover as PopoverNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Popover className="className" style={{ width: 100 }}>内容</Popover>
        <Popover width="100" placement="top" trigger="click" content={(<div>content</div>)}>内容</Popover>
        <Popover placement="top-start" trigger="focus">内容</Popover>
        <Popover placement="top-end">内容</Popover>
        <Popover placement="bottom">内容</Popover>
        <Popover placement="bottom-start">内容</Popover>
        <Popover placement="bottom-end">内容</Popover>
        <Popover placement="left">内容</Popover>
        <Popover placement="left-start">内容</Popover>
        <Popover placement="left-end">内容</Popover>
        <Popover placement="right">内容</Popover>
        <Popover placement="right-start">内容</Popover>
        <Popover width={100} placement="right-end" trigger="hover" title="title" content="content" popperClass="class" transition="transition" visible={true} visibleArrow={true}>内容</Popover>

        <PopoverNext className="className" style={{ width: 100 }}>内容</PopoverNext>
        <PopoverNext width="100" placement="top" trigger="click" content={(<div>content</div>)}>内容</PopoverNext>
        <PopoverNext placement="top-start" trigger="focus">内容</PopoverNext>
        <PopoverNext placement="top-end">内容</PopoverNext>
        <PopoverNext placement="bottom">内容</PopoverNext>
        <PopoverNext placement="bottom-start">内容</PopoverNext>
        <PopoverNext placement="bottom-end">内容</PopoverNext>
        <PopoverNext placement="left">内容</PopoverNext>
        <PopoverNext placement="left-start">内容</PopoverNext>
        <PopoverNext placement="left-end">内容</PopoverNext>
        <PopoverNext placement="right">内容</PopoverNext>
        <PopoverNext placement="right-start">内容</PopoverNext>
        <PopoverNext width={100} placement="right-end" trigger="hover" title="title" content="content" popperClass="class" transition="transition" visible={true} visibleArrow={true}>内容</PopoverNext>
      </div>
    )
  }
}
