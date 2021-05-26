// https://prettier.io/docs/en/options.html
module.exports = {
  // 单行最多 120 个字符 default
  printWidth: 120,
  // 不使用 tab 缩进 default
  useTabs: false,
  // 没有分号
  semi: false,
  // 单引号
  singleQuote: true,
  // 仅在需要时在对象属性周围添加引号 default
  quoteProps: 'as-needed',
  // jsx 不使用单引号 default
  jsxSingleQuote: false,
  // 对象，数组等没有尾随逗号
  trailingComma: 'none',
  // 在对象属性中的括号之间应该空格 default eg: { foo: 'bar' }
  bracketSpacing: true,
  // 多属性html标签的‘>’折行放置
  jsxBracketSameLine: false,
  // 箭头函数只有一个参数时不需要括号
  arrowParens: 'avoid',
  // 不要缩进Vue文件中的脚本和样式标签 default
  vueIndentScriptAndStyle: false,
  // 维持现有的行尾/换行
  endOfLine: 'lf',
  // 对HTML全局空白不敏感
  htmlWhitespaceSensitivity: 'strict',
  // 无需顶部注释即可格式化
  requirePragma: false,
  // 在已被preitter格式化的文件顶部加上标注
  insertPragma: false,
  proseWrap: 'never',
  // 对引用代码进行格式化
  embeddedLanguageFormatting: 'auto'
}
