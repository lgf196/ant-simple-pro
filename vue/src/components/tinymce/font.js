// 字体类型
const fonts = [
  '宋体',
  '微软雅黑',
  '新宋体',
  '楷体',
  '黑体',
  '隶书',
  'arial',
  'Chinese Quote',
  'monospace',
  'consolas',
  'PingFang SC',
  'sans-serif',
  'Helvetica'
]

// '宋体=宋体;微软雅黑=微软雅黑'
const fontFormats = fonts.map(font => {
  return `${font}=${font}`
})

export default fontFormats.join(';')
