const req = require.context('./svg', false, /\.svg$/)
const importAll = (r: __WebpackModuleApi.RequireContext) => r.keys().map(r)
importAll(req)

export {}
