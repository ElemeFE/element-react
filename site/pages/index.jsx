export default {
  documents: {
    'installation': require('./installation'),
    'quick-start': require('./quick-start'),
    'i18n': require('./i18n'),
    'custom-theme': require('./custom-theme')
  },
  components: {
    'Basic': {
      'layout': require('./layout'),
      'color': require('./color'),
      'typography': require('./typography'),
      'icon': require('./icon'),
      'button': require('./button')
    },
    'Form': {
      'radio': require('./radio'),
      'checkbox': require('./checkbox'),
      'input': require('./input'),
      'input-number': require('./input-number'),
      'select': require('./select'),
      'cascader': require('./cascader'),
      'switch': require('./switch'),
      'slider': require('./slider'),
      'time-picker': require('./time-picker'),
      'date-picker': require('./date-picker'),
      'upload': require('./upload'),
      'rate': require('./rate'),
      'color-picker': require('./color-picker'),
      'form': require('./form')
    },
    'Data': {
      'table': require('./table'),
      'tag': require('./tag'),
      'progress': require('./progress'),
      'tree': require('./tree'),
      'pagination': require('./pagination'),
      'badge': require('./badge')
    },
    'Notice': {
      'alert': require('./alert'),
      'loading': require('./loading'),
      'message': require('./message'),
      'message-box': require('./message-box'),
      'notification': require('./notification')
    },
    'Nav': {
      'menu': require('./menu'),
      'tabs': require('./tabs'),
      'breadcrumb': require('./breadcrumb'),
      'dropdown': require('./dropdown'),
      'steps': require('./steps')
    },
    'Others': {
      'dialog': require('./dialog'),
      'tooltip': require('./tooltip'),
      'popover': require('./popover'),
      'card': require('./card'),
      'carousel': require('./carousel'),
      'collapse': require('./collapse')
    }
  }
}
