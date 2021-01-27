const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map(i => {
  const m = i.match(re)
  if (m) {
    return m[1]
  }
  return ''
})

export default svgIcons
