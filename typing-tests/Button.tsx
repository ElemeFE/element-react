import * as React from 'react'
import { Button } from 'element-react'
import { Button as ButtonNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onClick = () => { }
  render() {
    return (
      <div>
        <Button.Group>
          <Button className="className" style={{ width: 100 }}>按钮</Button>
          <Button>按钮</Button>
          <Button onClick={this.onClick}>按钮</Button>
          <Button type="success">成功按钮</Button>
          <Button type="warning">警告按钮</Button>
          <Button type="danger">危险按钮</Button>
          <Button type="info">信息按钮</Button>
          <Button size="large">按钮</Button>
          <Button size="small">按钮</Button>
          <Button size="mini">按钮</Button>
          <Button icon="user">按钮</Button>
          <Button nativeType="button">按钮</Button>
          <Button nativeType="submit">按钮</Button>
          <Button nativeType="reset">按钮</Button>
          <Button loading={true}>按钮</Button>
          <Button disabled={false}>按钮</Button>
          <Button plain={true}>按钮</Button>
        </Button.Group>

        <ButtonNext.Group>
          <ButtonNext className="className" style={{ width: 100 }}>按钮</ButtonNext>
          <ButtonNext>按钮</ButtonNext>
          <ButtonNext onClick={this.onClick}>按钮</ButtonNext>
          <ButtonNext type="success">成功按钮</ButtonNext>
          <ButtonNext type="warning">警告按钮</ButtonNext>
          <ButtonNext type="danger">危险按钮</ButtonNext>
          <ButtonNext type="info">信息按钮</ButtonNext>
          <ButtonNext size="large">按钮</ButtonNext>
          <ButtonNext size="small">按钮</ButtonNext>
          <ButtonNext size="mini">按钮</ButtonNext>
          <ButtonNext icon="user">按钮</ButtonNext>
          <ButtonNext nativeType="button">按钮</ButtonNext>
          <ButtonNext nativeType="submit">按钮</ButtonNext>
          <ButtonNext nativeType="reset">按钮</ButtonNext>
          <ButtonNext loading={true}>按钮</ButtonNext>
          <ButtonNext disabled={false}>按钮</ButtonNext>
          <ButtonNext plain={true}>按钮</ButtonNext>
        </ButtonNext.Group>
      </div>
    )
  }
}
