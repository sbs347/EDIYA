const location = window.location;

export function isDevelopmentMode() {
  const href = location.href;
  return href.match(/(127.0.0.1|localhost)/);
}

export function setDevProd() {
  return isDevelopmentMode() ? '' : '/EDIYA';
}
