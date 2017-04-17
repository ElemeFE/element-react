import format from './format';
import defaultLang from './lang/zh-CN';

let _lang = defaultLang

function use(lang) {
  console.log('use', lang);

  _lang = lang;
}

function t(path, options) {
  console.log('t', _lang);

  const array = path.split('.');
    let current = _lang;

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
