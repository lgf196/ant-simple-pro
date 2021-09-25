import viteSvgIcons from 'vite-plugin-svg-icons';
import path from 'path';
/**
 * @description 对svg的支持，只需将svg的名字传入svg组件，即可
 */
export default function configSvgIcons() {
  return viteSvgIcons({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
  });
}
