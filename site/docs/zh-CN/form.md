## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

::: demo 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker
```html
<Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
  <Form.Item label="活动名称">
    <Input value={this.state.form.name}></Input>
  </Form.Item>
  <Form.Item label="活动区域">
    <Select value={this.state.form.region} placeholder="请选择活动区域">
      <Select.Option label="区域一" value="shanghai"></Select.Option>
      <Select.Option label="区域二" value="beijing"></Select.Option>
    </Select>
  </Form.Item>
  <Form.Item label="活动时间">
    <Layout.Col span="11">

    </Layout.Col>
    <Layout.Col class="line" span="2">-</Layout.Col>
    <Layout.Col span="11">

    </Layout.Col>
  </Form.Item>
  <Form.Item label="即时配送">
    <Switch onText="" offText="" value={this.state.form.delivery}></Switch>
  </Form.Item>
  <Form.Item label="活动性质">
    <Checkbox.Group value={this.state.form.type}>
      <Checkbox label="美食/餐厅线上活动" name="type"></Checkbox>
      <Checkbox label="地推活动" name="type"></Checkbox>
      <Checkbox label="线下主题活动" name="type"></Checkbox>
      <Checkbox label="单纯品牌曝光" name="type"></Checkbox>
    </Checkbox.Group>
  </Form.Item>
  <Form.Item label="特殊资源">
    <Radio.Group value={this.state.form.resource}>
      <Radio value="线上品牌商赞助"></Radio>
      <Radio value="线下场地免费"></Radio>
    </Radio.Group>
  </Form.Item>
  <Form.Item label="活动形式">
    <Input type="textarea" value={this.state.form.desc}></Input>
  </Form.Item>
  <Form.Item>
    <Button type="primary" nativeType="submit">立即创建</Button>
    <Button>取消</Button>
  </Form.Item>
</Form>
```
:::

### 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

::: demo Form 组件的 `type` 属性可以控制表单的类型，当设为 `inline` 时可以让表单域变为行内的表单域
```html
<Form inline={true} model={this.state.formInline} onSubmit={this.onSubmit.bind(this)} className="demo-form-inline">
  <Form.Item>
    <Input value={this.state.formInline.user} placeholder="审批人"></Input>
  </Form.Item>
  <Form.Item>
    <Select value={this.state.formInline.region} placeholder="活动区域">
      <Select.Option label="区域一" value="shanghai"></Select.Option>
      <Select.Option label="区域二" value="beijing"></Select.Option>
    </Select>
  </Form.Item>
  <Form.Item>
    <Button nativeType="submit" type="primary">查询</Button>
  </Form.Item>
</Form>
```
:::

### 对齐方式

根据具体目标和制约因素，选择最佳的标签对齐方式。

顶部对齐

::: demo 通过设置 `label-position` 属性可以改变表单域标签的位置，可选值为 `top`、`left`，当设为 `top` 时标签会置于表单域的顶部
```html
<Form labelPosition="top" model={this.state.formStacked} className="demo-form-stacked">
  <Form.Item label="名称">
    <Input value={this.state.formStacked.name}></Input>
  </Form.Item>
  <Form.Item label="活动区域">
    <Input value={this.state.formStacked.region}></Input>
  </Form.Item>
  <Form.Item label="活动展开形式">
    <Input value={this.state.formStacked.type}></Input>
  </Form.Item>
</Form>
```
:::

右对齐

::: demo 通过设置 `label-position` 属性可以改变表单域标签的位置，默认不设置的情况下标签是右对齐的
```html
<Form model={this.state.formAlignRight} labelWidth="80">
  <Form.Item label="活动名称">
    <Input value={this.state.formAlignRight.name}></Input>
  </Form.Item>
  <Form.Item label="推广地">
    <Input value={this.state.formAlignRight.region}></Input>
  </Form.Item>
  <Form.Item label="活动形式">
    <Input value={this.state.formAlignRight.type}></Input>
  </Form.Item>
</Form>
```
:::

左对齐

::: demo 通过设置 `label-position` 属性可以改变表单域标签的位置，可选值为 `top`、`left`，当设为 `left` 时标签会变为左对齐
```html
<Form model={this.state.formAlignLeft} labelPosition="left" onSubmit={this.onSubmit.bind(this)} labelWidth="80">
  <Form.Item label="活动名称">
    <Input value={this.state.formAlignLeft.name}></Input>
  </Form.Item>
  <Form.Item label="推广地">
    <Input value={this.state.formAlignLeft.region}></Input>
  </Form.Item>
  <Form.Item label="活动形式">
    <Input value={this.state.formAlignLeft.type}></Input>
  </Form.Item>
</Form>
```
:::

### 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

::: demo Form 组件提供了表单验证的功能，只需要通过 `rule` 属性传入约定的验证规则，并 Form-Item 的 `prop` 属相设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator)
```html
<Form ref={e => this.ruleForm = e} model={this.state.ruleForm} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
  <Form.Item label="活动名称" prop="name">
    <Input value={this.state.ruleForm.name}></Input>
  </Form.Item>
  <Form.Item label="活动区域" prop="region">
    <Select value={this.state.ruleForm.region} placeholder="请选择活动区域">
      <Select.Option label="区域一" value="shanghai"></Select.Option>
      <Select.Option label="区域二" value="beijing"></Select.Option>
    </Select>
  </Form.Item>
  <Form.Item label="活动时间" required={true}>
    <Layout.Col span="11">
      <Form.Item prop="date1">

      </Form.Item>
    </Layout.Col>
    <Layout.Col className="line" span="2">-</Layout.Col>
    <Layout.Col span="11">
      <Form.Item prop="date2">

      </Form.Item>
    </Layout.Col>
  </Form.Item>
  <Form.Item label="即时配送">
    <Switch onText="" offText="" value={this.state.ruleForm.delivery}></Switch>
  </Form.Item>
  <Form.Item label="活动性质" prop="type">
    <Checkbox.Group value={this.state.ruleForm.type}>
      <Checkbox label="美食/餐厅线上活动" name="type"></Checkbox>
      <Checkbox label="地推活动" name="type"></Checkbox>
      <Checkbox label="线下主题活动" name="type"></Checkbox>
      <Checkbox label="单纯品牌曝光" name="type"></Checkbox>
    </Checkbox.Group>
  </Form.Item>
  <Form.Item label="特殊资源" prop="resource">
    <Radio.Group value={this.state.ruleForm.resource}>
      <Radio value="线上品牌商赞助"></Radio>
      <Radio value="线下场地免费"></Radio>
    </Radio.Group>
  </Form.Item>
  <Form.Item label="活动形式" prop="desc">
    <Input type="textarea" value={this.state.ruleForm.desc}></Input>
  </Form.Item>
  <Form.Item>
    <Button type="primary" onClick={this.handleSubmit.bind(this)}>立即创建</Button>
    <Button onClick={this.handleReset.bind(this)}>重置</Button>
  </Form.Item>
</Form>
```
:::

### 自定义校验规则

::: demo 这个例子中展示了如何使用自定义验证规则来完成密码的二次验证
```html
<Form ref={e => this.ruleForm2 = e} model={this.state.ruleForm2} rules={this.state.rules2} labelWidth="100" className="demo-ruleForm">
  <Form.Item label="密码" prop="pass">
    <Input type="password" value={this.state.ruleForm2.pass} autoComplete="off"></Input>
  </Form.Item>
  <Form.Item label="确认密码" prop="checkPass">
    <Input type="password" value={this.state.ruleForm2.checkPass} autoComplete="off"></Input>
  </Form.Item>
  <Form.Item label="年龄" prop="age">
    <Input value={this.state.ruleForm2.age}></Input>
  </Form.Item>
  <Form.Item>
    <Button type="primary" onClick={this.handleSubmit2.bind(this)}>提交</Button>
    <Button onClick={this.handleReset2.bind(this)}>重置</Button>
  </Form.Item>
</Form>
```
:::

### 动态增减表单项

::: demo 除了在 Form 组件上一次性传递所有的验证规则外还可以在单个的表单域上传递属性的验证规则
```html
<Form model={this.state.dynamicForm} rules={this.state.dynamicRule} labelWidth="100" className="demo-dynamic">
  <Form.Item prop="email" label="邮箱">
    <Input value={this.state.dynamicForm.email}></Input>
  </Form.Item>
  {
    this.state.dynamicForm.domains.map((domain, index) => {
      return (
        <Form.Item
          key={index}
          label={`域名${index}`}
          prop={`domains:${index}`}
          rules={{
            type: 'object', required: true,
            fields: {
              value: { required: true, message: '域名不能为空', trigger: 'blur' }
            }
          }}
        >
          <Input value={domain.value}></Input>
          <Button onClick={this.removeDomain.bind(this, domain)}>删除</Button>
        </Form.Item>
      )
    })
  }
  <Form.Item>
    <Button type="primary" onClick={this.handleSubmit3.bind(this)}>提交</Button>
    <Button onClick={this.addDomain.bind(this)}>新增域名</Button>
  </Form.Item>
</Form>
```
:::

### Form Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| inline    | 行内表单模式 | boolean | — | false |
| labelPosition | 表单域标签的位置 | string |  right/left/top            | right |
| labelWidth | 表单域标签的宽度，所有的 form-item 都会继承 form 组件的 labelWidth 的值 | string | — | — |
| labelSuffix | 表单域标签的后缀 | string | — | — |

### Form Methods

| 方法名      | 说明          |
|---------- |-------------- |
| validate(cb) | 对整个表单进行校验的方法 |
| validateField(prop, cb) | 对部分表单字段进行校验的方法 |
| resetFields | 对整个表单进行重置，将所有字段值重置为空并移除校验结果 |

### Form-Item Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop    | 表单域 model 字段 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| labelWidth | 表单域标签的的宽度，例如 '50px' | string |       —       | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | bolean | — | false |
