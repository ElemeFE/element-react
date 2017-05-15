import * as React from 'react'
import { Layout } from 'element-react'
import { Layout as LayoutNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Layout.Row className="className" style={{ width: 100 }}>
          <Layout.Col span="6" className="className" style={{ width: 100 }}><div className="grid-content bg-purple"></div></Layout.Col>
        </Layout.Row>
        <Layout.Row gutter={2}>
          <Layout.Col span="6" >111</Layout.Col>
        </Layout.Row>
        <Layout.Row gutter="2">
          <Layout.Col span="6" >111</Layout.Col>
        </Layout.Row>
        <Layout.Row type="flex">
          <Layout.Col span="6" >111</Layout.Col>
        </Layout.Row>
        <Layout.Row justify="start">
          <Layout.Col span="6">111</Layout.Col>
        </Layout.Row>
        <Layout.Row justify="end">
          <Layout.Col span="6">111</Layout.Col>
        </Layout.Row>
        <Layout.Row justify="center">
          <Layout.Col span="6">111</Layout.Col>
        </Layout.Row>
        <Layout.Row justify="space-around">
          <Layout.Col span="6">111</Layout.Col>
        </Layout.Row>
        <Layout.Row justify="space-between">
          <Layout.Col span="6">111</Layout.Col>
        </Layout.Row>
        <Layout.Row type="flex" align="top">
          <Layout.Col span="6">111</Layout.Col>
        </Layout.Row>
        <Layout.Row type="flex" align="middle">
          <Layout.Col span="6">111</Layout.Col>
        </Layout.Row>
        <Layout.Row type="flex" align="bottom">
          <Layout.Col span="6">111</Layout.Col>
        </Layout.Row>

        <Layout.Row>
          <Layout.Col span="6" offset="1">111</Layout.Col>
          <Layout.Col span={6} offset={1}>111</Layout.Col>
          <Layout.Col span="6" push={2}>111</Layout.Col>
          <Layout.Col span="6" pull={2}>111</Layout.Col>
          {/*TODO: add xs|sm|md|lg test*/}
        </Layout.Row>


        <LayoutNext.Row className="className" style={{ width: 100 }}>
          <LayoutNext.Col span="6" className="className" style={{ width: 100 }}><div className="grid-content bg-purple"></div></LayoutNext.Col>
        </LayoutNext.Row>
        <LayoutNext.Row gutter={2}>
          <LayoutNext.Col span="6" >111</LayoutNext.Col>
        </LayoutNext.Row>
        <LayoutNext.Row gutter="2">
          <LayoutNext.Col span="6" >111</LayoutNext.Col>
        </LayoutNext.Row>
        <LayoutNext.Row type="flex">
          <LayoutNext.Col span="6" >111</LayoutNext.Col>
        </LayoutNext.Row>
        <LayoutNext.Row justify="start">
          <LayoutNext.Col span="6">111</LayoutNext.Col>
        </LayoutNext.Row>
        <LayoutNext.Row justify="end">
          <LayoutNext.Col span="6">111</LayoutNext.Col>
        </LayoutNext.Row>
        <LayoutNext.Row justify="center">
          <LayoutNext.Col span="6">111</LayoutNext.Col>
        </LayoutNext.Row>
        <LayoutNext.Row justify="space-around">
          <LayoutNext.Col span="6">111</LayoutNext.Col>
        </LayoutNext.Row>
        <LayoutNext.Row justify="space-between">
          <LayoutNext.Col span="6">111</LayoutNext.Col>
        </LayoutNext.Row>
        <LayoutNext.Row type="flex" align="top">
          <LayoutNext.Col span="6">111</LayoutNext.Col>
        </LayoutNext.Row>
        <LayoutNext.Row type="flex" align="middle">
          <LayoutNext.Col span="6">111</LayoutNext.Col>
        </LayoutNext.Row>
        <LayoutNext.Row type="flex" align="bottom">
          <LayoutNext.Col span="6">111</LayoutNext.Col>
        </LayoutNext.Row>

        <LayoutNext.Row>
          <LayoutNext.Col span="6" offset="1">111</LayoutNext.Col>
          <LayoutNext.Col span={6} offset={1}>111</LayoutNext.Col>
          <LayoutNext.Col span="6" push={2}>111</LayoutNext.Col>
          <LayoutNext.Col span="6" pull={2}>111</LayoutNext.Col>
          {/*TODO: add xs|sm|md|lg test*/}
        </LayoutNext.Row>
      </div>
    )
  }
}
