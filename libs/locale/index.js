import defaultLang from './lang/zh-cn'

let lang = defaultLang;

export const $t = function(path) {// todo: handle options, see original src, function(path, options)
  const array = path.split('.');
  let current = lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    var value = current[property];
    if (i === j - 1) return value;
    if (!value) return '';
    current = value;
  }
  return '';
};

export const use = function(l) {
  lang = l || lang;
};
export default { use, $t };
