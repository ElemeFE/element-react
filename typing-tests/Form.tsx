import * as React from 'react'
import { Form } from 'element-react'
import { Form as FormNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  state = {
    form: {
      user: '',
      region: ''
    },
    rules: {
      email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
      ]
    }
  }
  render() {
    const { form, rules } = this.state
    return (
      <div>
        <Form className="className" style={{ width: 100 }}>
          <Form.Item className="className" style={{ width: 100 }}>
            <div>哈哈</div>
          </Form.Item>
        </Form>

        <Form labelPosition="right" labelWidth="100">
          <Form.Item labelWidth="100">
            <div>哈哈</div>
          </Form.Item>
        </Form>
        <Form labelPosition="left">
          <Form.Item>
            <div>哈哈</div>
          </Form.Item>
        </Form>
        <Form model={form} rules={rules} labelPosition="top" labelWidth={100} labelSuffix="suffix" inline={true}>
          <Form.Item label="label" labelWidth={100} prop="email" required={true} rules={rules}>
            <div>哈哈</div>
          </Form.Item>
        </Form>

        <FormNext className="className" style={{ width: 100 }}>
          <FormNext.Item className="className" style={{ width: 100 }}>
            <div>哈哈</div>
          </FormNext.Item>
        </FormNext>

        <FormNext labelPosition="right" labelWidth="100">
          <FormNext.Item labelWidth="100">
            <div>哈哈</div>
          </FormNext.Item>
        </FormNext>
        <FormNext labelPosition="left">
          <FormNext.Item>
            <div>哈哈</div>
          </FormNext.Item>
        </FormNext>
        <FormNext model={form} rules={rules} labelPosition="top" labelWidth={100} labelSuffix="suffix" inline={true}>
          <FormNext.Item label="label" labelWidth={100} prop="email" required={true} rules={rules}>
            <div>哈哈</div>
          </FormNext.Item>
        </FormNext>
      </div>
    )
  }
}

class FormComponent extends Form {
  cb = () => { }
  componentDidMount() {
    this.validate()
    this.validate(this.cb)

    this.validateField('email')
    this.validateField('email', this.cb)

    this.resetFields()
  }
}
