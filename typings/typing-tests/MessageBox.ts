import { MessageBox } from 'element-react'
import { MessageBox as MessageBoxNext } from 'element-react/next'

MessageBox.alert('这是一段内容')
MessageBox.alert('这是一段内容', 'title')
MessageBox.alert('这是一段内容', {
  title: 'title'
})
MessageBox.alert('这是一段内容', 'title', {
  type: 'success'
})
MessageBox.alert('这是一段内容', {
  type: 'success'
})
MessageBox.alert('这是一段内容', {
  type: 'warning'
})
MessageBox.alert('这是一段内容', {
  type: 'info'
})
MessageBox.alert('这是一段内容', {
  inputValidator: () => false
})
MessageBox.alert('这是一段内容', {
  modal: 'alert',
  type: 'error',
  title: 'title',
  message: '这是一段内容',
  showInput: true,
  showClose: false,
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonText: 'string',
  cancelButtonText: 'string',
  cancelButtonClass: 'string',
  confirmButtonClass: 'string',
  inputPlaceholder: 'string',
  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  inputValidator() {
    return 'error string'
  },
  inputErrorMessage: 'error string'
})

MessageBox.confirm('这是一段内容')
MessageBox.confirm('这是一段内容', 'title')
MessageBox.confirm('这是一段内容', {
  title: 'title'
})
MessageBox.confirm('这是一段内容', 'title', {
  type: 'success'
})
MessageBox.confirm('这是一段内容', {
  type: 'success'
})
MessageBox.confirm('这是一段内容', {
  type: 'warning'
})
MessageBox.confirm('这是一段内容', {
  type: 'info'
})
MessageBox.confirm('这是一段内容', {
  inputValidator: () => false
})
MessageBox.confirm('这是一段内容', {
  modal: 'confirm',
  type: 'error',
  title: 'title',
  message: '这是一段内容',
  showInput: true,
  showClose: false,
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonText: 'string',
  cancelButtonText: 'string',
  cancelButtonClass: 'string',
  confirmButtonClass: 'string',
  inputPlaceholder: 'string',
  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  inputValidator() {
    return 'error string'
  },
  inputErrorMessage: 'error string'
})

MessageBox.prompt('这是一段内容')
MessageBox.prompt('这是一段内容', 'title')
MessageBox.prompt('这是一段内容', {
  title: 'title'
})
MessageBox.prompt('这是一段内容', 'title', {
  type: 'success'
})
MessageBox.prompt('这是一段内容', {
  type: 'success'
})
MessageBox.prompt('这是一段内容', {
  type: 'warning'
})
MessageBox.prompt('这是一段内容', {
  type: 'info'
})
MessageBox.prompt('这是一段内容', {
  inputValidator: () => false
})
MessageBox.prompt('这是一段内容', {
  modal: 'prompt',
  type: 'error',
  title: 'title',
  message: '这是一段内容',
  showInput: true,
  showClose: false,
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonText: 'string',
  cancelButtonText: 'string',
  cancelButtonClass: 'string',
  confirmButtonClass: 'string',
  inputPlaceholder: 'string',
  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  inputValidator() {
    return 'error string'
  },
  inputErrorMessage: 'error string'
})

MessageBox.msgbox()
MessageBox.msgbox({
  type: 'success'
})
MessageBox.msgbox({
  type: 'success'
})
MessageBox.msgbox({
  type: 'warning'
})
MessageBox.msgbox({
  type: 'info'
})
MessageBox.msgbox({
  inputValidator: () => false
})
MessageBox.msgbox({
  modal: 'prompt',
  type: 'error',
  title: 'title',
  message: '这是一段内容',
  showInput: true,
  showClose: false,
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonText: 'string',
  cancelButtonText: 'string',
  cancelButtonClass: 'string',
  confirmButtonClass: 'string',
  inputPlaceholder: 'string',
  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  inputValidator() {
    return 'error string'
  },
  inputErrorMessage: 'error string'
})


MessageBoxNext.alert('这是一段内容')
MessageBoxNext.alert('这是一段内容', 'title')
MessageBoxNext.alert('这是一段内容', {
  title: 'title'
})
MessageBoxNext.alert('这是一段内容', 'title', {
  type: 'success'
})
MessageBoxNext.alert('这是一段内容', {
  type: 'success'
})
MessageBoxNext.alert('这是一段内容', {
  type: 'warning'
})
MessageBoxNext.alert('这是一段内容', {
  type: 'info'
})
MessageBoxNext.alert('这是一段内容', {
  inputValidator: () => false
})
MessageBoxNext.alert('这是一段内容', {
  modal: 'alert',
  type: 'error',
  title: 'title',
  message: '这是一段内容',
  showInput: true,
  showClose: false,
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonText: 'string',
  cancelButtonText: 'string',
  cancelButtonClass: 'string',
  confirmButtonClass: 'string',
  inputPlaceholder: 'string',
  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  inputValidator() {
    return 'error string'
  },
  inputErrorMessage: 'error string'
})

MessageBoxNext.confirm('这是一段内容')
MessageBoxNext.confirm('这是一段内容', 'title')
MessageBoxNext.confirm('这是一段内容', {
  title: 'title'
})
MessageBoxNext.confirm('这是一段内容', 'title', {
  type: 'success'
})
MessageBoxNext.confirm('这是一段内容', {
  type: 'success'
})
MessageBoxNext.confirm('这是一段内容', {
  type: 'warning'
})
MessageBoxNext.confirm('这是一段内容', {
  type: 'info'
})
MessageBoxNext.confirm('这是一段内容', {
  inputValidator: () => false
})
MessageBoxNext.confirm('这是一段内容', {
  modal: 'confirm',
  type: 'error',
  title: 'title',
  message: '这是一段内容',
  showInput: true,
  showClose: false,
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonText: 'string',
  cancelButtonText: 'string',
  cancelButtonClass: 'string',
  confirmButtonClass: 'string',
  inputPlaceholder: 'string',
  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  inputValidator() {
    return 'error string'
  },
  inputErrorMessage: 'error string'
})

MessageBoxNext.prompt('这是一段内容')
MessageBoxNext.prompt('这是一段内容', 'title')
MessageBoxNext.prompt('这是一段内容', {
  title: 'title'
})
MessageBoxNext.prompt('这是一段内容', 'title', {
  type: 'success'
})
MessageBoxNext.prompt('这是一段内容', {
  type: 'success'
})
MessageBoxNext.prompt('这是一段内容', {
  type: 'warning'
})
MessageBoxNext.prompt('这是一段内容', {
  type: 'info'
})
MessageBoxNext.prompt('这是一段内容', {
  inputValidator: () => false
})
MessageBoxNext.prompt('这是一段内容', {
  modal: 'prompt',
  type: 'error',
  title: 'title',
  message: '这是一段内容',
  showInput: true,
  showClose: false,
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonText: 'string',
  cancelButtonText: 'string',
  cancelButtonClass: 'string',
  confirmButtonClass: 'string',
  inputPlaceholder: 'string',
  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  inputValidator() {
    return 'error string'
  },
  inputErrorMessage: 'error string'
})

MessageBoxNext.msgbox()
MessageBoxNext.msgbox({
  type: 'success'
})
MessageBoxNext.msgbox({
  type: 'success'
})
MessageBoxNext.msgbox({
  type: 'warning'
})
MessageBoxNext.msgbox({
  type: 'info'
})
MessageBoxNext.msgbox({
  inputValidator: () => false
})
MessageBoxNext.msgbox({
  modal: 'prompt',
  type: 'error',
  title: 'title',
  message: '这是一段内容',
  showInput: true,
  showClose: false,
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonText: 'string',
  cancelButtonText: 'string',
  cancelButtonClass: 'string',
  confirmButtonClass: 'string',
  inputPlaceholder: 'string',
  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  inputValidator() {
    return 'error string'
  },
  inputErrorMessage: 'error string'
})
