import { ProxyOptions } from 'vite';
/**
 * @description 开发服务器配置自定义代理规则
 */
const proxy: Record<string, string | ProxyOptions> = {
  // 选项写法
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '/api'),
    // 更多请参看：https://cn.vitejs.dev/config/#server-proxy
  },
};
export default proxy;
