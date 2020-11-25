
export function isIE() {
  return !isNaN(Number(document.documentMode))
}

export function isEdge() {
  return navigator.userAgent.indexOf('Edge') > -1
}

export function isFirefox() {
  return !!window.navigator.userAgent.match(/firefox/i)
}
