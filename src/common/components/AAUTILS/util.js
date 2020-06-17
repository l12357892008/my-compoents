

// 将camelCase驼峰命名转变为kebab-case短横线命名
export const kebabCase = function(str) {
  const hyphenateRE = /([^-])([A-Z])/g;
  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
};
