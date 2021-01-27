// https://prettier.io/docs/en/options.html
module.exports = {
  // 单行最多 80 个字符 default
  printWidth: 80,
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
  // 在对象属性中的括号之间应该空格 default
  bracketSpacing: true,
  // 将>多行JSX元素的放在放在下一行
  jsxBracketSameLine: false,
  // 箭头函数只有一个参数时不需要括号
  arrowParens: 'avoid',
  // 不要缩进Vue文件中的脚本和样式标签 default
  vueIndentScriptAndStyle: false,
  // 维持现有的行尾/换行
  endOfLine: 'lf'
}
