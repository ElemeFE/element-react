import format from './format';
import defaultLang from './lang/zh-CN';

function use(lang) {
  this.lang = lang;
}

function t(path, options) {
  const array = path.split('.');
    let current = this.lang || defaultLang;

    for (var i = 0, j = array.length; i < j; i++) {
      var property = array[i];
      var value = current[property];
      if (i === j - 1) return format(value, options);
      if (!value) return '';
      current = value;
    }
    return '';
}

export default {
  use,
  t
}
