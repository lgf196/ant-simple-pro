export default function possibleConstructorReturn(self, call) {
  if (!self) {
    // eslint-disable-next-line
    throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called")
  }

  return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}
