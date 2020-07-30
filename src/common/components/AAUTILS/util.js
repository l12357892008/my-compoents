// 将camelCase驼峰命名转变为kebab-case短横线命名
export const kebabCase = function(str) {
  const hyphenateRE = /([^-])([A-Z])/g;  // [^-]  非短横线  [A-Z]大写字母  合并,前面不是短横线的大写字母
  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
};
