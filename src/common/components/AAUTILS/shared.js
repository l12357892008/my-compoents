export function isDef(val) {
  return val !== undefined && val !== null;
}
export function isKorean(text) {   // 是否为韩文或朝鲜文    uAC00-uD7AF为韩文unicode编码  u3130-u318F为朝鲜的
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
  return reg.test(text);
}
