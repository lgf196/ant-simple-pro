import { ProxyOptions } from 'vite';
/**
 * @description 开发服务器配置自定义代理规则
 */
const proxy: Record<string, string | ProxyOptions> = {
  // 字符串简写写法
  '/foo': 'http://localhost:4567',
  // 选项写法
  '/api': {
    target: 'http://jsonplaceholder.typicode.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
    // 更多请参看：https://cn.vitejs.dev/config/#server-proxy
  },
};
export default proxy;
