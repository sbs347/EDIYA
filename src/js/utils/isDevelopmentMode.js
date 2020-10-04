export function isDevelopmentMode() {
  var href = location.href;
  return href.indexOf('127.0.0.1') > -1 || href.indexOf('localhost') > -1;
}

export function setDevProd() {
  return isDevelopmentMode() ? '' : '/EDIYA';
}
