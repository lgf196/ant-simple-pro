import visualizer from 'rollup-plugin-visualizer';
/**
 * @description 对打包之后的包依赖进行分析
 */
export default function configVisualizerConfig() {
  return visualizer({
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  });
}
