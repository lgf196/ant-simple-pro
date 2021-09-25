/**
 * @author lgf
 * @description vite的插件配置文件
 */
import { Plugin } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import configSvgIcons from './svgIcons';
import configEslint from './eslint';
import configVisualizerConfig from './visualizer';
import configStyleImport from './styleImport';
import legacy from '@vitejs/plugin-legacy';
import { VITE_APP_ESLINT, VITE_APP_VISUALIZER, VITE_APP_LEGACY } from '../index';
export default function createVitePlugins() {
  const vitePlugins: (Plugin | Plugin[])[] = [
    /**
     * @description 必须默认项
     */
    reactRefresh(),
    configSvgIcons(),
    configStyleImport(),
  ];
  VITE_APP_ESLINT && vitePlugins.push(...configEslint());
  VITE_APP_VISUALIZER && vitePlugins.push(configVisualizerConfig());
  VITE_APP_LEGACY &&
    vitePlugins.push(
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
    );
  return vitePlugins;
}
