// vite-plugin-imp 该插件按需加载存在部分样式丢失的情况
// 由于 vite 本身已按需导入了组件库，因此仅样式不是按需导入的，因此只需按需导入样式即可。
/**
 * @note antd我并未安装，如果安装了ant，可以将下面的注释去掉
 */
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
