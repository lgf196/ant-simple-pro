// vite-plugin-imp 该插件按需加载存在部分样式丢失的情况

import styleImport from 'vite-plugin-style-import';

export default function configStyleImport() {
  return styleImport({
    libs: [
      {
        libraryName: 'antd',
        esModule: true,
        resolveStyle: (name) => {
          return `antd/es/${name}/style/index`;
        },
      },
    ],
  });
}
