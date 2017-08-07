## Form

Form consists of `input`, `radio`, `select`, `checkbox` and so on. With form, you can collect, verify and submit data.

### Basic form

It includes all kinds of input items, such as `input`, `select`, `radio` and `checkbox`.

:::demo In each `form` component, you need a `form-item` field to be the container of your input item.

```js
constructor(props) {
  super(props);

  this.state = {
    form: {
      name: '',
      region: '',
      date1: null,
      date2: null,
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    }
  };
}

onSubmit(e) {
  e.preventDefault();
}

onChange(key, value) {
  this.state.form[key] = value;
  this.forceUpdate();
}

render() {
  return (
    <Form className="en-US" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
      <Form.Item label="Activity name">
        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
      </Form.Item>
      <Form.Item label="Activity zone">
        <Select value={this.state.form.region} placeholder="Please select your zone">
          <Select.Option label="Zone 1" value="shanghai"></Select.Option>
          <Select.Option label="Zone 2" value="beijing"></Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Activity time">
        <Layout.Col span="11">
          <Form.Item prop="date1" labelWidth="0px">
            <DatePicker
              value={this.state.form.date1}
              placeholder="Pick a date"
              onChange={this.onChange.bind(this, 'date1')}
            />
          </Form.Item>
        </Layout.Col>
        <Layout.Col className="line" span="2">-</Layout.Col>
        <Layout.Col span="11">
          <Form.Item prop="date2" labelWidth="0px">
            <TimePicker
              value={this.state.form.date2}
              selectableRange="18:30:00 - 20:30:00"
              placeholder="Pick a time"
              onChange={this.onChange.bind(this, 'date2')}
            />
          </Form.Item>
        </Layout.Col>
      </Form.Item>
      <Form.Item label="Instant delivery">
        <Switch
          onText=""
          offText=""
          value={this.state.form.delivery}
          onChange={this.onChange.bind(this, 'delivery')}
        />
      </Form.Item>
      <Form.Item label="Activity type">
        <Checkbox.Group value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}>
          <Checkbox label="Online activities" name="type"></Checkbox>
          <Checkbox label="Promotion activities" name="type"></Checkbox>
          <Checkbox label="Offline activities" name="type"></Checkbox>
          <Checkbox label="Simple brand exposure" name="type"></Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="Resources">
        <Radio.Group value={this.state.form.resource}>
          <Radio value="Sponsor"></Radio>
          <Radio value="Venue"></Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Activity form">
        <Input type="textarea" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" nativeType="submit">Create</Button>
        <Button>Cancel</Button>
      </Form.Item>
    </Form>
  )
}
```
:::

### Inline form

When the vertical space is limited and the form is relatively simple, you can put it in one line.

:::demo Set the `inline` attribute to `true` and the form will be inline.

```js
constructor(props) {
  super(props);

  this.state = {
    form: {
      user: '',
      region: ''
    }
  };
}

onSubmit(e) {
  e.preventDefault();
}

onChange(key, value) {
  this.setState({
    form: Object.assign(this.state.form, { [key]: value })
  });
}

render() {
  return (
    <Form inline={true} model={this.state.form} onSubmit={this.onSubmit.bind(this)} className="demo-form-inline">
      <Form.Item>
        <Input value={this.state.form.user} placeholder="Approved by" onChange={this.onChange.bind(this, 'user')}></Input>
      </Form.Item>
      <Form.Item>
        <Select value={this.state.form.region} placeholder="Activity zone">
          <Select.Option label="Zone 1" value="shanghai"></Select.Option>
          <Select.Option label="Zone 2" value="beijing"></Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button nativeType="submit" type="primary">Query</Button>
      </Form.Item>
    </Form>
  )
}
```
:::

### Alignment

Depending on your design, there are several different ways to align your label element.

:::demo The `label-position` attribute decides how labels align, it can be `top` or `left`. When set to `top`, labels will be placed at the top of the form field.

```js
constructor(props) {
  super(props);

  this.state = {
    labelPosition: 'right',
    form: {
      name: '',
      region: '',
      type: ''
    }
  };
}

onPositionChange(value) {
  this.setState({ labelPosition: value });
}

onChange(key, value) {
  this.setState({
    form: Object.assign(this.state.form, { [key]: value })
  });
}

render() {
  return (
    <div>
      <Radio.Group size="small" value={this.state.labelPosition} onChange={this.onPositionChange.bind(this)}>
        <Radio.Button value="left">Left</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button>
        <Radio.Button value="top">Top</Radio.Button>
      </Radio.Group>
      <div style={{ margin: 20 }}></div>
      <Form className="demo-form-stacked" model={this.state.form} labelPosition={this.state.labelPosition} labelWidth="100">
        <Form.Item label="Name">
          <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
        </Form.Item>
        <Form.Item label="Activity zone">
          <Input value={this.state.form.region} onChange={this.onChange.bind(this, 'region')}></Input>
        </Form.Item>
        <Form.Item label="Activity form">
          <Input value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}></Input>
        </Form.Item>
      </Form>
    </div>
  )
}
```
:::

### Validation

Form component allows you to verify your data, helping you find and correct errors.

:::demo Just add the `rule` attribute for `Form` component, pass validation rules, and set `prop` attribute for `Form-Item` as a specific key that needs to be validated. See more information at [async-validator](https://github.com/yiminghe/async-validator).

```js
constructor(props) {
  super(props);

  this.state = {
    form: {
      name: '',
      region: '',
      date1: null,
      date2: null,
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
    rules: {
      name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' }
      ],
      region: [
        { required: true, message: 'Please select Activity zone', trigger: 'change' }
      ],
      date1: [
        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
      ],
      date2: [
        { type: 'date', required: true, message: 'Please pick a time', trigger: 'change' }
      ],
      type: [
        { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
      ],
      resource: [
        { required: true, message: 'Please select activity resource', trigger: 'change' }
      ],
      desc: [
        { required: true, message: 'Please input activity form', trigger: 'blur' }
      ]
    }
  };
}

handleSubmit(e) {
  e.preventDefault();

  this.refs.form.validate((valid) => {
    if (valid) {
      alert('submit!');
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}

handleReset(e) {
  e.preventDefault();

  this.refs.form.resetFields();
}

onChange(key, value) {
  this.setState({
    form: Object.assign({}, this.state.form, { [key]: value })
  });
}

render() {
  return (
    <Form ref="form" className="en-US" model={this.state.form} rules={this.state.rules} labelWidth="120">
      <Form.Item label="Activity name" prop="name">
        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
      </Form.Item>
      <Form.Item label="Activity zone" prop="region">
        <Select value={this.state.form.region} placeholder="Activity zone" onChange={this.onChange.bind(this, 'region')}>
          <Select.Option label="Zone 1" value="shanghai"></Select.Option>
          <Select.Option label="Zone 2" value="beijing"></Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Activity time" required={true}>
        <Layout.Col span="11">
          <Form.Item prop="date1" labelWidth="0px">
            <DatePicker
              value={this.state.form.date1}
              placeholder="Pick a date"
              onChange={this.onChange.bind(this, 'date1')}
            />
          </Form.Item>
        </Layout.Col>
        <Layout.Col className="line" span="2">-</Layout.Col>
        <Layout.Col span="11">
          <Form.Item prop="date2" labelWidth="0px">
            <TimePicker
              value={this.state.form.date2}
              selectableRange="18:30:00 - 20:30:00"
              placeholder="Pick a time"
              onChange={this.onChange.bind(this, 'date2')}
            />
          </Form.Item>
        </Layout.Col>
      </Form.Item>
      <Form.Item label="Instant delivery" prop="delivery">
        <Switch value={this.state.form.delivery} onChange={this.onChange.bind(this, 'delivery')}></Switch>
      </Form.Item>
      <Form.Item label="Activity type" prop="type">
        <Checkbox.Group value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}>
          <Checkbox label="Online activities" name="type"></Checkbox>
          <Checkbox label="Promotion activities" name="type"></Checkbox>
          <Checkbox label="Offline activities" name="type"></Checkbox>
          <Checkbox label="Simple brand exposure" name="type"></Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="Resources" prop="resource">
        <Radio.Group value={this.state.form.resource} onChange={this.onChange.bind(this, 'resource')}>
          <Radio value="Sponsor"></Radio>
          <Radio value="Venue"></Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Activity form" prop="desc">
        <Input type="textarea" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={this.handleSubmit.bind(this)}>Create</Button>
        <Button onClick={this.handleReset.bind(this)}>Reset</Button>
      </Form.Item>
    </Form>
  )
}
```
:::

### Custom validation rules

:::demo This example shows how to customize your own validation rules to finish a two-factor password verification.

```js
constructor(props) {
  super(props);

  this.state = {
    form: {
      pass: '',
      checkPass: '',
      age: ''
    },
    rules: {
      pass: [
        { required: true, message: 'Please input the password', trigger: 'blur' },
        { validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('Please input the password'));
          } else {
            if (this.state.form.checkPass !== '') {
              this.refs.form.validateField('checkPass');
            }
            callback();
          }
        } }
      ],
      checkPass: [
        { required: true, message: 'Please input the password again', trigger: 'blur' },
        { validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('Please input the password again'));
          } else if (value !== this.state.form.pass) {
            callback(new Error('Two inputs don\'t match!'));
          } else {
            callback();
          }
        } }
      ],
      age: [
        { required: true, message: 'Please input the age', trigger: 'blur' },
        { validator: (rule, value, callback) => {
          var age = parseInt(value, 10);

          setTimeout(() => {
            if (!Number.isInteger(age)) {
              callback(new Error('Please input digits'));
            } else{
              if (age < 18) {
                callback(new Error('Age must be greater than 18'));
              } else {
                callback();
              }
            }
          }, 1000);
        }, trigger: 'change' }
      ]
    }
  };
}

handleSubmit(e) {
  e.preventDefault();

  this.refs.form.validate((valid) => {
    if (valid) {
      alert('submit!');
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}

handleReset(e) {
  e.preventDefault();

  this.refs.form.resetFields();
}

onChange(key, value) {
  this.setState({
    form: Object.assign({}, this.state.form, { [key]: value })
  });
}

render() {
  return (
    <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
      <Form.Item label="Password" prop="pass">
        <Input type="password" value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} autoComplete="off" />
      </Form.Item>
      <Form.Item label="Confirm" prop="checkPass">
        <Input type="password" value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete="off" />
      </Form.Item>
      <Form.Item label="Age" prop="age">
        <Input value={this.state.form.age} onChange={this.onChange.bind(this, 'age')}></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>
        <Button onClick={this.handleReset.bind(this)}>Reset</Button>
      </Form.Item>
    </Form>
  )
}
```
:::

### Delete or add form items dynamically

:::demo In addition to passing all validation rules at once on the form component, you can also pass the validation rules or delete rules on a single form field dynamically.

```js
constructor(props) {
  super(props);

  this.state = {
    form: {
      domains: [{
        key: 1,
        value: ''
      }],
      email: ''
    },
    rules: {
      email: [
        { required: true, message: 'Please input email address', trigger: 'blur' },
        { type: 'email', message: 'Please input correct email address', trigger: 'blur,change' }
      ]
    }
  };
}

handleSubmit(e) {
  e.preventDefault();

  this.refs.form.validate((valid) => {
    if (valid) {
      alert('submit!');
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}

removeDomain(item, e) {
  var index = this.state.form.domains.indexOf(item);

  if (index !== -1) {
    this.state.form.domains.splice(index, 1);
    this.forceUpdate();
  }

  e.preventDefault();
}

addDomain(e) {
  e.preventDefault();

  this.state.form.domains.push({
    key: this.state.form.domains.length,
    value: ''
  });

  this.forceUpdate();
}

onEmailChange(value) {
  this.setState({
    form: Object.assign({}, this.state.form, { email: value })
  });
}

onDomainChange(index, value) {
  this.state.form.domains[index].value = value;
  this.forceUpdate();
}

render() {
  return (
    <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-dynamic">
      <Form.Item prop="email" label="Email">
        <Input value={this.state.form.email} onChange={this.onEmailChange.bind(this)}></Input>
      </Form.Item>
      {
        this.state.form.domains.map((domain, index) => {
          return (
            <Form.Item
              key={index}
              label={`Domain ${index}`}
              prop={`domains:${index}`}
              rules={{
                type: 'object', required: true,
                fields: {
                  value: { required: true, message: 'Domain can not be null', trigger: 'blur' }
                }
              }}
            >
              <Input value={domain.value} onChange={this.onDomainChange.bind(this, index)}></Input>
              <Button onClick={this.removeDomain.bind(this, domain)}>Delete</Button>
            </Form.Item>
          )
        })
      }
      <Form.Item>
        <Button type="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>
        <Button onClick={this.addDomain.bind(this)}>New domain</Button>
      </Form.Item>
    </Form>
  )
}
```
:::

### Form Attributes

| Attribute      | Description          | Type      | Accepted Values       | Default  |
| ---- | ----| ---- | ---- | ---- |
| model| data of form component | object | — | — |
| rules | validation rules of form | object | — | — |
| inline | whether the form is inline | boolean | — | false |
| label-position | position of label | string | left/right/top | right |
| label-width | width of label, and all form items will inherit from `Form` | string | — | — |
| label-suffix | suffix of the label | string | — | — |
| show-message  | whether to show the error message | boolean | — | true |

### Form Methods

| Method | Description | Parameters |
| ---- | ---- | ---- |
| validate | the method to validate the whole form | Function(callback: Function(boolean)) |
| validateField | the method to validate a certain form item | Function(prop: string, callback: Function(errorMessage: string)) |
| resetFields | reset all the fields and remove validation result | — |

### Form-Item Attributes

| Attribute      | Description          | Type      | Accepted Values       | Default  |
| ---- | ----| ---- | ---- | ---- |
| prop | a key of `model` | string | keys of model that passed to `form` |
| label | label | string | — | — |
| label-width | width of label, e.g. '50px' | string | — | — |
| required | whether the field is required or not, will be determined by validation rules if omitted | string |  — | false |
| rules | validation rules of form | object | — | — |
| error | field error message, set its value and the field will validate error and show this message immediately | string | — | — |
| show-message  | whether to show the error message | boolean | — | true |
