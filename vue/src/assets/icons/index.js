const req = require.context('./svg', false, /\.svg$/)
const importAll = r => r.keys().map(r)
importAll(req)

export {}
