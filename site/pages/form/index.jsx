import React from 'react';
import Markdown from '../../../libs/markdown';
import template from '../../docs/zh-CN/form.md';

import './style.scss';

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formInline: {
        user: '',
        region: ''
      },
      formStacked: {
        name: '',
        region: '',
        type: ''
      },
      formAlignRight: {
        name: '',
        region: '',
        type: ''
      },
      formAlignLeft: {
        name: '',
        region: '',
        type: ''
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      ruleForm2: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules2: {
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.state.ruleForm2.checkPass !== '') {
                this.ruleForm2.validateField('checkPass');
              }
              callback();
            }
          } }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          } }
        ],
        age: [
          { required: true, message: '请填写年龄', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            var age = parseInt(value, 10);

            setTimeout(() => {
              if (!Number.isInteger(age)) {
                callback(new Error('请输入数字值'));
              } else{
                if (age < 18) {
                  callback(new Error('必须年满18岁'));
                } else {
                  callback();
                }
              }
            }, 1000);
          }, trigger: 'change' }
        ]
      },
      dynamicForm: {
        domains: [{
          key: 1,
          value: ''
        }],
        email: ''
      },
      dynamicRule: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ]
      }
    };
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('submit!');
  }

  handleSubmit(e) {
    e.preventDefault();

    this.ruleForm.validate((valid) => {
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

    this.ruleForm.resetFields();
  }

  handleSubmit2(e) {
    e.preventDefault();

    this.ruleForm2.validate((valid) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  handleReset2(e) {
    e.preventDefault();

    this.ruleForm2.resetFields();
  }

  handleSubmit3(e) {
    e.preventDefault();

    this.ruleForm.validate((valid) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  removeDomain(item, e) {
    var index = this.state.dynamicForm.domains.indexOf(item);

    if (index !== -1) {
      this.state.dynamicForm.domains.splice(index, 1);
      this.forceUpdate();
    }

    e.preventDefault();
  }

  addDomain(e) {
    e.preventDefault();

    this.state.dynamicForm.domains.push({
      key: this.state.dynamicForm.domains.length,
      value: ''
    });
    this.forceUpdate();
  }

  render() {
    return <Markdown context={this} component="Form">{template}</Markdown>
  }
}
