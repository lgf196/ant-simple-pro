export function isEdge() {
  return navigator.userAgent.indexOf('Edge') > -1
}

export function isFirefox() {
  return !!window.navigator.userAgent.match(/firefox/i)
}

export function isMobile() {
  return /Android|webOS|i?Phone|iPad|iPod|BlackBerry|Mobile/i.test(navigator.userAgent)
}
